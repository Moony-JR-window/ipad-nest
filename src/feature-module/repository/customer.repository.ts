import { CustomerDto, login } from '../dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schamas/customer.schema';
import * as jwt from 'jsonwebtoken';

export class CustomerRepository {
    private readonly jwtSecret = 'T3JvJ6zAziQJgY6Q9VvnNyk3F6wZ10N3TPBvlR8R9aBcScfbOQ+Hkg=='; // Replace with a secure key
    private readonly tokenExpiry = '1h'; // Token validity duration (e.g., 1 hour)

    constructor(
        @InjectModel('Customer') private readonly CustomerModel: Model<CustomerDto>,
    ) { }
    public async createCustomer(
        CustomerDto: CustomerDto,
    ): Promise<CustomerDto | null> {
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
    public async updateCustomer(
        id: string,
        CustomerDto: CustomerDto,
    ): Promise<CustomerDto | null> {
        await this.CustomerModel.findByIdAndUpdate(id, CustomerDto);
        const customer = await this.CustomerModel.findById(id);
        return customer;
    }
    public async getCutomerById(id: number): Promise<CustomerDto> {
        console.log('Repositories');

        return await this.CustomerModel.findById(id);
    }
    public async login(login: login): Promise<any> {
        try {
            console.log('Repo');

            if (!login) {
                throw new Error('Login data is required');
            }

            const data = await this.CustomerModel.findOne({
                phoneNumber: login.phoneNumber,
            });

            if (data) {
                // Validate credentials
                if (
                    data.password === login.password &&
                    data.phoneNumber === login.phoneNumber
                ) {
                    console.log('Login successful');
                    console.log('JWT Secret:', this.jwtSecret);

                    // Create a JWT token
                    const token = jwt.sign(
                        {
                            id: data._id, // Include user-specific data
                            phoneNumber: data.phoneNumber,
                        },
                        this.jwtSecret, // Secret key
                        { expiresIn: this.tokenExpiry }, // Token expiration
                    );

                    return {
                        message: 'Login successful',
                        token, // Return the token
                        user: data, // Optionally return user details
                    };
                }
            }
        } catch (error) {
            console.error('Error in Repo:', error.message);
            throw new Error('Error Repo');
        }
    }
}
