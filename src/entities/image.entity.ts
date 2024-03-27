export class Image {
  id: number;
  hash: string;
  fileName: string;
  size: number;
  createdAt: Date;

  constructor(data: Image) {
    const { id, hash, fileName, size, createdAt } = data;
    Object.assign(this, {id, hash, fileName, size, createdAt});
  }
}