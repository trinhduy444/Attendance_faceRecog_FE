export const convertDay = function (inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear();
    if(day < 10){
        
        return `0${day} ${month}, ${year}`;
    }
    return `${day} ${month}, ${year}`;

}