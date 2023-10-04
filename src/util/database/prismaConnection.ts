import { PrismaClient } from "@prisma/client"

export class PrismaConnection {
    private static prismaInstance = new PrismaClient();

    private constructor() { };

    public static getConnection(): PrismaClient {
        if (!PrismaConnection.prismaInstance) {
            this.prismaInstance = new PrismaClient();
        };

        return PrismaConnection.prismaInstance;
    }
};