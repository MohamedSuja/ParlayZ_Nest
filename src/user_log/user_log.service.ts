import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import { GetUserLogDto } from './dto/get-user-log.dto';

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

  /*   async findAll() {
    return this.databaseService.userLog.findMany();
  } */

  async getUserLogService(getUserLogDto: GetUserLogDto) {
    // Destructure and convert values to integers
    const { userIp, bettingSite, page = 1, limit = 10 } = getUserLogDto;

    // Ensure page and limit are integers
    const pageNumber = parseInt(page.toString(), 10);
    const limitNumber = parseInt(limit.toString(), 10);

    const skip = (pageNumber - 1) * limitNumber;

    const data = await this.databaseService.userLog.findMany({
      where: {
        AND: [
          userIp ? { user_ip: userIp } : {},
          bettingSite ? { betting_site: bettingSite } : {},
        ],
      },
      skip, // Use integer skip value
      take: limitNumber, // Use integer limit value
    });

    const total = await this.databaseService.userLog.count({
      where: {
        AND: [
          userIp ? { user_ip: userIp } : {},
          bettingSite ? { betting_site: bettingSite } : {},
        ],
      },
    });

    return {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  async generateCsv(): Promise<string> {
    const data = await this.databaseService.userLog.findMany();

    const filePath = path.join(__dirname, '..', '..', 'downloads', 'data.csv');

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(data);

    return filePath;
  }
}
