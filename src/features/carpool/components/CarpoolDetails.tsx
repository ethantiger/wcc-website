import { useParams, Link, useNavigate } from "react-router-dom";
import { useCarpoolWithUser } from "@/hooks/useCarpoolWithUser";
import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";
import { IconArrowLeft, IconCalendar, IconUser, IconUsers, IconMapPin, IconClock, IconFileText, IconEdit, IconTrash } from "@tabler/icons-react";
import { convertTimestampToDate } from "@/utils/firebaseDateConvert";
import { useAuthContext } from "@/hooks/useAuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import collections from "@/firebase/collections";
import { useState } from "react";
import CarpoolModal from "./CarpoolModal";

export default function CarpoolDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuthContext();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // Single hook that handles sequential loading
  const {
    carpool,
    user,
    carpoolLoading,
    carpoolError,
  } = useCarpoolWithUser(id || "");

  // Function to handle joining carpool
  const handleJoinCarpool = async () => {
    setMessage(null); // Clear any previous messages
    
    if (!currentUser || !carpool || !id) {
      setMessage({ text: "Unable to join carpool. Please make sure you're logged in.", type: 'error' });
      return;
    }

    // Check if user is the creator of the carpool
    if (carpool.userId === currentUser.uid) {
      setMessage({ text: "You cannot join your own carpool!", type: 'error' });
      return;
    }

    // Check if user is already in the carpool
    if (carpool.people.includes(currentUser.uid)) {
      setMessage({ text: "You're already part of this carpool!", type: 'info' });
      return;
    }

    // Check if carpool is full
    if (carpool.people.length >= carpool.maxPeople) {
      setMessage({ text: "This carpool is already full!", type: 'error' });
      return;
    }

    // Check if carpool is open
    if (carpool.status !== CarpoolStatusEnum.Open) {
      setMessage({ text: "This carpool is not currently accepting new members.", type: 'error' });
      return;
    }

    try {
      setIsJoining(true);
      
      // Update the carpool document to add the current user
      const carpoolRef = doc(db, collections.carpoolCollection, id);
      await updateDoc(carpoolRef, {
        people: arrayUnion(currentUser.uid)
      });

      // Show success message
      setMessage({ text: "Successfully joined the carpool!", type: 'success' });
      
      // Refresh the page to show updated data after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error joining carpool:", error);
      setMessage({ text: "Failed to join carpool. Please try again.", type: 'error' });
    } finally {
      setIsJoining(false);
    }
  };

  // Function to handle leaving carpool
  const handleLeaveCarpool = async () => {
    setMessage(null); // Clear any previous messages
    
    if (!currentUser || !carpool || !id) {
      setMessage({ text: "Unable to leave carpool. Please make sure you're logged in.", type: 'error' });
      return;
    }

    // Check if user is the creator of the carpool
    if (carpool.userId === currentUser.uid) {
      setMessage({ text: "You cannot leave your own carpool! You can delete it instead.", type: 'error' });
      return;
    }

    // Check if user is actually in the carpool
    if (!carpool.people.includes(currentUser.uid)) {
      setMessage({ text: "You're not part of this carpool.", type: 'info' });
      return;
    }

    try {
      setIsLeaving(true);
      
      // Update the carpool document to remove the current user
      const carpoolRef = doc(db, collections.carpoolCollection, id);
      await updateDoc(carpoolRef, {
        people: arrayRemove(currentUser.uid)
      });

      // Show success message
      setMessage({ text: "Successfully left the carpool!", type: 'success' });
      
      // Refresh the page to show updated data after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error leaving carpool:", error);
      setMessage({ text: "Failed to leave carpool. Please try again.", type: 'error' });
    } finally {
      setIsLeaving(false);
    }
  };

  // Function to handle deleting carpool
  const handleDeleteCarpool = async () => {
    if (!currentUser || !carpool || !id) {
      setMessage({ text: "Unable to delete carpool. Please make sure you're logged in.", type: 'error' });
      return;
    }

    // Check if user is the creator of the carpool
    if (carpool.userId !== currentUser.uid) {
      setMessage({ text: "You can only delete your own carpools!", type: 'error' });
      return;
    }

    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this carpool? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      // Delete the carpool document
      const carpoolRef = doc(db, collections.carpoolCollection, id);
      await deleteDoc(carpoolRef);

      // Show success message and redirect
      setMessage({ text: "Carpool deleted successfully!", type: 'success' });
      
      // Redirect to carpools list after a short delay
      setTimeout(() => {
        navigate('/dashboard/carpool');
      }, 1500);
      
    } catch (error) {
      console.error("Error deleting carpool:", error);
      setMessage({ text: "Failed to delete carpool. Please try again.", type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to handle edit success
  const handleEditSuccess = () => {
    // Refresh the page to show updated data
    window.location.reload();
  };

  if (carpoolError) {
    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 rounded-tl-3xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-white to-red-50/30 p-4 sm:p-6 md:p-8 lg:p-10 dark:border-slate-700/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-red-950/30 shadow-xl min-h-screen">
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 dark:from-red-700 dark:to-red-600 rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-red-400 dark:bg-red-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-300 mb-2">Error Loading Carpool</h3>
            <p className="text-red-500 dark:text-red-400 text-center max-w-md mb-6">
              {carpoolError}
            </p>
            <Link 
              to="/dashboard/carpool"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              <IconArrowLeft size={18} />
              Back to Carpools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!carpool || carpoolLoading) {
    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 rounded-tl-3xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 sm:p-6 md:p-8 lg:p-10 dark:border-slate-700/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/30 shadow-xl min-h-screen">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded"></div>
              <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-slate-300 dark:bg-slate-600 rounded-2xl"></div>
                <div className="h-48 bg-slate-300 dark:bg-slate-600 rounded-2xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-slate-300 dark:bg-slate-600 rounded-2xl"></div>
                <div className="h-48 bg-slate-300 dark:bg-slate-600 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Now we can safely use carpool since we know it exists
  const availableSeats = carpool.maxPeople - carpool.people.length;

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-6 rounded-tl-3xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 sm:p-6 md:p-8 lg:p-10 dark:border-slate-700/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/30 shadow-xl min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/60 hover:bg-white/80 dark:bg-slate-800/60 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:scale-105"
            >
              <IconArrowLeft className="text-slate-600 dark:text-slate-300" size={20} />
            </button>
            <div>
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-2xl sm:text-3xl lg:text-4xl">
                Carpool Details
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Review and join this carpool
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Owner Actions */}
            {currentUser && carpool.userId === currentUser.uid && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  <IconEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDeleteCarpool}
                  disabled={isDeleting}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 transform text-sm ${
                    isDeleting
                      ? 'bg-slate-400 cursor-not-allowed text-white'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <IconTrash size={16} />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                carpool.status === CarpoolStatusEnum.Open && availableSeats > 0 ? 'bg-green-500' : 
                carpool.status === CarpoolStatusEnum.RequestToJoin ? 'bg-blue-500' :
                carpool.status === CarpoolStatusEnum.Closed ? 'bg-red-500' :
                'bg-red-500'
              }`}></div>
              <span>{
                carpool.status === CarpoolStatusEnum.Open && availableSeats > 0 ? 'Open' :
                carpool.status === CarpoolStatusEnum.RequestToJoin ? 'Request to Join' :
                carpool.status === CarpoolStatusEnum.Closed ? 'Closed' :
                availableSeats === 0 ? 'Full' : carpool.status
              }</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Route Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <IconMapPin className="text-indigo-600 dark:text-indigo-400" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Route Information</h2>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl">
                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">From</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">{carpool.location}</p>
                </div>
                
                <div className="flex items-center gap-2 px-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-indigo-300"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">To</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">{carpool.destination}</p>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <IconCalendar className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Trip Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <IconCalendar className="text-slate-500 dark:text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {convertTimestampToDate(carpool.targetDate).date}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <IconClock className="text-slate-500 dark:text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Time</p>
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {convertTimestampToDate(carpool.targetDate).time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-teal-500/20">
                  <IconFileText className="text-teal-600 dark:text-teal-400" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Description</h2>
              </div>
              
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {carpool.description || "No additional details provided for this carpool."}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Action Cards */}
          <div className="space-y-6">
            
            {/* Driver Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <IconUser className="text-emerald-600 dark:text-emerald-400" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Driver</h2>
              </div>
              
              <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">
                    {user?.displayName?.[0]?.toUpperCase() || 
                     user?.email?.[0]?.toUpperCase() || 
                     carpool.userId[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{user?.displayName || user?.email || 'Unknown'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Driver</p>
              </div>
            </div>

            {/* Capacity Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <IconUsers className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Capacity</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Total Seats</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{carpool.maxPeople}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Occupied</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{carpool.people.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Available</span>
                  <span className={`font-semibold ${availableSeats > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {availableSeats}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(carpool.people.length / carpool.maxPeople) * 100}%` }}
                  ></div>
                </div>
                
                {/* Current User Status */}
                {currentUser && (
                  <div className={`text-center p-2 rounded-lg text-sm font-medium ${
                    carpool.userId === currentUser.uid
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : carpool.people.includes(currentUser.uid) 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400'
                  }`}>
                    {carpool.userId === currentUser.uid
                      ? '🚗 You are the driver of this carpool'
                      : carpool.people.includes(currentUser.uid) 
                        ? '✅ You are part of this carpool' 
                        : '👤 You are not part of this carpool'}
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/60">
              {carpool.status === CarpoolStatusEnum.Open && availableSeats > 0 ? (
                // User can join if they're not the creator and not already in the carpool
                !currentUser || carpool.userId === currentUser.uid || carpool.people.includes(currentUser.uid) ? (
                  // Show appropriate button for users who can't join
                  carpool.people.includes(currentUser?.uid || '') && carpool.userId !== currentUser?.uid ? (
                    // Leave button for users already in carpool
                    <button 
                      onClick={handleLeaveCarpool}
                      disabled={isLeaving || !currentUser}
                      className={`w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 transform ${
                        isLeaving || !currentUser
                          ? 'bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60' 
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl hover:from-red-600 hover:to-red-700 hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {isLeaving ? 'Leaving...' : 'Leave Carpool'}
                    </button>
                  ) : (
                    // Disabled button for creator or not logged in
                    <button 
                      disabled 
                      className="w-full rounded-xl bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60 px-6 py-4 text-lg font-semibold text-white shadow-lg"
                    >
                      {!currentUser ? 'Login Required' : 'Your Carpool'}
                    </button>
                  )
                ) : (
                  // Join button for users who can join
                  <button 
                    onClick={handleJoinCarpool}
                    disabled={isJoining || !currentUser}
                    className={`w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 transform ${
                      isJoining || !currentUser
                        ? 'bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isJoining ? 'Joining...' : 'Join Carpool'}
                  </button>
                )
              ) : carpool.status === CarpoolStatusEnum.RequestToJoin ? (
                <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                  Request to Join
                </button>
              ) : carpool.status === CarpoolStatusEnum.Closed ? (
                <button disabled className="w-full rounded-xl bg-gradient-to-r from-red-400 to-red-500 px-6 py-4 text-lg font-semibold text-white shadow-lg cursor-not-allowed opacity-60">
                  Carpool Closed
                </button>
              ) : (
                <button disabled className="w-full rounded-xl bg-gradient-to-r from-slate-400 to-slate-500 px-6 py-4 text-lg font-semibold text-white shadow-lg cursor-not-allowed opacity-60">
                  Carpool Full
                </button>
              )}
              
              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50'
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50'
                    : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span>
                      {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
                    </span>
                    <span>{message.text}</span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Link 
                  to="/dashboard/carpool"
                  className="block w-full text-center rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                >
                  Back to All Carpools
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Carpool Modal */}
      <CarpoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        carpool={carpool}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}