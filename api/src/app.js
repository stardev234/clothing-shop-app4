const express = require("express")
const mongooseConnect = require("../db/DbConnection.js")
const app = express()
const port = 3006
const bodyParser = require('body-parser')
mongooseConnect()
const cors = require("cors")
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require("../routes/router.js")
app.use("/api", router)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);

})

