import { Body, Controller, Post, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { PenjadwalanService } from './penjadwalan.service';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { JwtAuthGuard } from 'src/auth/jtw-auth.guard';
import { UpdatePenjadwalanDto } from './dto/update-penjadwalan.dto';

@Controller('api/penjadwalan')
@UseGuards(JwtAuthGuard)
export class PenjadwalanController {
  constructor(private readonly penjadwalanService: PenjadwalanService) {}

  @Post()
  create(@Body() dto: CreatePenjadwalanDto) {
    return this.penjadwalanService.create(dto);
  }
  @Get(':id_jadwal')
  findOne(@Param('id_jadwal') id_jadwal: string) {
    return this.penjadwalanService.findOne(Number(id_jadwal));
  }
  @Get()
findAll() {
  return this.penjadwalanService.findAll();
}
@Put(':id_jadwal')
  update(
    @Param('id_jadwal') id_Jadwal: string,
    @Body() dto: UpdatePenjadwalanDto,
  ) {
    return this.penjadwalanService.update(Number(id_Jadwal), dto);
  }
  @Delete(':id_matakuliah')
    remove(@Param('id_matakuliah') id_jadwal: string) {
      return this.penjadwalanService.remove(Number(id_jadwal));
    }
  }


