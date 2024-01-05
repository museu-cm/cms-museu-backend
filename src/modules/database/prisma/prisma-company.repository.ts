import { Injectable } from '@nestjs/common';
import { Company } from 'src/entities/company.entity';
import { CompanyRepository } from 'src/repositories/company.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  async findByUserId(id: number): Promise<Company[]> {
    const companies = await this.prismaService.companyTable.findMany({
      where: {
        permissions: {
          some: {
            userId: id,
          },
        },
      },
    });

    return companies.map(c => new Company(c));
  }
}
