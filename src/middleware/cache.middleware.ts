import * as redis from "redis";
import { environment } from "../config";
import { EmployeeI } from "../interfaces/employee.interface";

export class EmployeeCache {
  private static client: redis.RedisClientType;
  constructor() {
    if (!EmployeeCache.client) {
      this.get_client();
    }
  }
  public setEmployee = async (employee: EmployeeI) => {
    if (!employee) return { status: false, content: "Employee is null" };

    await EmployeeCache.client.set(employee.id, JSON.stringify(employee));
    return { status: true, content: "Employee saved" };
  };
  public getEmployee = async (
    employeeId: string
  ): Promise<EmployeeI | undefined> => {
    const employee = await EmployeeCache.client.get(employeeId);
    if (!employee) return;
    console.log("from redis");
    return JSON.parse(employee);
  };

  private get_client = async () => {
    if (EmployeeCache.client) return EmployeeCache.client;
    EmployeeCache.client = redis.createClient({
      url: `redis://${environment.REDIS_HOST}:${environment.REDIS_PORT}`,
    });
    EmployeeCache.client.on("error", (err) => console.log("error"));
    EmployeeCache.client.on("connect", () => console.log("Connected to redis"));
    await EmployeeCache.client.connect();
  };
}
