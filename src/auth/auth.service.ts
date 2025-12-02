import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  try {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hash,
        role: dto.role as any, // castring to avoid TS error
      },
    });

    return {
      status: "success",
      message: "User registered successfully",
      data: user,
    };
  } catch (error: any) {
  // Jika username sudah digunakan (unique constraint error)
  if (error.code === "P2002") {
    return {
      status: "error",
      message: "Username telah ada, silakan gunakan username lain",
    };
  }

  // Jika ada error validasi atau kebutuhan lain
  if (error.code === "P2003") {
    return {
      status: "error",
      message: "Relasi data tidak valid",
    };
  }

  // Default error Prisma
  return {
    status: "error",
    message: `Something went wrong: ${error?.message}`,
  };

  }
}

  async login(username: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (!user) return {
         status : "error", 
         message: "User tidak ditemukan" };

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return {
         status: "error",
         message: "Password salah" 
        };

      const payload = { sub: user.id_user, role: user.role };
      const token = await this.jwt.signAsync(payload);

      return {
        status: "success",
        message: "Login berhasil",
        data: { token, role: user.role },
      };
    } catch (error: any) {
  return {
    status: "error",
    message: `Something went wrong: ${error?.message || "Internal Server Error"}`,
  };
}
  }
}
  

