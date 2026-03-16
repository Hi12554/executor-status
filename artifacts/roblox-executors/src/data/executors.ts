export type StatusType = 'updated' | 'outdated' | 'partial';
export type SectionType = 'trusted' | 'untrusted' | 'external';

export interface Executor {
  name: string;
  platform: string;
  unc: string;
  sunc: string;
  detection: string;
  status: string;
  statusType: StatusType;
  downloadUrl?: string;
  discordUrl?: string;
}

export interface ExecutorCategory {
  title: string;
  sectionType: SectionType;
  items: Executor[];
}

export const EXECUTOR_DATA: ExecutorCategory[] = [
  // ============ TRUSTED ============
  {
    title: "Trusted PC Free Executors (Keyless)",
    sectionType: "trusted",
    items: [
      { name: "Xeno", platform: "PC", unc: "82%", sunc: "0%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated", downloadUrl: "https://www.xeno.onl/download", discordUrl: "https://discord.gg/xe-no" },
      { name: "Velocity", platform: "PC", unc: "99%", sunc: "94%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated", downloadUrl: "https://getvelocity.lol/", discordUrl: "https://discord.gg/velocityide" },
      { name: "Solara", platform: "PC", unc: "67%", sunc: "39%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated", downloadUrl: "https://getsolara.dev/download/", discordUrl: "https://stoat.chat/" },
      { name: "JJSploit", platform: "PC", unc: "82%", sunc: "0%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://wearedevs.net/d/JJSploit", discordUrl: "https://discord.gg/mfxPEAscrs" },
      { name: "Zenon", platform: "PC", unc: "99%", sunc: "98%", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted PC Free Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "Bunni.Fun", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/9rkgef93JF" },
      { name: "Valex Internal", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://valex.io/", discordUrl: "https://discord.com/invite/valex" },
      { name: "Swift", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://getswift.vip/", discordUrl: "https://discord.gg/getswiftgg" },
      { name: "Ronix", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.com/invite/ronixstudios" },
      { name: "FluxusZ", platform: "PC", unc: "86%", sunc: "52%", detection: "Undetected", status: "Updated (Compatibility issues)", statusType: "partial", downloadUrl: "https://fluxusz.com/", discordUrl: "https://discord.gg/fluxusz" },
    ]
  },
  {
    title: "Trusted PC Paid Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "Potassium", platform: "PC", unc: "99%", sunc: "100%", detection: "Undetected (ban waves possible)", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/potassium" },
      { name: "Seliware", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://seliware.com/", discordUrl: "https://discord.gg/theseliware" },
      { name: "Sirhurt", platform: "PC", unc: "99%", sunc: "94%", detection: "Undetected (ban waves possible)", status: "Not Updated", statusType: "outdated", downloadUrl: "https://sirhurt.net/", discordUrl: "https://discord.gg/sirhurt" },
      { name: "Volcano", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://volcano.wtf/", discordUrl: "https://discord.com/invite/7Es9WeTF4K" },
      { name: "Water", platform: "PC", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Volt", platform: "PC", unc: "99%", sunc: "98%", detection: "Detected", status: "Not Updated", statusType: "outdated", downloadUrl: "https://volt.bz/" },
      { name: "Cryptic", platform: "PC", unc: "99%", sunc: "100%", detection: "Undetected (ban waves possible)", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/B3NSX2EZWe" },
      { name: "Isaeva", platform: "PC", unc: "98%", sunc: "98%", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted Mac Free Executors (Keyless)",
    sectionType: "trusted",
    items: [
      { name: "Opiumware", platform: "Mac", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated", discordUrl: "https://discord.gg/gzAWGgZDfV" },
    ]
  },
  {
    title: "Trusted Mac Free Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "Hydrogen", platform: "Mac", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://hydrogen.lat/download", discordUrl: "http://discord.gg/hydrogen" },
      { name: "Ronix", platform: "Mac", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Updated", statusType: "updated", discordUrl: "https://discord.com/invite/ronixstudios" },
    ]
  },
  {
    title: "Trusted Mac Paid Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "MacSploit", platform: "Mac", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://www.raptor.fun/", discordUrl: "https://discord.gg/macsploit" },
    ]
  },
  {
    title: "Trusted Android Free Executors (Keyless)",
    sectionType: "trusted",
    items: [
      { name: "Frostware", platform: "Android", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://getfrosts.org/download.html" },
      { name: "JJSploit", platform: "Android", unc: "99%", sunc: "100%", detection: "Undetected", status: "Down / Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/mfxPEAscrs" },
    ]
  },
  {
    title: "Trusted Android Paid Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "ArceusX V5", platform: "Android", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://spdmteam.com/v5#downloads", discordUrl: "https://discord.gg/lugia" },
    ]
  },
  {
    title: "Trusted Android Free Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "FluxusZ", platform: "Android", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://fluxusz.com/download", discordUrl: "https://discord.gg/fluxusz" },
      { name: "Delta", platform: "Android", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://deltaexploits.gg/delta-executor-android", discordUrl: "https://discord.gg/deltax" },
      { name: "CodeX", platform: "Android", unc: "98%", sunc: "96%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://codex.lol/android", discordUrl: "https://discord.gg/codexlol" },
      { name: "Ronix", platform: "Android", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://wearedevs.net/d/Ronix", discordUrl: "https://discord.com/invite/ronixstudios" },
      { name: "ArceusX Neo", platform: "Android", unc: "Failed Test", sunc: "98%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://spdmteam.com/neo", discordUrl: "https://discord.gg/lugia" },
      { name: "Cryptic", platform: "Android", unc: "98%", sunc: "97%", detection: "Undetected", status: "Updated", statusType: "updated", discordUrl: "https://discord.gg/B3NSX2EZWe" },
      { name: "VegaX", platform: "Android", unc: "98%", sunc: "Failed Test", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted iOS Paid Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "ArceusX V5", platform: "iOS", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", downloadUrl: "https://spdmteam.com/v5", discordUrl: "https://discord.gg/lugia" },
    ]
  },
  {
    title: "Trusted iOS Free Executors (Key Required)",
    sectionType: "trusted",
    items: [
      { name: "Delta", platform: "iOS", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://deltaexploits.gg/delta-executor-ios", discordUrl: "https://discord.gg/deltax" },
      { name: "CodeX", platform: "iOS", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/codexlol" },
      { name: "ArceusX Neo", platform: "iOS", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/lugia" },
      { name: "Ronix", platform: "iOS", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Updated", statusType: "updated", discordUrl: "https://discord.com/invite/ronixstudios" },
    ]
  },

  // ============ UNTRUSTED ============
  {
    title: "Untrusted PC Free Executors (Keyless)",
    sectionType: "untrusted",
    items: [
      { name: "World Client", platform: "PC", unc: "31%", sunc: "40%", detection: "Undetected", status: "Updated", statusType: "updated", downloadUrl: "https://useworld.xyz/download", discordUrl: "https://discord.gg/worldclient" },
      { name: "Eclipse", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Arlx", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated (Compatibility issues)", statusType: "outdated" },
      { name: "NebulaX", platform: "PC", unc: "87%", sunc: "40%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Raze", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
    ]
  },
  {
    title: "Untrusted PC Free Executors (Key Required)",
    sectionType: "untrusted",
    items: [
      { name: "Zenora", platform: "PC", unc: "96%", sunc: "90-96%", detection: "Undetected", status: "Delayed Release", statusType: "partial" },
      { name: "Void", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "NL-X", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated", discordUrl: "https://discord.gg/namelessct" },
      { name: "Raze", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
    ]
  },
  {
    title: "Untrusted PC Paid Executors (Key Required)",
    sectionType: "untrusted",
    items: [
      { name: "Zenora", platform: "PC", unc: "99%", sunc: "90-96%", detection: "Undetected", status: "Delayed Release", statusType: "partial" },
    ]
  },

  // ============ EXTERNAL RATINGS ============
  {
    title: "PC Free Externals (Keyless)",
    sectionType: "external",
    items: [
      { name: "Pigeon.lol", platform: "PC", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Working", statusType: "updated" },
      { name: "World Client", platform: "PC", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Working", statusType: "updated", downloadUrl: "https://useworld.xyz/download", discordUrl: "https://discord.gg/worldclient" },
      { name: "Eclipse", platform: "PC", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Working", statusType: "updated" },
      { name: "Raze", platform: "PC", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Working", statusType: "updated" },
    ]
  },
  {
    title: "PC Free Externals (Key Required)",
    sectionType: "external",
    items: [
      { name: "Valex External V4", platform: "PC", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Working", statusType: "updated", discordUrl: "https://discord.com/invite/valex" },
      { name: "Project Sheldon", platform: "PC", unc: "N/A", sunc: "N/A", detection: "N/A", status: "Working", statusType: "updated" },
    ]
  },
  {
    title: "PC Paid Externals (Key Required)",
    sectionType: "external",
    items: [
      { name: "Project Sheldon", platform: "PC", unc: "N/A", sunc: "N/A", detection: "N/A", status: "Working", statusType: "updated" },
    ]
  },
];

export const ADMIN_PASSWORD = "admin123";

export const getExecutorData = (): ExecutorCategory[] => {
  try {
    const stored = localStorage.getItem('roblox-executor-data');
    if (stored) return JSON.parse(stored);
  } catch {}
  return EXECUTOR_DATA;
};

export const saveExecutorData = (data: ExecutorCategory[]): void => {
  localStorage.setItem('roblox-executor-data', JSON.stringify(data));
};

export const resetExecutorData = (): void => {
  localStorage.removeItem('roblox-executor-data');
};

export const getStats = () => {
  let updated = 0;
  let outdated = 0;
  let partial = 0;
  let total = 0;

  getExecutorData().forEach(cat => {
    cat.items.forEach(item => {
      total++;
      if (item.statusType === 'updated') updated++;
      else if (item.statusType === 'partial') partial++;
      else outdated++;
    });
  });

  return { updated, outdated, partial, total };
};
