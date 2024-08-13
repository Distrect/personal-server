import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PortfolioEntity from '@model/portfolio/portfolio.entity';
import { NotFoundError } from '@util/error';
import { IUpdatePortfolio } from '@model/portfolio/portfolio.interface';

@Injectable()
export default class PortfolioDAO {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioRepo: Repository<PortfolioEntity>,
  ) {}

  public async getPortfolio(portfolioID: number) {
    const portfolio = await this.portfolioRepo.findOne({
      where: {
        portfolioID,
      },
    });

    if (portfolio === null)
      throw new NotFoundError('Portfolio record is not found');

    return portfolio;
  }

  public async getUserPortfolio(userID: number) {
    const portfolio = await this.portfolioRepo.findOne({
      where: {
        user: { userID },
      },
      relations: {
        educations: true,
        experiences: true,
        skills: true,
      },
    });

    if (portfolio === null)
      throw new NotFoundError('Portfolio record is not found');

    return portfolio;
  }

  public async updatePortfolio(data: IUpdatePortfolio) {
    const portfolio = await this.getPortfolio(data.portfolioID);

    return await this.portfolioRepo.save(Object.assign(portfolio, data));
  }
}
