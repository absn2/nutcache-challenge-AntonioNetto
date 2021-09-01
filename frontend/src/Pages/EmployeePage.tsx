import { TableContainer, Paper, Table, TableHead, 
  TableRow, TableCell, TableBody, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle , Select, MenuItem, FormHelperText} from "@material-ui/core";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from "react";
import "./EmployeePage.css";
import { TextField } from "@material-ui/core";


type Gender = "Masculino" | "Feminino" | "Outros"
interface Employee {

  birth_date: Date;
  cpf: String;
  email: String;
  gender: Gender;
  name: String;
  start_date: String;
  team?: String;

}

interface ActualEmployee {
  employee: Employee;
  index: number;
}

const baseEmployee : Employee = {
  birth_date: new Date(),
  cpf: '',
  email: '',
  gender: 'Outros',
  name: '',
  start_date: '',
  team: ""
}

const EmployeePage = () => {

  const [employee, setEmployee] = useState<ActualEmployee>();
  const [rows, setRows] = useState<any[]>([])

  const [openDialogAlert, setDialogAlert] = useState<boolean>(false);
  const [openDialogEdit, setDialogEdit] = useState<boolean>(false);

  const [typeForm, setTypeForm] = useState<number>(0);
  const [formData, setFormData] = useState<Employee>(baseEmployee);

  function createData(email: String, name: String, start_date: String, 
    birth_date: Date, cpf: String, gender: Gender, team?: String) {
    return { email, name, start_date, team, birth_date, cpf, gender };
  }

  useEffect(() => {
    callApi(0);
  }, [])

  const callApi = async(type: number) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    if (BASE_URL) {

      if (type === 0) {

        const employees: Employee[] = (await axios.get(BASE_URL)).data

        const employeeRow = employees.map(employee => {
          return createData(employee.email, employee.name, employee.start_date, employee.birth_date, 
            employee.cpf, employee.gender,  employee.team);
        })

        setRows(employeeRow);

      } else if (type >= 1 && type <= 3) {

        try {
          let response;
          const email = employee?.employee.email;
          const index = employee?.index || 0;

          if (!formData.team) delete formData.team;

          if(type === 1) response = (await axios.delete(BASE_URL, { data: { "email": email } })).data
          else if (type === 2) response = (await axios.put(BASE_URL, formData )).data
          else response = (await axios.post(BASE_URL, formData )).data
          
          if (!response.code) {
            type === 1 ? handleClose(0) : handleClose(1);
            const newRows = [...rows];

            if(type === 1) newRows.splice(index,1);
            else if (type === 2) newRows[index] = response;
            else newRows.push(response);

            setRows(newRows);
          } else {
            alert(`Error: ${response.message}\nStatus Code: ${response.code}`)
          }
        } catch (error) {
          console.log(error)
          alert("Something went wrong, check your entries and try again")}
      }
    }
  }

  const handleClickOpen = (type: number, employee: Employee, index: number = 0) => {
    setEmployee({employee, index});
    if (type === 0) {
      setDialogAlert(true);
    } else if (type === 1) {
      setFormData(employee);
      setTypeForm(0);
      setDialogEdit(true);
    } else if (type === 2) {
      setFormData(employee);
      setTypeForm(1);
      setDialogEdit(true);
    }
    
  };

  const handleClose = (type: number) => {
    if (type === 0) {
      setDialogAlert(false);
    } else if (type === 1) {
      setDialogEdit(false);
    }
  };

  const handleChange = (event : any) => {
    console.log(event)
		const { name, value } = event.target;
    console.log(formData);
    console.log(value);
		setFormData({ ...formData, [name]: value });
	}

  return (
    <div className="employee-container">

      <Dialog
        open={openDialogAlert}
        onClose={() => handleClose(0)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Disable an employee?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to disable the employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(0)} color="primary">
            No
          </Button>
          <Button onClick={()=>callApi(1)} variant="contained" color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogEdit}
        onClose={() => handleClose(1)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{typeForm === 0 ? "Edit an Employee": "Register new Employee"}</DialogTitle>
        <DialogContent>
          <form >
            <div className="form-input">
              <TextField
                required
                value={formData.cpf}
                name="cpf"
                label="Cpf"
                type="text"
                error={formData.cpf.length <= 0}
                className="input-field"
                disabled={typeForm === 0 ? true: false}
                onChange={handleChange}
              />
              <TextField
                required
                error={formData.email.length <= 0}
                value={formData.email}
                name="email"
                label="Email"
                type="text"
                className="input-field"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
            <TextField
                required
                value={formData.name}
                name="name"
                label="Name"
                type="text"
                className="input-field"
                error={formData.name.length <= 0 }
                onChange={handleChange}
              />
              <TextField
                required
                value={formData.start_date}
                name="start_date"
                label="Start Date"
                type="text"
                className="input-field"
                error={formData.start_date.length <= 0 || formData.start_date.length > 7}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
            <TextField
              id="date"
              required
              label="Birthday"
              type="date"
              name="birth_date"
              className="input-field"
              error={formData.birth_date.toString().length <= 0}
              value = {formData.birth_date ? new Date(formData.birth_date).toISOString().split("T")[0] : formData.birth_date}
              onChange = {handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className = "input-select-container">
              <FormHelperText>Gender</FormHelperText>
              <Select 
                name="gender"
                label="Gender"
                displayEmpty
                value={formData.gender}
                autoFocus={true}
                onChange={handleChange}
                required={true}
                className="input-select"
              >
                <MenuItem value="Masculino">Male</MenuItem>
                <MenuItem value="Feminino">Female</MenuItem>
                <MenuItem value="Outros">Others</MenuItem>
              </Select>
            </div>
            </div>
            <div className="form-input">
            <div className = "input-select-container">
              <FormHelperText>Team</FormHelperText>
              <Select 
                name="team"
                displayEmpty
                className="input-select"
                value={formData.team ? formData.team : ""}
                autoFocus={true}
                onChange={handleChange}
              >
                <MenuItem value=""> No Team </MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
              </Select>
              </div>
            </div>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(1)} color="primary">
            Cancel
          </Button>
          <Button onClick={typeForm === 0 ? () => callApi(2) : () => callApi(3) } variant="contained" color="secondary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <h2>List of Employees</h2>
      <Button variant="contained" color="primary" aria-label="add" onClick={() => handleClickOpen(2, baseEmployee)}>
        <AddIcon />
        Register Employee
      </Button>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><h3>Name</h3></TableCell>
                <TableCell align="right"><h3>Email</h3></TableCell>
                <TableCell align="right"><h3>Start Date</h3></TableCell>
                <TableCell align="right"><h3>Team</h3></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row,index) => (
                <TableRow key={row.email}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.start_date}</TableCell>
                  <TableCell align="right">{row.team ?? "No team"}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(1, row, index)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => handleClickOpen(0, row, index)}>
                      Disable
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;