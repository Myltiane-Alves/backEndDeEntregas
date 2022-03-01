import { prisma } from "../../../database/prismaClient";

export class FindAllAvailableUseCase {
  async execute() {
    const deliverie = await prisma.delivire.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliverie;
  }
}
