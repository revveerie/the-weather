export default function dateFormatHourly(second) {
    let epoch = new Date(0);
    epoch.setSeconds(parseInt(second));
    var date = epoch.toString();
    return date.slice(16, 21);
}