import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Activity, Clock, ServerCrash, AlertCircle,
  ShieldAlert, Zap, Loader2, Search, Filter, Wrench, ExternalLink
} from "lucide-react";
import {
  fetchExecutorData, fetchLastChecked, formatLastChecked, getStats,
  fetchIsUpdating, DISCORD_URL,
  type ExecutorCategory, type SectionType
} from "@/data/executors";
import { CategorySection } from "@/components/CategorySection";
import { cn } from "@/lib/utils";

function SectionDivider({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className={`flex items-center gap-3 my-10 py-3 px-5 rounded-xl border ${color}`}>
      {icon}
      <span className="font-display text-xl font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}

type SectionFilter = "all" | SectionType;

const SECTION_FILTERS: { value: SectionFilter; label: string; color: string; activeColor: string }[] = [
  { value: "all",       label: "All",       color: "border-border/50 text-muted-foreground", activeColor: "bg-muted/60 border-border text-foreground" },
  { value: "trusted",   label: "Trusted",   color: "border-primary/30 text-primary/70",      activeColor: "bg-primary/10 border-primary/50 text-primary" },
  { value: "untrusted", label: "Untrusted", color: "border-orange-500/30 text-orange-400/70",activeColor: "bg-orange-500/10 border-orange-500/50 text-orange-400" },
  { value: "external",  label: "External",  color: "border-cyan-500/30 text-cyan-400/70",    activeColor: "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" },
];

export default function Home() {
  const [data, setData] = useState<ExecutorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");

  useEffect(() => {
    Promise.all([fetchExecutorData(), fetchLastChecked(), fetchIsUpdating()]).then(([d, lc, upd]) => {
      setData(d);
      setLastChecked(lc);
      setIsUpdating(upd);
      setLoading(false);
    });
  }, []);

  const stats = getStats(data);

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return data
      .filter(c => sectionFilter === "all" || c.sectionType === sectionFilter)
      .map(c => ({
        ...c,
        items: q ? c.items.filter(e => e.name.toLowerCase().includes(q)) : c.items,
      }))
      .filter(c => c.items.length > 0);
  }, [data, searchQuery, sectionFilter]);

  const trustedCategories = filteredData.filter(c => c.sectionType === "trusted");
  const untrustedCategories = filteredData.filter(c => c.sectionType === "untrusted");
  const externalCategories = filteredData.filter(c => c.sectionType === "external");

  const totalFiltered = filteredData.reduce((a, c) => a + c.items.length, 0);
  const isFiltering = searchQuery.trim() !== "" || sectionFilter !== "all";

  if (!loading && isUpdating) {
    return (
      <div className="min-h-screen pb-20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full -z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background z-10" />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Abstract Gaming Background"
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl w-full mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-8 mx-auto">
            <Wrench className="w-9 h-9 text-primary animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/50 border border-primary/30 text-primary mb-6 backdrop-blur-md">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-widest uppercase">Status Update In Progress</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient drop-shadow-lg">
            Updating Executor Statuses
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            We're currently reviewing and updating the latest executor statuses to make sure everything is accurate.
            Check back soon — this won't take long.
          </p>

          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 mb-8">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Want to be the first to know when the statuses are updated?{" "}
              <strong className="text-foreground">Join the Discord</strong> and you'll get notified as soon as everything's live.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-xl font-bold transition-colors duration-200 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Join the Discord
            </a>
          </div>

          <p className="text-muted-foreground/60 text-xs">
            Not interested? No worries — just check back later and we'll have everything ready for you.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background z-10" />
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract Gaming Background"
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/50 border border-primary/30 text-primary mb-6 backdrop-blur-md">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-widest uppercase">Live Status Dashboard</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gradient drop-shadow-lg">
            Roblox Executor Status
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Real-time monitoring of trusted, untrusted, and external executors. Stay informed on which tools are currently safe and functional.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-success/20 px-6 py-3 rounded-2xl">
              <div className="bg-success/20 p-2 rounded-lg text-success">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stats.updated}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Updated</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-yellow-500/20 px-6 py-3 rounded-2xl">
              <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stats.partial}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Partial</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-destructive/20 px-6 py-3 rounded-2xl">
              <div className="bg-destructive/20 p-2 rounded-lg text-destructive">
                <ServerCrash className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stats.outdated}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Outdated</div>
              </div>
            </div>
          </div>

          {lastChecked && (
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
              <Clock className="w-4 h-4" />
              <span>Last checked: <strong className="text-foreground">{formatLastChecked(lastChecked)}</strong></span>
            </div>
          )}
        </motion.header>

        {/* Search & Filter Bar */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 space-y-3"
          >
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search executors by name..."
                className="w-full bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-card/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Section filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-1">
                <Filter className="w-3.5 h-3.5" />
                Filter:
              </div>
              {SECTION_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setSectionFilter(f.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                    sectionFilter === f.value ? f.activeColor : f.color + " hover:opacity-90"
                  )}
                >
                  {f.label}
                </button>
              ))}
              {isFiltering && (
                <span className="ml-auto text-xs text-muted-foreground font-mono">
                  {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <main className="relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <span className="text-sm tracking-widest uppercase font-semibold">Loading executor data...</span>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 text-muted-foreground">
              <Search className="w-10 h-10 opacity-30" />
              <p className="font-semibold">No executors found</p>
              <p className="text-sm">Try a different search term or filter</p>
            </div>
          ) : (
            <>
              {trustedCategories.length > 0 && (
                <>
                  <SectionDivider
                    icon={<ShieldCheck className="w-6 h-6 text-primary" />}
                    label="Trusted Executors"
                    color="border-primary/30 bg-primary/5 text-primary"
                  />
                  {trustedCategories.map((category, index) => (
                    <CategorySection key={category.title} category={category} index={index} />
                  ))}
                </>
              )}

              {untrustedCategories.length > 0 && (
                <>
                  <SectionDivider
                    icon={<ShieldAlert className="w-6 h-6 text-orange-400" />}
                    label="Untrusted Executors"
                    color="border-orange-500/30 bg-orange-500/5 text-orange-400"
                  />
                  {untrustedCategories.map((category, index) => (
                    <CategorySection key={category.title} category={category} index={index} />
                  ))}
                </>
              )}

              {externalCategories.length > 0 && (
                <>
                  <SectionDivider
                    icon={<Zap className="w-6 h-6 text-cyan-400" />}
                    label="External Ratings"
                    color="border-cyan-500/30 bg-cyan-500/5 text-cyan-400"
                  />
                  {externalCategories.map((category, index) => (
                    <CategorySection key={category.title} category={category} index={index} />
                  ))}
                </>
              )}
            </>
          )}
        </main>

        <footer className="mt-20 text-center text-muted-foreground border-t border-border/50 pt-8 pb-4">
          <p className="font-mono text-sm">
            Status information is provided for educational purposes only.
          </p>
        </footer>
      </div>
    </div>
  );
}
