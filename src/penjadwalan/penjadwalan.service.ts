import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { UpdatePenjadwalanDto } from './dto/update-penjadwalan.dto';

@Injectable()
export class PenjadwalanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePenjadwalanDto) {
    try {
      const jadwal = await this.prisma.penjadwalan.create({
        data: {
          id_dosen: dto.id_dosen,
          id_matakuliah: dto.id_matakuliah,
          jadwal: dto.jadwal,
        },
      });

      return {
        status: 'success',
        message: 'Jadwal added successfully',
        data: {
          status: "success",
  message: "Jadwal added successfully",
  data: {
    id_jadwal: jadwal.id_jadwal,
    id_dosen: jadwal.id_dosen,
    id_matakuliah: jadwal.id_matakuliah,
    jadwal: jadwal.jadwal,
  }
        }
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: `Something went wrong: ${error.message}`,
      };
    }
  }
  async findOne(id_jadwal: number) {
  try {
    const jadwal = await this.prisma.penjadwalan.findUnique({
      where: { id_jadwal },
    });

    if (!jadwal) {
      return {
        status: "error",
        message: "Jadwal tidak ditemukan",
      };
    }

    return {
      status: "success",
      message: "Detail Jadwal",
      data: {
        id_jadwal: jadwal.id_jadwal,
        id_dosen: jadwal.id_dosen,
        id_matakuliah: jadwal.id_matakuliah,
        jadwal: jadwal.jadwal,
      },
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
    const jadwal = await this.prisma.penjadwalan.findMany({
      include: {
        dosen: true,
        matakuliah: true,
      },
    });

    return {
      status: "success",
      message: "All Jadwal retrieved successfully",
      data: jadwal.map((item) => ({
        id_jadwal: item.id_jadwal,
        id_dosen: item.id_dosen,
        nama_dosen: item.dosen?.nama_dosen,
        id_matakuliah: item.id_matakuliah,
        nama_matakuliah: item.matakuliah?.nama,
        jadwal: item.jadwal,
      })),
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
async update(id_jadwal: number, dto: UpdatePenjadwalanDto) {
  try {
    const jadwal = await this.prisma.penjadwalan.update({
      where: { id_jadwal },
      data: {
        id_dosen: dto.id_dosen,
        id_matakuliah: dto.id_matakuliah,
        jadwal: dto.jadwal,
      },
    });

    return {
      status: "success",
      message: "Jadwal updated successfully",
      data: {
        id_jadwal: jadwal.id_jadwal,
        id_dosen: jadwal.id_dosen,
        id_matakuliah: jadwal.id_matakuliah,
        jadwal: jadwal.jadwal,
      }
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
async remove(id_jadwal: number) {
  try {
    const existing = await this.prisma.penjadwalan.findUnique({
      where: { id_jadwal: id_jadwal },
    });

    if (!existing) {
      return {
        status: "error",
        message: `Jadwal dengan id ${id_jadwal} tidak ditemukan`,
      };
    }

    await this.prisma.penjadwalan.delete({
      where: { id_jadwal: id_jadwal },
    });

    return {
      status: "success",
      message: "Jadwal deleted successfully",
    };

  } catch (error) {
    return {
      status: "error",
      message: `Something went wrong: ${error?.message}`,
    };
  }
}
}

