import {Injectable, NotFoundException} from '@nestjs/common';
import {EntityRepository} from "@mikro-orm/postgresql";
import {UserEntity} from "../db/entities/user.entity";
import {InjectRepository} from "@mikro-orm/nestjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: EntityRepository<UserEntity>,
    ) {}

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ username });
        if(!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user
    }

}
