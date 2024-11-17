import type { CountPostsByMonth, Post, Root } from "@pedal-pedal/types";
import { Err, Ok, Result } from "ts-results";
import { getMonthFromDate } from "../date-time.ts";

/** tính toán số lượng bài viết theo tháng */
function countPostsByMonth(posts: Post[]): CountPostsByMonth[] {
  const counts: Record<string, CountPostsByMonth> = {};

  posts.forEach((post) => {
    // Chuyển đổi ngày thành đối tượng Date
    const date = new Date(post.date);
    const monthKey = `${date.getFullYear()}-${
      String(date.getMonth() + 1).padStart(2, "0")
    }`; // YYYY-MM
    const month = getMonthFromDate(date);

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

/** lấy dữ liệu từ blog */
async function getApiPosts(): Promise<Result<Root, string[]>> {
  try {
    const response = await fetch(`${Deno.env.get("BLOG_DOMAIN")}/api/blog`); // Gọi API từ localhost
    const data: Root = await response.json();
    return new Ok(data);
  } catch (error) {
    return new Err([JSON.stringify(error)]);
  }
}

export { countPostsByMonth, getApiPosts };
