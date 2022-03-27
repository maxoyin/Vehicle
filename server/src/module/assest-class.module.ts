import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssestClassController } from '../web/rest/assest-class.controller';
import { AssestClassRepository } from '../repository/assest-class.repository';
import { AssestClassService } from '../service/assest-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssestClassRepository])],
  controllers: [AssestClassController],
  providers: [AssestClassService],
  exports: [AssestClassService],
})
export class AssestClassModule {}
