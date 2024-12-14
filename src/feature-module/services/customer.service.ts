import { Inject, Injectable } from '@nestjs/common';
import { CustomerDto, login } from '../dtos/customer.dto';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CustomerRepository) private repository: CustomerRepository,
  ) {}
  public async createCustomer(
    CustomerDto: CustomerDto,
  ): Promise<CustomerDto | null> {
    const customer = await this.repository.createCustomer(CustomerDto);
    if (!customer) {
      return null;
    }
    return customer;
  }

  public async getCustomer(): Promise<any> {
    return this.repository.getCustomer();
  }

  public async updateCustomer(
    id: string,
    CustomerDto: CustomerDto,
  ): Promise<CustomerDto | null> {
    return this.repository.updateCustomer(id, CustomerDto);
  }
  public async getCustomerById(id: number): Promise<CustomerDto | null> {
    console.log('Service ');

    return this.repository.getCutomerById(id);
  }
  public async login(login: login): Promise<any> {
    try {
      console.log('Service ');

      return this.repository.login(login);
    } catch (error) {}
  }
}
