import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { MarkPaidDto } from './dto/mark-paid.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Fines')
@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Librarian')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new fine' })
  @ApiResponse({ status: 201, description: 'Fine created successfully' })
  async create(@Body() createFineDto: CreateFineDto) {
    return this.finesService.create(createFineDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all fines' })
  @ApiResponse({ status: 200, description: 'List of fines' })
  async findAll() {
    return this.finesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a fine by ID' })
  @ApiResponse({ status: 200, description: 'Fine found' })
  async findById(@Param('id') id: string) {
    return this.finesService.findById(Number(id));
  }

  @Put(':id/mark-paid')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Librarian')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a fine as paid' })
  @ApiResponse({ status: 200, description: 'Fine marked as paid' })
  async markAsPaid(@Param('id') id: string, @Body() markPaidDto: MarkPaidDto) {
    return this.finesService.markAsPaid(Number(id), markPaidDto.paid_by);
  }
}
