import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./config/db.js"
import cors from "cors";
import adminRouter from "./routes/adminRoute.js";
import income from "./routes/incomeRoute.js";
import expenses from "./routes/expensesRoute.js";
import Patient from "./routes/patientRoute.js";
import treatment from "./routes/treatmentRoute.js";
import contactusRouter from "./routes/inboxRoute.js";
import newBorn from "./routes/newBornRoute.js";
import appointment from "./routes/appointmentRoute.js"
config();
connectDB()

const app = express();

const port = process.env.PORT || 5500;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());
app.use("/admin", adminRouter);
app.use("/income" ,income);
app.use("/expenses" , expenses);
app.use("/patient" , Patient);
app.use("/treatment", treatment);
app.use("/newBorn", newBorn);
app.use("/appointment",appointment)
app.use('/inbox', contactusRouter)





app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(port, (req, res) => {
  console.log(`server listen on port ${port}`);
});
