import { Client, ID, Query, TablesDB } from "appwrite";
import { config } from "../Config/config";

export class Service {
  client = new Client();
  tables;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tables = new TablesDB(this.client);
  }

  async createTask({ taskText, userId }) {
    try {
      return await this.tables.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritTableId,
        rowId: ID.unique(),
        data: {
          taskText,
          userId,
          completed: null,
         
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const res = await this.tables.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritTableId,
        queries: [Query.equal("userId", userId)]
      });

      return res.rows; // 🔥 important
    } catch (error) {
      throw error;
    }
  }

  async updateTask(taskId, { taskText, status, }) {
    try {
      return await this.tables.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritTableId,
        rowId: taskId,
        data: {
          taskText,
          status,
          completed: status,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      return await this.tables.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritTableId,
        rowId: taskId
      });
    } catch (error) {
      throw error;
    }
  }
}

const taskService = new Service();
export default taskService;