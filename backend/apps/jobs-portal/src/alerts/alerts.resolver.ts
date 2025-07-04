import { Args, Int, ResolveField, Parent,Resolver , Query} from "@nestjs/graphql";
import { Public } from "@app/guards/gaurds.public.service";
import { Alert } from "./models/alerts.model";
import { AlertsService } from "./alerts.service";

@Resolver(() => Alert)
export class AlertsResolver {
  constructor(
    private readonly alertsService:AlertsService
  ) {}

  @Query(() => [Alert])
  async GetAllAlerts() {
    return await this.alertsService.getAllAlerts()
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
