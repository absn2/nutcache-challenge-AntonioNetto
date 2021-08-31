import { Employee } from "../../../commom/employee";
import MockServer from "../mockServer";


export class ShowEmployeeListService {

  public execute(employeeRepository: MockServer): Employee[] {

    const employeeList = employeeRepository.findAllEmployees();

    return employeeList;
  }
}