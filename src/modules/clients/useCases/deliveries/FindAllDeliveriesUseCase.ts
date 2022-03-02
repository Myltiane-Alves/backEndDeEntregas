import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.client.findMany({
      where:{
        id: id_client,
      },
      include: {
        Delivire: true,
      },
    });

    return deliveries;
  }
}
