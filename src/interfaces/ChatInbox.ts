export default interface ChatInbox{
    id: string;
    profilePictureURL: string;
    firstName: string;
    lastMessage?: string;
    lastMessageDate?: Date;
    isRead?: boolean;
    unreadMessages?: number;
    isActive: boolean;
}