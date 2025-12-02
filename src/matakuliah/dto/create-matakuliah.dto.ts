import { IsNotEmpty, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateMatakuliahDto {
  @IsNotEmpty()
  @IsInt()
  id_matakuliah: number;

  @IsNotEmpty()
  @IsString()
  nama_matakuliah: string;

  @IsNotEmpty()
  @IsInt()
  id_dosen: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(6)
  sks: number;
}

