import PortfolioEntity from '@model/portfolio/portfolio.entity';
import UserEntity from '@model/user/user.entity';
import { Logger } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserListener implements EntitySubscriberInterface<UserEntity> {
  private readonly logger = new Logger();
  constructor() {}

  public listenTo() {
    return UserEntity;
  }

  public async afterInsert(event: InsertEvent<UserEntity>): Promise<void> {
    const { manager, entity } = event;

    try {
      const portfolioRepo = manager.getRepository(PortfolioEntity);
      const portfolioInstance = portfolioRepo.create({ user: entity });
      await portfolioRepo.save(portfolioInstance);
    } catch (error) {
      this.logger.error(
        error?.message && 'User Subscriber Error',
        error?.stack,
      );
      throw error;
    }
  }
}
