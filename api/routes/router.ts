import * as express from "express";
import  Router  from "express";
import  {validateData}  from "../middleware/dataValidation";
import { postProduct } from "../controllers/postProdController";
import { getAllProducts } from "../controllers/getAllProdsController";
import { getBarcode } from "../controllers/getBarcodeController";
import { getFilteredProds } from "../controllers/getFilteredProds";
import { editProduct } from "../controllers/editProdController";
const router: express.Router = express.Router();
router.post("/getFilteredProds", getFilteredProds)
router.get("/getProd", getAllProducts);
router.post("/addProd", validateData, postProduct);
router.get("/getBarcode", getBarcode);
router.put("/editProd", editProduct)
// router.delete("/delete"); // uncomment this line if you want to add delete route

export default router;