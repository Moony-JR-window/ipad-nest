import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

let Increment = AutoIncrementFactory(mongoose)

@Schema() 
export class Customer extends Document {
  @Prop({type:Number})
  _id: number;  // Mongoose automatically generates an _id field when a document is saved
  @Prop() // Marks this property as required
  username?: string;

  @Prop()
  phoneNumber: string;

  @Prop()

  password: string;
}

// Create the schema from the classWeb
export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.plugin(Increment,{inc_fields:'_id'})