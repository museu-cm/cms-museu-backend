import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ImageRepository } from "@src/repositories/image.repository";
import { CreateImageDto } from "@src/modules/images/dto/create-image.dto";
import { Image } from "@src/entities/image.entity";

@Injectable()
export class PrismaImageRepository implements ImageRepository {

  constructor(private prismaService: PrismaService) {}

  async create(data: CreateImageDto): Promise<Image> {
    const createdImage = await this.prismaService.image.create({
      data: {
        hash: data.hash,
        fileName: data.fileName,
        size: data.size
      },
    })

    return new Image(createdImage)
  }

  async findByHash(hash: string): Promise<Image | null> {
    const image = await this.prismaService.image.findFirst({
        where: { hash }
    })

    return image ? new Image(image) : null;
  }

  async findAll(): Promise<Image[]> {
    const images = await this.prismaService.image.findMany();

    return images.map(image => new Image(image))
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.image.delete({
        where: { id }
    })
  }

}