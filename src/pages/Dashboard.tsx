import Sidebar from "@/features/dashboard/components/Sidebar"
import DashboardContent from "@/features/dashboard/components/DashboardContent";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar />
      <DashboardContent />
    </div>
  )
}