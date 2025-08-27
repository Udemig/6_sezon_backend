import { IsInt, Max, Min } from 'class-validator';

export class IdParamDTO {
  @IsInt()
  @Min(1)
  @Max(99999999)
  id: number;
}
