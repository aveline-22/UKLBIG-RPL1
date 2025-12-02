import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { JwtAuthGuard } from 'src/auth/jtw-auth.guard';
import { PilihMatkulDto } from './dto/pilih-matkul.dto';


@Controller('api/mahasiswa')
@UseGuards(JwtAuthGuard)
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  create(@Body() dto: CreateMahasiswaDto) {
    return this.mahasiswaService.create(dto);
  }

  @Put(':nim')
  update(@Param('nim') nim: string,
   @Body() dto: UpdateMahasiswaDto) {
    return this.mahasiswaService.updateByNim(nim, dto);}



  @Get()
  findAll() {
    return this.mahasiswaService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.mahasiswaService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMahasiswaDto: UpdateMahasiswaDto) {
//     return this.mahasiswaService.update(+id, updateMahasiswaDto);
//   }

  @Delete(':nim')
  remove(@Param('nim') nim: string) {
    return this.mahasiswaService.removeByNim(nim);
  }
  //pilih matakuliah
  @Post('pilih-matakuliah')
pilihMatkul(@Body() dto: PilihMatkulDto) {
  return this.mahasiswaService.pilihMatakuliah(dto);

}

}
