import { Pet } from '../../Pets/Pet';

export class Rescue {
  readonly id!: string;
  constructor(
    readonly userId: string,
    public pet: Pet,
    readonly date: Date,
    readonly location: string,
    readonly isRecovered: boolean
  ) {}

  static create(newRescue: { userId: string; pet: Pet; date: Date; location: string }): Rescue {
    const rescue = new Rescue(newRescue.userId, newRescue.pet, newRescue.date, newRescue.location, false);
    return rescue;
  }
}
