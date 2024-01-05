import { Expose } from "class-transformer";
import { Company } from "src/entities/company.entity";

export class LoginResponseDto {
  @Expose({ name: "token" })
  accessToken: string;

  companies: Company[];

  constructor(data: LoginResponseDto) {
    const { accessToken, companies } = data;
    Object.assign(this, { accessToken, companies });
  }
}