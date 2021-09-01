import { Employee } from "../../../commom/employee";
import MockServer from "../mockServer"
import { CreateEmployeeService } from "./CreateEmployeeService";
import { ShowEmployeeListService } from "./ShowEmployeeListService";


let mockServer: MockServer;
let createEmployee : CreateEmployeeService;
let showEmployee : ShowEmployeeListService;


describe('Show Employees', ()=> {
  beforeEach(() => {
    mockServer = new MockServer();
    createEmployee = new CreateEmployeeService();
    showEmployee = new ShowEmployeeListService();
  })

  it('Should begin empty', () => {
    expect(mockServer.findAllEmployees()).toHaveLength(0);
  })


  it('Should be able to show all existing employees',() => {

    let employee = {
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

    employee = {
      birth_date: new Date("2000-05-02"),
      cpf: "00000000011",
      email: "fernanda@gmail.com",
      gender: "Outros",
      name: "Fernanda",
      start_date: "11/2020"
    } as unknown as Employee

    createEmployee.execute(employee, mockServer);

    expect(showEmployee.execute(mockServer)).toHaveLength(2);  
    

  })
})