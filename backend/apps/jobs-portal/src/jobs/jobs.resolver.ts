import { Args, Int, ResolveField, Parent,Resolver , Query} from "@nestjs/graphql";
import { Jobs } from "./models/jobs.model";
import { JobsService } from "./jobs.service";

@Resolver(() => Jobs)
export class JobsResolver {
  constructor(
    private authorsService: JobsService,
  ) {}

  @Query(() => Jobs)
  async author(@Args('id', { type: () => Int }) id: number) {
    console.log(id)
    return this.authorsService.getJobs();
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
