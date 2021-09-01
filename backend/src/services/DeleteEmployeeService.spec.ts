import { Employee } from "../../../commom/employee";
import MockServer from "../mockServer"
import { CreateEmployeeService } from "./CreateEmployeeService";
import { DeleteEmployeeService } from "./DeleteEmployeeService";


let mockServer: MockServer;
let createEmployee : CreateEmployeeService;
let deleteEmployee : DeleteEmployeeService;


describe('Delete Employee', ()=> {
  beforeEach(() => {
    mockServer = new MockServer();
    createEmployee = new CreateEmployeeService();
    deleteEmployee = new DeleteEmployeeService();
  })

  it('Should begin empty', () => {
    expect(mockServer.findAllEmployees()).toHaveLength(0);
  })


  it('Should be able to delete an created employee',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as unknown as Employee

    createEmployee.execute(employee, mockServer);
    expect(mockServer.findAllEmployees()).toHaveLength(1);

    deleteEmployee.execute(employee.email, mockServer);

    expect(mockServer.findAllEmployees()).toHaveLength(0);  
    

  })

  it('Should not be able to delete a non existed email from employee',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as unknown as Employee

    createEmployee.execute(employee, mockServer)

    try {
      deleteEmployee.execute("fernanda@gmail.com", mockServer);
    } catch ({message, code}) {
      expect(message).toBe("Employee not found");
      expect(code).toBe(404);
    }
    
    expect(mockServer.findAllEmployees()).toHaveLength(1);

  })

  it('Should not be able to create two employees with the same email',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as unknown as Employee

    createEmployee.execute(employee, mockServer);

    const employeeOther = {
      birth_date: new Date("2000-04-02"),
      cpf: "00000000011",
      email: "antonio@gmail.com",
      gender: "Feminino",
      name: "Netto",
      start_date: "11/2020",
      team: "Frontend"
    } as unknown as Employee

    try {
      createEmployee.execute(employeeOther, mockServer);
    } catch ({message, code}) {
      expect(message).toBe("E-mail already in use");
      expect(code).toBe(409);
    }
    
    expect(mockServer.findAllEmployees()).toHaveLength(1);

  })
})