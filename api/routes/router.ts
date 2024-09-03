import * as express from "express";
import  Router  from "express";
import  {validateData}  from "../middleware/dataValidation";
import  {postProduct}  from "../controllers/controllers";
import { getAllProducts } from "../controllers/controllers";
import { getBarcode } from "../controllers/controllers";

const router: express.Router = express.Router();

router.get("/getProd", getAllProducts);
router.post("/addProd", validateData, postProduct);
router.get("/getBarcode", getBarcode);

// router.delete("/delete"); // uncomment this line if you want to add delete route

export default router;