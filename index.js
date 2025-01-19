const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");
const { errorHandler, notfound } = require("./Middleware/Error");

const UserRouter = require("./Routes/User");
const AppointmentRouter = require("./Routes/Appointmnet");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DATABASEURI)
  .then(() => console.log("datapase connected successfully"))
  .catch((err) => console.log(err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARYCLOUDNAME,
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLOUDINARYAPISECRET,
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://alloadmin.vercel.app",
      "https://allofrontend.vercel.app"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/apoointment", AppointmentRouter);
app.use(errorHandler);
app.use(notfound);
app.listen(9000, console.log("server is live 9000"));
