import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    customerId: number;
    @ApiProperty()
    accountStatus: string;
}