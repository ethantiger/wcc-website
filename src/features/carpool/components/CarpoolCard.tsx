import { Link } from "react-router-dom";
import CarpoolPost from "../interfaces/CarpoolPost";
import { convertTimestampToDate } from "@/utils/firebaseDateConvert";
import User from "../interfaces/User";
import collections from "@/firebase/collections";
import { useCachedDocument } from "@/hooks/useCachedDocument";
import { IconCrown, IconUser } from "@tabler/icons-react";
import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";

interface CarpoolCardProps {
  carpool: CarpoolPost;
  ownershipType?: 'owner' | 'member';
}

export default function CarpoolCard({ carpool, ownershipType }: CarpoolCardProps) {
  const { document: user } = useCachedDocument<User>(collections.usersCollection, carpool.userId);

  return (
    <div
      key={carpool.id}
      className="group relative flex w-full flex-col rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 dark:border-slate-700/60 dark:bg-slate-800/80 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {carpool.location}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>→</span>
              <span className="font-medium">{carpool.destination}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {/* Ownership Badge */}
            {ownershipType && (
              <div className="z-20">
                {ownershipType === 'owner' ? (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                    <IconCrown size={12} />
                    <span>Owner</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                    <IconUser size={12} />
                    <span>Member</span>
                  </div>
                )}
              </div>
            )}
            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${
              carpool.status === CarpoolStatusEnum.Closed
              ? 'bg-gradient-to-r from-red-500 to-red-600' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`}>
              {carpool.status === CarpoolStatusEnum.Closed ? 'Closed' : `${carpool.maxPeople - carpool.people.length} seats`}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Driver:</span> {user ? (user.displayName || user.email || 'Unknown') : carpool.userId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Date:</span> {convertTimestampToDate(carpool.targetDate).date}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <Link 
            to={`/dashboard/carpool/${carpool.id}`}
            className="block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}