import {Injectable, NotFoundException} from '@nestjs/common';
import {EntityRepository} from "@mikro-orm/postgresql";
import {UserEntity} from "../db/entities/user.entity";
import {InjectRepository} from "@mikro-orm/nestjs";
import {CreateUserDto} from "./dto/create-user.dto";
import {EntityManager} from "@mikro-orm/core";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: EntityRepository<UserEntity>,
        private readonly em: EntityManager
    ) {}

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ username });
        if(!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ id });
        if(!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user
    }


    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = new UserEntity(createUserDto);
        await this.em.persistAndFlush(user);
        return user
    }

    async getUsers(id: number): Promise<UserEntity[]> {
        return await this.userRepository.find({id: {$ne: id}});
    }

}
