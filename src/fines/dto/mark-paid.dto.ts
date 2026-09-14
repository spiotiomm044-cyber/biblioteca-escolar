import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkPaidDto {
  @ApiProperty({ example: 1, description: 'User ID who paid the fine' })
  @IsNumber()
  @IsNotEmpty()
  paid_by: number;
}
