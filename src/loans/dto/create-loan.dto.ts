import { IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Librarian ID' })
  @IsNumber()
  @IsNotEmpty()
  librarian_id: number;

  @ApiProperty({ example: '2024-10-14T00:00:00Z', description: 'Expected return date' })
  @IsDateString()
  @IsNotEmpty()
  expected_return_date: string;
}
