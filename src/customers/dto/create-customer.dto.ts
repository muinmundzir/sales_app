import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Budi',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '085123642867',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
