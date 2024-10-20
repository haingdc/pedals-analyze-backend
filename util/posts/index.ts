import type { CountPostsByMonth, Post, Root } from "@pedal-pedal/types";
import { Err, Ok, Result } from "ts-results";

/*
{ "2024-10": 3, "2024-09": 5 }

*/

function countPostsByMonth(posts: Post[]): CountPostsByMonth[] {
  const counts: Record<string, CountPostsByMonth> = {};

  posts.forEach((post) => {
    // Chuyển đổi ngày thành đối tượng Date
    const date = new Date(post.date);
    const monthKey = `${date.getFullYear()}-${
      String(date.getMonth() + 1).padStart(2, "0")
    }`; // YYYY-MM
    const month = date.toLocaleString("default", { month: "long" });

    // Tăng số lượng bài viết cho tháng đó
    if (!counts[monthKey]) {
      counts[monthKey] = { date: monthKey, count: 0, month };
    }
    counts[monthKey].count++;
  });

  let countList: CountPostsByMonth[] = [];
  if (Object.keys(counts).length) {
    countList = Object.entries(counts).map(([_key, value]) => value);
  }

  return countList;
}

async function getApiPosts(): Promise<Result<Root, string[]>> {
  try {
    const response = await fetch(`${Deno.env.get("BLOG_DOMAIN")}/api/blog`); // Gọi API từ localhost
    const data: Root = await response.json();
    return new Ok(data);
  } catch (_error) {
    return new Err(["Failed to fetch data"]);
  }
}

export { countPostsByMonth, getApiPosts };
