import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1795400000000 implements MigrationInterface {
  name = 'SeedAdmin1795400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleId = '11111111-1111-1111-1111-111111111111';
    const userId = '22222222-2222-2222-2222-222222222222';
    const passwordHash =
      '$scrypt$ln=17,r=8,p=1$aY+Jyol7mhnd+NBSpFLYbw$OsveLxniLvDnI7+JCMlnKS+AcFhWDS3dOXYjCGW5xek';

    await queryRunner.query(
      `INSERT INTO "roles" ("id", "role_name", "description")
       VALUES ($1, 'admin', 'Administrador')
       ON CONFLICT ("role_name") DO NOTHING`,
      [roleId],
    );

    await queryRunner.query(
      `INSERT INTO "users" ("id", "email", "password", "name")
       VALUES ($1, 'admin@admin.com', $2, 'Admin')
       ON CONFLICT ("email") DO NOTHING`,
      [userId, passwordHash],
    );

    await queryRunner.query(
      `INSERT INTO "user_roles" ("user_id", "role_id")
       SELECT $1, "id" FROM "roles" WHERE "role_name" = 'admin'
       ON CONFLICT DO NOTHING`,
      [userId],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user_roles" WHERE "user_id" = '22222222-2222-2222-2222-222222222222'`,
    );
    await queryRunner.query(`DELETE FROM "users" WHERE "email" = 'admin@admin.com'`);
    await queryRunner.query(
      `DELETE FROM "roles" WHERE "role_name" = 'admin' AND "id" = '11111111-1111-1111-1111-111111111111'`,
    );
  }
}