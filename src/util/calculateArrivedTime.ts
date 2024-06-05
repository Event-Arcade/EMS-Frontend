export default function calculateArrivedTime(date?: Date) {
    if (!date) return;
    // Calculate the time difference between the current date and the date the message was sent in minutes or hours or days and return as a string
    const currentDate = new Date();
    const messageDate = new Date(date);
    const timeDifference = currentDate.getTime() - messageDate.getTime();
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}
    