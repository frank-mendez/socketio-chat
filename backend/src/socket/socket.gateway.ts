import {
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Server} from 'socket.io';

@WebSocketGateway({cors: true})
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(SocketGateway.name);

    @SubscribeMessage('events')
    handleMessage(client: any, data: any) {
        this.logger.log(`Client ${client.id} sent: ${data}`);
        this.logger.debug(`Payload: ${data}`);
        return {
            event: 'pong',
            data: data
        }
    }
}
