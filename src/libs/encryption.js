import bcrypt from "bcrypt";

async function compareText(hash, text) {
  return bcrypt.compare(text, hash);
}

async function hashText(text) {
  const saltRounds = process.env.SALT_ROUNDS;

  if (!saltRounds || Number.isNaN(+saltRounds)) {
    throw new Error("Invalid salt rounds");
  }

  return bcrypt.hash(text, +saltRounds);
}

export { compareText, hashText };
