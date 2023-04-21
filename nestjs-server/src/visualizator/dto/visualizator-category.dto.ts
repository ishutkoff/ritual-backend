import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateVisualizatorCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  shopId: string;
}

export class UpdateVisualizatorCategoryDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  shopId: string;
}
