import { CreateUserDTO } from '@/dto/auth/create-user-dto';
import { prisma } from '..';

export class UserRepository {
  public async create(data: CreateUserDTO) {
    return await prisma.user.create({ data });
  }

  public async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
