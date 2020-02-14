import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controler";
import { AuthService } from "./auth.service";

@Module({
    providers: [AuthService],
    controllers : [AuthController],
    imports : [
        UserModule
    ],
    exports : []
})
export class AuthModule{}