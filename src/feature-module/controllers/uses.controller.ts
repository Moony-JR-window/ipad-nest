import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";

@Controller("/v1/user")
export class UserController {

    @Get("")
    getUser(): string {
        return "User";
    }

    @Post("/create")
    public async createUser(@Body() user: UserDto): Promise<any> {

        console.log("User Data:", user);
        
    }



}