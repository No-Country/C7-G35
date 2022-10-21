import { Pet } from '../../Pets/Pet';

export class Loss {
  readonly id!: string;
  constructor(
    readonly userId: string,
    public pet: Pet,
    readonly date: Date,
    readonly location: string,
    readonly isRecovered: boolean,
    readonly publicContact?: string
  ) {}

  static create(newLost: { userId: string; pet: Pet; date: Date; location: string; publicContact?: string }): Loss {
    const loss = new Loss(newLost.userId, newLost.pet, newLost.date, newLost.location, false, newLost.publicContact);
    return loss;
  }
}
