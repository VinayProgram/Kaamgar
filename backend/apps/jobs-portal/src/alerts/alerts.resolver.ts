import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AlertsService } from "./alerts.service";
import { Alert, CreateAlertInput,PublicAlertJobs } from "./models/alerts.model";
import { Public } from "@app/guards/gaurds.public.service";
@Resolver(() => Alert)
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @Mutation(() => Alert)
  async createAlert(
    @Args('data') data: CreateAlertInput
  ) {
    return await this.alertsService.createAlert(data);
  }

  @Query(() => [Alert])
  async GetAllAlerts(){
    return await this.alertsService.getAllAlerts();
  }
 
  @Query(() => [PublicAlertJobs])
  @Public()
  async GetAllPublicAlerts_Jobs(){
    return await this.alertsService.getAllPublicAlerts_Jobs();
  }

}
