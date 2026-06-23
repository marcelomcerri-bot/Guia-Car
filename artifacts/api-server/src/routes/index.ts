import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import guidesRouter from "./guides";
import diagnosisRouter from "./diagnosis";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(guidesRouter);
router.use(diagnosisRouter);
router.use(statsRouter);

export default router;
