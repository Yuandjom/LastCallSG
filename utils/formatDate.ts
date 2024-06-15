export const formatDate = (date: Date): string => {
  const formattedExpiryDate = date.toString().split("T")[0];
  return formattedExpiryDate;
};

export const formatUTCDate = (): string => {
  const today = new Date();
  const sevenDaysFromNow = new Date(today.setDate(today.getDate() + 7));
  
  const day = String(sevenDaysFromNow.getDate()).padStart(2, '0');
  const month = String(sevenDaysFromNow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = sevenDaysFromNow.getFullYear();
  
  return `${day}/${month}/${year}`;
};