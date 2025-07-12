import { Module } from '@nestjs/common';
import { CategoriesSkillsService } from './categories-skills.service';
import { CategoriesSkillsResolver } from './categories-skills.resolver';

@Module({
  providers: [CategoriesSkillsResolver, CategoriesSkillsService],
})
export class CategoriesSkillsModule {}
