export default function dateFormatCurrent(second) {
    const months = {
        'Jan': 'January',
        'Feb': 'February',
        'Mar': 'March',
        'Apr': 'April',
        'May': 'May',
        'Jun': 'June',
        'Jul': 'July',
        'Aug': 'August',
        'Sep': 'Septemper',
        'Oct': 'October',
        'Nov': 'November',
        'Dec': 'December'
    }
    let epoch = new Date(0);
    epoch.setSeconds(parseInt(second));
    var date = epoch.toString();
    let month = '';
    for (let key in months) {
        if (key == date.slice(4, 7)) {
            month += months[key];
        }
      }
    return `${month} ${date.slice(8, 10)}, ${date.slice(11, 16)}`;
}