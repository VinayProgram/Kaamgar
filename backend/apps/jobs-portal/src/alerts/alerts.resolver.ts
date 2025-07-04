import { Args, Int, ResolveField, Parent,Resolver , Query} from "@nestjs/graphql";
import { Public } from "@app/guards/gaurds.public.service";
import { Alert } from "./models/alerts.model";

@Resolver(() => Alert)
export class AlertsResolver {
  constructor() {}

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
