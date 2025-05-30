import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity, UserKeys } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';
import { comparePassword } from './utils';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly model: Model<UserDocument>,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDocument> {
        const createdUser = new this.model(dto);
        return createdUser.save(); // O middleware `pre('save')` no UserSchema cuidará da criptografia da senha
    }

    /**
     * Busca um usuário no banco de dados com base na propriedade especificada.
     *
     * @param {UserKeys} prop - Propriedade pela qual deseja buscar (exemplo: 'email', 'name').
     * @param {string} arg - Valor da propriedade que deseja encontrar.
     * @param {UserKeys[] | null} select - Campos opcionais para retornar na consulta.
     * @returns {Promise<UserDocument | null>} - Retorna um usuário se encontrado ou `null` caso contrário.
     *
     * @example
     * ```typescript
     * const user = await usersService.find('email', 'usuario@email.com', ['name', 'email']);
     * console.log(user);
     * ```
     */
    async findOne(prop: UserKeys, arg: string, select: UserKeys[] | null = null): Promise<UserDocument | null> {
        if (!select || !select.length) {
            return await this.model.findOne({ [prop]: arg });
        }
        return await this.model
            .findOne({ [prop]: arg })
            .select(select.join(' '))
            .exec();
    }

    validatePassword(storedPassword: string, suppliedPassword: string): boolean {
        return comparePassword(storedPassword, suppliedPassword);
    }
}
