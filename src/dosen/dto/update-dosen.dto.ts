import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export enum Gender {
  L = "L",
  P = "P"
}

export class UpdateDosenDto {
  @IsNotEmpty()
  @IsString()
  nama_dosen: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: "jenis_kelamin harus 'L' atau 'P'" })
  jenis_kelamin: Gender;

  @IsNotEmpty()
  @IsString()
  alamat: string;
}
