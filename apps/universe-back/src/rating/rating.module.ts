import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RankingController } from 'src/ranking/ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from 'entities/rating.entity';
import { University } from 'entities/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, University])],
  controllers: [RatingController, RankingController],
  providers: [RatingService],
  exports: [RatingService], 
})
export class RatingModule {}
