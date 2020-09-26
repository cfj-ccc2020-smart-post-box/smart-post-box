import fs from 'fs';
import packageJSON from './package.json';
import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;
import { generateRoutes, generateSwaggerSpec, RoutesConfig, SwaggerConfig } from 'tsoa';

// Define setting of automatic generating Swagger.json
const swaggerOptions: SwaggerConfig = {
  basePath: '/api',
  entryFile: './server/common/server.ts',
  specVersion: 3,
  outputDirectory: './server/common/',
  controllerPathGlobs: ['./server/api/controllers/*/controller.ts'],
  version: packageJSON.version,
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'access_token',
      in: 'query',
    },
    jwt: {
      type: 'apiKey',
      name: 'app_token',
      in: 'header',
    },
  },
};

// Define setting of Automatic generating routing file
const routeOptions: RoutesConfig = {
  basePath: '/api',
  entryFile: './server/common/server.ts',
  routesDir: './server',
  middleware: 'express',
  authenticationModule: './server/api/middlewares/authentication.ts',
};

class Builder {
  readonly outDir: string;
  readonly swaggerOptions: SwaggerConfig;
  readonly routeOptions: RoutesConfig;

  constructor(ops: { outDir: string; swaggerOptions: SwaggerConfig; routeOptions: RoutesConfig }) {
    this.outDir = ops.outDir;
    this.swaggerOptions = ops.swaggerOptions;
    this.routeOptions = ops.routeOptions;
  }

  public async run(): Promise<void> {
    this.resetOutDir();
    await this.generateSwaggerSpecAndRoutes();
    this.addTitleToSwaggerJSON();
  }

  private resetOutDir(): void {
    s.rm('-rf', outDir);
    s.mkdir(outDir);
    s.cp('.env', `${outDir}/.env`);
  }

  private async generateSwaggerSpecAndRoutes(): Promise<void> {
    await generateSwaggerSpec(this.swaggerOptions, this.routeOptions);
    await generateRoutes(this.routeOptions, this.swaggerOptions);
  }

  private addTitleToSwaggerJSON(): void {
    const swaggerJSON = JSON.parse(fs.readFileSync('./server/common/swagger.json', 'utf-8'));
    swaggerJSON.info.title = packageJSON.name;
    fs.writeFileSync('./server/common/swagger.json', JSON.stringify(swaggerJSON, null, 2));
  }
}

try {
  new Builder({ outDir, swaggerOptions, routeOptions }).run();
} catch (err) {
  throw new Error(err);
}
