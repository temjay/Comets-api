#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/506ccd3a6e9693146d85639c099f30161ded0035341a2fbf00a17b926cfd8580/contract';
import endContract from '../../snapshots/506ccd3a6e9693146d85639c099f30161ded0035341a2fbf00a17b926cfd8580/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fc8f74d82895306525742b66569b243851f8c85d6ce564c01434fdbba7444dcd/contract';
import startContract from '../../snapshots/fc8f74d82895306525742b66569b243851f8c85d6ce564c01434fdbba7444dcd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-password', {
        check: () => placeholder('backfill-user-password:check'),
        run: () => placeholder('backfill-user-password:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'password' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
