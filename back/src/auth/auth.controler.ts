import {
    ApiTags,
} from '@nestjs/swagger';
import {
    Controller,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    Res,
} from '@nestjs/common';
import {
    CreateUserDto,
} from '../user/dto/create-user.dto';
import {
    UserService,
} from '../user/user.service';
import {
    JwtPayload,
} from './interfaces/jwt-payload.interface';
import {
    User,
} from '../user/interfaces/user.interface';
import {
    AuthService,
} from './auth.service';
import {
    compare,
} from 'bcrypt';

@ApiTags()
@Controller()
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() response) {
        const user = await this.userService.create(createUserDto);
        const payload: JwtPayload = {
            id: user._id,
            username: user.username,
        };
        const accessToken = await this.authService.signPayload(payload);
        user.access_token = accessToken;
        return response.status(HttpStatus.OK).json(user);
    }

    @Post('token')
    async login(@Body() createUserDto: CreateUserDto, @Res() response) {
        let user = await this.userService.findByUsername(createUserDto.username);
        user = await this.authService.login(createUserDto, user);
        const payload: JwtPayload = {
            id: user._id,
            username: user.username,
        };
        const accessToken = await this.authService.signPayload(payload);
        user.access_token = accessToken;
        return response.status(HttpStatus.OK).json(user);
    }
}
