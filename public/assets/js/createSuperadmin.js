const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const plainPassword = 'Alexpert@yt13102003@'; 
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.player.create({
    data: {
      pseudo: "alex",
      email: "superadmin@esport.com",
      password: hashedPassword,
      confirm_password: hashedPassword,
      class: "SUPERADMIN"
    }
  });

  console.log("✅ Compte SUPERADMIN créé !");
}

main()
  .catch((e) => {
    console.error(" Erreur :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
