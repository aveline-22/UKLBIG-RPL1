import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DosenModule } from './dosen/dosen.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { PenjadwalanModule } from './penjadwalan/penjadwalan.module';

@Module({
  imports: [AuthModule, DosenModule, MatakuliahModule, MahasiswaModule, PenjadwalanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
