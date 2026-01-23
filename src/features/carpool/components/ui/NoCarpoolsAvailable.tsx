export default function NoCarpoolsAvailable() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
      </div>
      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Carpools Available</h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        There are currently no carpools scheduled. Check back later or create your own!
      </p>
    </div>
  )
}