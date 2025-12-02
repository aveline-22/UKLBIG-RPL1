import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDosenDto) {
  try {
    const dosen = await this.prisma.dosen.create({
      data,
    });

    return {
      status: "success",
      message: "Dosen berhasil ditambahkan",
      data: dosen,
    };

  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        status: "error",
        message: "NIDN sudah terdaftar",
      };
    }

    return {
      status: "error",
      message: `Something went wrong: ${error?.message}`,
    };
  }
}


  async update(nidn: number, data: UpdateDosenDto) {
  try {
    const dosen = await this.prisma.dosen.update({
      where: { nidn },
      data,
    });

    return {
      status: "success",
      message: "Dosen berhasil diupdate",
      data: dosen,
    };

  } catch (error: any) {
    if (error.code === "P2025") {
      return {
        status: "error",
        message: "Dosen tidak ditemukan",
      };
    }

    return {
      status: "error",
      message: `Something went wrong: ${error?.message}`,
    };
  }
}

async findAll(){
  try{
    const dosen = await this.prisma.dosen.findMany();
    return{
      status: "success",
      message: "Data dosen retrieved successfully",
      data: dosen,
    };
  }catch(error){
    return{
      status: "error",
      message: `something went wrong: ${error.message}`,
    };
  }
}
async remove(nidn: number) {
  try {
    const existingDosen = await this.prisma.dosen.findUnique({
      where: { nidn },
    });

    if (!existingDosen) {
      return {
        status: "error",
        message: "Dosen not found",
      };
    }

    await this.prisma.dosen.delete({
      where: { nidn },
    });

    return {
      status: "success",
      message: "Dosen deleted successfully",
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Something went wrong: ${error.message}`,
    };
  }
}
}
