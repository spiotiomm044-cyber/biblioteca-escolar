import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { eq, isNull } from 'drizzle-orm';
import { fines } from '../drizzle/schema';

@Injectable()
export class FinesService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.fines.findMany({
      where: isNull(fines.deletedAt),
      with: { student: true, loan: true, paid_by_user: true },
    });
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.fines.findFirst({
      where: eq(fines.id, id),
      with: { student: true, loan: true, paid_by_user: true },
    });
  }

  async create(data: {
    student_id: number;
    loan_id: number;
    amount: string;
    reason: string;
    status?: string;
  }) {
    const db = this.drizzleService.getDatabase();
    const result = await db.insert(fines).values(data).returning();
    return result[0];
  }

  async markAsPaid(id: number, paid_by: number) {
    const db = this.drizzleService.getDatabase();
    const result = await db
      .update(fines)
      .set({ status: 'paid', paid_by, updated_at: new Date() })
      .where(eq(fines.id, id))
      .returning();
    return result[0];
  }
}
