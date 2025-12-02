import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateMatakuliahDto {
  @IsNotEmpty()
  @IsString()
  nama_matakuliah: string;

  @IsNotEmpty()
  @IsNumber()
  id_dosen: number;

  @IsNotEmpty()
  @IsNumber()
  sks: number;
}

