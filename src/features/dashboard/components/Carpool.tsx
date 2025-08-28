import CarpoolPost from "../interfaces/CarpoolPost";

export default function Carpool({ carpools }: { carpools: CarpoolPost[] | null }) {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex">
          <h1 className="font-bold text-neutral-400 text-4xl mb-12">View Carpools</h1>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {carpools ? (
              carpools.length > 0 ? (
          carpools.map((doc) => (
            <div
              key={doc.id}
              className={`flex w-full flex-1 flex-col rounded-xl border border-neutral-200 p-6 shadow-md transition hover:scale-[1.02] hover:shadow-lg
                ${window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'bg-neutral-900 dark:border-neutral-700'
            : 'bg-gradient-to-br from-white via-gray-50 to-blue-100'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {doc.location} → Junction
                </h2>
                <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {doc.maxPeople - doc.people.length} Seats Left
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-medium">Driver:</span> {doc.userId}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-medium">Date:</span> {new Date(doc.targetDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-auto flex justify-end">
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition">
            View Details
                </button>
              </div>
            </div>
          ))
              ) : (
          <p className="text-neutral-500 text-lg font-medium">No carpools available.</p>
              )
            ) : (
              <div className="flex flex-col gap-2">
          <div className="h-32 animate-pulse rounded-xl bg-gray-100 dark:bg-neutral-800"></div>
          <div className="h-32 animate-pulse rounded-xl bg-gray-100 dark:bg-neutral-800"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
