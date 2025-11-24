import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MealPlanMealController::destroy
* @see app/Http/Controllers/MealPlanMealController.php:26
* @route '/meal_plan_meals/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/meal_plan_meals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealPlanMealController::destroy
* @see app/Http/Controllers/MealPlanMealController.php:26
* @route '/meal_plan_meals/{id}'
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
* @see \App\Http\Controllers\MealPlanMealController::destroy
* @see app/Http/Controllers/MealPlanMealController.php:26
* @route '/meal_plan_meals/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MealPlanMealController::destroy
* @see app/Http/Controllers/MealPlanMealController.php:26
* @route '/meal_plan_meals/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanMealController::destroy
* @see app/Http/Controllers/MealPlanMealController.php:26
* @route '/meal_plan_meals/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\MealPlanMealController::store
* @see app/Http/Controllers/MealPlanMealController.php:12
* @route '/meal_plan_meals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/meal_plan_meals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealPlanMealController::store
* @see app/Http/Controllers/MealPlanMealController.php:12
* @route '/meal_plan_meals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanMealController::store
* @see app/Http/Controllers/MealPlanMealController.php:12
* @route '/meal_plan_meals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanMealController::store
* @see app/Http/Controllers/MealPlanMealController.php:12
* @route '/meal_plan_meals'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanMealController::store
* @see app/Http/Controllers/MealPlanMealController.php:12
* @route '/meal_plan_meals'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const MealPlanMealController = { destroy, store }

export default MealPlanMealController