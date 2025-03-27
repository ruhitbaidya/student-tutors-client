import Curenttimes from "./Curenttimes";

const DateMatch = (regdatestart, regDateEnd) => {
  const currentDate = Date.now(Curenttimes());
  const startDate = Date.now(regdatestart);
  const endDate = Date.now(regDateEnd);

  if (currentDate <= startDate && currentDate >= endDate) {
    return true;
  }
  return false;
};

export default DateMatch;
