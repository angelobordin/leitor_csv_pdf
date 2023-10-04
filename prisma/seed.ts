import { createReadStream } from 'fs';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.lote.createMany({
        data: [
            {
                id: 3,
                nome: '17',
                ativo: true,
                criado_em: new Date(Date.now()),
            }, {
                id: 6,
                nome: '18',
                ativo: true,
                criado_em: new Date(Date.now())
            }, {
                id: 7,
                nome: '19',
                ativo: true,
                criado_em: new Date(Date.now())
            }
        ]
    })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
