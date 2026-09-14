import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [DrizzleModule, BooksModule],
  providers: [LoansService],
  controllers: [LoansController],
  exports: [LoansService],
})
export class LoansModule {}
