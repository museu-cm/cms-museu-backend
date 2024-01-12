import { Expose } from "class-transformer";

export class LoginResponseDto {

  @Expose({ name: "token" })
  accessToken: string;

  @Expose({ name: "id" })
  userId: number;

  constructor(data: LoginResponseDto) {
    const { accessToken, userId } = data;
    Object.assign(this, { accessToken, userId });
  }
}