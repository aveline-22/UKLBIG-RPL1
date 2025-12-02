import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
})
export class MahasiswaModule {}
