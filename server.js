const express = require('express');
const path=require("path");
const dotenv=require("dotenv");
const router=require("./routers/index")
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");
const connectionDatabase = require("./helpers/database/connectionDatabase")
const customErrorHandler=require("./middlewares/errors/customErrorHandler");

//const cors = require('cors')


const app = express();

dotenv.config({
  path: './config/env/config.env',
});

connectionDatabase()

//app.use(cors())
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use("/api",router)
app.use(customErrorHandler);



if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', "build", "index.html"));
  })
}



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening app at http://localhost:${port}`);
});
