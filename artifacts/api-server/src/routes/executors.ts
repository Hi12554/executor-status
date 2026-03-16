import { Router } from "express";
import { getExecutorData, setExecutorData } from "../lib/neon.js";

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

router.put("/executors", async (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "data must be an array" });
    }
    await setExecutorData(data);
    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /executors error:", err);
    res.status(500).json({ error: "Failed to save executor data" });
  }
});

export default router;
