import { Employee } from "../../../commom/employee";
import RestfulError from "../../../commom/RestfulError";
import MockServer from "../mockServer";

export class DeleteEmployeeService {

  public execute(cpf: string, employeeRepository: MockServer): boolean {

    const checkEmployeeExists = employeeRepository.findByCpf(cpf);

    if (!checkEmployeeExists) {
      throw new RestfulError("Funcionario não existe", 404);
    }

    const deleteEmployee = employeeRepository.deleteEmployee(cpf);

    return deleteEmployee;
  }
}