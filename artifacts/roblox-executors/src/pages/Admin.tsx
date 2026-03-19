import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, LogOut, Plus, Trash2, Pencil, Save, RotateCcw,
  ChevronDown, ChevronUp, X, Check, Lock, Eye, EyeOff, Clock
} from "lucide-react";
import {
  ADMIN_PASSWORD,
  fetchExecutorData,
  persistExecutorData,
  fetchLastChecked,
  persistLastChecked,
  formatLastChecked,
  EXECUTOR_DATA,
  type ExecutorCategory,
  type Executor,
  type StatusType,
  type SectionType,
} from "@/data/executors";
import { cn } from "@/lib/utils";

const SESSION_KEY = "admin-auth";

const EMPTY_EXECUTOR: Executor = {
  name: "",
  platform: "PC",
  unc: "",
  sunc: "",
  detection: "Undetected",
  status: "",
  statusType: "updated",
  downloadUrl: "",
  discordUrl: "",
};

const EMPTY_CATEGORY: ExecutorCategory = {
  title: "",
  sectionType: "trusted",
  items: [],
};

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val));
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onLogin();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 border border-primary/30 rounded-full p-4 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-wider">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={cn(
                "w-full bg-background border rounded-xl px-4 py-3 text-foreground pr-12 outline-none transition-colors",
                error ? "border-destructive" : "border-border focus:border-primary"
              )}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && (
            <p className="text-destructive text-sm flex items-center gap-1">
              <X className="w-4 h-4" /> Incorrect password
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl py-3 font-bold transition-colors"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Executor Form Modal ──────────────────────────────────────────────────────
interface ExecModalProps {
  executor: Executor;
  onSave: (e: Executor) => void;
  onClose: () => void;
}

function ExecutorModal({ executor, onSave, onClose }: ExecModalProps) {
  const [form, setForm] = useState<Executor>(deepClone(executor));

  const set = <K extends keyof Executor>(k: K, v: Executor[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1";
  const inputCls = "w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground text-sm outline-none focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground font-display tracking-wider">
            {executor.name ? `Edit: ${executor.name}` : "Add Executor"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Name</label>
            <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Executor name" />
          </div>

          <div>
            <label className={labelCls}>Platform</label>
            <select className={inputCls} value={form.platform} onChange={e => set("platform", e.target.value)}>
              {["PC", "Mac", "Android", "iOS"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Status Type</label>
            <select className={inputCls} value={form.statusType} onChange={e => set("statusType", e.target.value as StatusType)}>
              <option value="updated">Updated</option>
              <option value="outdated">Outdated</option>
              <option value="partial">Partial</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>UNC %</label>
            <input className={inputCls} value={form.unc} onChange={e => set("unc", e.target.value)} placeholder="e.g. 99% or Down" />
          </div>

          <div>
            <label className={labelCls}>sUNC %</label>
            <input className={inputCls} value={form.sunc} onChange={e => set("sunc", e.target.value)} placeholder="e.g. 94% or N/A" />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>Detection</label>
            <input className={inputCls} value={form.detection} onChange={e => set("detection", e.target.value)} placeholder="e.g. Undetected" />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>Status Label</label>
            <input className={inputCls} value={form.status} onChange={e => set("status", e.target.value)} placeholder="e.g. Updated / Not Updated / Working" />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>Download URL</label>
            <input className={inputCls} value={form.downloadUrl ?? ""} onChange={e => set("downloadUrl", e.target.value)} placeholder="https://..." />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>Discord URL</label>
            <input className={inputCls} value={form.discordUrl ?? ""} onChange={e => set("discordUrl", e.target.value)} placeholder="https://discord.gg/..." />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-border rounded-xl py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const cleaned = { ...form };
              if (!cleaned.downloadUrl) delete cleaned.downloadUrl;
              if (!cleaned.discordUrl) delete cleaned.discordUrl;
              onSave(cleaned);
            }}
            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl py-2.5 font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Category Form Modal ──────────────────────────────────────────────────────
interface CatModalProps {
  category: ExecutorCategory;
  onSave: (c: ExecutorCategory) => void;
  onClose: () => void;
}

function CategoryModal({ category, onSave, onClose }: CatModalProps) {
  const [form, setForm] = useState<ExecutorCategory>(deepClone(category));

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1";
  const inputCls = "w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground text-sm outline-none focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground font-display tracking-wider">
            {category.title ? `Edit Category` : "Add Category"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Category Title</label>
            <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Trusted PC Free Executors (Keyless)" />
          </div>

          <div>
            <label className={labelCls}>Section Type</label>
            <select className={inputCls} value={form.sectionType} onChange={e => setForm(f => ({ ...f, sectionType: e.target.value as SectionType }))}>
              <option value="trusted">Trusted</option>
              <option value="untrusted">Untrusted</option>
              <option value="external">External</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-border rounded-xl py-2.5 text-muted-foreground hover:text-foreground transition-colors font-semibold">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl py-2.5 font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────
const sectionBadgeColors: Record<SectionType, string> = {
  trusted: "bg-primary/10 text-primary border-primary/30",
  untrusted: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  external: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

interface CategoryRowProps {
  category: ExecutorCategory;
  catIndex: number;
  onEditCategory: () => void;
  onDeleteCategory: () => void;
  onAddExecutor: () => void;
  onEditExecutor: (i: number) => void;
  onDeleteExecutor: (i: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function CategoryRow({
  category, catIndex, onEditCategory, onDeleteCategory,
  onAddExecutor, onEditExecutor, onDeleteExecutor,
  onMoveUp, onMoveDown, isFirst, isLast
}: CategoryRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl bg-card/30 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-muted/20">
        <button onClick={() => setOpen(o => !o)} className="text-muted-foreground hover:text-foreground transition-colors">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider", sectionBadgeColors[category.sectionType])}>
          {category.sectionType}
        </span>
        <span className="font-bold text-foreground font-display flex-1 truncate">{category.title || <em className="text-muted-foreground">Untitled</em>}</span>
        <span className="text-xs font-mono text-muted-foreground">{category.items.length} items</span>

        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30" title="Move Up">
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button onClick={onMoveDown} disabled={isLast} className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30" title="Move Down">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button onClick={onEditCategory} className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors" title="Edit Category">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDeleteCategory} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors" title="Delete Category">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-border/30">
              {category.items.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">No executors yet.</p>
              ) : (
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b border-border/30 text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="text-left pb-2 pr-4">Name</th>
                      <th className="text-center pb-2 pr-4">Platform</th>
                      <th className="text-center pb-2 pr-4">UNC</th>
                      <th className="text-center pb-2 pr-4">sUNC</th>
                      <th className="text-center pb-2 pr-4">Status</th>
                      <th className="text-center pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((exec, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors">
                        <td className="py-2 pr-4 font-semibold text-foreground">{exec.name}</td>
                        <td className="py-2 pr-4 text-center">
                          <span className="text-xs bg-muted/50 border border-border/50 px-2 py-0.5 rounded font-mono text-muted-foreground">{exec.platform}</span>
                        </td>
                        <td className="py-2 pr-4 text-center font-mono text-xs">{exec.unc}</td>
                        <td className="py-2 pr-4 text-center font-mono text-xs">{exec.sunc}</td>
                        <td className="py-2 pr-4 text-center">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold",
                            exec.statusType === "updated" ? "bg-success/10 text-success" :
                            exec.statusType === "partial" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-destructive/10 text-destructive"
                          )}>{exec.statusType}</span>
                        </td>
                        <td className="py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => onEditExecutor(i)} className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors" title="Edit">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => onDeleteExecutor(i)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors" title="Delete">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <button
                onClick={onAddExecutor}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Executor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
function AdminPanel() {
  const [data, setData] = useState<ExecutorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);

  const [lastChecked, setLastChecked] = useState("");
  const [lastCheckedInput, setLastCheckedInput] = useState("");
  const [savingMeta, setSavingMeta] = useState(false);
  const [savedMeta, setSavedMeta] = useState(false);
  const [metaError, setMetaError] = useState<string | null>(null);

  const [execModal, setExecModal] = useState<{ catIndex: number; execIndex: number | null } | null>(null);
  const [catModal, setCatModal] = useState<{ catIndex: number | null } | null>(null);

  useEffect(() => {
    Promise.all([fetchExecutorData(), fetchLastChecked()]).then(([d, lc]) => {
      setData(d);
      setLastChecked(lc);
      setLastCheckedInput(lc);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  const save = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await persistExecutorData(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [data]);

  const handleReset = async () => {
    try {
      await persistExecutorData(deepClone(EXECUTOR_DATA));
      setData(deepClone(EXECUTOR_DATA));
      setShowReset(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Reset failed");
      setShowReset(false);
    }
  };

  const saveLastChecked = useCallback(async () => {
    setSavingMeta(true);
    setMetaError(null);
    try {
      await persistLastChecked(lastCheckedInput);
      setLastChecked(lastCheckedInput);
      setSavedMeta(true);
      setTimeout(() => setSavedMeta(false), 2500);
    } catch (err: unknown) {
      setMetaError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingMeta(false);
    }
  }, [lastCheckedInput]);

  const updateData = (newData: ExecutorCategory[]) => setData(newData);

  const moveCat = (i: number, dir: -1 | 1) => {
    const d = deepClone(data);
    const j = i + dir;
    if (j < 0 || j >= d.length) return;
    [d[i], d[j]] = [d[j], d[i]];
    updateData(d);
  };

  const deleteCategory = (i: number) => {
    if (!confirm(`Delete category "${data[i].title}"?`)) return;
    const d = deepClone(data);
    d.splice(i, 1);
    updateData(d);
  };

  const saveCategory = (i: number | null, cat: ExecutorCategory) => {
    const d = deepClone(data);
    if (i === null) {
      d.push({ ...cat, items: [] });
    } else {
      d[i] = { ...d[i], title: cat.title, sectionType: cat.sectionType };
    }
    updateData(d);
    setCatModal(null);
  };

  const deleteExecutor = (catI: number, execI: number) => {
    const d = deepClone(data);
    d[catI].items.splice(execI, 1);
    updateData(d);
  };

  const saveExecutor = (catI: number, execI: number | null, exec: Executor) => {
    const d = deepClone(data);
    if (execI === null) {
      d[catI].items.push(exec);
    } else {
      d[catI].items[execI] = exec;
    }
    updateData(d);
    setExecModal(null);
  };

  const currentExec = execModal
    ? (execModal.execIndex !== null
      ? data[execModal.catIndex].items[execModal.execIndex]
      : EMPTY_EXECUTOR)
    : null;

  const currentCat = catModal
    ? (catModal.catIndex !== null ? data[catModal.catIndex] : EMPTY_CATEGORY)
    : null;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Top bar */}
      <div className="sticky top-14 z-40 bg-background/90 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground tracking-wider text-lg">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage executor data</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a href="/" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-xl transition-colors font-semibold">
            ← View Site
          </a>
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 rounded-xl transition-colors font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={save}
            className={cn(
              "flex items-center gap-1.5 px-5 py-2 text-sm font-bold rounded-xl transition-all duration-300",
              saved
                ? "bg-success/20 text-success border border-success/40"
                : "bg-primary hover:bg-primary/80 text-primary-foreground"
            )}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save All</>}
          </button>
          <button onClick={logout} className="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">

        {/* Last Checked Editor */}
        <div className="mb-8 bg-card/40 border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Last Checked Date</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            This text appears on the home page as "Last checked: <strong>{formatLastChecked(lastChecked) || "Not set"}</strong>"
          </p>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={lastCheckedInput}
              onChange={e => setLastCheckedInput(e.target.value)}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm outline-none focus:border-primary transition-colors [color-scheme:dark]"
            />
            <button
              onClick={saveLastChecked}
              disabled={savingMeta}
              className={cn(
                "flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 whitespace-nowrap",
                savedMeta
                  ? "bg-success/20 text-success border border-success/40"
                  : "bg-primary hover:bg-primary/80 text-primary-foreground"
              )}
            >
              {savedMeta ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Date</>}
            </button>
          </div>
          {metaError && (
            <p className="text-destructive text-xs mt-2 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> {metaError}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">{data.length}</span> categories &middot; <span className="font-semibold text-foreground">{data.reduce((a, c) => a + c.items.length, 0)}</span> executors total
          </p>
          <button
            onClick={() => setCatModal({ catIndex: null })}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <div className="space-y-3">
          {data.map((cat, ci) => (
            <CategoryRow
              key={`${cat.title}-${ci}`}
              category={cat}
              catIndex={ci}
              isFirst={ci === 0}
              isLast={ci === data.length - 1}
              onEditCategory={() => setCatModal({ catIndex: ci })}
              onDeleteCategory={() => deleteCategory(ci)}
              onAddExecutor={() => setExecModal({ catIndex: ci, execIndex: null })}
              onEditExecutor={(ei) => setExecModal({ catIndex: ci, execIndex: ei })}
              onDeleteExecutor={(ei) => deleteExecutor(ci, ei)}
              onMoveUp={() => moveCat(ci, -1)}
              onMoveDown={() => moveCat(ci, 1)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {execModal && currentExec && (
          <ExecutorModal
            executor={currentExec}
            onSave={(e) => saveExecutor(execModal.catIndex, execModal.execIndex, e)}
            onClose={() => setExecModal(null)}
          />
        )}
        {catModal && currentCat && (
          <CategoryModal
            category={currentCat}
            onSave={(c) => saveCategory(catModal.catIndex, c)}
            onClose={() => setCatModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Reset confirm */}
      <AnimatePresence>
        {showReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Reset to Defaults?</h3>
              <p className="text-muted-foreground text-sm mb-6">This will erase all your changes and restore the original data. This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="flex-1 border border-border rounded-xl py-2.5 text-muted-foreground hover:text-foreground transition-colors font-semibold">
                  Cancel
                </button>
                <button onClick={handleReset} className="flex-1 bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-xl py-2.5 font-bold transition-colors">
                  Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminPanel />;
}
