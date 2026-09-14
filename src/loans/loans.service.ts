import { Injectable, BadRequestException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { eq, isNull } from 'drizzle-orm';
import { loans } from '../drizzle/schema';
import { BooksService } from '../books/books.service';

@Injectable()
export class LoansService {
  constructor(
    private drizzleService: DrizzleService,
    private booksService: BooksService,
  ) {}

  async findAll() {
    const db = this.drizzleService.getDatabase();
    return db.query.loans.findMany({
      where: isNull(loans.deletedAt),
      with: { student: true, book: true, librarian: true },
    });
  }

  async findById(id: number) {
    const db = this.drizzleService.getDatabase();
    return db.query.loans.findFirst({
      where: eq(loans.id, id),
      with: { student: true, book: true, librarian: true },
    });
  }

  async create(data: {
    student_id: number;
    book_id: number;
    librarian_id: number;
    expected_return_date: Date;
  }) {
    const db = this.drizzleService.getDatabase();
    
    // Verify book availability
    const book = await this.booksService.findById(data.book_id);
    if (!book || book.quantity_available <= 0) {
      throw new BadRequestException('Book not available');
    }

    // Decrease book availability
    await this.booksService.decreaseAvailability(data.book_id, 1);

    const result = await db.insert(loans).values(data).returning();
    return result[0];
  }

  async returnBook(id: number) {
    const db = this.drizzleService.getDatabase();
    const loan = await this.findById(id);
    
    if (!loan) {
      throw new BadRequestException('Loan not found');
    }

    if (loan.return_date) {
      throw new BadRequestException('Book already returned');
    }

    // Increase book availability
    await this.booksService.increaseAvailability(loan.book_id, 1);

    const result = await db
      .update(loans)
      .set({ return_date: new Date(), updated_at: new Date() })
      .where(eq(loans.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const db = this.drizzleService.getDatabase();
    await db
      .update(loans)
      .set({ deletedAt: new Date() })
      .where(eq(loans.id, id));
    return { message: 'Loan deleted successfully' };
  }
}
