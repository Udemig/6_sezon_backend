import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(2000)
  content: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
