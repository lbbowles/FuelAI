import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/api/meal-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
const apiIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
apiIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiIndex
* @see app/Http/Controllers/MealPlanController.php:76
* @route '/api/meal-plans'
*/
apiIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

apiIndex.form = apiIndexForm

/**
* @see \App\Http\Controllers\MealPlanController::apiStore
* @see app/Http/Controllers/MealPlanController.php:87
* @route '/api/meal-plans'
*/
export const apiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

apiStore.definition = {
    methods: ["post"],
    url: '/api/meal-plans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiStore
* @see app/Http/Controllers/MealPlanController.php:87
* @route '/api/meal-plans'
*/
apiStore.url = (options?: RouteQueryOptions) => {
    return apiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiStore
* @see app/Http/Controllers/MealPlanController.php:87
* @route '/api/meal-plans'
*/
apiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiStore
* @see app/Http/Controllers/MealPlanController.php:87
* @route '/api/meal-plans'
*/
const apiStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiStore
* @see app/Http/Controllers/MealPlanController.php:87
* @route '/api/meal-plans'
*/
apiStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiStore.url(options),
    method: 'post',
})

apiStore.form = apiStoreForm

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
export const apiShow = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiShow.url(args, options),
    method: 'get',
})

apiShow.definition = {
    methods: ["get","head"],
    url: '/api/meal-plans/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
apiShow.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return apiShow.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
apiShow.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
apiShow.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiShow.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
const apiShowForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
apiShowForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiShow
* @see app/Http/Controllers/MealPlanController.php:106
* @route '/api/meal-plans/{id}'
*/
apiShowForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiShow.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

apiShow.form = apiShowForm

/**
* @see \App\Http\Controllers\MealPlanController::apiDestroy
* @see app/Http/Controllers/MealPlanController.php:122
* @route '/api/meal-plans/{id}'
*/
export const apiDestroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

apiDestroy.definition = {
    methods: ["delete"],
    url: '/api/meal-plans/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiDestroy
* @see app/Http/Controllers/MealPlanController.php:122
* @route '/api/meal-plans/{id}'
*/
apiDestroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return apiDestroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiDestroy
* @see app/Http/Controllers/MealPlanController.php:122
* @route '/api/meal-plans/{id}'
*/
apiDestroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiDestroy
* @see app/Http/Controllers/MealPlanController.php:122
* @route '/api/meal-plans/{id}'
*/
const apiDestroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiDestroy
* @see app/Http/Controllers/MealPlanController.php:122
* @route '/api/meal-plans/{id}'
*/
apiDestroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

apiDestroy.form = apiDestroyForm

/**
* @see \App\Http\Controllers\MealPlanController::apiAddMeal
* @see app/Http/Controllers/MealPlanController.php:138
* @route '/api/meal-plans/{id}/add-meal'
*/
export const apiAddMeal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiAddMeal.url(args, options),
    method: 'post',
})

apiAddMeal.definition = {
    methods: ["post"],
    url: '/api/meal-plans/{id}/add-meal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiAddMeal
* @see app/Http/Controllers/MealPlanController.php:138
* @route '/api/meal-plans/{id}/add-meal'
*/
apiAddMeal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return apiAddMeal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiAddMeal
* @see app/Http/Controllers/MealPlanController.php:138
* @route '/api/meal-plans/{id}/add-meal'
*/
apiAddMeal.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiAddMeal.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiAddMeal
* @see app/Http/Controllers/MealPlanController.php:138
* @route '/api/meal-plans/{id}/add-meal'
*/
const apiAddMealForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiAddMeal.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiAddMeal
* @see app/Http/Controllers/MealPlanController.php:138
* @route '/api/meal-plans/{id}/add-meal'
*/
apiAddMealForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiAddMeal.url(args, options),
    method: 'post',
})

apiAddMeal.form = apiAddMealForm

/**
* @see \App\Http\Controllers\MealPlanController::apiRemoveMeal
* @see app/Http/Controllers/MealPlanController.php:178
* @route '/api/meal-plans-meals/{id}'
*/
export const apiRemoveMeal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiRemoveMeal.url(args, options),
    method: 'delete',
})

apiRemoveMeal.definition = {
    methods: ["delete"],
    url: '/api/meal-plans-meals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealPlanController::apiRemoveMeal
* @see app/Http/Controllers/MealPlanController.php:178
* @route '/api/meal-plans-meals/{id}'
*/
apiRemoveMeal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return apiRemoveMeal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealPlanController::apiRemoveMeal
* @see app/Http/Controllers/MealPlanController.php:178
* @route '/api/meal-plans-meals/{id}'
*/
apiRemoveMeal.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiRemoveMeal.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiRemoveMeal
* @see app/Http/Controllers/MealPlanController.php:178
* @route '/api/meal-plans-meals/{id}'
*/
const apiRemoveMealForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiRemoveMeal.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::apiRemoveMeal
* @see app/Http/Controllers/MealPlanController.php:178
* @route '/api/meal-plans-meals/{id}'
*/
apiRemoveMealForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiRemoveMeal.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

apiRemoveMeal.form = apiRemoveMealForm

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
* @see \App\Http\Controllers\MealPlanController::index
* @see app/Http/Controllers/MealPlanController.php:15
* @route '/meal_plans'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::index
* @see app/Http/Controllers/MealPlanController.php:15
* @route '/meal_plans'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::index
* @see app/Http/Controllers/MealPlanController.php:15
* @route '/meal_plans'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

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
* @see \App\Http\Controllers\MealPlanController::store
* @see app/Http/Controllers/MealPlanController.php:26
* @route '/meal_plans'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealPlanController::store
* @see app/Http/Controllers/MealPlanController.php:26
* @route '/meal_plans'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \App\Http\Controllers\MealPlanController::destroy
* @see app/Http/Controllers/MealPlanController.php:63
* @route '/meal_plans/{id}'
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
* @see \App\Http\Controllers\MealPlanController::destroy
* @see app/Http/Controllers/MealPlanController.php:63
* @route '/meal_plans/{id}'
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

/**
* @see \App\Http\Controllers\MealPlanController::show
* @see app/Http/Controllers/MealPlanController.php:42
* @route '/meal_plans/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::show
* @see app/Http/Controllers/MealPlanController.php:42
* @route '/meal_plans/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealPlanController::show
* @see app/Http/Controllers/MealPlanController.php:42
* @route '/meal_plans/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const MealPlanController = { apiIndex, apiStore, apiShow, apiDestroy, apiAddMeal, apiRemoveMeal, index, store, destroy, show }

export default MealPlanController