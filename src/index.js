require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();



/**
 * Database setup
 */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors()); //permite o trabalho com portas , uma vez que trabalho com back e front. Em branco todo mundo acessa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); //me dá acesso no localhost, pela route /files
//http://localhost:3000/files/92ae39cfcb0c0024aa912fe607c287bf-WhatsApp%20Image%202019-05-19%20at%2018.54.21%20(1).jpeg
// o caminho acimame dá uma imagem!

app.use(require("./routes"));

app.listen(3000);
