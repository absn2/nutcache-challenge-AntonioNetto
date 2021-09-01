import { Employee, Gender } from "../../../commom/employee";
import RestfulError  from "../../../commom/RestfulError";
import MockServer from "../mockServer";

interface InterfaceRequest {
  cpf: string;
  email: string;
  birth_date: Date;
  gender: Gender;
  name: string;
  start_date: string;
  team?: string;
}

export class UpdateEmployeeService {

  public execute({ birth_date, cpf, email, gender, name, start_date, team } : InterfaceRequest,
    employeeRepository: MockServer): Employee {

    const checkEmployeeExists = employeeRepository.findByCpf(cpf);

    if (!checkEmployeeExists) {
      throw new RestfulError("Cpf not found", 404);
    }

    const checkEmailEmployeeExists = employeeRepository.findByEmail(email);

    if (checkEmailEmployeeExists && (cpf != checkEmailEmployeeExists.cpf)) {
      throw new RestfulError("E-mail already in use", 409);
    }

    const employee = { birth_date, cpf, email, gender, name, start_date, team } as Employee;

    employeeRepository.updateEmployee(employee);

    return employee;
  }
}