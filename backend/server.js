// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";
// const app = express();
// const port = 8000;
// app.get("/", (req, res) => {
//   res.send("hellooo");
// });
// app.listen(port, () => {
//   console.log("listening on port 8000");
// });

import express from "express";
import cors from "cors";
import routers from "./routes.js";

const app = express();
const port = 8000;
const corsOptions = {
  origin: "*",

  useSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routers);
app.listen(port, () => console.log("listenning on port 8000"));
