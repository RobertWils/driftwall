// CLI entry for `pnpm db:seed` / `npm run db:seed`.
// Delegates to shared seeder so /api/seed can reuse it.

import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seed-logic";

const prisma = new PrismaClient();

async function main() {
  console.log("🌊 Seeding Driftwall…");
  const { scans, threats } = await seedDatabase(prisma);
  console.log(`   ✓ ${scans} agent scans`);
  console.log(`   ✓ ${threats} threat events`);
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
