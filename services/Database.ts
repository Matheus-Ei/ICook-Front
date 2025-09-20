import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";

export type User = {
  id: number;
  email: string;
};

export class DatabaseService {
  private static instance: DatabaseService | null = null;
  public db: SQLiteDatabase;

  private constructor(database: SQLiteDatabase) {
    this.db = database;
  }

  public static async getInstance(
    databaseName: string = "database.db",
  ): Promise<DatabaseService> {
    if (DatabaseService.instance) {
      return DatabaseService.instance;
    }

    const db = await openDatabaseAsync(databaseName);

    const instance = new DatabaseService(db);

    await instance.initializeDatabase();

    DatabaseService.instance = instance;
    return DatabaseService.instance;
  }

  private async initializeDatabase(): Promise<void> {
    await this.db.execAsync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE)",
    );
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    return this.db.getAllAsync<T>(sql, params);
  }

  public async execute(sql: string, params: any[] = []): Promise<any> {
    return this.db.runAsync(sql, params);
  }
}
