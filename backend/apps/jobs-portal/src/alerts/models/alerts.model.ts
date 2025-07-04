
import { Field, Int, ObjectType } from '@nestjs/graphql';
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
