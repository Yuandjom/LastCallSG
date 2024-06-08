export const formatDate = (date: Date): string => {
  const formattedExpiryDate = date.toString().split("T")[0];
  return formattedExpiryDate;
};

export const formatUTCDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
