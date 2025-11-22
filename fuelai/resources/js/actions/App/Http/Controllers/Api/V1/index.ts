import AuthController from './AuthController'
import UserController from './UserController'
import ForumController from './ForumController'
import MealController from './MealController'
import MealPlanController from './MealPlanController'
import TaskController from './TaskController'

const V1 = {
    AuthController: Object.assign(AuthController, AuthController),
    UserController: Object.assign(UserController, UserController),
    ForumController: Object.assign(ForumController, ForumController),
    MealController: Object.assign(MealController, MealController),
    MealPlanController: Object.assign(MealPlanController, MealPlanController),
    TaskController: Object.assign(TaskController, TaskController),
}

export default V1