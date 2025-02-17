//Validar campo en las rutas
import { body } from "express-validator";
import { validateErrores } from "./validate.errors.js";
import { existEmail, existUsername, notRequiredField } from "../utils/db.validators.js";
import { validateErrorsWhitoutFiles } from "./validate.errors.js";

//Arreglo de validaciones (por cada ruta)
export const registerValidator =[
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be emprty')
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'username cannot be emprty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({main:8})
        .withMessage('Password need min characteres'),
    body('phone','Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
        validateErrores
]
export const updateUserValidator =[
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
        validateErrorsWhitoutFiles
]