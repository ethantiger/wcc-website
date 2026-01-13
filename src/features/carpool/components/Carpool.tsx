import CarpoolPost from "../interfaces/CarpoolPost";
import collections from "@/firebase/collections";
import { useCollection } from "@/hooks/useCollection";
import { useState, useMemo } from "react";
import { IconPlus, IconInbox } from "@tabler/icons-react";
import CarpoolModal from "./CarpoolModal";
import CarpoolInboxModal from "./CarpoolInboxModal";
import CarpoolCard from "./CarpoolCard";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Carpool() {
  const { documents: carpools } = useCollection<CarpoolPost>(collections.carpoolCollection, null, ['targetDate', 'asc'], true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const { user: currentUser } = useAuthContext();

  // Categorize carpools based on user relationship
  const categorizedCarpools = useMemo(() => {
    if (!carpools || !currentUser) {
      return {
        myCarpools: [],
        joinedCarpools: [],
        requestedCarpools: [],
        availableCarpools: carpools || []
      };
    }

    const myCarpools: CarpoolPost[] = [];
    const joinedCarpools: CarpoolPost[] = [];
    const requestedCarpools: CarpoolPost[] = [];
    const availableCarpools: CarpoolPost[] = [];
    const now = new Date();

    carpools.forEach((carpool) => {
      // Hide carpools that aren't yours and have passed their targetDate
      const isOwner = carpool.userId === currentUser.uid;
      const targetDate = carpool.targetDate.toDate();
      const hasPassed = targetDate <now;
      
      if (!isOwner && hasPassed) {
        return; // Skip this carpool
      }

      if (carpool.userId === currentUser.uid) {
        myCarpools.push(carpool);
      } else if (carpool.people.includes(currentUser.uid)) {
        joinedCarpools.push(carpool);
      } else if (carpool.requests?.includes(currentUser.uid)) {
        requestedCarpools.push(carpool);
      } else {
        availableCarpools.push(carpool);
      }
    });

    return { myCarpools, joinedCarpools, requestedCarpools, availableCarpools };
  }, [carpools, currentUser]);

  // Calculate total pending requests for user's carpools
  const totalPendingRequests = useMemo(() => {
    if (!carpools || !currentUser) return 0;
    
    return carpools.reduce((total, carpool) => {
      if (carpool.userId === currentUser.uid && carpool.requests) {
        return total + carpool.requests.length;
      }
      return total;
    }, 0);
  }, [carpools, currentUser]);

  // Render a section of carpools
  const renderCarpoolSection = (title: string, carpools: CarpoolPost[], ownershipType?: 'owner' | 'member' | 'requested') => {
    if (carpools.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
            {carpools.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {carpools.map((carpool) => (
            <CarpoolCard 
              key={carpool.id} 
              carpool={carpool} 
              ownershipType={ownershipType}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-4 border border-slate-200/50 bg-white to-indigo-50/30 p-4 sm:p-6 md:p-8 lg:p-10 dark:border-slate-700/50 dark:bg-gray-900 shadow-xl min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="font-bold text-transparent bg-clip-text bg-indigo-600 text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-0">
            Available Carpools
          </h1>
          <div className="flex items-center gap-4">
            {/* Inbox Button - Only show if user has pending requests */}
            {currentUser && totalPendingRequests > 0 && (
              <button
                onClick={() => setIsInboxModalOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <IconInbox size={18} />
                Inbox
                {/* Notification Badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalPendingRequests}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <IconPlus size={18} />
              Create Carpool
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {carpools ? (
            carpools.length > 0 ? (
              <div>
                {/* My Carpools Section */}
                {renderCarpoolSection(
                  "My Carpools", 
                  categorizedCarpools.myCarpools, 
                  'owner'
                )}
                
                {/* Joined Carpools Section */}
                {renderCarpoolSection(
                  "Carpools I've Joined", 
                  categorizedCarpools.joinedCarpools, 
                  'member'
                )}
                
                {/* Requested Carpools Section */}
                {renderCarpoolSection(
                  "Requested to Join", 
                  categorizedCarpools.requestedCarpools,
                  'requested'
                )}
                
                {/* Available Carpools Section */}
                {renderCarpoolSection(
                  categorizedCarpools.myCarpools.length > 0 || categorizedCarpools.joinedCarpools.length > 0 || categorizedCarpools.requestedCarpools.length > 0
                    ? "Other Available Carpools" 
                    : "Available Carpools", 
                  categorizedCarpools.availableCarpools
                )}
                
                {/* Show empty state if no carpools in any category */}
                {categorizedCarpools.myCarpools.length === 0 && 
                 categorizedCarpools.joinedCarpools.length === 0 && 
                 categorizedCarpools.requestedCarpools.length === 0 && 
                 categorizedCarpools.availableCarpools.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mb-6">
                      <div className="w-12 h-12 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Carpools Available</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
                      There are currently no carpools scheduled. Check back later or create your own!
                    </p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      <IconPlus size={18} />
                      Create First Carpool
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Carpools Available</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
                  There are currently no carpools scheduled. Check back later or create your own!
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <IconPlus size={18} />
                  Create First Carpool
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-6 animate-pulse">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 w-16 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                      <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-4/5"></div>
                    </div>
                    <div className="h-10 bg-slate-300 dark:bg-slate-600 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Carpool Modal */}
      <CarpoolModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        // onSuccess={handleCreateSuccess}
      />

      {/* Carpool Inbox Modal */}
      <CarpoolInboxModal
        isOpen={isInboxModalOpen}
        onClose={() => setIsInboxModalOpen(false)}
      />
    </div>
  );
}
