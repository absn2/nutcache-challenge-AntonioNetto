import { Employee } from "../../../commom/employee";
import RestfulError from "../../../commom/RestfulError";
import MockServer from "../mockServer";

export class CreateEmployeeService {

  public execute(newEmployee: Employee, employeeRepository: MockServer): Employee {

    const checkEmployeeExists = employeeRepository.findByCpf(newEmployee.cpf);

    if (checkEmployeeExists) {
      throw new RestfulError("Cpf already in use", 409);
    }

    const checkEmployeeEmailExists = employeeRepository.findByEmail(newEmployee.email);

    if (checkEmployeeEmailExists) {
      throw new RestfulError("E-mail already in use", 409);
    }

    employeeRepository.createEmployee(newEmployee);

    return newEmployee;
  }
}