import Curenttimes from "./Curenttimes"
const DateMatch = (regdatestart, regDateEnd) => {
    const currentDates = Curenttimes();
    if(new Date(currentDates) >= new Date(regdatestart) && new Date(currentDates) <= new Date(regDateEnd)){
        return true;
    }
    return false;
}

export default DateMatch