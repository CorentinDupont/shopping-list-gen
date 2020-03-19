import { Injectable, BadRequestException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
    ) {}

    async signPayload(payload: JwtPayload) {
        return sign(payload, 'courgettes_farcies');
    }

    async validateUser(payload: JwtPayload) {
        const {id} = payload;
        return this.userService.find(id);
    }

    async login(createUserDto: CreateUserDto, foundUser: User) {
        if (!foundUser) throw new BadRequestException('Invalid Credentials');

        if (await compare(createUserDto.password, foundUser.password)) return foundUser;
        throw new BadRequestException('Invalid Credentials');
    }
}
