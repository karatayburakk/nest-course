import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(body: CreateUserDto): Promise<User> {
    const { email, password } = body;
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User with given id not found!');

    Object.assign(user, body);

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User with given id not found!');

    return this.repo.remove(user);
  }
}
