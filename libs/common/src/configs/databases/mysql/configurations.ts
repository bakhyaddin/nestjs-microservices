import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  name: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
}));
