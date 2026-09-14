import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFineDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty({ example: 1, description: 'Loan ID' })
  @IsNumber()
  @IsNotEmpty()
  loan_id: number;

  @ApiProperty({ example: '25.00', description: 'Fine amount' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: 'Book returned late', description: 'Reason for fine' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 'pending', description: 'Status', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
