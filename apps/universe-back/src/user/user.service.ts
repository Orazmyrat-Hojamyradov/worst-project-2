import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(userPartial: Partial<User>) {
    const user = this.usersRepo.create(userPartial);
    return this.usersRepo.save(user);
  }

  async updateProfile(id: string, data: Partial<User>) {
  await this.usersRepo.update(id, data);
  return this.findById(id);
}

async updateProfilePhoto(id: string, filePath: string) {
  await this.usersRepo.update(id, { profilePhoto: filePath });
  return this.findById(id);
}

async deleteProfilePhoto(id: string) {
  await this.usersRepo.update(id, { profilePhoto: null });
  return this.findById(id);
}

async update(id: string, data: Partial<User>) {
  await this.usersRepo.update(id, data);
  return this.findById(id);
}


  

  async seedAdmin() {
    const adminEmail = 'admin@gmail.com';
    let admin = await this.usersRepo.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const hashed = await require('bcrypt').hash('admin123', 10);
      admin = this.usersRepo.create({
        email: adminEmail,
        password: hashed,
        role: UserRole.ADMIN,
        name: 'Static Admin',
      });
      await this.usersRepo.save(admin);
      console.log('✅ Admin user seeded:', adminEmail);
    }
  }

}
