
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users } from "../shared/schema.js";

// Initialize database connection
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

// User storage functions
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const [user] = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();
    
    return { success: true, user: { id: user.id, username: user.username } };
  } catch (error) {
    if (error.constraint === 'users_username_unique') {
      return { success: false, error: 'Username already exists' };
    }
    throw error;
  }
}

export async function getUserByUsername(username) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  
  return user;
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
