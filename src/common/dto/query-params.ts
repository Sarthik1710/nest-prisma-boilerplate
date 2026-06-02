import { ToBoolean } from '@common/decorators';
import { ERequestSource } from '@common/types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @ToBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(ERequestSource)
  @IsNotEmpty()
  source: ERequestSource;
}
