import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'STU-2024-001', description: 'Registration number' })
  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @ApiProperty({ example: '6to Grado', description: 'Grade level' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({ example: 'A', description: 'Section' })
  @IsString()
  @IsNotEmpty()
  section: string;

  @ApiProperty({ example: '+51987654321', description: 'Phone number', required: false })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ example: 'parent@example.com', description: 'Parent email', required: false })
  @IsEmail()
  @IsOptional()
  parent_email?: string;

  @ApiProperty({ example: 1, description: 'User ID who created this record' })
  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}
