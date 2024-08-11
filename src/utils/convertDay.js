export const convertDay = function (inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    if (day < 10) {

        return `0${day} ${month}, ${year}`;
    }
    return `${day} ${month}, ${year}`;

}
export const convertTimestamp = (timestamp) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    return dateObject.toLocaleString('en-GB', options); 
};
