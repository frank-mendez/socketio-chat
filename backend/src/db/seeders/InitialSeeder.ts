import {EntityManager} from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import {GenderEnum} from "../../enums/gender.enum";
import * as bcrypt from 'bcryptjs';

export class InitialSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {

        const salt = await bcrypt.genSalt(10);

        const initialUser = em.create('UserEntity', {
            username: 'admin',
            fullName: 'Admin',
            password: await bcrypt.hash('admin', salt),
            gender: GenderEnum.MALE,
            profilePicture: 'https://i.pravatar.cc/322'
        });

        em.persist([initialUser]);
    }
}