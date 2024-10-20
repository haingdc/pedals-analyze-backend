import data from "./api/data.json" with { type: "json" };
// import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
// @deno-types="@types/express"
import express from "npm:express"; // Sử dụng npm: prefix
import cors from "npm:cors";
import "@std/dotenv"
import type { Root } from "./types/post.ts";
import { getApiPosts } from "./util/posts/index.ts";
import { countPostsByMonth } from "./util/posts/index.ts";

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: [
    "https://www.example.com",
    "https://pedals-analyze-joyney.deno.dev",
    "http://localhost:8080",
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

app.get("/api/blog-deprecated", async (_req, res) => {
  try {
    const response = await fetch(`${Deno.env.get("BLOG_DOMAIN")}/api/blog`); // Gọi API từ localhost
    const data: Root = await response.json(); // Chuyển đổi response thành JSON
    res.json(data); // Trả dữ liệu đó về cho client
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' }); // Trả về lỗi nếu có
  }
});

app.get("/api/blog", async (_req, res) => {
  const posts = await getApiPosts();
  if (posts.err) {
    res.status(500).json({ error: posts.val, reason: `${Deno.env.get("BLOG_DOMAIN")}/api/blog` });
    return;
  }

  const postsByMonth = countPostsByMonth(posts.val.posts);
  res.json(postsByMonth);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
