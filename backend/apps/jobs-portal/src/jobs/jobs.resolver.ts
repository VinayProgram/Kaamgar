import { Args, Int, ResolveField, Parent,Resolver , Query} from "@nestjs/graphql";
import { JobsService } from "./jobs.service";
import { Public } from "@app/guards/gaurds.public.service";
import { Job } from "./models/jobs.model";

@Resolver(() => Job)
export class JobsResolver {
  constructor() {}

  @Query(() => Job)
  async GetAllJobs() {
    return {
        id:1
    }
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
