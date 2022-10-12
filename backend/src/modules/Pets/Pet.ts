import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ImagesLimitReached } from './Errors';
import { Gender, newPet } from './types';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ name: 'owner_id' })
  owner!: string;
  @Column({ nullable: true })
  name?: string;
  @Column()
  gender!: Gender;
  @Column()
  type!: string;
  @Column({ type: 'simple-array' })
  color!: string[];
  @Column()
  size!: string;
  @Column({ nullable: true })
  breed?: string;
  @Column({ nullable: true })
  age?: string;
  @Column({ nullable: true })
  isCastrated?: boolean;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'simple-array', nullable: true })
  images?: string[];

  static create({ name, gender, images, owner, type, age, description, isCastrated, breed, color, size }: newPet): Pet {
    const pet = new Pet();
    pet.name = name;
    pet.gender = gender;
    pet.type = type;
    pet.breed = breed;
    pet.age = age;
    pet.isCastrated = isCastrated;
    pet.description = description;
    pet.owner = owner;
    pet.images = images;
    pet.color = color;
    pet.size = size;
    return pet;
  }

  public userIsOwner(userId: string): boolean {
    return this.owner === userId;
  }

  public addImageUrl(url: string) {
    const imagesLimit = 4;
    if (this.images?.length === imagesLimit) {
      throw new ImagesLimitReached(imagesLimit);
    }
    this.images?.push(url);
  }
}
