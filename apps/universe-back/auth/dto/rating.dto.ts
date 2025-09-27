import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: "4a776d2e-4262-415e-9a1a-4b7104fdb676" })
  userId: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;
}
