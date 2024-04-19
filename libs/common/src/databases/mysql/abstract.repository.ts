import { Logger, NotFoundException } from '@nestjs/common';
import type { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<Entity extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entitytRepository: Repository<Entity>,
    private readonly entitManager: EntityManager,
  ) {}

  async create(entity: Entity): Promise<Entity> {
    return this.entitManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<Entity>): Promise<Entity> {
    const entity = await this.entitytRepository.findOne({ where });

    if (!entity) {
      this.logger.warn('Entity was not found with where', where);
      throw new NotFoundException('Entity was not found');
    }
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<Entity> {
    const updateResult = await this.entitytRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn('Entity was not found with where', where);
      throw new NotFoundException('Document was not found');
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.entitytRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<Entity>) {
    await this.entitytRepository.delete(where);
  }
}
