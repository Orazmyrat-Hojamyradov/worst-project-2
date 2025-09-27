import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
class LocalizedText {
  @ApiProperty({ example: 'Medical University' })
  en: string;

  @ApiProperty({ example: 'Медицинский университет' })
  ru: string;

  @ApiProperty({ example: 'Lukmançylyk uniwersiteti' })
  tm: string;
}
export class CreateUniversityDto {

  @ApiProperty({ example: "https://example.com/university.jpg" })
  @IsOptional()
  @IsUrl()
  photoUrl: string;

  @ApiProperty({ type: LocalizedText })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Modern university specializing in computer science" })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Computer Science and IT' })
  specials: string;

  @ApiProperty({ example: 'Department funded programs available' })
  financing: string;

  @ApiProperty({ example: '4 years' })
  duration: string;

  @ApiProperty({ example: '2025-08-15' })
  applicationDeadline: string;

  @ApiProperty({ example: 'Everyone' })
  gender: string;

  @ApiProperty({ example: '18' })
  age: number;

  @ApiProperty({ example: 'High success, and interest in IT' })
  others: string;

  @ApiProperty({ example: 'Fully covers' })
  medicine: string;

  @ApiProperty({ example: 'No' })
  salary: string;

  @ApiProperty({ example: 'Domitary' })
  domitary: string;

  @ApiProperty({ example: 'No' })
  rewards: string;

  @ApiProperty({ example: 'Knowladge about IT and Programming languages(Python, JavaScript)' })
  others_p: string;

  @ApiProperty({ example: 'https://etut.edu.tm' })
  officialLink: string;
}
