import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoriesSkillInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
