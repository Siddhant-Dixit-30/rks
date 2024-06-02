const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const cors = require( "cors" );
app.use( cors() );


const userDataRoute = require("./routes/userDataRoute");

app.use(express.json());

const notificationsRoute = require("./routes/notifications");
app.use("/notifications", notificationsRoute);

//Connect to mongodb database(locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

app.use(userDataRoute);