import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import configuration from "../config/configuration";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {UserModule} from './user/user.module';
import {MessageModule} from './message/message.module';
import {ConversationEntity, MessageEntity, UserEntity} from "./db/entities";
import {SocketModule} from './socket/socket.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            cache: true,
        }),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                driver: PostgreSqlDriver,
                dbName: configService.get('DB_NAME'),
                user: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                host: configService.get('DB_HOST'),
                entities: [UserEntity, MessageEntity, ConversationEntity],
                forceUtcTimezone: true,
                driverOptions: {
                    timezone: 'utc',
                },
                debug: true,
                migrations: {
                    tableName: 'mikro_orm_migrations',
                    path: './src/db/migrations',
                    transactional: true,
                    allOrNothing: true,
                    dropTables: false,
                    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
                    safe: false,
                    emit: 'ts',
                },
                seeder: {
                    defaultSeeder: 'InitialSeeder',
                    path: './src/db/seeders',
                    transactional: true,
                    run: true,
                },
                cache: {
                    enabled: true,
                    pretty: true,
                },
                discovery: {
                    warnWhenNoEntities: true,
                },
            })
        }),
        UserModule,
        AuthModule,
        MessageModule,
        SocketModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
