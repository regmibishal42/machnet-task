
function DateFormatter(dateStr: string): string {
    const dateObj = new Date(dateStr);
    const options = { month: 'short', day: '2-digit' };
    return dateObj.toLocaleDateString('en-US', options);
}

function DateTimeFormatter(dateStr: string): string {
    const date = new Date(dateStr);
    const options = {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
export {DateFormatter,DateTimeFormatter}