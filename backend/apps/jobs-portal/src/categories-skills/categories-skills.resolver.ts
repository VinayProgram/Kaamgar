import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Category, Skill } from './models/categories-skill.entity';
import { CategoriesSkillsService } from './categories-skills.service';


@Resolver(() => [Category, Skill])
export class CategoriesSkillsResolver {
  constructor(private readonly categoriesSkillsService: CategoriesSkillsService) {}


  @Query(() => [Category], { name: 'categories' })
  async findAllCategories() {
    return await this.categoriesSkillsService.findAllcategories();
  }

  @Query(() => [Skill], { name: 'skills' })
  async findAllSkills() {
    return await this.categoriesSkillsService.findAllskills();
  }
}
