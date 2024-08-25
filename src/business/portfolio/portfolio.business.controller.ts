import { Body, Controller, Get, Post } from '@nestjs/common';
import PortfolioBusinessService from '@business/portfolio/portfolio.business.service';
import { User } from 'src/middlewares/authorization.middleware';
import { IAuthCookie } from '@util/util.interface';
import { UpdatePortfolioDTO } from '@business/portfolio/portfolio.business.dto';
import { LogActivity } from '@core/interceptors/log.interceptor';

@Controller('portfolio')
export default class PortfolioBusinessController {
  constructor(private portfolioService: PortfolioBusinessService) {}

  @LogActivity('Get Portfolio Data')
  @Get('portfolioInfo')
  public async getUserPortfolio(@User() userData: IAuthCookie) {
    const portfolioData = await this.portfolioService.getUserPortfolio(
      userData.userID,
    );

    return {
      successful: true,
      message: 'User portfolio data successfully fetched',
      data: portfolioData,
    };
  }

  @LogActivity('Update Portfolio Data')
  @Post('portfolioInfo')
  public async updatePortfolio(@Body() requestBody: UpdatePortfolioDTO) {
    const freshPortfolioData =
      await this.portfolioService.updatePortfolio(requestBody);

    return {
      successful: true,
      message: 'User portfolio data successfully updated',
      data: freshPortfolioData,
    };
  }
}
