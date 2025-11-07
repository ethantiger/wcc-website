import Sidebar from "@/components/Sidebar"
import DashboardContent from "@/components/DashboardContent";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col md:flex-row rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <DashboardContent />
      </div>
    </div>
  )
}