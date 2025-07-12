import { CreateCategoriesSkillInput } from './create-categories-skill.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoriesSkillInput extends PartialType(CreateCategoriesSkillInput) {
  @Field(() => Int)
  id: number;
}
