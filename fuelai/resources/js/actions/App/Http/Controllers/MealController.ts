import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MealController::index
 * @see app/Http/Controllers/MealController.php:16
 * @route '/meal_list'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/meal_list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::index
 * @see app/Http/Controllers/MealController.php:16
 * @route '/meal_list'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::index
 * @see app/Http/Controllers/MealController.php:16
 * @route '/meal_list'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MealController::index
 * @see app/Http/Controllers/MealController.php:16
 * @route '/meal_list'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/meals'
 */
const store57b3a6105afb17387b56dc33f17ab3eb = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

store57b3a6105afb17387b56dc33f17ab3eb.definition = {
    methods: ["post"],
    url: '/meals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/meals'
 */
store57b3a6105afb17387b56dc33f17ab3eb.url = (options?: RouteQueryOptions) => {
    return store57b3a6105afb17387b56dc33f17ab3eb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/meals'
 */
store57b3a6105afb17387b56dc33f17ab3eb.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/image_rec'
 */
const store52e5a0320a836d69c93fa4c5d64160e9 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

store52e5a0320a836d69c93fa4c5d64160e9.definition = {
    methods: ["post"],
    url: '/image_rec',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/image_rec'
 */
store52e5a0320a836d69c93fa4c5d64160e9.url = (options?: RouteQueryOptions) => {
    return store52e5a0320a836d69c93fa4c5d64160e9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::store
 * @see app/Http/Controllers/MealController.php:39
 * @route '/image_rec'
 */
store52e5a0320a836d69c93fa4c5d64160e9.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

export const store = {
    '/meals': store57b3a6105afb17387b56dc33f17ab3eb,
    '/image_rec': store52e5a0320a836d69c93fa4c5d64160e9,
}

/**
* @see \App\Http\Controllers\MealController::create
 * @see app/Http/Controllers/MealController.php:34
 * @route '/meals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/meals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::create
 * @see app/Http/Controllers/MealController.php:34
 * @route '/meals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::create
 * @see app/Http/Controllers/MealController.php:34
 * @route '/meals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MealController::create
 * @see app/Http/Controllers/MealController.php:34
 * @route '/meals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::show
 * @see app/Http/Controllers/MealController.php:94
 * @route '/meals/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::show
 * @see app/Http/Controllers/MealController.php:94
 * @route '/meals/{id}'
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
* @see \App\Http\Controllers\MealController::show
 * @see app/Http/Controllers/MealController.php:94
 * @route '/meals/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MealController::show
 * @see app/Http/Controllers/MealController.php:94
 * @route '/meals/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::update
 * @see app/Http/Controllers/MealController.php:111
 * @route '/meals/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MealController::update
 * @see app/Http/Controllers/MealController.php:111
 * @route '/meals/{id}'
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
* @see \App\Http\Controllers\MealController::update
 * @see app/Http/Controllers/MealController.php:111
 * @route '/meals/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MealController::destroy
 * @see app/Http/Controllers/MealController.php:156
 * @route '/meals/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealController::destroy
 * @see app/Http/Controllers/MealController.php:156
 * @route '/meals/{id}'
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
* @see \App\Http\Controllers\MealController::destroy
 * @see app/Http/Controllers/MealController.php:156
 * @route '/meals/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const MealController = { index, store, create, show, update, destroy }

export default MealController