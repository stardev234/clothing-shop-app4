const { default: mongoose } = require("mongoose")

module.exports = function mongooseConnect() {
    const dbURI = "mongodb+srv://santiagomcs10:VZQ9VOtObu1Xkpj6@start.isq4v.mongodb.net/productDb?retryWrites=true&w=majority&appName=Start"
     mongoose.connect(dbURI).then(
        (result)=>{console.log("Connected to DB")
     }).catch((err)=>{console.log(err);})
}