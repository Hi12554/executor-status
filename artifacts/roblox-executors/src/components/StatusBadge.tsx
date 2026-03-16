import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatusType } from "@/data/executors";

interface StatusBadgeProps {
  status: string;
  statusType: StatusType;
  className?: string;
}

export function StatusBadge({ status, statusType, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap",
        statusType === "updated"
          ? "bg-success/10 text-success border border-success/30 glow-success"
          : statusType === "partial"
          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
          : "bg-destructive/10 text-destructive border border-destructive/30 glow-destructive",
        className
      )}
    >
      {statusType === "updated" ? (
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
      ) : statusType === "partial" ? (
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <XCircle className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{status}</span>
    </div>
  );
}
