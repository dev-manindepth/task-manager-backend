import { config } from '@root/config';
import databaseConnection from '@root/setupDatabase';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}
const application: Application = new Application();
application.initialize();
