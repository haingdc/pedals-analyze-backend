/** lấy tháng từ Date */
function getMonthFromDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  return formatter.format(date);
}

export {
  getMonthFromDate,
}
