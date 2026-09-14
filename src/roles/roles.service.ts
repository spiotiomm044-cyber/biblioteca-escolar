import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { and, eq, isNull } from 'drizzle-orm';
import { roles } from '../drizzle/schema';

@Injectable()
export class RolesService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.roles.findMany();
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.roles.findFirst({
      where: eq(roles.id, id),
    });
  }

  async findByName(name: string) {
    const db = this.drizzleService.getDatabase();
    return db.query.roles.findFirst({
      where: eq(roles.name, name),
    });
  }

  async create(data: { name: string; description?: string }) {
    const db = this.drizzleService.getDatabase();
    const result = await db
      .insert(roles)
      .values(data)
      .returning();
    return result[0];
  }
}
