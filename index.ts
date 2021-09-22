const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
import codeRoutes from "./Route/route";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// sholud be called after initializing cors to avoid cors origin issue
app.use("/codestore", codeRoutes);

// for database
const connectionUrl = `mongodb+srv://Aaquib5076:${process.env.DB_PASSWORD}@cluster0.zen1n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;


mongoose
  .connect(connectionUrl)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((err: any) => console.log(err));

//mongoose.set("useFindAndModify", false);
