// import { Application, Router } from "@oak/oak";
// import { oakCors } from "@tajpouria/cors";
import data from "./api/data.json" with { type: "json" };
// import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
// @deno-types="@types/express"
import express from "npm:express"; // Sử dụng npm: prefix
import cors from "npm:cors";

// const router = new Router();

// router.get("/api/dinosaurs", (context) => {
//   context.response.body = data;
// });

// router.get("/api/dinosaurs/:dinosaur", (context) => {
//   if (!context?.params?.dinosaur) {
//     context.response.body = "No dinosaur name provided.";
//   }

//   const dinosaur = data.find((item) =>
//     item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
//   );

//   context.response.body = dinosaur ? dinosaur : "No dinosaur found.";
// });

// const app = new Application();
// app.use(oakCors());
// app.use(router.routes());
// app.use(router.allowedMethods());
// app.use(routeStaticFilesFrom([
//   `${Deno.cwd()}/dist`,
//   `${Deno.cwd()}/public`,
// ]));

// await app.listen({ port: 8000 });

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: [
      "https://www.example.com",
      "https://pedals-analyze-joyney.deno.dev",
      "http://localhost:3000" // Thêm localhost để phát triển cục bộ
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// Sử dụng middleware CORS
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to the Dinosaur API!");
});

app.get("/api", (req, res) => {
  res.send(data);
});

app.get("/api/dinosaurs/:dinosaur", (req, res) => {
  if (req?.params?.dinosaur) {
    const found = data.find((item) =>
      item.name.toLowerCase() === req.params.dinosaur.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.send("No dinosaurs found.");
    }
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});