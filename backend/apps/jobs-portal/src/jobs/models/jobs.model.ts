
import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
@ObjectType()
export class Job {
  @Field()
  id: string;

  @Field({ nullable: true })
  location?: string; // or GeoJSON scalar

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  pincode?: string;

  @Field({ nullable: true })
  jobDescription?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  imagedata?: any;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  radiustofind?: number;

  @Field()
  consumerId: string;

  @Field()
  categoryId: string;

  @Field()
  status: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
