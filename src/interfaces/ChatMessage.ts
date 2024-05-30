export default interface ChatMessage {
    id?: string;
    senderId: string;
    receiverId: string;
    message: string;
    date?: Date;
    isRead: boolean;
}