import * as dotenv from 'dotenv'
import * as path from 'node:path'
import { StatisticEntity } from 'src/database/entities/statistic.entity'
import { DataSource } from 'typeorm'
import getConfigs from './src/configs/configuration'
// Import other entities as needed

dotenv.config({ path: './environments/local.env' })

const postgresConfig = getConfigs().postgres

export default new DataSource({
	type: 'postgres',
	host: postgresConfig.host,
	port: postgresConfig.port,
	username: postgresConfig.user,
	password: postgresConfig.password,
	database: postgresConfig.dbName,
	synchronize: false,
	logging: true,
	entities: [
		StatisticEntity,
		// Add other entities here explicitly instead of using glob pattern
		path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
	],
	migrations: ['./src/database/migrations/**/*.ts'],
})
