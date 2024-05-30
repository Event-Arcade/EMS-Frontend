// signalRService.ts
import * as signalR from "@microsoft/signalr";

class ChatService {
    private hubConnection: signalR.HubConnection;

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5257/personalChatHub",{
                withCredentials: false
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        this.hubConnection.on("ReceiveMessage", this.onReceiveMessage);
        this.hubConnection.on("UserConnected", this.onReceiveMessage);
        this.hubConnection.on("UserOffline", this.onReceiveMessage);
    }

    public async startConnection() {
        try {
            await this.hubConnection.start();
            console.log("Connection started");
        } catch (err) {
            console.log("Error while starting connection: " + err);
            setTimeout(() => this.startConnection(), 5000);
        }
    }
    public async stopConnection() {
        try {
            await this.hubConnection.stop();
            console.log("Connection stopped");
        } catch (err) {
            console.log("Error while stopping connection: " + err);
        }
    }

    public onReceiveMessage(message: any) {
        console.log("Message received: ", message);
        // Handle incoming messages
    }

    public async sendMessage(senderId: string, receiverId: string, message: string) {
        await this.hubConnection.invoke("SendMessage", senderId, receiverId, message);
    }

    public async setUserActive(userId: string) {
        await this.hubConnection.invoke("SetUserActive", userId);
    }

    public async notifyUserOffline(userId: string) {
        await this.hubConnection.invoke("NotifyUserOffline", userId);
    }

}

export default new ChatService();
