
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Driver App API Documentation')
  .setDescription('API Documentation with some example request and response')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .build();
