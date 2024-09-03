import { default as mongoose } from "mongoose";

export default function mongooseConnect(): void {
  const dbURI: string = "mongodb+srv://santiagomcs10:VZQ9VOtObu1Xkpj6@start.isq4v.mongodb.net/products1?retryWrites=true&w=majority&appName=Start";
  mongoose.connect(dbURI)
    .then((result) => console.log("Connected to DB"))
    .catch((err) => console.error(err));
}