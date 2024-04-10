import {EntityManager} from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';

export class InitialSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const initialUser = em.create('UserEntity', { username: 'admin', password: 'admin' });
        em.persist([initialUser]);
    }
}