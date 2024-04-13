import {Module} from '@nestjs/common';
import {SocketService} from './socket.service';
import {AppGateway} from "../app.gateway";

@Module({
    providers: [SocketService, AppGateway],
    exports: [SocketService]
})
export class SocketModule {
}
