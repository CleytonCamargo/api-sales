import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import UsersValidator from '../validators/UsersValidator'
import isAuthenticated from '@shared/middlewares/isAuthenticated'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersAvatarController from '../controllers/UsersAvatarController'
import ChangePasswordController from '../controllers/ChangePasswordController'
import ChangePasswordValidator from '../validators/ChangePasswordValidator'

const usersRouter = Router()
const usersController = new UsersController()
const usersValidator = new UsersValidator()
const usersAvatarController = new UsersAvatarController()
const changePasswordController = new ChangePasswordController()
const changePasswordValidator = new ChangePasswordValidator()

const upload = multer(uploadConfig.multer)

usersRouter.all('*', isAuthenticated)

usersRouter.get('/', usersController.index)
usersRouter.post('/', usersValidator.create, usersController.create)
usersRouter.get('/:id', usersValidator.show, usersController.show)
usersRouter.put('/:id', usersValidator.update, usersController.update)
usersRouter.put(
  '/me/change-password',
  changePasswordValidator.update,
  changePasswordController.update,
)
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  usersAvatarController.update,
)

export default usersRouter
