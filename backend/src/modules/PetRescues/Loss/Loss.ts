import { Pet } from '../../Pets/Pet';

export class Loss {
  readonly id!: string;
  constructor(
    readonly userId: string,
    public pet: Pet,
    readonly date: Date,
    readonly location: string,
    readonly isRecovered: boolean
  ) {}

  static create(newLost: { userId: string; pet: Pet; date: Date; location: string }): Loss {
    const loss = new Loss(newLost.userId, newLost.pet, newLost.date, newLost.location, false);
    return loss;
  }
}
