export const orderTimeSlots = (data) => {
  // Define the desired order
  const desiredOrder = ["morning", "afternoon", "evening", "night"];

  // Convert object to entries and sort based on desired order
  return Object.entries(data).sort((a, b) => {
    const indexA = desiredOrder.indexOf(a[0]);
    const indexB = desiredOrder.indexOf(b[0]);
    return indexA - indexB;
  });
};

export const formatDateTime = (dateString) => {
  // Parse the input date and set a specific time (12:01:27)
  const date = new Date(dateString);
  date.setHours(12, 1, 27);

  // Convert to IST (UTC+5:30)
  // First, get the current time in UTC
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  // Then convert to IST by adding 5 hours and 30 minutes in milliseconds
  const istTime = new Date(utcTime + 5.5 * 3600000);

  // Format the date using toLocaleString with specific options
  const formattedDate = istTime.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  // Add the UTC+5:30 timezone indicator
  return formattedDate.replace(",", "") + " UTC+5:30";
};
