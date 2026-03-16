import { motion } from "framer-motion";
import { ShieldCheck, Activity, Clock, ServerCrash } from "lucide-react";
import { EXECUTOR_DATA, getStats } from "@/data/executors";
import { CategorySection } from "@/components/CategorySection";

export default function Home() {
  const stats = getStats();
  const lastChecked = "March 16, 2026";

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background z-10" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract Gaming Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          {/* Decorative glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/50 border border-primary/30 text-primary mb-6 backdrop-blur-md glow-primary">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-widest uppercase">Live Status Dashboard</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gradient drop-shadow-lg">
            Roblox Executor Status
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Real-time monitoring of trusted PC, Mac, and Mobile executors. Stay informed on which tools are currently safe and functional to use.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-success/20 px-6 py-3 rounded-2xl shadow-lg shadow-success/5">
              <div className="bg-success/20 p-2 rounded-lg text-success">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stats.updated}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Updated</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-destructive/20 px-6 py-3 rounded-2xl shadow-lg shadow-destructive/5">
              <div className="bg-destructive/20 p-2 rounded-lg text-destructive">
                <ServerCrash className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stats.outdated}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Outdated</div>
              </div>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
            <Clock className="w-4 h-4" />
            <span>Last checked: <strong className="text-foreground">{lastChecked}</strong></span>
          </div>
        </motion.header>

        {/* Categories / Main Content */}
        <main className="space-y-4 relative z-10">
          {EXECUTOR_DATA.map((category, index) => (
            <CategorySection 
              key={category.title} 
              category={category} 
              index={index} 
            />
          ))}
        </main>

        <footer className="mt-20 text-center text-muted-foreground border-t border-border/50 pt-8 pb-4">
          <p className="font-mono text-sm">
            Status information is provided for educational purposes.
          </p>
        </footer>
      </div>
    </div>
  );
}
