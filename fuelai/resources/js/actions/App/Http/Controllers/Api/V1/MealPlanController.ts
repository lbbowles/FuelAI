import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:12
 * @route '/api/meal-plans'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/meal-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:12
 * @route '/api/meal-plans'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:12
 * @route '/api/meal-plans'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::index
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:12
 * @route '/api/meal-plans'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::store
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:23
 * @route '/api/meal-plans'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/meal-plans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::store
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:23
 * @route '/api/meal-plans'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::store
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:23
 * @route '/api/meal-plans'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::show
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:42
 * @route '/api/meal-plans/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/meal-plans/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::show
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:42
 * @route '/api/meal-plans/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::show
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:42
 * @route '/api/meal-plans/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::show
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:42
 * @route '/api/meal-plans/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::destroy
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:58
 * @route '/api/meal-plans/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/meal-plans/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::destroy
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:58
 * @route '/api/meal-plans/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::destroy
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:58
 * @route '/api/meal-plans/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::addMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:71
 * @route '/api/meal-plans/{id}/add-meal'
 */
export const addMeal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMeal.url(args, options),
    method: 'post',
})

addMeal.definition = {
    methods: ["post"],
    url: '/api/meal-plans/{id}/add-meal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::addMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:71
 * @route '/api/meal-plans/{id}/add-meal'
 */
addMeal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return addMeal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::addMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:71
 * @route '/api/meal-plans/{id}/add-meal'
 */
addMeal.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMeal.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::removeMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:117
 * @route '/api/meal-plans-meals/{id}'
 */
export const removeMeal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMeal.url(args, options),
    method: 'delete',
})

removeMeal.definition = {
    methods: ["delete"],
    url: '/api/meal-plans-meals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::removeMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:117
 * @route '/api/meal-plans-meals/{id}'
 */
removeMeal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return removeMeal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\MealPlanController::removeMeal
 * @see app/Http/Controllers/Api/V1/MealPlanController.php:117
 * @route '/api/meal-plans-meals/{id}'
 */
removeMeal.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMeal.url(args, options),
    method: 'delete',
})
const MealPlanController = { index, store, show, destroy, addMeal, removeMeal }

export default MealPlanController