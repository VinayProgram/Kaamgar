import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesSkillsResolver } from './categories-skills.resolver';
import { CategoriesSkillsService } from './categories-skills.service';

describe('CategoriesSkillsResolver', () => {
  let resolver: CategoriesSkillsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesSkillsResolver, CategoriesSkillsService],
    }).compile();

    resolver = module.get<CategoriesSkillsResolver>(CategoriesSkillsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
