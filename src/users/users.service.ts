import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { and, eq, isNull } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.users.findMany({
      with: {
        role: true,
      },
    });
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        role: true,
      },
    });
  }

  async findByEmail(email: string) {
    const db = this.drizzleService.getDatabase();
    return db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        role: true,
      },
    });
  }

  async create(data: { name: string; email: string; password: string; role_id: number }) {
    const db = this.drizzleService.getDatabase();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();
    return result[0];
  }

  async update(id: number, data: Partial<{ name: string; email: string; role_id: number }>) {
    const db = this.drizzleService.getDatabase();
    const result = await db
      .update(users)
      .set({ ...data, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const db = this.drizzleService.getDatabase();
    await db.delete(users).where(eq(users.id, id));
    return { message: 'User deleted successfully' };
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
