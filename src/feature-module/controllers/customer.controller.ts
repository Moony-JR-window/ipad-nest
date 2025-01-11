import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CustomerDto } from "../dtos/customer.dto";
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CustomerService } from "../services/customer.service";
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ResponeDta } from "../schamas/responeDta.schema";


@Controller("customer") 
@ApiTags("Customer")

export class CustomerController {

    constructor(
        private readonly customerService: CustomerService,
    ) { }

    @Post('create')
    public async createCustomer(
        @Body() customer: CustomerDto
    ): Promise<CustomerDto | null> {
        if (!customer) {
            throw new BadRequestException('Customer data is missing');
        }
        try {

            const createdCustomer = await this.customerService.createCustomer(customer);
            if (!createdCustomer) {
                throw new InternalServerErrorException('Failed to create customer');
            }
            
            return createdCustomer;
        } catch (error) {
            console.error('Error while creating customer:', error);
            throw new InternalServerErrorException('Error while creating customer');
        }
    }
    @Get()
    public async getCustomer():Promise<ResponeDta<CustomerDto>|null>{
        const customer=await this.customerService.getCustomer();
        console.log("customer",customer);
        if(!customer){return null}
        return new ResponeDta("Customer fetched successfully", customer);
    }
    @Put('/profile')
    @ApiQuery({ name: 'id', description: 'User ID', type: String })
    public async updateProfile(
        @Query('id') idUser: string,
        @Body() customer:CustomerDto
    ):Promise<ResponeDta<CustomerDto>|null>{
        console.log(idUser);
        const data=await this.customerService.updateCustomer(idUser,customer);
        if(!data){return null}
        return new ResponeDta("success",data)
    }
    @Post('/delete')
    @ApiParam({ name: 'id', description: 'User ID', type: String })
    public async deleteCustomer(
        @Query('id') idUser: string
    ):Promise<ResponeDta<CustomerDto>|null>{
        
        return null;
    }
}