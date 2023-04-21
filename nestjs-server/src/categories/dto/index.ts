import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  shopId: string;
  @IsBoolean()
  @IsNotEmpty()
  forServices: boolean;
}

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  shopId: string;
  @IsBoolean()
  @IsNotEmpty()
  forServices: boolean;
}
