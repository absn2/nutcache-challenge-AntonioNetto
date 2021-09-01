import { Employee } from "../../../commom/employee";
import RestfulError from "../../../commom/RestfulError";
import MockServer from "../mockServer";

export class DeleteEmployeeService {

  public execute(email: string, employeeRepository: MockServer): boolean {

    const checkEmployeeExists = employeeRepository.findByEmail(email);

    if (!checkEmployeeExists) {
      throw new RestfulError("Employee not found", 404);
    }

    const deleteEmployee = employeeRepository.deleteEmployee(email);

    return deleteEmployee;
  }
}