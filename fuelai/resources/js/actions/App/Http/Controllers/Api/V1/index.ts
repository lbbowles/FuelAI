import AuthController from './AuthController'
import UserController from './UserController'
import ForumController from './ForumController'

const V1 = {
    AuthController: Object.assign(AuthController, AuthController),
    UserController: Object.assign(UserController, UserController),
    ForumController: Object.assign(ForumController, ForumController),
}

export default V1