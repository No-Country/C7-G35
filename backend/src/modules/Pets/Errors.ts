export class PetNotExist extends Error {
  constructor(id: string) {
    super(`Pet whit id: ${id} not exists`);
  }
}

export class IsNotOwner extends Error {
  constructor(ownerId: string) {
    super(`user: ${ownerId} is not the owner`);
  }
}
