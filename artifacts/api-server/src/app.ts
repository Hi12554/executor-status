import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const frontendDist = path.resolve(process.cwd(), "artifacts/roblox-executors/dist/public");
app.use(express.static(frontendDist));
app.get("/*path", (_req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
