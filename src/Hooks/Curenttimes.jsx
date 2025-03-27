const Curenttimes = () => {
  const time = new Date();
  const year = time.getFullYear() + "";
  const month =
    time.getMonth() + 1 <= 9
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  const day = time.getDate() <= 9 ? "0" + time.getDate() : time.getDate();
  return `${year}-${month}-${day}`;
};

export default Curenttimes;
