import { IsNumber, IsString, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}
