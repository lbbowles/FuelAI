import Api from './Api'
import MealController from './MealController'
import MealPlanController from './MealPlanController'
import MealPlanMealController from './MealPlanMealController'
import ForumController from './ForumController'
import CalendarController from './CalendarController'
import Auth from './Auth'
import TaskController from './TaskController'
import AdminController from './AdminController'
import Settings from './Settings'

const Controllers = {
    Api: Object.assign(Api, Api),
    MealController: Object.assign(MealController, MealController),
    MealPlanController: Object.assign(MealPlanController, MealPlanController),
    MealPlanMealController: Object.assign(MealPlanMealController, MealPlanMealController),
    ForumController: Object.assign(ForumController, ForumController),
    CalendarController: Object.assign(CalendarController, CalendarController),
    Auth: Object.assign(Auth, Auth),
    TaskController: Object.assign(TaskController, TaskController),
    AdminController: Object.assign(AdminController, AdminController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers