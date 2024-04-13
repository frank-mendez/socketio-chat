import {
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {SocketService} from './socket/socket.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private socketService: SocketService) {
    }

    private userSocketMap = {}

    @WebSocketServer() public server: Server;
    private logger: Logger = new Logger('AppGateway');


    afterInit(server: Server) {
        this.socketService.socket = server;
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const userId = client.handshake.query.userId as string;
        delete this.userSocketMap[userId]
        this.socketService.socket.emit('getOnlineUsers', Object.keys(this.userSocketMap))
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        const userId = client.handshake.query.userId as string;
        if (userId != "undefined") this.userSocketMap[userId] = client.id;
        this.socketService.socket.emit('getOnlineUsers', Object.keys(this.userSocketMap))
    }

    public getReceiverSocketId(receiverId: string) {
        return this.userSocketMap[receiverId]
    }
}