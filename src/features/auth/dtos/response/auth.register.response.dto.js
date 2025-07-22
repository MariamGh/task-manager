export class AuthRegisterResponseDto {
  constructor({ id, name, surname, email, phone_number }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone_number = phone_number;
  }
}
