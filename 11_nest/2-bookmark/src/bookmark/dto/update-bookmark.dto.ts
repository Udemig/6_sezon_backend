import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateBookmarkDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsUrl()
  link?: string;
}
