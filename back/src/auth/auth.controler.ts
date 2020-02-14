import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "src/user/interfaces/user.interface";
import { AuthService } from "./auth.service";
import { compare } from "bcrypt";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    
    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ){}

    @Post('register')
    async register(@Body() createUserDto : CreateUserDto){
        const user = await this.userService.create(createUserDto)
        const payload : JwtPayload = {id : user._id, username : user.username} 
        
        const token = await this.authService.signPayload(payload)
        
        user.token = token

        return user
    }

    @Post('login')
    async login(@Body() createUserDto : CreateUserDto){
        const user = await this.authService.login(createUserDto)
        const payload : JwtPayload = {id : user._id, username : user.username} 
        
        const token = await this.authService.signPayload(payload)
        
        user.token = token

        return user
    }
}