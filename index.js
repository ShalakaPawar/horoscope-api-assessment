import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import horoscopeRoutes from "./routes/horoscope.js";
import { connectDB } from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/horoscope", horoscopeRoutes);

await connectDB();

app.listen(3000, () => console.log("Server on http://localhost:3000"));
