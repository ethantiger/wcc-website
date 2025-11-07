import { useState, useEffect } from 'react';
import { IconX, IconInbox, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCollection } from '@/hooks/useCollection';
import collections from '@/firebase/collections';
import CarpoolPost from '../interfaces/CarpoolPost';
import User from '../interfaces/User';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { convertTimestampToDate } from '@/utils/firebaseDateConvert';

interface CarpoolInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RequestWithDetails {
  carpoolId: string;
  carpool: CarpoolPost;
  requestUserId: string;
  requestUser?: User;
}

export default function CarpoolInboxModal({ isOpen, onClose }: CarpoolInboxModalProps) {
  const { user: currentUser } = useAuthContext();
  const { documents: carpools } = useCollection<CarpoolPost>(collections.carpoolCollection,null,null,true);
  const { documents: users } = useCollection<User>(collections.usersCollection);
  const [requests, setRequests] = useState<RequestWithDetails[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Get all requests for user's carpools
  useEffect(() => {
    if (!carpools || !users || !currentUser) {
      setRequests([]);
      return;
    }

    const allRequests: RequestWithDetails[] = [];

    carpools.forEach((carpool) => {
      if (carpool.userId === currentUser.uid && carpool.requests && carpool.requests.length > 0) {
        carpool.requests.forEach((requestUserId) => {
          const requestUser = users.find(u => u.id === requestUserId);
          allRequests.push({
            carpoolId: carpool.id,
            carpool,
            requestUserId,
            requestUser
          });
        });
      }
    });

    setRequests(allRequests);
  }, [carpools, users, currentUser]);

  const handleApproveRequest = async (carpoolId: string, userId: string) => {
    if (!currentUser) return;

    const carpool = carpools?.find(c => c.id === carpoolId);
    if (!carpool) return;

    // Check if carpool is full
    if (carpool.people.length >= carpool.maxPeople) {
      alert('This carpool is already full!');
      return;
    }

    try {
      setIsProcessing(`${carpoolId}-${userId}-approve`);
      
      const carpoolRef = doc(db, collections.carpoolCollection, carpoolId);
      await updateDoc(carpoolRef, {
        people: arrayUnion(userId),
        requests: arrayRemove(userId)
      });

      // Remove from local state
      setRequests(prev => prev.filter(r => !(r.carpoolId === carpoolId && r.requestUserId === userId)));
      
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDenyRequest = async (carpoolId: string, userId: string) => {
    if (!currentUser) return;

    try {
      setIsProcessing(`${carpoolId}-${userId}-deny`);
      
      const carpoolRef = doc(db, collections.carpoolCollection, carpoolId);
      await updateDoc(carpoolRef, {
        requests: arrayRemove(userId)
      });

      // Remove from local state
      setRequests(prev => prev.filter(r => !(r.carpoolId === carpoolId && r.requestUserId === userId)));
      
    } catch (error) {
      console.error("Error denying request:", error);
      alert("Failed to deny request. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <IconInbox className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Carpool Requests</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {requests.length} pending request{requests.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <IconX className="text-slate-500 dark:text-slate-400" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <IconInbox className="text-slate-400 dark:text-slate-500" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">No pending requests</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center">
                You don't have any pending join requests for your carpools.
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {requests.map((request) => (
                <div 
                  key={`${request.carpoolId}-${request.requestUserId}`}
                  className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600"
                >
                  {/* Carpool Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconMapPin size={16} className="text-slate-500 dark:text-slate-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {request.carpool.location} → {request.carpool.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconCalendar size={16} className="text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {convertTimestampToDate(request.carpool.targetDate).date} at {convertTimestampToDate(request.carpool.targetDate).time}
                      </span>
                    </div>
                  </div>

                  {/* Request User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {request.requestUser?.displayName?.[0]?.toUpperCase() || 
                           request.requestUser?.email?.[0]?.toUpperCase() || 
                           request.requestUserId[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                          {request.requestUser?.displayName || request.requestUser?.email || 'Unknown User'}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Wants to join your carpool
                        </p>
                        {request.requestUser?.email && (
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            {request.requestUser.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveRequest(request.carpoolId, request.requestUserId)}
                        disabled={isProcessing === `${request.carpoolId}-${request.requestUserId}-approve` || 
                                 request.carpool.people.length >= request.carpool.maxPeople}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isProcessing === `${request.carpoolId}-${request.requestUserId}-approve`
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : request.carpool.people.length >= request.carpool.maxPeople
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                        }`}
                        title={request.carpool.people.length >= request.carpool.maxPeople ? 'Carpool is full' : 'Approve request'}
                      >
                        {isProcessing === `${request.carpoolId}-${request.requestUserId}-approve` ? '...' : '✓ Accept'}
                      </button>
                      <button
                        onClick={() => handleDenyRequest(request.carpoolId, request.requestUserId)}
                        disabled={isProcessing === `${request.carpoolId}-${request.requestUserId}-deny`}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isProcessing === `${request.carpoolId}-${request.requestUserId}-deny`
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
                        }`}
                      >
                        {isProcessing === `${request.carpoolId}-${request.requestUserId}-deny` ? '...' : '✗ Deny'}
                      </button>
                    </div>
                  </div>

                  {/* Full Carpool Warning */}
                  {request.carpool.people.length >= request.carpool.maxPeople && (
                    <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg">
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        ⚠️ This carpool is full. You must remove someone before accepting new requests.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}