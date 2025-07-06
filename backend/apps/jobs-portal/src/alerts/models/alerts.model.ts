
import { Field, Int, ObjectType ,InputType, Float, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Alert {
  @Field()
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  pincode?: string;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  location?: string; // Or a custom scalar for GeoJSON/WKT

  @Field()
  active: boolean;

  @Field()
  selfDestroy: boolean;

  @Field()
  createdDate: Date;

  @Field()
  alertBy: string;

  @Field()
  alertUserType: string;

  @Field({ nullable: true })
  categoryId?: string;
}



@InputType()
export class CreateAlertInput {
  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSON,{ nullable: true })
  location?: any; // You can define a GeoJSON type if needed

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  pincode?: string;

  @Field(() => Float, { nullable: true })
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  selfDestroy?: boolean;

  @Field()
  alertBy: string;

  @Field()
  alertUserType: string;
}
