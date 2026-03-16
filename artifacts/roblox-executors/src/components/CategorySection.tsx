import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { ExecutorCategory } from "@/data/executors";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  category: ExecutorCategory;
  index: number;
}

function UncCell({ value }: { value: string }) {
  const isDown = value === "Down" || value === "Not Updated";
  const isFailed = value === "Failed Test";
  const isNA = value === "N/A";
  const isPercent = value.includes("%");

  return (
    <span
      className={cn(
        "font-mono text-sm font-semibold",
        isDown ? "text-destructive" :
        isFailed ? "text-yellow-400" :
        isNA ? "text-muted-foreground" :
        isPercent ? "text-success" :
        "text-foreground"
      )}
    >
      {value}
    </span>
  );
}

export function CategorySection({ category, index }: CategorySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-4 border-b border-border/50 pb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary glow-primary">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl text-foreground font-bold tracking-wider">
          {category.title}
        </h2>
        <div className="ml-auto bg-muted/50 px-3 py-1 rounded-full text-xs font-mono text-muted-foreground border border-border/50">
          {category.items.length} ITEMS
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest">Executor</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest hidden sm:table-cell">Platform</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest">UNC</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest">sUNC</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest hidden lg:table-cell">Detection</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((executor, i) => (
              <motion.tr
                key={`${executor.name}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 + i * 0.03 }}
                className={cn(
                  "border-b border-border/30 last:border-0 transition-colors duration-200",
                  executor.statusType === "updated"
                    ? "hover:bg-success/5"
                    : executor.statusType === "partial"
                    ? "hover:bg-yellow-500/5"
                    : "hover:bg-destructive/5"
                )}
              >
                <td className="px-4 py-3">
                  <span className="font-display font-bold text-foreground tracking-wide text-base">
                    {executor.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span className="text-xs bg-muted/60 border border-border/50 px-2 py-0.5 rounded font-mono text-muted-foreground">
                    {executor.platform}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <UncCell value={executor.unc} />
                </td>
                <td className="px-4 py-3 text-center">
                  <UncCell value={executor.sunc} />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {executor.detection}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={executor.status} statusType={executor.statusType} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
