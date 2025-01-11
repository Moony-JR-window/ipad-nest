import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@Controller("/v1/user")
@ApiTags("User")

export class UserController{
    @Get()
    public async getUsers(){
        return "Hello"
    }
    @Post("/create")
    public async createUser():Promise<any>{
        return "Hello"
    }

}