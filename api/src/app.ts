import express from 'express';
import  mongooseConnect from "../db/DbConnection"
import bodyParser from 'body-parser';
import cors from "cors";
import router from "../routes/router";


mongooseConnect()
const app: express.Application = express();
const port: number = 3006;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});