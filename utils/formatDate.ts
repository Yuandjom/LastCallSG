import {
  parseISO,
  differenceInMonths,
  addMonths,
  differenceInDays,
} from "date-fns";

export const formatDate = (date: Date): string => {
  const formattedExpiryDate = date.toString().split("T")[0];
  return formattedExpiryDate;
};

export const formatUTCDate = (): string => {
  const today = new Date();
  const sevenDaysFromNow = new Date(today.setDate(today.getDate() + 7));

  const day = String(sevenDaysFromNow.getDate()).padStart(2, "0");
  const month = String(sevenDaysFromNow.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = sevenDaysFromNow.getFullYear();

  return `${day}/${month}/${year}`;
};

export const calculateTimeLeft = (dateString) => {
  const today = new Date();
  const targetDate = parseISO(dateString);

  // Calculate difference in total months
  const totalMonthsLeft = differenceInMonths(targetDate, today);

  // Calculate the date after subtracting the total months left
  const dateAfterMonths = addMonths(today, totalMonthsLeft);

  // Calculate the remaining days after the months are subtracted
  const daysLeft = differenceInDays(targetDate, dateAfterMonths);

  let result = "";
  if (totalMonthsLeft > 0) {
    result += `${totalMonthsLeft} month${
      totalMonthsLeft !== 1 ? "s" : ""
    } `;
  }
  result += `${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;

  return `Within `+result;
};
