import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CreateDetailsDto } from '@app/sale-details/dto/create-details.dto';
import { Transform } from 'class-transformer';

export class CreateSaleDto {
  @ApiProperty({
    example: 'SALE001',
    required: true,
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: '2025-07-30T00:00:00.000Z',
    required: true,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty({
    example: '1',
    required: true,
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    example: '75000',
    required: true,
  })
  @IsNumber()
  subtotal: number;

  @ApiProperty({
    example: '5000',
    required: true,
  })
  @IsNumber()
  discount: number;

  @ApiProperty({
    example: '10000',
    required: true,
  })
  @IsNumber()
  shippingCost: number;

  @ApiProperty({
    example: '80000',
    required: true,
  })
  @IsNumber()
  totalPayment: number;

  @ApiProperty({
    type: [CreateDetailsDto],
  })
  @IsNotEmpty()
  details: CreateDetailsDto[];
}
