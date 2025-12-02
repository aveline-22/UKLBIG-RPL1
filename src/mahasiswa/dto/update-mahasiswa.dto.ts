import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMahasiswaDto {
  @IsNotEmpty()
  @IsString()
  nim: string;

  @IsNotEmpty()
  @IsString()
  nama_mahasiswa: string;

  @IsNotEmpty()
  @IsString()
  jenis_kelamin: string;

  @IsNotEmpty()
  @IsString()
  jurusan: string;
}
