const express = require("express");
const cors = require("cors");
const { db } = require("./database/db");
const cookieParser = require("cookie-parser");
const app = express();
const ApplicationRouter = require("./controller/ApplicationController");
const companiesRouter = require("./controller/CompaniesController");
const AdvertisementRouter = require("./controller/AdvertisementController");
const userRouter = require("./controller/UserController");

app.listen(8080, () => {
    console.log("start server");
    db;
});
app.use(cors({origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use("/companies", companiesRouter);
app.use("/application", ApplicationRouter);
app.use("/advertisement", AdvertisementRouter);
app.use("/user", userRouter);
