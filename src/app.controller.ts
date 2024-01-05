import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get("getPermissionsUser")
  root() {
    return {permissions: ["SYS_ADMIN"]};
  }

  @Post("getPermissionsUser")
  rootp() {
    return {permissions: ["SYS_ADMIN"]};
  }

  @Get("user_companies")
  useCompanies() {
    return [{
      id: 1,
      name: "Cooabriel",
      state: "PR",
      image: "/imagemaleatoria"
    },{
        id: 1,
        name: "Teste",
        state: "PR",
        image: "/imagemaleatoria"
    }];
  }

  @Get("companies")
  companies() {
    return [{
      id: 1,
      name: "Cooabriel",
      state: "PR",
      image: "/imagemaleatoria"
    },{
        id: 1,
        name: "Teste",
        state: "PR",
        image: "/imagemaleatoria"
    }];
  }
}

