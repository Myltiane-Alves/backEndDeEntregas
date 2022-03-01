import { Request, Response } from "express";
import { CreateClientUseCase } from "../../../clients/useCases/createClient/CreateClientUseCase";


export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createDeliverymanUseCase = new CreateClientUseCase();
    const result = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
