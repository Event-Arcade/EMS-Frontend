export default interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: Date;
    isRead: boolean;
    userId: number;
    eventType: number;
    entityType: number;
    entityId: number;
}