import Curenttimes from "./Curenttimes"
const DateMatch = (regdatestart, regDateEnd) => {
    const currentDates = Curenttimes();
    // const currntDate = new Date('2024-06-11')
    // const startDate = new Date('2024-06-05')
    // const endDate = new Date('2024-06-10')
    // console.log( endDate < currntDate)

    if(new Date(currentDates) >= new Date(regdatestart) && new Date(regDateEnd) <= new Date(currentDates) ){
        return true;
    }
    return false
}

export default DateMatch