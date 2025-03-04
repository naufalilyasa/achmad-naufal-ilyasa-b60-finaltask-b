function dateFormatter(date) {
  const newDate = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let getDate = newDate.getDate();
  let fullDate = `${getDate} - ${month} - ${year}`;
  return fullDate;
}

module.exports = { dateFormatter };
