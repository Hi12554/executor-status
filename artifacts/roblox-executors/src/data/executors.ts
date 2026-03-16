export type StatusType = 'updated' | 'outdated' | 'partial';

export interface Executor {
  name: string;
  platform: string;
  unc: string;
  sunc: string;
  detection: string;
  status: string;
  statusType: StatusType;
}

export interface ExecutorCategory {
  title: string;
  items: Executor[];
}

export const EXECUTOR_DATA: ExecutorCategory[] = [
  {
    title: "Trusted PC Free Executors (Keyless)",
    items: [
      { name: "Xeno", platform: "PC", unc: "82%", sunc: "0%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated" },
      { name: "Velocity", platform: "PC", unc: "99%", sunc: "94%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated" },
      { name: "Solara", platform: "PC", unc: "67%", sunc: "39%", detection: "Undetected (ban waves possible)", status: "Updated", statusType: "updated" },
      { name: "JJSploit", platform: "PC", unc: "82%", sunc: "0%", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted PC Free Executors (Key Required)",
    items: [
      { name: "Bunni.Fun", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Valex Internal", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Swift", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Ronix", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Fluxus", platform: "PC", unc: "86%", sunc: "52%", detection: "Undetected", status: "Updated (Compatibility issues)", statusType: "partial" },
    ]
  },
  {
    title: "Trusted PC Paid Executors",
    items: [
      { name: "Potassium", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Seliware", platform: "PC", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Sirhurt", platform: "PC", unc: "99%", sunc: "94%", detection: "Undetected (ban waves possible)", status: "Not Updated", statusType: "outdated" },
      { name: "Volcano", platform: "PC", unc: "Not Updated", sunc: "Not Updated", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Water", platform: "PC", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Volt", platform: "PC", unc: "99%", sunc: "98%", detection: "Undetected", status: "Not Updated", statusType: "outdated" },
      { name: "Cryptic", platform: "PC", unc: "99%", sunc: "100%", detection: "Undetected (ban waves possible)", status: "Not Updated", statusType: "outdated" },
      { name: "Isaac", platform: "PC", unc: "98%", sunc: "98%", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted Mac Executors",
    items: [
      { name: "Oplumware", platform: "Mac", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Hydrogen", platform: "Mac", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Ronix", platform: "Mac", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "MacSploit", platform: "Mac", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted Android Executors",
    items: [
      { name: "Frostware", platform: "Android", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "JJSploit", platform: "Android", unc: "99%", sunc: "100%", detection: "Undetected", status: "Down / Not Updated", statusType: "outdated" },
      { name: "Fluxus", platform: "Android", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Delta", platform: "Android", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Codex", platform: "Android", unc: "98%", sunc: "96%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Ronix", platform: "Android", unc: "N/A", sunc: "N/A", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Arceus X Neo", platform: "Android", unc: "Failed Test", sunc: "98%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Cryptic", platform: "Android", unc: "98%", sunc: "97%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "VegaX", platform: "Android", unc: "98%", sunc: "Failed Test", detection: "Undetected", status: "Updated", statusType: "updated" },
    ]
  },
  {
    title: "Trusted iOS Executors",
    items: [
      { name: "Delta", platform: "iOS", unc: "99%", sunc: "100%", detection: "Undetected", status: "Updated", statusType: "updated" },
      { name: "Codex", platform: "iOS", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
      { name: "Arceus X Neo", platform: "iOS", unc: "Down", sunc: "Down", detection: "N/A", status: "Not Updated", statusType: "outdated" },
    ]
  }
];

export const getStats = () => {
  let updated = 0;
  let outdated = 0;
  let partial = 0;
  let total = 0;

  EXECUTOR_DATA.forEach(cat => {
    cat.items.forEach(item => {
      total++;
      if (item.statusType === 'updated') updated++;
      else if (item.statusType === 'partial') partial++;
      else outdated++;
    });
  });

  return { updated, outdated, partial, total };
};
