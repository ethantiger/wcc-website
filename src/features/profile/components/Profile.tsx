import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import collections from "@/firebase/collections";
import { IconUser, IconMail, IconPhone, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import User from "@/features/carpool/interfaces/User";
import { useDocument } from "@/hooks/useDocument";
import { useFirestore } from "@/hooks/useFirestore";

export default function Profile() {
  const { user: currentUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const { document: userProfile }  = useDocument<User>(collections.usersCollection, currentUser ? currentUser.uid : null);
  const { updateDocument } = useFirestore(collections.usersCollection);
  // Form state
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: '',
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!currentUser || !userProfile) return;

    try {
      await updateDocument(currentUser.uid, {
        displayName: formData.displayName.trim(),
        phoneNumber: formData.phoneNumber.trim() || null,
      });

      setIsEditing(false);
      setMessage({ text: "Profile updated successfully!", type: 'success' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ text: "Failed to update profile. Please try again.", type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = () => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    }
    setIsEditing(true);
    setMessage(null);
  }

  // Cancel editing
  const handleCancelEdit = () => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    }
    setIsEditing(false);
    setMessage(null);
  };

  if (!currentUser) {
    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-slate-700/50 dark:bg-gray-900 min-h-screen">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600 rounded-full flex items-center justify-center mb-6">
              <IconUser className="w-12 h-12 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Not Logged In</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Please log in to view and edit your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-6 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-slate-700/50 dark:bg-gray-900 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {userProfile?.displayName?.[0]?.toUpperCase() || 
                 userProfile?.email?.[0]?.toUpperCase() || 
                 currentUser.uid[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                My Profile
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your account information
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => handleStartEdit()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                <IconEdit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isSaving
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <IconCheck size={16} />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                >
                  <IconX size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
              : message.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
              : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300'
          }`}>
            <div className="flex items-center gap-2">
              <span>
                {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
              </span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Basic Information
            </h2>
            
            <div className="space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <IconUser className="inline w-4 h-4 mr-1" />
                  Display Name
                </label>
                <p className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400">
                  {userProfile?.displayName || 'Not set'}
                  <span className="ml-2 text-xs text-gray-500">(Read-only)</span>
                </p>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <IconMail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <p className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400">
                  {userProfile?.email || currentUser.email || 'Not available'}
                  <span className="ml-2 text-xs text-gray-500">(Read-only)</span>
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <IconPhone className="inline w-4 h-4 mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                    {userProfile?.phoneNumber || 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}