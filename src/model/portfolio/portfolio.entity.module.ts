import PortfolioDAO from '@model/portfolio/portfolio.dao';
import PortfolioEntity from '@model/portfolio/portfolio.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity])],
  providers: [PortfolioDAO],
  exports: [PortfolioDAO],
})
export default class PortfolioEntityModule {}
