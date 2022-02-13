export default function tempFormat(temp) {
    let temperature = Math.round(temp - 273.15);
    if (temperature > 0) {
        return `+${temperature}`
    } else {
        return temperature
    }
}