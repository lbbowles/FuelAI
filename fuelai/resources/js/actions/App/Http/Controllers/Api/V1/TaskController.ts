import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\TaskController::index
 * @see app/Http/Controllers/Api/V1/TaskController.php:12
 * @route '/api/tasks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tasks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\TaskController::index
 * @see app/Http/Controllers/Api/V1/TaskController.php:12
 * @route '/api/tasks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaskController::index
 * @see app/Http/Controllers/Api/V1/TaskController.php:12
 * @route '/api/tasks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\TaskController::index
 * @see app/Http/Controllers/Api/V1/TaskController.php:12
 * @route '/api/tasks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\TaskController::store
 * @see app/Http/Controllers/Api/V1/TaskController.php:25
 * @route '/api/tasks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/tasks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\TaskController::store
 * @see app/Http/Controllers/Api/V1/TaskController.php:25
 * @route '/api/tasks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaskController::store
 * @see app/Http/Controllers/Api/V1/TaskController.php:25
 * @route '/api/tasks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\TaskController::update
 * @see app/Http/Controllers/Api/V1/TaskController.php:52
 * @route '/api/tasks/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/tasks/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\TaskController::update
 * @see app/Http/Controllers/Api/V1/TaskController.php:52
 * @route '/api/tasks/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaskController::update
 * @see app/Http/Controllers/Api/V1/TaskController.php:52
 * @route '/api/tasks/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\TaskController::destroy
 * @see app/Http/Controllers/Api/V1/TaskController.php:76
 * @route '/api/tasks/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/tasks/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\TaskController::destroy
 * @see app/Http/Controllers/Api/V1/TaskController.php:76
 * @route '/api/tasks/{id}'
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
* @see \App\Http\Controllers\Api\V1\TaskController::destroy
 * @see app/Http/Controllers/Api/V1/TaskController.php:76
 * @route '/api/tasks/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\TaskController::storeWorkout
 * @see app/Http/Controllers/Api/V1/TaskController.php:90
 * @route '/api/tasks/workout'
 */
export const storeWorkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeWorkout.url(options),
    method: 'post',
})

storeWorkout.definition = {
    methods: ["post"],
    url: '/api/tasks/workout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\TaskController::storeWorkout
 * @see app/Http/Controllers/Api/V1/TaskController.php:90
 * @route '/api/tasks/workout'
 */
storeWorkout.url = (options?: RouteQueryOptions) => {
    return storeWorkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaskController::storeWorkout
 * @see app/Http/Controllers/Api/V1/TaskController.php:90
 * @route '/api/tasks/workout'
 */
storeWorkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeWorkout.url(options),
    method: 'post',
})
const TaskController = { index, store, update, destroy, storeWorkout }

export default TaskController