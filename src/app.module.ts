import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { ItemsModule } from '@app/items/items.module';
import { CustomersModule } from '@app/customers/customers.module';
import { SalesModule } from '@app/sales/sales.module';
import { SaleDetailsModule } from '@app/sale-details/sale-details.module';
import typeorm from '@app/config/typeorm';
import { SequenceResetService } from '@app/helpers/schedulers/reset-sequence';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await configService.get('typeorm'),
    }),
    ItemsModule,
    CustomersModule,
    SalesModule,
    SaleDetailsModule,
  ],
  providers: [SequenceResetService],
})
export class AppModule {}
