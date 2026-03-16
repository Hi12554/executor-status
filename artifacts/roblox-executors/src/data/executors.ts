export type ExecutorStatus = 'updated' | 'outdated';

export interface Executor {
  name: string;
  status: ExecutorStatus;
}

export interface ExecutorCategory {
  title: string;
  items: Executor[];
}

export const EXECUTOR_DATA: ExecutorCategory[] = [
  {
    title: "Trusted PC Free Executors (Keyless)",
    items: [
      { name: "Xeno", status: "updated" },
      { name: "Velocity", status: "updated" },
      { name: "Solara", status: "updated" },
      { name: "JJSploit", status: "updated" },
    ]
  },
  {
    title: "Trusted PC Free Executors (Key Required)",
    items: [
      { name: "Bunni.Fun", status: "outdated" },
      { name: "Valex Internal", status: "outdated" },
      { name: "Swift", status: "outdated" },
      { name: "Ronix", status: "outdated" },
      { name: "Fluxus", status: "updated" },
    ]
  },
  {
    title: "Trusted PC Paid Executors",
    items: [
      { name: "Potassium", status: "outdated" },
      { name: "Seliware", status: "outdated" },
      { name: "Sirhurt", status: "outdated" },
      { name: "Volcano", status: "outdated" },
      { name: "Water", status: "updated" },
      { name: "Volt", status: "outdated" },
      { name: "Cryptic", status: "outdated" },
      { name: "Isaac", status: "updated" },
    ]
  },
  {
    title: "Trusted Mac Executors",
    items: [
      { name: "Oplumware", status: "updated" },
      { name: "Hydrogen", status: "outdated" },
      { name: "Ronix", status: "updated" },
      { name: "MacSploit", status: "updated" },
    ]
  },
  {
    title: "Trusted Android Executors",
    items: [
      { name: "Frostware", status: "outdated" },
      { name: "JJSploit", status: "outdated" },
      { name: "Fluxus", status: "outdated" },
      { name: "Delta", status: "updated" },
      { name: "Codex", status: "updated" },
      { name: "Ronix", status: "updated" },
      { name: "Arceus X Neo", status: "updated" },
      { name: "Cryptic", status: "updated" },
      { name: "VegaX", status: "updated" },
    ]
  },
  {
    title: "Trusted iOS Executors",
    items: [
      { name: "Delta", status: "updated" },
      { name: "Codex", status: "outdated" },
      { name: "Arceus X Neo", status: "outdated" },
    ]
  }
];

export const getStats = () => {
  let updated = 0;
  let outdated = 0;
  let total = 0;

  EXECUTOR_DATA.forEach(cat => {
    cat.items.forEach(item => {
      total++;
      if (item.status === 'updated') updated++;
      else outdated++;
    });
  });

  return { updated, outdated, total };
};
