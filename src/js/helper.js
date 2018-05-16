export function extractIndex(element) {
    let idAttribute = element.getAttribute('id');
    let regexp = /_card-\d/;

    if (regexp.test(idAttribute)) {
        return (idAttribute.match(/\d+/g)[0]);
    } else {    }
}

export function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
