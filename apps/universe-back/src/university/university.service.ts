import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from '../../entities/university.entity';
import { CreateUniversityDto } from 'auth/dto/create-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private repo: Repository<University>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<University>) {
    const uni = this.repo.create(data);
    return this.repo.save(uni);
  }

  update(id: number, data: Partial<University>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
