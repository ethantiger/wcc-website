export default function CarpoolLoadingPlaceholder() {
  return (
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
  )
}