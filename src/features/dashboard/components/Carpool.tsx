import { Link } from "react-router-dom";
import CarpoolPost from "../interfaces/CarpoolPost";
import { convertTimestampToDate } from "@/utils/firebaseDateConvert";
import { useDocument } from "@/hooks/useDocument";
import User from "../interfaces/User";
import collections from "@/firebase/collections";

export default function Carpool({ carpools }: { carpools: CarpoolPost[] | null }) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-4 rounded-tl-3xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 sm:p-6 md:p-8 lg:p-10 dark:border-slate-700/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/30 shadow-xl min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-0">
            Available Carpools
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {carpools ? (
              carpools.length > 0 ? (
                carpools.map((doc) => {
                  const { document: user } = useDocument<User>(collections.usersCollection, doc.userId);
                  return (
                  <div
                    key={doc.id}
                    className="group relative flex w-full flex-col rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 dark:border-slate-700/60 dark:bg-slate-800/80 overflow-hidden"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            {doc.location}
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span>→</span>
                            <span className="font-medium">{doc.destination}</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                            {doc.maxPeople - doc.people.length} seats
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Driver:</span> {user ? (user.displayName || user.email || 'Unknown') : doc.userId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Date:</span> {convertTimestampToDate(doc.targetDate).date}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Link 
                          to={`/dashboard/carpool/${doc.id}`}
                          className="block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )})
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Carpools Available</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
                    There are currently no carpools scheduled. Check back later or create your own!
                  </p>
                </div>
              )
            ) : (
              <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
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
      </div>
    </div>
  );
}
