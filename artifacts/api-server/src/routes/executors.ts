import { Router } from "express";
import { getExecutorData, setExecutorData, getLastChecked, setLastChecked } from "../lib/neon.js";

const router = Router();

router.get("/executors", async (_req, res) => {
  try {
    const data = await getExecutorData();
    res.json({ data });
  } catch (err) {
    console.error("GET /executors error:", err);
    res.status(500).json({ error: "Failed to fetch executor data" });
  }
});

router.put("/executors", async (req, res): Promise<void> => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      res.status(400).json({ error: "data must be an array" });
      return;
    }
    await setExecutorData(data);
    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /executors error:", err);
    res.status(500).json({ error: "Failed to save executor data" });
  }
});

router.get("/meta", async (_req, res) => {
  try {
    const lastChecked = await getLastChecked();
    res.json({ lastChecked });
  } catch (err) {
    console.error("GET /meta error:", err);
    res.status(500).json({ error: "Failed to fetch meta" });
  }
});

router.put("/meta", async (req, res): Promise<void> => {
  try {
    const { lastChecked } = req.body;
    if (typeof lastChecked !== "string") {
      res.status(400).json({ error: "lastChecked must be a string" });
      return;
    }
    await setLastChecked(lastChecked);
    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /meta error:", err);
    res.status(500).json({ error: "Failed to save meta" });
  }
});

export default router;
