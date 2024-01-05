import { Company } from "src/entities/company.entity";

export abstract class CompanyRepository {
  abstract findByUserId(id: number): Promise<Company[]>;
}