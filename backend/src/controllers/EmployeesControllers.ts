import { Request, Response } from 'express'
import { Employee } from '../../../commom/employee';
import MockServer from '../mockServer';
import { CreateEmployeeService } from '../services/CreateEmployeeService';
import { DeleteEmployeeService } from '../services/DeleteEmployeeService';
import { ShowEmployeeListService } from '../services/ShowEmployeeListService';
import { UpdateEmployeeService } from '../services/UpdateEmployeeService';

const mockServer = new MockServer();

export default class EmployeesControllers {

  public show(_request: Request, response: Response) {
    try {

      const showEmployeeService = new ShowEmployeeListService();
      const employeeList = showEmployeeService.execute(mockServer);

      return response.json(employeeList);
    } catch ({ message,code }) {
      return response.json({ message, code });
    }
  }

  public create(request: Request, response: Response) {
    try {
      const { birth_date, cpf, email, gender, name, start_date, team }: Employee = request.body;
      const newEmployee = { birth_date, cpf, email, gender, name, start_date, team } as Employee;

      const createEmployeeService = new CreateEmployeeService();
      const employee = createEmployeeService.execute(newEmployee, mockServer);

      return response.json(employee);
    } catch ({ message,code }) {
      return response.json({ message, code });
    }
  }

  public update(request: Request, response: Response) {
    try {
      const { birth_date, cpf, email, gender, name, start_date, team } = request.body;


      const updateEmployeeService = new UpdateEmployeeService();
      const employee = updateEmployeeService.execute(
        { birth_date, cpf, email, gender, name, start_date, team },
        mockServer);

      return response.json(employee);
    } catch ({message,code}) {
      return response.json({ message, code });
    }
  }

  public delete(request: Request, response: Response) {
    try {
      const { cpf } = request.body;

      const deleteEmployeeService = new DeleteEmployeeService();
      deleteEmployeeService.execute(
        cpf,
        mockServer);

      return response.json({ Success: 'Funcionário Deletado' });
    } catch ({ message,code }) {
      return response.json({ message, code });
    }
  }
}

