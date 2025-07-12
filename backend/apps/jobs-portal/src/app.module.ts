import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { AlertsModule } from './alerts/alerts.module';
import { AuthModule } from '@app/guards';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';
import { CategoriesSkillsModule } from './categories-skills/categories-skills.module';

@Module({
  imports: [JobsModule, AlertsModule,AuthModule,
    CategoriesSkillsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: { JSON: GraphQLJSON },
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
