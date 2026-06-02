import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

/**
 * Convert nested object validaton errors into single error string
 * @param errors 
 * @returns 
 */
function getAllConstraints(errors: ValidationError[]): string[] {
  const constraints: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      const constraintValues = Object.values(error.constraints);
      constraints.push(...constraintValues);
    }

    if (error.children) {
      const childConstraints = getAllConstraints(error.children);
      constraints.push(...childConstraints);
    }
  }

  return constraints;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: false,
        target: false
      }, 
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          getAllConstraints(validationErrors).join(', ')
        )
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
