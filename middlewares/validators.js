//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existCategoryName, existCategoryNameU, existEmail, existProductName, existUsername, isValidCategoryId, isValidPrice, isValidStock, notRequiredField, objectIdValid } from "../utils/db.validators.js"

//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
        body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('password')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') 
        .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter') 
        .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter') 
        .matches(/\d/).withMessage('Password must contain at least 1 number'), 
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserValidator = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 
]

export const updatePasswordValidator = [
    body('currentPassword')
        .notEmpty().withMessage('Current password cannot be empty'),
    body('newPassword')
        .notEmpty().withMessage('New password cannot be empty')
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({ min: 8 })
        .withMessage('New password needs min characters')
        .matches(/[a-z]/).withMessage('New password must contain at least 1 lowercase letter')
        .matches(/[A-Z]/).withMessage('New password must contain at least 1 uppercase letter')
        .matches(/\d/).withMessage('New password must contain at least 1 number'),
    validateErrors 
]

export const userUpdate = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom(existEmail),
validateErrorsWithoutFiles 
]

export const productValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(existProductName), 
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({ min: 8 }).withMessage('Description must be at least 8 characters long')
        .isLength({ max: 100 }).withMessage('Description must be at most 100 characters long'),
    body('price', 'Price cannot be empty')
        .notEmpty()
        .isNumeric().withMessage('Price must be a number')
        .custom(isValidPrice),
    body('stock', 'Stock cannot be empty')
        .notEmpty()
        .isNumeric().withMessage('Stock must be a number')
        .custom(isValidStock), 
    body('category', 'Category ID cannot be empty')
        .notEmpty()
        .custom(isValidCategoryId), 
    validateErrors 
]

export const updateProductValidator = [
    body('name')
        .optional()
        .notEmpty().withMessage('Name cannot be empty')
        .custom(existProductName),
    body('description')
        .optional()
        .notEmpty().withMessage('Description cannot be empty')
        .isLength({ min: 8 }).withMessage('Description must be at least 8 characters long')
        .isLength({ max: 100 }).withMessage('Description must be at most 100 characters long'),
    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a number')
        .custom(isValidPrice),
    body('stock')
        .optional()
        .isNumeric().withMessage('Stock must be a number')
        .custom(isValidStock),
    body('category')
        .optional()
        .custom(isValidCategoryId),
    validateErrors
]

export const categoryValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(existCategoryName),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({ min: 5 }).withMessage('Description must be at least 5 characters long')
        .isLength({ max: 100 }).withMessage('Description must be at most 100 characters long'),
    validateErrors
]

export const updateCategoryValidator = [
    body('name')
        .optional()
        .notEmpty().withMessage('Name cannot be empty')
        .custom(existCategoryNameU), 

    body('description')
        .optional()
        .notEmpty().withMessage('Description cannot be empty')
        .isLength({ min: 5 }).withMessage('Description must be at least 5 characters long')
        .isLength({ max: 100 }).withMessage('Description must be at most 100 characters long'),

    validateErrors
]