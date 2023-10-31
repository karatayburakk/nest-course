import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
