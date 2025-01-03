import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'node:path'
import { Config, PostgresConfig } from '../../configs/config.type'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService<Config>) => {
				const config = configService.get<PostgresConfig>('postgres')
				return {
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: 'postgres',
					password: 'qweqwe',
					database: 'finalwork',
					entities: [
						path.join(
							process.cwd(),
							'dist',
							'src',
							'database',
							'entities',
							'*.entity.js'
						),
					],
					migrations: [
						path.join(
							process.cwd(),
							'dist',
							'src',
							'database',
							'migrations',
							'*.js'
						),
					],
					migrationsRun: true,
					synchronize: false,
				}
			},
			inject: [ConfigService],
		}),
	],
})
export class PostgresModule {}

//todo виправити