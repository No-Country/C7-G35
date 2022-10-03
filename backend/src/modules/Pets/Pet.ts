import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, newPet } from './types';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ nullable: true })
  name?: string;
  @Column()
  gender!: Gender;
  @Column()
  type!: string;
  @Column({ nullable: true })
  race?: string;
  @Column({ nullable: true })
  age?: string;
  @Column({ nullable: true })
  isCastrated?: boolean;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column()
  owner!: string;
  @Column({ type: 'simple-array' })
  images?: string[];

  static create({ name, gender, images, owner, type, age, description, isCastrated, race }: newPet): Pet {
    const pet = new Pet();
    pet.name = name;
    pet.gender = gender;
    pet.type = type;
    pet.race = race;
    pet.age = age;
    pet.isCastrated = isCastrated;
    pet.description = description;
    pet.owner = owner;
    pet.images = images;
    return pet;
  }

  public userIsOwner(userId: string): boolean {
    return this.owner === userId;
  }
}
