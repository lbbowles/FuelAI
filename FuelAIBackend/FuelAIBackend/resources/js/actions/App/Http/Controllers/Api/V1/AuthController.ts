import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:17
* @route '/api/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:17
* @route '/api/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:17
* @route '/api/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:17
* @route '/api/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:17
* @route '/api/register'
*/
registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:43
* @route '/api/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:43
* @route '/api/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:43
* @route '/api/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:43
* @route '/api/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:43
* @route '/api/login'
*/
loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:0
* @route '/api/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:0
* @route '/api/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:0
* @route '/api/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:0
* @route '/api/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:0
* @route '/api/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

const AuthController = { register, login, logout }

export default AuthController