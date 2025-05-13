import { Injectable, NotImplementedException, Scope } from "@nestjs/common";
import { AuthRepository } from "@repositories/auth.repository";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(private readonly _authRepository: AuthRepository) {}

  getOneUserService() {
    throw new NotImplementedException("Not implemented");
  }
}
