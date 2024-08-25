import { Module } from '@nestjs/common';
import CoreModule from '@core/core.module';
import UserBusinessModule from '@business/user/user.business.module';
import PortfolioBusinessModule from '@business/portfolio/portfolio.business.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [CoreModule, UserBusinessModule, PortfolioBusinessModule],
})
export class AppModule {}
