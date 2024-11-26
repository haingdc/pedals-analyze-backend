// import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import "@std/dotenv";
import cors from "npm:cors";
import data from "./api/data.json" with { type: "json" };
// @deno-types="@types/express"
import express from "npm:express"; // Sử dụng npm: prefix
import { countPostsByMonth, getApiPosts } from "./util/posts/index.ts";

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: [
    "https://www.example.com",
    "https://pedals-analyze-joyney.deno.dev",
    "http://localhost:8080",
    "https://joyney.ngayhe.com",
    "https://caba-58-10-68-86.ngrok-free.app" // sử dụng tunnel ngrok
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("Welcome to the Pedal Analyze Backend");
});

app.get("/api", (_req, res) => {
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

app.get("/api/blog", async (_req, res) => {
  const posts = await getApiPosts();
  if (posts.err) {
    res.status(500).json({
      error: posts.val,
    });
    return;
  }

  const postsByMonth = countPostsByMonth(posts.val.posts);
  res.json(postsByMonth);
});

app.get("/api/blog/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  
  if (Number.isNaN(page)) {
    res.status(400).json({
      error: "Page number must be a number",
    });
    return;
  }
  const posts = await getApiPosts();
  if (posts.err) {
    res.status(500).json({
      error: posts.val,
    });
    return;
  }
  res.json(posts.val.posts)
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
