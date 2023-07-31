import * as redis from "redis";
import { environment } from "../config";
import { EmployeeI } from "../interfaces/employee.interface";
import { EmployeeCacheI } from "../interfaces/employee.interface";

export class EmployeeCacheService implements EmployeeCacheI {
  private static client: redis.RedisClientType;
  constructor() {
    if (!EmployeeCacheService.client) {
      this.get_client();
    }
  }
  public setEmployee = async (employee: EmployeeI) => {
    if (!employee) return { status: false, content: "Employee is null" };

    await EmployeeCacheService.client.set(
      employee.id,
      JSON.stringify(employee)
    );
    return { status: true, content: "Employee saved" };
  };
  public getEmployee = async (
    employeeId: string
  ): Promise<EmployeeI | undefined> => {
    const employee = await EmployeeCacheService.client.get(employeeId);
    if (!employee) return;
    return JSON.parse(employee);
  };
  // public updateEmployee = async (employee: EmployeeI): Promise<EmployeeI | undefined> => {
  //   const employee = await this.getEmployee(employee.id);
  //   if (!employee) return undefined;

  // };

  private get_client = async () => {
    if (EmployeeCacheService.client) return EmployeeCacheService.client;
    EmployeeCacheService.client = redis.createClient({
      url: `redis://${environment.REDIS_HOST}:${environment.REDIS_PORT}`,
    });
    EmployeeCacheService.client.on("error", (err) => console.log("error"));
    EmployeeCacheService.client.on("connect", () =>
      console.log("Connected to redis")
    );
    await EmployeeCacheService.client.connect();
  };
}
