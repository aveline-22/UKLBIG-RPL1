import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { JwtAuthGuard } from 'src/auth/jtw-auth.guard';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';

@Controller('api/matakuliah')
@UseGuards(JwtAuthGuard)
export class MatakuliahController {
  constructor(private readonly matakuliahService: MatakuliahService) {}

  @Post()
  create(@Body() dto: CreateMatakuliahDto) {
    return this.matakuliahService.create(dto);
  }

  @Get()
  findAll() {
    return this.matakuliahService.findAll();
  }

@Put(':id_matakuliah')
  update(
    @Param('id_matakuliah') idMatakuliah: string,
    @Body() dto: UpdateMatakuliahDto,
  ) {
    return this.matakuliahService.update(Number(idMatakuliah), dto);
  }
  @Delete(':id_matakuliah')
  remove(@Param('id_matakuliah') idMatakuliah: string) {
    return this.matakuliahService.remove(Number(idMatakuliah));
  }
}


