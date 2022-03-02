import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.client.findMany({
      where:{
        id: id_client,
      },
      select: {
        Delivire: true,
        id: true,
        username: true,
      },
    });

    return deliveries;
  }
}
