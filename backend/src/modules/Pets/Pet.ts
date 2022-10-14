import { ImagesLimitReached } from './Errors';
import { Gender, newPet } from './types';

export class Pet {
  id!: string;
  owner!: string;
  name?: string;
  gender!: Gender;
  type!: string;
  color!: string[];
  size!: string;
  breed?: string;
  age?: string;
  isCastrated?: boolean;
  description?: string;
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
    if (!this.images) this.images = [];

    this.images.push(url);
  }
}
