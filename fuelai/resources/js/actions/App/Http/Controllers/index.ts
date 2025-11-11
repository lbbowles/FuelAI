import Api from './Api'
import MealPlanController from './MealPlanController'
import MealController from './MealController'
import MealPlanMealController from './MealPlanMealController'
import ForumController from './ForumController'
import CalendarController from './CalendarController'
import TaskController from './TaskController'
import Auth from './Auth'
import Settings from './Settings'

const Controllers = {
    Api: Object.assign(Api, Api),
    MealPlanController: Object.assign(MealPlanController, MealPlanController),
    MealController: Object.assign(MealController, MealController),
    MealPlanMealController: Object.assign(MealPlanMealController, MealPlanMealController),
    ForumController: Object.assign(ForumController, ForumController),
    CalendarController: Object.assign(CalendarController, CalendarController),
    TaskController: Object.assign(TaskController, TaskController),
    Auth: Object.assign(Auth, Auth),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers