import { Controller, Get } from '@nestjs/common';
import { RatingService } from '../rating/rating.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  async getRanking() {
    return this.ratingService.getUniversitiesRanked();
  }
}
