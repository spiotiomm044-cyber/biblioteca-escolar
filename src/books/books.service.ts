import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { eq, isNull } from 'drizzle-orm';
import { books } from '../drizzle/schema';

@Injectable()
export class BooksService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.books.findMany({
      where: isNull(books.deletedAt),
      with: { created_by_user: true },
    });
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.books.findFirst({
      where: eq(books.id, id),
      with: { created_by_user: true },
    });
  }

  async create(data: {
    isbn: string;
    title: string;
    author: string;
    category: string;
    quantity_available: number;
    quantity_total: number;
    created_by: number;
  }) {
    const db = this.drizzleService.getDatabase();
    const result = await db.insert(books).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<{
    title: string;
    author: string;
    category: string;
    quantity_available: number;
    quantity_total: number;
  }>) {
    const db = this.drizzleService.getDatabase();
    const result = await db
      .update(books)
      .set({ ...data, updated_at: new Date() })
      .where(eq(books.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const db = this.drizzleService.getDatabase();
    await db
      .update(books)
      .set({ deletedAt: new Date() })
      .where(eq(books.id, id));
    return { message: 'Book deleted successfully' };
  }

  async decreaseAvailability(id: number, quantity: number = 1) {
    const db = this.drizzleService.getDatabase();
    const book = await this.findById(id);
    if (book && book.quantity_available >= quantity) {
      return this.update(id, {
        quantity_available: book.quantity_available - quantity,
      });
    }
    return null;
  }

  async increaseAvailability(id: number, quantity: number = 1) {
    const db = this.drizzleService.getDatabase();
    const book = await this.findById(id);
    if (book) {
      return this.update(id, {
        quantity_available: book.quantity_available + quantity,
      });
    }
    return null;
  }
}
