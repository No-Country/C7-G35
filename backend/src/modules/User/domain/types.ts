export interface newUserRequest {
  id: string;
  name: string;
  email: string;
}

export interface userUpdate {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}
