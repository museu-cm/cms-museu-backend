import { Image } from "@src/entities/image.entity";
import { CreateImageDto } from "@src/modules/images/dto/create-image.dto";

export abstract class ImageRepository {
    abstract create(data: CreateImageDto): Promise<Image>;
    abstract findByHash(hash: string): Promise<Image | null>;
    abstract findAll(): Promise<Image[]>;
    // abstract update(id: number, data: UpdateUserDto): Promise<User>;
    abstract deleteById(id: number): Promise<void>;
  }