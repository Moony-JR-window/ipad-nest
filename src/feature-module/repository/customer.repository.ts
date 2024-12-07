
import { CustomerDto } from "../dtos/customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../schamas/customer.schema";


export class CustomerRepository {
    findById(id: string): CustomerDto | PromiseLike<CustomerDto> {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectModel('Customer') private readonly CustomerModel: Model<CustomerDto>
    ) { }
    public async createCustomer(CustomerDto: CustomerDto): Promise<CustomerDto | null> {
        const customer = new this.CustomerModel(CustomerDto);
        if (!customer) {
            return null;
        }

        return await customer.save();
    }

    public async getCustomer(): Promise<any> {
        const find_all = this.CustomerModel.find();
        return await find_all;
    }
    public async updateCustomer(id: string, CustomerDto: CustomerDto): Promise<CustomerDto|null> {
        await this.CustomerModel.findByIdAndUpdate(id, CustomerDto);
        const customer = await this.CustomerModel.findById(id);
        return customer;
    }
    public async getCutomerById(id:number): Promise<CustomerDto> {
        console.log("Repositories");
        
       return await this.CustomerModel.findById(id);

    }
}