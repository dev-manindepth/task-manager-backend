import { PrismaClient } from '@prisma/client';
import Logger from 'bunyan';
import { config } from '@root/config';

const prisma = new PrismaClient();
const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = async () => {
    try {
      await prisma.$connect();
      log.info('Successfully connected to db');
    } catch (error) {
      log.error('Error in connecting to db', error);
      process.exit(1);
    }
  };

  connect();
};
