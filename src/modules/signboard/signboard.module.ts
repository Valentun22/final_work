import { Module } from '@nestjs/common';
import { SignboardController } from './signboard.controller';
import { SignboardService } from './services/signboard.service';

@Module({
  controllers: [SignboardController],
  providers: [SignboardService],
  exports: [],
})
export class SignboardModule {}
