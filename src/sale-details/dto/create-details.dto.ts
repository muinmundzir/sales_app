import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateDetailsDto {
  @ApiProperty({
    example: '2',
    required: true,
  })
  @IsNumber()
  itemId: number;

  @ApiProperty({
    example: '50000',
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '2',
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: '10',
    required: true,
  })
  @IsNumber()
  discountPercentage: number;

  @ApiProperty({
    example: '5000',
    required: true,
  })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiProperty({
    example: '45000',
    required: true,
  })
  @IsNumber()
  discountPrice: number;

  @ApiProperty({
    example: '90000',
    required: true,
  })
  @IsNumber()
  totalAmount: number;
}
