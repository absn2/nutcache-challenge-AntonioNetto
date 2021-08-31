import { Employee, Gender } from "../../../commom/employee";
import RestfulError  from "../../../commom/RestfulError";
import MockServer from "../mockServer";

interface InterfaceRequest {
  cpf: String;
  email: String;
  birth_date: Date;
  gender: Gender;
  name: String;
  start_date: String;
  team?: String;
}

export class UpdateEmployeeService {

  public execute({ birth_date, cpf, email, gender, name, start_date, team } : InterfaceRequest,
    employeeRepository: MockServer): Employee {

    const checkEmployeeExists = employeeRepository.findByCpf(cpf);

    if (!checkEmployeeExists) {
      throw new RestfulError("Funcionario não existe", 404);
    }

    const checkEmailEmployeeExists = employeeRepository.findByEmail(email);

    if (checkEmailEmployeeExists && (cpf != checkEmailEmployeeExists.cpf)) {
      throw new RestfulError("E-mail já em uso", 409);
    }

    const employee = { birth_date, cpf, email, gender, name, start_date, team } as Employee;

    employeeRepository.updateEmployee(employee);

    return employee;
  }
}