import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  link?: string;
}
