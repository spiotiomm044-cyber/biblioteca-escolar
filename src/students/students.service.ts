import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { eq, isNull } from 'drizzle-orm';
import { students } from '../drizzle/schema';

@Injectable()
export class StudentsService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.students.findMany({
      where: isNull(students.deletedAt),
      with: { created_by_user: true },
    });
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.students.findFirst({
      where: eq(students.id, id),
      with: { created_by_user: true },
    });
  }

  async create(data: {
    registration_number: string;
    grade: string;
    section: string;
    phone_number?: string;
    parent_email?: string;
    created_by: number;
  }) {
    const db = this.drizzleService.getDatabase();
    const result = await db.insert(students).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<{
    registration_number: string;
    grade: string;
    section: string;
    phone_number: string;
    parent_email: string;
  }>) {
    const db = this.drizzleService.getDatabase();
    const result = await db
      .update(students)
      .set({ ...data, updated_at: new Date() })
      .where(eq(students.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const db = this.drizzleService.getDatabase();
    await db
      .update(students)
      .set({ deletedAt: new Date() })
      .where(eq(students.id, id));
    return { message: 'Student deleted successfully' };
  }
}
