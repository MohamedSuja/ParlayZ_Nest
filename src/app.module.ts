import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UserLogModule } from './user_log/user_log.module';

@Module({
  imports: [DatabaseModule, UserLogModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}

/*     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bdpyt8vxn2jrdbj7z6h0-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uxuop382po2zom8f',
      password: 'd4p2pugXcBnKHIXxkEKj',
      database: 'bdpyt8vxn2jrdbj7z6h0',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }), */
