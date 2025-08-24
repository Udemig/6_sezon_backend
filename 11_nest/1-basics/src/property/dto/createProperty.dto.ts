// DTO - Data Transfer Object
// Class validator ile nesnenin içindeki verilerin hangi koşullarda geçerli olduğunu belirleriz.
// Olulan DTO'yu validation pipe'a göndeririz.

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePropertyDTO {
  @IsString()
  @Length(2, 20, { groups: ['create'] })
  @Length(4, 40, { groups: ['update'] })
  @IsOptional({ groups: ['update'] })
  name: string;

  @IsString()
  @Length(10, 200)
  @IsOptional({ groups: ['update'] })
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(99999999)
  @IsOptional({ groups: ['update'] })
  price: number;

  @IsInt()
  @Min(100)
  @IsOptional({ groups: ['update'] })
  area: number;
}
