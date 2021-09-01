export type Gender = "Masculino" | "Feminino" | "Outros"

export class Employee {

  birth_date!: Date;
  cpf!: String;
  email!: String;
  gender!: Gender;
  name!: String;
  start_date!: String;
  team?: String;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.birth_date = new Date();
    this.cpf = "";
    this.email = "";
    this.gender = "Outros";
    this.name = "";
    this.start_date = "";
    this.team = "";
  }

  clone(): Employee {
    var employee: Employee = new Employee();
    employee.copyFrom(this);
    return employee;
  }

  copyFrom(from: Employee): void {
    this.birth_date = from.birth_date;
    this.cpf = from.cpf;
    this.email = from.email;
    this.gender = from.gender;
    this.name = from.name;
    this.start_date = from.start_date;
    this.team = from.team;
  }
}