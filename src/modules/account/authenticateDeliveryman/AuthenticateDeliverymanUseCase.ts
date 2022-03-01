import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receber username, password

    // verificar se username cadatrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }

    // verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password)

    if (!password) {
      throw new Error("Username or password invalid!")
    }

    // gerars token
    const token = sign({ username }, "68871f16802b633725c73c751d44052e", {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token;

  }
}
