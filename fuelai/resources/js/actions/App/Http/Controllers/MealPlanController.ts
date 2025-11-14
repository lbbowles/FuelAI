import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MealPlanController::index
 * @see app/Http/Controllers/MealPlanController.php:15
 * @route '/meal_plans'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/meal_plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealPlanController::index
 * @see app/Http/Controllers/MealPlanController.php:15
 * @route '/meal_plans'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::index
 * @see app/Http/Controllers/MealPlanController.php:15
 * @route '/meal_plans'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MealPlanController::index
 * @see app/Http/Controllers/MealPlanController.php:15
 * @route '/meal_plans'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealPlanController::store
 * @see app/Http/Controllers/MealPlanController.php:26
 * @route '/meal_plans'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/meal_plans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealPlanController::store
 * @see app/Http/Controllers/MealPlanController.php:26
 * @route '/meal_plans'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::store
 * @see app/Http/Controllers/MealPlanController.php:26
 * @route '/meal_plans'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::destroy
 * @see app/Http/Controllers/MealPlanController.php:63
 * @route '/meal_plans/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/meal_plans/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealPlanController::destroy
 * @see app/Http/Controllers/MealPlanController.php:63
 * @route '/meal_plans/{id}'
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
* @see \App\Http\Controllers\MealPlanController::destroy
 * @see app/Http/Controllers/MealPlanController.php:63
 * @route '/meal_plans/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MealPlanController::show
 * @see app/Http/Controllers/MealPlanController.php:42
 * @route '/meal_plans/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/meal_plans/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealPlanController::show
 * @see app/Http/Controllers/MealPlanController.php:42
 * @route '/meal_plans/{id}'
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
* @see \App\Http\Controllers\MealPlanController::show
 * @see app/Http/Controllers/MealPlanController.php:42
 * @route '/meal_plans/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MealPlanController::show
 * @see app/Http/Controllers/MealPlanController.php:42
 * @route '/meal_plans/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const MealPlanController = { index, store, destroy, show }

export default MealPlanController