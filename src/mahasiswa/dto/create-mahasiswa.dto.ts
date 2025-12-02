// src/mahasiswa/dto/create-mahasiswa.dto.ts
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateMahasiswaDto {
  @IsNotEmpty()
  @IsString()
  nim: string;

  @IsNotEmpty()
  @IsString()
  nama_mahasiswa: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['L', 'P']) // L = Laki-laki, P = Perempuan
  jenis_kelamin: string;

  @IsNotEmpty()
  @IsString()
  jurusan: string;
}

