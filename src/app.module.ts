import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import configs from './feature-module/configs/configs';
import { CustomerController } from './feature-module/controllers/customer.controller';
import { CustomerService } from './feature-module/services/customer.service';
import { CustomerRepository } from './feature-module/repository/customer.repository';
import { CustomerSchema } from './feature-module/schamas/customer.schema';
import { UserController } from './feature-module/controllers/uses.controller';


let Provides=[CustomerService,CustomerRepository]

let Controller=[CustomerController,UserController]

const SchemaModel=[
  { name: 'Customer', schema: CustomerSchema }, // Use the actual schema
]

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: configs.database, // Path to .env file
    }),
    MongooseModule.forRootAsync({
      useFactory: async () =>{
        const uri = configs.database;;
        await mongoose.connect (uri);
        return {uri};
      }, 
    }),
    MongooseModule.forFeature(SchemaModel),

    // MongooseModule.forFeature([UserRepository]),
  ],
  controllers:Controller,
  providers:Provides
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    try {
      if (mongoose.connection.readyState === 1) {
        this.logger.log('MongoDB connected successfully');
      } else {
        this.logger.warn('MongoDB is not connected yet');
      }
    } catch (error) {
      this.logger.error('Error during MongoDB connection setup:', error);
    }
  }
}
