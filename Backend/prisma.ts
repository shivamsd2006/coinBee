import "dotenv/config";
// Import the adapter required by Prisma 7
import { PrismaPg } from "@prisma/adapter-pg";
// Import the generated client
import { PrismaClient } from "./generated/prisma/client.js";

// 1. Grab the URL
const connectionString = `${process.env.DATABASE_URL}`;

// 2. Initialize the Prisma 7 Adapter
const adapter = new PrismaPg({ connectionString });

// 3. Inject the adapter into the Client
const prisma = new PrismaClient({ adapter });

export { prisma };

