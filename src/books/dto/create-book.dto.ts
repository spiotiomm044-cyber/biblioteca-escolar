import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: '978-84-204-8842-2', description: 'ISBN' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ example: 'Don Quijote', description: 'Book title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Miguel de Cervantes', description: 'Author' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 'Literature', description: 'Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 5, description: 'Quantity available' })
  @IsNumber()
  @Min(0)
  quantity_available: number;

  @ApiProperty({ example: 10, description: 'Total quantity' })
  @IsNumber()
  @Min(1)
  quantity_total: number;

  @ApiProperty({ example: 1, description: 'User ID who created this record' })
  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}
