import { Employee } from "../../../commom/employee";
import MockServer from "../mockServer"
import { CreateEmployeeService } from "./CreateEmployeeService";


let mockServer: MockServer;
let createEmployee : CreateEmployeeService;


describe('Create Employee', ()=> {
  beforeEach(() => {
    mockServer = new MockServer();
    createEmployee = new CreateEmployeeService();
  })

  it('Should begin empty', () => {
    expect(mockServer.findAllEmployees()).toHaveLength(0);
  })


  it('Should be able to create a new employee',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as unknown as Employee

    const pushedEmployee = createEmployee.execute(employee, mockServer);

    expect(pushedEmployee).toEqual(employee);
    expect(mockServer.findAllEmployees()).toHaveLength(1);
    

  })

  it('Should not be able to create two employees with the same cpf',() => {

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
      cpf: "00000000000",
      email: "antonionetto@gmail.com",
      gender: "Feminino",
      name: "Netto",
      start_date: "11/2020",
      team: "Frontend"
    } as unknown as Employee

    try {
      createEmployee.execute(employeeOther, mockServer);
    } catch ({message, code}) {
      expect(message).toBe("Cpf already in use");
      expect(code).toBe(409);
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