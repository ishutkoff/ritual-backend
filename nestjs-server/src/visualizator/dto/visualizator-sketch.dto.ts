import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateVisualizatorSketchDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
