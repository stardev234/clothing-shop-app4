const express = require("express");
const router = express.Router()
const dataValidation = require("../middleware/dataValidation.js")
const getController = require("../controllers/controllers.js")
const generateBarcode = require("../middleware/generateBarcode.js")


router.get("/getProd", getController.getAllProducts)
router.post("/addProd", dataValidation.validateData, getController.postProduct)
router.get("/getBarcode", getController.getBarcode)
/*router.delete("/delete")*/

module.exports = router