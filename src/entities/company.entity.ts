export class Company {
  id: number
  name: string

  constructor(data: Company){
    const { id, name } = data;
    Object.assign(this, { id, name });
  }
}