import { useState, useEffect } from "react";
import { IconX, IconCalendar, IconMapPin, IconUsers, IconFileText, IconClock } from "@tabler/icons-react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { doc, addDoc, updateDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import collections from "@/firebase/collections";
import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";
import CarpoolPost from "../interfaces/CarpoolPost";

interface CarpoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  carpool?: CarpoolPost | null; // If provided, it's edit mode
  onSuccess?: () => void;
}

export default function CarpoolModal({ isOpen, onClose, carpool, onSuccess }: CarpoolModalProps) {
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    location: "",
    destination: "",
    targetDate: "",
    targetTime: "",
    maxPeople: 4,
    description: "",
    status: CarpoolStatusEnum.Open
  });

  const isEditMode = !!carpool;

  // Load carpool data when in edit mode
  useEffect(() => {
    if (isEditMode && carpool) {
      const date = carpool.targetDate.toDate();
      const dateString = date.toISOString().split('T')[0];
      const timeString = date.toTimeString().split(' ')[0].substring(0, 5);

      setFormData({
        location: carpool.location || "",
        destination: carpool.destination || "",
        targetDate: dateString,
        targetTime: timeString,
        maxPeople: carpool.maxPeople || 4,
        description: carpool.description || "",
        status: carpool.status || CarpoolStatusEnum.Open
      });
    } else {
      // Reset form for create mode
      setFormData({
        location: "",
        destination: "",
        targetDate: "",
        targetTime: "",
        maxPeople: 4,
        description: "",
        status: CarpoolStatusEnum.Open
      });
    }
    setMessage(null);
  }, [isEditMode, carpool, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxPeople' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({ text: "You must be logged in to create a carpool.", type: 'error' });
      return;
    }

    // Validate required fields
    if (!formData.location || !formData.destination || !formData.targetDate || !formData.targetTime) {
      setMessage({ text: "Please fill in all required fields.", type: 'error' });
      return;
    }

    // Create timestamp from date and time
    const datetime = new Date(`${formData.targetDate}T${formData.targetTime}`);
    const timestamp = Timestamp.fromDate(datetime);

    try {
      setIsSubmitting(true);
      setMessage(null);

      const carpoolData = {
        location: formData.location,
        destination: formData.destination,
        targetDate: timestamp,
        maxPeople: formData.maxPeople,
        description: formData.description,
        status: formData.status,
        ...(isEditMode ? {} : {
          userId: user.uid,
          people: [],
          createdAt: Timestamp.now()
        })
      };

      if (isEditMode && carpool) {
        // Update existing carpool
        const carpoolRef = doc(db, collections.carpoolCollection, carpool.id);
        await updateDoc(carpoolRef, carpoolData);
        setMessage({ text: "Carpool updated successfully!", type: 'success' });
      } else {
        // Create new carpool
        await addDoc(collection(db, collections.carpoolCollection), carpoolData);
        setMessage({ text: "Carpool created successfully!", type: 'success' });
      }

      onClose();

    } catch (error) {
      console.error("Error saving carpool:", error);
      setMessage({ text: `Failed to ${isEditMode ? 'update' : 'create'} carpool. Please try again.`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {isEditMode ? 'Edit Carpool' : 'Create New Carpool'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconX size={20} className="text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <IconMapPin size={16} />
                From Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Starting location"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <IconMapPin size={16} />
                To Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Destination"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <IconCalendar size={16} />
                Date *
              </label>
              <input
                type="date"
                name="targetDate"
                value={formData.targetDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <IconClock size={16} />
                Time *
              </label>
              <input
                type="time"
                name="targetTime"
                value={formData.targetTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Max People and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <IconUsers size={16} />
                Max People (including you)
              </label>
              <select
                name="maxPeople"
                value={formData.maxPeople}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {[2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} people</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={CarpoolStatusEnum.Open}>Open</option>
                <option value={CarpoolStatusEnum.RequestToJoin}>Request to Join</option>
                <option value={CarpoolStatusEnum.Closed}>Closed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <IconFileText size={16} />
              Description (optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add any additional details about your carpool..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50'
                : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50'
            }`}>
              <div className="flex items-center gap-2">
                <span>{message.type === 'success' ? '✅' : '❌'}</span>
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-all ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.02]'
              }`}
            >
              {isSubmitting 
                ? (isEditMode ? 'Updating...' : 'Creating...') 
                : (isEditMode ? 'Update Carpool' : 'Create Carpool')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}