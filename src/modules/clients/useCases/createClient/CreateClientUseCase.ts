import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({username, password,}: ICreateClient) {
        // validar se o usuário existe
        const clientExists = await prisma.client.findFirst({
            where: {
                username: {
                   equals: username,
                  
                },
            },
        });

        if(clientExists) {
            throw new Error('Client already exists');
        }

        const hashPassword = await hash(password, 10);
        // criptografar a senha

        // salvar o client
        const client =  await prisma.client.create({
            data: {
                username,
                password: hashPassword,
            },
        });

        return client;
    }
}