import { Global, Module } from '@nestjs/common';

import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { SignboardRepository } from "./services/signboard.repository";
import { VenuesRepository } from "./services/venues.repository";
import {StatisticRepository} from "./services/statistic.repository";

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  SignboardRepository,
  VenuesRepository,
  StatisticRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
