import { Injectable, BadRequestException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthService{

    constructor(
        private readonly userService: UserService
    ){}

    async signPayload(payload : JwtPayload){
        return sign(payload, "courgettes_farcies");
    }

    async validateUser(payload : JwtPayload){
        const {id} = payload  
        return this.userService.find(id)
    }


    async login(createUserDto : CreateUserDto){
        const user = await this.userService.findByUsername(createUserDto.username)

        if(!user) throw new BadRequestException('Invalid Credentials')

        if (await compare(createUserDto.password, user.password)) return user;
        throw new BadRequestException('Invalid Credentials')
    }
}
