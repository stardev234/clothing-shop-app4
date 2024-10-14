import * as express from "express";
import  Router  from "express";
import  {validateData}  from "../middleware/dataValidation";
import { postProduct } from "../controllers/postProdController";
import { getAllProducts } from "../controllers/getAllProdsController";
import { getBarcode } from "../controllers/getBarcodeController";
import { getFilteredProds } from "../controllers/getFilteredProds";
import { editProduct } from "../controllers/editProdController";
import { deleteProduct } from "../controllers/deleteProdController";
import { getOneProduct } from "../controllers/getOneProdController";
import { validateEditData } from "../middleware/editProductValidation";
const router: express.Router = express.Router();
router.post("/getFilteredProds", getFilteredProds)
router.get("/getProd", getAllProducts);
router.post("/addProd", validateData, postProduct);
router.get("/getBarcode", getBarcode);
router.put("/editProd", validateEditData, editProduct),
router.delete("/deleteProd", deleteProduct)
router.post("/getOneProd", getOneProduct)


export default router;