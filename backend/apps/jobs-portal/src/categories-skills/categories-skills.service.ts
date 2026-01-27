import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoriesSkillInput } from './models/create-categories-skill.input';
import { UpdateCategoriesSkillInput } from './models/update-categories-skill.input';
import { categories, skills } from './schema/schema';
import { Database, DATABASE_CONNECTION } from '../db/database-connection.module';

@Injectable()
export class CategoriesSkillsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database
  ) { }

  create(createCategoriesSkillInput: CreateCategoriesSkillInput) {
    return 'This action adds a new categoriesSkill';
  }

  async findAllskills() {
    return await this.db.select().from(skills);
  }

  async findAllcategories() {
    return await this.db.select().from(categories);
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesSkill`;
  }

  update(id: number, updateCategoriesSkillInput: UpdateCategoriesSkillInput) {
    return `This action updates a #${id} categoriesSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesSkill`;
  }
}
