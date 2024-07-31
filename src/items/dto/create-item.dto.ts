import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateItemDto {
  @ApiProperty({
    example: 'AA001',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Sapu Elektronik',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '50000',
    required: true,
  })
  @IsDecimal()
  price: number;
}
