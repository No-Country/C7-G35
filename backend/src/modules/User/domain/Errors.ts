export class UserNotExist extends Error {
  constructor(id: string) {
    super(`User whit id: ${id} not exists`);
  }
}
