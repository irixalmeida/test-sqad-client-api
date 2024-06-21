import { Router } from "express";
import clientController from "../controllers/clientController";
import validate from "../middlewares/validate";
import { createClientSchema } from "../validations/clientValidation";

const router = Router();

router.post("/", validate(createClientSchema), clientController.create);
router.get("/", clientController.findAll);
router.get("/:id", clientController.findById);
router.get("/search", clientController.findByName);
router.delete("/:id", clientController.deleteById);

export default router;
