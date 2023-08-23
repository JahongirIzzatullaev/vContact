export class ContactModel {
  constructor(
    public id: number,
    public name: string,
    public phone_number: string,
    public email: string,
    public tags: string,
  ) {}
}
