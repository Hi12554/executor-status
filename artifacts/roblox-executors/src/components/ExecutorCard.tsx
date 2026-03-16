import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Executor } from "@/data/executors";
import { cn } from "@/lib/utils";

interface ExecutorCardProps {
  executor: Executor;
  index: number;
}

export function ExecutorCard({ executor, index }: ExecutorCardProps) {
  const isUpdated = executor.status === "updated";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "group relative flex items-center justify-between p-4 rounded-xl bg-card/40 backdrop-blur-sm border transition-all duration-300",
        isUpdated 
          ? "border-success/20 hover:border-success/50 hover:bg-success/5" 
          : "border-destructive/20 hover:border-destructive/50 hover:bg-destructive/5"
      )}
    >
      {/* Subtle background glow effect on hover based on status */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl -z-10",
        isUpdated ? "bg-success/10" : "bg-destructive/10"
      )} />

      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg transition-colors duration-300",
          isUpdated ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          <Terminal className="w-5 h-5" />
        </div>
        <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-white transition-colors">
          {executor.name}
        </h3>
      </div>
      
      <StatusBadge status={executor.status} statusType={executor.statusType} />
    </motion.div>
  );
}
