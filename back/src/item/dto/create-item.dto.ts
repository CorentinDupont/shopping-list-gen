import { IsNumber, IsString, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsNumber()
    @ApiProperty()
    readonly price: number;
}
