import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/router/index.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandlers.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swaggerConfig.js";

const app = express();
// Cors
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "http://localhost:5432",
      "http://127.0.0.1:5432",
    ],
  }),
);

app.use(express.static(import.meta.dirname));
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/api", router);

app.use(router);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.BASE_URL}:${port}`);
  console.log(
    `📄 Documentation Swagger disponible sur http://localhost:${port}/api-docs`,
  );
});
