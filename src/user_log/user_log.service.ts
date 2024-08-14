import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';

@Injectable()
export class UserLogService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserLogDto: Prisma.UserLogCreateInput) {
    try {
      const userLog = await this.databaseService.userLog.create({
        data: createUserLogDto,
      });
      return {
        message: 'User log successfully recorded',
        data: userLog,
      };
    } catch (error) {
      return {
        message: 'Error occurred',
        error: error.message,
      };
    }
  }

  async findAll() {
    return this.databaseService.userLog.findMany();
  }

  async generateCsv(): Promise<string> {
    const data = await this.databaseService.userLog.findMany();

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'downloads',
      'output.csv',
    );

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(data);

    return filePath;
  }
}
