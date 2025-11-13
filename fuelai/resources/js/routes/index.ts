import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see routes/web.php:20
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:20
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:20
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:20
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see routes/web.php:24
* @route '/home'
*/
export const home_page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home_page.url(options),
    method: 'get',
})

home_page.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:24
* @route '/home'
*/
home_page.url = (options?: RouteQueryOptions) => {
    return home_page.definition.url + queryParams(options)
}

/**
* @see routes/web.php:24
* @route '/home'
*/
home_page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home_page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:24
* @route '/home'
*/
home_page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home_page.url(options),
    method: 'head',
})

/**
* @see routes/web.php:24
* @route '/home'
*/
const home_pageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home_page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:24
* @route '/home'
*/
home_pageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home_page.url(options),
    method: 'get',
})

/**
* @see routes/web.php:24
* @route '/home'
*/
home_pageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home_page.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home_page.form = home_pageForm

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
export const recipeGeneration = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recipeGeneration.url(options),
    method: 'get',
})

recipeGeneration.definition = {
    methods: ["get","head"],
    url: '/recipe-generation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
recipeGeneration.url = (options?: RouteQueryOptions) => {
    return recipeGeneration.definition.url + queryParams(options)
}

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
recipeGeneration.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recipeGeneration.url(options),
    method: 'get',
})

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
recipeGeneration.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recipeGeneration.url(options),
    method: 'head',
})

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
const recipeGenerationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recipeGeneration.url(options),
    method: 'get',
})

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
recipeGenerationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recipeGeneration.url(options),
    method: 'get',
})

/**
* @see routes/web.php:29
* @route '/recipe-generation'
*/
recipeGenerationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recipeGeneration.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recipeGeneration.form = recipeGenerationForm

/**
* @see routes/web.php:47
* @route '/meals'
*/
export const meals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: meals.url(options),
    method: 'get',
})

meals.definition = {
    methods: ["get","head"],
    url: '/meals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:47
* @route '/meals'
*/
meals.url = (options?: RouteQueryOptions) => {
    return meals.definition.url + queryParams(options)
}

/**
* @see routes/web.php:47
* @route '/meals'
*/
meals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: meals.url(options),
    method: 'get',
})

/**
* @see routes/web.php:47
* @route '/meals'
*/
meals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: meals.url(options),
    method: 'head',
})

/**
* @see routes/web.php:47
* @route '/meals'
*/
const mealsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: meals.url(options),
    method: 'get',
})

/**
* @see routes/web.php:47
* @route '/meals'
*/
mealsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: meals.url(options),
    method: 'get',
})

/**
* @see routes/web.php:47
* @route '/meals'
*/
mealsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: meals.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

meals.form = mealsForm

/**
* @see routes/web.php:79
* @route '/exercises'
*/
export const exercises = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exercises.url(options),
    method: 'get',
})

exercises.definition = {
    methods: ["get","head"],
    url: '/exercises',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:79
* @route '/exercises'
*/
exercises.url = (options?: RouteQueryOptions) => {
    return exercises.definition.url + queryParams(options)
}

/**
* @see routes/web.php:79
* @route '/exercises'
*/
exercises.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exercises.url(options),
    method: 'get',
})

/**
* @see routes/web.php:79
* @route '/exercises'
*/
exercises.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exercises.url(options),
    method: 'head',
})

/**
* @see routes/web.php:79
* @route '/exercises'
*/
const exercisesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exercises.url(options),
    method: 'get',
})

/**
* @see routes/web.php:79
* @route '/exercises'
*/
exercisesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exercises.url(options),
    method: 'get',
})

/**
* @see routes/web.php:79
* @route '/exercises'
*/
exercisesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exercises.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exercises.form = exercisesForm

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
export const image_rec = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image_rec.url(options),
    method: 'get',
})

image_rec.definition = {
    methods: ["get","head"],
    url: '/image_rec',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
image_rec.url = (options?: RouteQueryOptions) => {
    return image_rec.definition.url + queryParams(options)
}

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
image_rec.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image_rec.url(options),
    method: 'get',
})

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
image_rec.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: image_rec.url(options),
    method: 'head',
})

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
const image_recForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: image_rec.url(options),
    method: 'get',
})

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
image_recForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: image_rec.url(options),
    method: 'get',
})

/**
* @see routes/web.php:91
* @route '/image_rec'
*/
image_recForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: image_rec.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

image_rec.form = image_recForm

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:119
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
export const appearance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})

appearance.definition = {
    methods: ["get","head"],
    url: '/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
appearance.url = (options?: RouteQueryOptions) => {
    return appearance.definition.url + queryParams(options)
}

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
appearance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
appearance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appearance.url(options),
    method: 'head',
})

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
const appearanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appearance.url(options),
    method: 'get',
})

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
appearanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appearance.url(options),
    method: 'get',
})

/**
* @see routes/settings.php:21
* @route '/settings/appearance'
*/
appearanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appearance.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

appearance.form = appearanceForm

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:21
* @route '/register'
*/
registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm
