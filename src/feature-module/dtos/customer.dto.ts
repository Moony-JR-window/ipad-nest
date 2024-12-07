import { ApiProperty } from "@nestjs/swagger";


export class CustomerDto {
    // @ApiProperty()
    _id?:number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    phoneNumber: string;
    @ApiProperty()
    password: string;

}

export class GetCusomterById{
    @ApiProperty()
    _id:number;

}