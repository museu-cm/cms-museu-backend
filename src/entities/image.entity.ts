export class User {
  id: number;
  hash: string;
  fileName: string;
  size: number;
  createdAt: Date;

  constructor(data: User) {
    const { id, hash, fileName, size, createdAt } = data;
    Object.assign(this, {id, hash, fileName, size, createdAt});
  }
}