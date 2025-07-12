import { Injectable } from '@nestjs/common';
import { CreateCategoriesSkillInput } from './models/create-categories-skill.input';
import { UpdateCategoriesSkillInput } from './models/update-categories-skill.input';
import { categories, skills } from './schema/schema';
import { db } from '../db';

@Injectable()
export class CategoriesSkillsService {
  create(createCategoriesSkillInput: CreateCategoriesSkillInput) {
    return 'This action adds a new categoriesSkill';
  }

  async findAllskills() {
    return await db.select().from(skills);
  }

  async findAllcategories() {
    return await db.select().from(categories);
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
