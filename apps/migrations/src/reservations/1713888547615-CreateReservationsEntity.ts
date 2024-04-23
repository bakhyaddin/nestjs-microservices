import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservationsEntity1713888547615
  implements MigrationInterface
{
  name = 'CreateReservationsEntity1713888547615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`timestamp\` datetime NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`userId\` int NOT NULL, \`invoiceId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`reservation\``);
  }
}
