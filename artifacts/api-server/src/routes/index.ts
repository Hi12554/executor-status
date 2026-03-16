import { Router, type IRouter } from "express";
import healthRouter from "./health";
import executorsRouter from "./executors";

const router: IRouter = Router();

router.use(healthRouter);
router.use(executorsRouter);

export default router;
