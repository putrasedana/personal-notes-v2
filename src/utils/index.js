const showFormattedDate = (date, locale = "id-ID") => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
};

const statusColor = (status) => {
  return status.toLowerCase() === "completed"
    ? "green"
    : status.toLowerCase() === "in-progress"
    ? "darkgoldenrod"
    : status.toLowerCase() === "to-do"
    ? "royalblue"
    : "black";
};

export { showFormattedDate, statusColor };
