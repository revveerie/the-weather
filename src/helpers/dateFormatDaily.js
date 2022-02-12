export default function dateFormatDaily(second) {
    let epoch = new Date(0);
    epoch.setSeconds(parseInt(second));
    var date = epoch.toString();
    return date.slice(0, 3);
}