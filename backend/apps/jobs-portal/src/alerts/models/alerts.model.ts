
import { Field, Int, ObjectType ,InputType, Float, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Category, Skill } from '../../categories-skills/models/categories-skill.entity';

@ObjectType()
export class Alert {
  @Field()
  id: string;

  @Field()
  title: string; // 

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

@ObjectType()
export class PublicAlertJobs {
  @Field(() => Alert)
  alerts: Alert;

  @Field(() => Skill)
  skills: Skill;

  @Field(() => Category)
  categories: Category;
}

@InputType()
export class CreateAlertInput {
  @Field()
  title: string;  // ✅ Must be here

  @Field()
  description?: string;

  @Field()
  address?: string;

  @Field()
  pincode?: string;

  @Field()
  minPrice?: number;

  @Field()
  maxPrice?: number;

  @Field()
  active: boolean;

  @Field()
  selfDestroy: boolean;

  @Field()
  alertBy: string;

  @Field()
  alertUserType: string;

  @Field()
  categoryId?: string;

  @Field(() => GraphQLJSON)
  location:any;

  @Field()
  skillId: string;

}
