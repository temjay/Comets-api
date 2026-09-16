#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/40950a126d6f76474b0eb893e02da3ac45c68dede265ed7a66729e84eaaae94b/contract';
import endContract from '../../snapshots/40950a126d6f76474b0eb893e02da3ac45c68dede265ed7a66729e84eaaae94b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fc8f74d82895306525742b66569b243851f8c85d6ce564c01434fdbba7444dcd/contract';
import startContract from '../../snapshots/fc8f74d82895306525742b66569b243851f8c85d6ce564c01434fdbba7444dcd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

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
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
