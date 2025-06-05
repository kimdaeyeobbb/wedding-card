import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  findAll(): Promise<Guest[]> {
    return this.guestsRepository.find();
  }

  findOne(id: number): Promise<Guest | null> {
    return this.guestsRepository.findOneBy({ id });
  }

  async create(guest: Partial<Guest>): Promise<Guest> {
    const newGuest = this.guestsRepository.create(guest);
    return this.guestsRepository.save(newGuest);
  }

  async update(id: number, guest: Partial<Guest>): Promise<Guest | null> {
    await this.guestsRepository.update(id, guest);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.guestsRepository.delete(id);
  }
}