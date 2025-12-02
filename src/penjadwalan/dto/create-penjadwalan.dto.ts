import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePenjadwalanDto {
  @IsNotEmpty()
  @IsInt()
  id_dosen: number;

  @IsNotEmpty()
  @IsInt()
  id_matakuliah: number;

  @IsNotEmpty()
  @IsString()
  jadwal: string;
}
