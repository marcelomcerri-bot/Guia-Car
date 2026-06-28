import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import guidesRouter from "./guides";
import diagnosisRouter from "./diagnosis";
import statsRouter from "./stats";
import analyzePhotoRouter from "./analyze-photo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(guidesRouter);
router.use(diagnosisRouter);
router.use(statsRouter);
router.use(analyzePhotoRouter);

export default router;
