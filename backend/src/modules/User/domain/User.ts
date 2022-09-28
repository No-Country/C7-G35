export class User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly location: string;
  private isActive: boolean;

  constructor(id: string, name: string, phone: string, email: string, location: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.location = location;
    this.isActive = isActive;
  }

  static register(id: string, name: string, email: string): User {
    const isActive = true;
    const phone = '';
    const location = '';
    const user = new User(id, name, phone, email, location, isActive);

    return user;
  }

  public deactivate() {
    this.isActive = false;
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      location: this.location
    };
  }
}
