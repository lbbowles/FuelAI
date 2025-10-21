import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
const index7a3a560c75d695862ae2af8c44eba069 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7a3a560c75d695862ae2af8c44eba069.url(options),
    method: 'get',
})

index7a3a560c75d695862ae2af8c44eba069.definition = {
    methods: ["get","head"],
    url: '/test-meal-plan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
index7a3a560c75d695862ae2af8c44eba069.url = (options?: RouteQueryOptions) => {
    return index7a3a560c75d695862ae2af8c44eba069.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
index7a3a560c75d695862ae2af8c44eba069.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7a3a560c75d695862ae2af8c44eba069.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
index7a3a560c75d695862ae2af8c44eba069.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7a3a560c75d695862ae2af8c44eba069.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
const index7a3a560c75d695862ae2af8c44eba069Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7a3a560c75d695862ae2af8c44eba069.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
index7a3a560c75d695862ae2af8c44eba069Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7a3a560c75d695862ae2af8c44eba069.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/test-meal-plan'
*/
index7a3a560c75d695862ae2af8c44eba069Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7a3a560c75d695862ae2af8c44eba069.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index7a3a560c75d695862ae2af8c44eba069.form = index7a3a560c75d695862ae2af8c44eba069Form
/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
const index35665d34cc72e9a9689f35f98f8fcc96 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index35665d34cc72e9a9689f35f98f8fcc96.url(options),
    method: 'get',
})

index35665d34cc72e9a9689f35f98f8fcc96.definition = {
    methods: ["get","head"],
    url: '/api/meal-plan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
index35665d34cc72e9a9689f35f98f8fcc96.url = (options?: RouteQueryOptions) => {
    return index35665d34cc72e9a9689f35f98f8fcc96.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
index35665d34cc72e9a9689f35f98f8fcc96.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index35665d34cc72e9a9689f35f98f8fcc96.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
index35665d34cc72e9a9689f35f98f8fcc96.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index35665d34cc72e9a9689f35f98f8fcc96.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
const index35665d34cc72e9a9689f35f98f8fcc96Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35665d34cc72e9a9689f35f98f8fcc96.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
index35665d34cc72e9a9689f35f98f8fcc96Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35665d34cc72e9a9689f35f98f8fcc96.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
* @see app/Http/Controllers/Api/V1/MealPlanController.php:13
* @route '/api/meal-plan'
*/
index35665d34cc72e9a9689f35f98f8fcc96Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35665d34cc72e9a9689f35f98f8fcc96.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index35665d34cc72e9a9689f35f98f8fcc96.form = index35665d34cc72e9a9689f35f98f8fcc96Form

export const index = {
    '/test-meal-plan': index7a3a560c75d695862ae2af8c44eba069,
    '/api/meal-plan': index35665d34cc72e9a9689f35f98f8fcc96,
}

const MealPlanController = { index }

export default MealPlanController