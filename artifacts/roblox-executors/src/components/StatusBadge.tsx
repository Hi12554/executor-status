import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExecutorStatus } from "@/data/executors";

interface StatusBadgeProps {
  status: ExecutorStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isUpdated = status === "updated";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300",
        isUpdated
          ? "bg-success/10 text-success border border-success/30 glow-success"
          : "bg-destructive/10 text-destructive border border-destructive/30 glow-destructive",
        className
      )}
    >
      {isUpdated ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Updated</span>
        </>
      ) : (
        <>
          <XCircle className="w-3.5 h-3.5" />
          <span>Outdated</span>
        </>
      )}
    </div>
  );
}
