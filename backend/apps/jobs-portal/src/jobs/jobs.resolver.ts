import { Args, Int, ResolveField, Parent,Resolver , Query} from "@nestjs/graphql";
import { Alert } from "../alerts/models/alerts.model"
import { JobsService } from "./jobs.service";
import { Public } from "@app/guards/gaurds.public.service";

@Resolver(() => Alert)
export class JobsResolver {
  constructor(
    private authorsService: JobsService,
  ) {}

  @Query(() => Alert)
  async GetAllAlerts() {
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
