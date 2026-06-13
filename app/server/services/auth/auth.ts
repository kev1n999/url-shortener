import { env } from '@/config/env';
import { UserRepository } from '@/database/repositories/user.repositorie';
import { CreateUserDTO } from '@/dto/auth/create-user-dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userRepository = new UserRepository()) {}

  public async userRegister(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('EMAIL_ALREADY_IN_USE');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashed });
  }

  public async userLogin(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new Error('USER_DO_NOT_EXISTS');
    }

    const hashedPassword = await bcrypt.compare(
      data.password,
      userExists.password
    );

    if (!hashedPassword) {
      throw new Error('INCORRECT_PASSWORD');
    }

    const token = jwt.sign({ sub: userExists.id }, env.jwtSecretKey, {
      expiresIn: '7d',
    });
    return token;
  }
}
