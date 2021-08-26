import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly class: number;

  @IsString({ each: true })
  readonly subjects: string[];
}
