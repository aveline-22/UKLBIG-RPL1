import { Controller, Put, Param, Body, UseGuards, Get, Delete, Post } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { JwtAuthGuard } from 'src/auth/jtw-auth.guard';
import { CreateDosenDto } from './dto/create-dosen.dto';

@Controller('api/dosen')
@UseGuards(JwtAuthGuard)


export class DosenController {
  constructor(private readonly dosenService: DosenService) {}

  @Post()
create(@Body() dto: CreateDosenDto) {
  return this.dosenService.create(dto);
}


  //BUAT UPDATE
  @Put(':nidn')
  update(
    @Param('nidn') nidn: string,
    @Body() dto: UpdateDosenDto,
  ) {
    return this.dosenService.update(Number(nidn), dto);
  }
  //GET ALL USER
  @Get()
  findAll() {
    return this.dosenService.findAll();
  }

  // GET BY NIDN
//   @Get(':nidn')
//   findOne(@Param('nidn') nidn: string) {
//     return this.dosenService.findOne(Number(nidn));
//   }

  // DELETE DOSEN
  @Delete(':nidn')
  delete(@Param('nidn') nidn: string) {
    return this.dosenService.remove(Number(nidn));
  }
 }
