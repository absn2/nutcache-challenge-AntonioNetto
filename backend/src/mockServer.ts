import { Employee } from '../../commom/employee'

export default class MockServer {

  private employeeList : Employee[] = [];

  constructor() {}

  public createEmployee(employee: Employee): Employee {
    this.employeeList.push(employee);
    return employee;
  }

  public findByCpf(cpf: String) : Employee | undefined {
    return this.employeeList.find(employee => employee.cpf == cpf);
  }

  public findByEmail(email: String) : Employee | undefined {
    return this.employeeList.find(employee => employee.email == email);
  }

  public findAllEmployees() : Employee[] {
    return this.employeeList;
  }

  public updateEmployee(newEmployee: Employee) {

    const index = this.employeeList.findIndex(employee => newEmployee.cpf == employee.cpf);
    this.employeeList[index] = newEmployee;

  }

  public deleteEmployee(cpf: string) {
    const index = this.employeeList.findIndex(employee => employee.cpf == cpf);
    this.employeeList.splice(index,1);

    return true;
  }

}