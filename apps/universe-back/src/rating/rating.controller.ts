import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from '../../auth/dto/rating.dto';
import { ApiTags } from '@nestjs/swagger';
import { Rating } from 'entities/rating.entity';

@ApiTags('ratings')
@Controller('api/universities/:id/ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async rate(
    @Param('id') id: number,
    @Body() dto: Partial<Rating>,
  ) {
    return this.ratingService.rateUniversity(id, dto);
  }

  @Get('average')
  async getAverage(@Param('id') id: number) {
    const avg = await this.ratingService.getAverageRating(id);
    return { universityId: id, average: avg };
  }
}
