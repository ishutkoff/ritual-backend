import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateVisualizatorMonumenthDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
