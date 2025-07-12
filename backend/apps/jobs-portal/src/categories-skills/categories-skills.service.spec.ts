import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesSkillsService } from './categories-skills.service';

describe('CategoriesSkillsService', () => {
  let service: CategoriesSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesSkillsService],
    }).compile();

    service = module.get<CategoriesSkillsService>(CategoriesSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
