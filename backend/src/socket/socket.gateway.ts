import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";

@WebSocketGateway({cors: true})
export class SocketGateway {

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
