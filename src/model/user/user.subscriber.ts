import PortfolioEntity from '@model/portfolio/portfolio.entity';
import UserEntity from '@model/user/user.entity';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserListener implements EntitySubscriberInterface<UserEntity> {
  constructor() {}

  public listenTo() {
    return UserEntity;
  }

  public async afterInsert(event: InsertEvent<UserEntity>): Promise<void> {
    const { manager, entity } = event;

    try {
      const portfolioRepo = manager.getRepository(PortfolioEntity);

      await portfolioRepo.save({
        user: entity,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
