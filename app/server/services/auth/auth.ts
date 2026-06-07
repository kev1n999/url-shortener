import { UserRepository } from '@/database/repositories/user.repositorie';
import { CreateUserDTO } from '@/dto/auth/create-user-dto';
import bcrypt from 'bcryptjs';

export class AuthService {
  constructor(private userRepository = new UserRepository()) {}

  public async userRegister(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("EMAIL_ALREADY_IN_USE");
    }

    const hashed = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashed });
  }
}
