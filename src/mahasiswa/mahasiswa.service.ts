import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { Mahasiswa } from './entities/mahasiswa.entity';
import { PilihMatkulDto } from './dto/pilih-matkul.dto';


@Injectable()
export class MahasiswaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMahasiswaDto) {
  try {
    const mahasiswa = await this.prisma.mahasiswa.create({
      data: {
        nim: dto.nim,
        nama_mahasiswa: dto.nama_mahasiswa,
        jenis_kelamin: dto.jenis_kelamin,
        jurusan: dto.jurusan,
      },
    });

    return {
      status: "success",
      message: "Mahasiswa added successfully",
      data: {
         id_mahasiswa: mahasiswa.id_mahasiswa,
    nim: mahasiswa.nim,
    nama_mahasiswa: mahasiswa.nama_mahasiswa,
    jenis_kelamin: mahasiswa.jenis_kelamin,
    jurusan: mahasiswa.jurusan,
  },
      
    };
  } catch (error) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
async updateByNim(nim: string, dto: UpdateMahasiswaDto) {
  try {
    const existing = await this.prisma.mahasiswa.findUnique({
      where: { nim },
    });

    if (!existing) {
      return {
        status: 'error',
        message: `Mahasiswa dengan NIM ${nim} tidak ditemukan`,
      };
    }

    const mahasiswa = await this.prisma.mahasiswa.update({
      where: { nim },
      data: {
        // kalau NIM nggak boleh diubah, hapus baris nim di bawah
        nim: dto.nim,
        nama_mahasiswa: dto.nama_mahasiswa,
        jenis_kelamin: dto.jenis_kelamin,
        jurusan: dto.jurusan,
      },
    });

    return {
      status: 'success',
      message: 'Mahasiswa updated successfully',
      data: {
        id_mahasiswa: mahasiswa.id_mahasiswa,
        nim: mahasiswa.nim,
        nama_mahasiswa: mahasiswa.nama_mahasiswa,
        jenis_kelamin: mahasiswa.jenis_kelamin,
        jurusan: mahasiswa.jurusan,
      },
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: `Something went wrong: ${error.message}`,
    };
  }
}

async findAll(){
  try{
    const Mahasiswa = await this.prisma.mahasiswa.findMany();
    return{
      status: "success",
      message: "Data mahasiswa retrieved successfully",
      data: Mahasiswa,
    };
  }catch(error){
    return{
      status: "error",
      message: `something went wrong: ${error.message}`,
    };
  }
}
async removeByNim(nim: string) {
  try {
    const existing = await this.prisma.mahasiswa.findUnique({
      where: { nim },
    });

    if (!existing) {
      return {
        status: 'error',
        message: `Mahasiswa dengan NIM ${nim} tidak ditemukan`,
      };
    }

    await this.prisma.mahasiswa.delete({
      where: { nim },
    });

    return {
      status: 'success',
      message: 'Mahasiswa deleted successfully',
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: `Something went wrong: ${error.message}`,
    };
  }
}
//PILIH MATA KULIAH 
async pilihMatakuliah(dto: PilihMatkulDto) {
  try {
    // 1. Ambil semua matkul dan jadwalnya
    const matkul = await this.prisma.matakuliah.findMany({
      where: {
        id_matakuliah: { in: dto.matakuliah_ids },
      },
      include: {
        jadwal: true,
      },
    });

    // 2. Hitung total SKS
    const totalSKS = matkul.reduce((total, m) => total + m.sks, 0);

    if (totalSKS < 15) {
      return { status: "error", message: "Total SKS kurang dari 15" };
    }

    if (totalSKS > 23) {
      return { status: "error", message: "Total SKS melebihi 23" };
    }

    // 3. Cek bentrok jadwal
    const jadwalSet = new Set();
    for (const m of matkul) {
      const jadwalStr = m.jadwal[0].jadwal;

      if (jadwalSet.has(jadwalStr)) {
        return { status: "error", message: "Jadwal bentrok antar matakuliah!" };
      }

      jadwalSet.add(jadwalStr);
    }

    // 4. INSERT KRS DISINI !!
    await this.prisma.kRS.createMany({
  data: dto.matakuliah_ids.map((id) => {
    const m = matkul.find((x) => x.id_matakuliah === id);

    if (!m?.jadwal?.[0]?.id_jadwal) {
      throw new Error(`Jadwal matakuliah dengan id ${id} tidak ditemukan`);
    }

    return {
      id_mahasiswa: dto.mahasiswa_id,
      id_matakuliah: id,
      id_jadwal: m.jadwal[0].id_jadwal,
    };
  }),
});


    // 5. Response Sukses
    return {
      status: "success",
      message: "Matakuliah berhasil dipilih!",
      data: {
        mahasiswa_id: dto.mahasiswa_id,
        matakuliah_ids: dto.matakuliah_ids,
        total_sks: totalSKS,
      },
    };

  } catch (error) {
    return {
      status: "error",
      message: `Something went wrong: ${error}`,
    };
  }
}

}