class DateUtils {
    getTimeString(date, format) {
        let string, hour, minute, second;
        switch (format) {
            case 'hh:mm':
                hour = ('0' + date.getHours());
                minute = ('0' + date.getMinutes());

                string = hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2);
                break;
            default: // Default format is hh:mm
                hour = ('0' + date.getHours());
                minute = ('0' + date.getMinutes());

                string = hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2);
                break;
        }
        return string;
    }
}

export const dateUtils = new DateUtils();