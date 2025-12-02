import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';


@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}

