import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import EmployeesControllers from "../controllers/EmployeesControllers";
import { Gender } from "../../../commom/employee";

const employeesRouter = Router()
const employeesControllers = new EmployeesControllers();

employeesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date().required(),
      cpf: Joi.string().required().regex(new RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')),
      email: Joi.string().email().required(),
      gender: Joi.string().required().custom((value:Gender, helper: any) => {
        if(value == "Masculino" || value == "Feminino" || value == "Outros") return value;
        else return helper.message("Genero precisa ser Masculino, Feminino ou Outros");
      }),
      name: Joi.string().required(),
      start_date: Joi.string().required().regex(new RegExp('^(0[1-9]|1[0-2])[/][0-2][0-9]{3}$')),
      team: Joi.string().custom((value:string, helper: any) => {
        if(value == "Mobile" || value == "Frontend" || value == "Backend") return value;
        else return helper.message("Time precisa ser Mobile, Frontend ou Backend");
      })
    },
  }),
  employeesControllers.create,
);

employeesRouter.get(
  '/',
  employeesControllers.show
);

employeesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date().required(),
      cpf: Joi.string().required().regex(new RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')),
      email: Joi.string().email().required(),
      gender: Joi.string().required().custom((value:Gender, helper: any) => {
        if(value == "Masculino" || value == "Feminino" || value == "Outros") return value;
        else return helper.message("Genero precisa ser Masculino, Feminino ou Outros");
      }),
      name: Joi.string().required(),
      start_date: Joi.string().required().regex(new RegExp('^(0[1-9]|1[0-2])[/][0-2][0-9]{3}$')),
      team: Joi.string().custom((value:string, helper: any) => {
        if(value == "Mobile" || value == "Frontend" || value == "Backend") return value;
        else return helper.message("Time precisa ser Mobile, Frontend ou Backend");
      })
    },
  }),
  employeesControllers.update,
);

employeesRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required().regex(new RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}'))
    },
  }),
  employeesControllers.delete,
);

export default employeesRouter;
