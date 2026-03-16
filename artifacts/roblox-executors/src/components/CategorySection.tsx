import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { ExecutorCard } from "./ExecutorCard";
import type { ExecutorCategory } from "@/data/executors";

interface CategorySectionProps {
  category: ExecutorCategory;
  index: number;
}

export function CategorySection({ category, index }: CategorySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary glow-primary">
          <FolderGit2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl text-foreground font-bold tracking-wider">
          {category.title}
        </h2>
        <div className="ml-auto bg-muted/50 px-3 py-1 rounded-full text-xs font-mono text-muted-foreground border border-border/50">
          {category.items.length} ITEMS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.items.map((executor, i) => (
          <ExecutorCard 
            key={`${category.title}-${executor.name}`} 
            executor={executor} 
            index={i} 
          />
        ))}
      </div>
    </motion.section>
  );
}
