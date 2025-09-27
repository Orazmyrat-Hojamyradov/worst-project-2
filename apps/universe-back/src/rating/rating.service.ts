import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../../entities/rating.entity';
import { University } from '../../entities/university.entity';
import { CreateRatingDto } from '../../auth/dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
    @InjectRepository(University)
    private universityRepo: Repository<University>,
  ) {}

  async rateUniversity(universityId: number, dto: Partial<Rating>) {
    const university = await this.universityRepo.findOneBy({ id: universityId });
    if (!university) throw new NotFoundException('University not found');

    const rating = this.ratingRepo.create({ ...dto, university });
    return this.ratingRepo.save(rating);
  }

  async getAverageRating(universityId: number): Promise<number> {
    const { avg } = await this.ratingRepo
      .createQueryBuilder('rating')
      .select('AVG(rating.score)', 'avg')
      .where('rating.universityId = :id', { id: universityId })
      .getRawOne();

    return parseFloat(avg) || 0;
  }

  async getUniversitiesRanked() {
    return this.ratingRepo
      .createQueryBuilder('rating')
      .select('rating.universityId', 'universityId')
      .addSelect('AVG(rating.score)', 'avg')
      .groupBy('rating.universityId')
      .orderBy('avg', 'DESC')
      .getRawMany();
  }
}
