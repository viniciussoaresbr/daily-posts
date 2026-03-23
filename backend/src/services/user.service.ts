import { prisma } from '../database/prisma';
import { IUser, IUserService } from '../interfaces';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { emailValidation, passwordValidation } from '../utils/user.validate';

class UserService implements IUserService {
  async save(userBody: IUser): Promise<IUser> {
    const { name, lastname, email, password } = userBody;

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) throw new createError.Conflict('E-mail já foi cadastrado');

    emailValidation(email);
    if (password) passwordValidation(password);

    const userPassword = password ? bcrypt.hashSync(password, 8) : '';

    const user = await prisma.user.create({
      data: {
        name: name,
        lastname: lastname,
        email: email,
        password: userPassword,
      },
    });
    return user as IUser;
  }

  async findUserById(id: number): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user as IUser | null;
  }
}

export default UserService;
