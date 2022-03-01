import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receber username, password

        // verificar se username cadatrado
        const client = await prisma.client.findFirst({
            where: {
                username,
            }
        })

        if(!client) {
            throw new Error("Username or password invalid!")
        }

        // verificar se senha corresponde ao username
        const passwordMatch = await compare(password, client.password)

        if(!password) {
            throw new Error("Username or password invalid!")
        }

        // gerars token
        const token = sign({username}, "68871f16802b633725c73c751d77052e", {
            subject: client.id,
            expiresIn: '1d'
        })

        return  token;
        

    }
}