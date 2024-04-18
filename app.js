const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/user-routes");


const app = express();
app.use(express.json());
app.use("/api/user", router);
mongoose.connect(
    'mongodb+srv://Sarthy:V2l9PemZOtTuRApx@cluster0.4ukoeb9.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    app.listen(5000);
    console.log("Connected To Databasec in localhost");
}).catch((err) => {
    console.log(err);
});
