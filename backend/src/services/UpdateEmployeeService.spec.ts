import { Employee } from "../../../commom/employee";
import MockServer from "../mockServer"
import { CreateEmployeeService } from "./CreateEmployeeService";
import { UpdateEmployeeService } from "./UpdateEmployeeService";


let mockServer: MockServer;
let createEmployee : CreateEmployeeService;
let updateEmployee : UpdateEmployeeService;


describe('Update Employee', ()=> {
  beforeEach(() => {
    mockServer = new MockServer();
    createEmployee = new CreateEmployeeService();
    updateEmployee = new UpdateEmployeeService();
  })

  it('Should begin empty', () => {
    expect(mockServer.findAllEmployees()).toHaveLength(0);
  })


  it('Should be able to update a existing employee',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as Employee

    const pushedEmployee = createEmployee.execute(employee, mockServer);
    expect(pushedEmployee).toEqual(employee);
    
    const editedEmployee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonioNovo@gmail.com",
      gender: "Outros",
      name: "Antonio Barros",
      start_date: "11/2020"
    } as Employee

    const updatedEmployee = updateEmployee.execute(editedEmployee, mockServer);

    expect(mockServer.findAllEmployees()).toHaveLength(1);
    expect(updatedEmployee.cpf).toBe(employee.cpf);
    expect(updatedEmployee.email).not.toBe(employee.email);
    expect(updatedEmployee.gender).not.toBe(employee.gender);
    expect(updatedEmployee.name).not.toBe(employee.name);
    expect(updatedEmployee.start_date).not.toBe(employee.start_date);
    expect(updatedEmployee.team).not.toBe(employee.team);
    

  })

  it('Should not be able to update a non existing cpf',() => {

    const employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as Employee

    createEmployee.execute(employee, mockServer);
    
    const editedEmployee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000001",
      email: "antonioNovo@gmail.com",
      gender: "Outros",
      name: "Antonio Barros",
      start_date: "11/2020"
    } as Employee

    try {
     updateEmployee.execute(editedEmployee, mockServer);
    } catch ({message, code}) {
      expect(message).toBe("Cpf not found");
      expect(code).toBe(404);
    }
    
    expect(mockServer.findAllEmployees()[0]).toEqual(employee);

  })

  it('Should not be able to update an already using email',() => {

    let employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonio@gmail.com",
      gender: "Masculino",
      name: "Antonio",
      start_date: "10/2020",
      team: "Mobile"
    } as Employee

    createEmployee.execute(employee, mockServer);

    let employeeOther = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000011",
      email: "antonioBarros@gmail.com",
      gender: "Masculino",
      name: "Barros Antonio",
      start_date: "11/2020"
    } as Employee

    createEmployee.execute(employeeOther, mockServer);
    
    const editedEmployee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000000",
      email: "antonioBarros@gmail.com",
      gender: "Outros",
      name: "Antonio Barros",
      start_date: "11/2020"
    } as Employee

    try {
     updateEmployee.execute(editedEmployee, mockServer);
    } catch ({message, code}) {
      expect(message).toBe("E-mail already in use");
      expect(code).toBe(409);
    }
    
    expect(mockServer.findAllEmployees()[0]).toEqual(employee);
    expect(mockServer.findAllEmployees()[1]).toEqual(employeeOther);

  })
})