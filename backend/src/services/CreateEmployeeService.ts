import { Employee } from "../../../commom/employee";
import RestfulError from "../../../commom/RestfulError";
import MockServer from "../mockServer";

export class CreateEmployeeService {

  public execute(newEmployee: Employee, employeeRepository: MockServer): Employee {

    const checkEmployeeExists = employeeRepository.findByCpf(newEmployee.cpf);

    if (checkEmployeeExists) {
      throw new RestfulError("Funcionario já cadastrado", 409);
    }

    const checkEmployeeEmailExists = employeeRepository.findByEmail(newEmployee.email);

    if (checkEmployeeEmailExists) {
      throw new RestfulError("E-mail já em uso", 409);
    }

    employeeRepository.createEmployee(newEmployee);

    return newEmployee;
  }
}