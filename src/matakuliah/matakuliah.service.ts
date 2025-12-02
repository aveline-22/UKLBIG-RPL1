import { Injectable } from '@nestjs/common';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatakuliahModule } from './matakuliah.module';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';




@Injectable()
export class MatakuliahService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateMatakuliahDto) {
  try {
    const matakuliah = await this.prisma.matakuliah.create({
      data: {
        nama: dto.nama_matakuliah,
        id_dosen: dto.id_dosen,
        sks: dto.sks,
      }
    });

    return {
      status: "success",
      message: "Mata kuliah added successfully",
      data: matakuliah,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
async findAll() {
  try {
    const matakuliah = await this.prisma.matakuliah.findMany();

    const formatted = matakuliah.map(m => ({
      id_matakuliah: matakuliah,
      nama_matakuliah: m.nama,
      id_dosen: (m as any).id_dosen ?? null,
      sks: m.sks,
    }));

    return {
      status: "success",
      message: "Data matakuliah retrieved successfully",
      data: formatted,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
async update(id_matakuliah: number, dto: UpdateMatakuliahDto) {
  try {
    const updated = await this.prisma.matakuliah.update({
      where: { id_matakuliah },
      data: {
        nama: dto.nama_matakuliah,
        id_dosen: dto.id_dosen,
        sks: dto.sks,
      },
    });

    return {
      status: "success",
      message: "Matakuliah updated successfully",
      data: {
        id_matakuliah: updated.id_matakuliah,
        nama_matakuliah: updated.nama,
        id_dosen: updated.id_dosen,
        sks: updated.sks
      },
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}

async remove(id_matakuliah: number) {
  try {
    const existing = await this.prisma.matakuliah.findUnique({
      where: { id_matakuliah: id_matakuliah },
    });

    if (!existing) {
      return {
        status: "error",
        message: `Matakuliah dengan id ${id_matakuliah} tidak ditemukan`,
      };
    }

    await this.prisma.matakuliah.delete({
      where: { id_matakuliah: id_matakuliah },
    });

    return {
      status: "success",
      message: "Matakuliah deleted successfully",
    };

  } catch (error) {
    return {
      status: "error",
      message: `Something went wrong: ${error?.message}`,
    };
  }
}
}
