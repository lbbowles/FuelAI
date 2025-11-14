import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
 * @see app/Http/Controllers/Api/V1/ForumController.php:14
 * @route '/api/forums'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/forums',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
 * @see app/Http/Controllers/Api/V1/ForumController.php:14
 * @route '/api/forums'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
 * @see app/Http/Controllers/Api/V1/ForumController.php:14
 * @route '/api/forums'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
 * @see app/Http/Controllers/Api/V1/ForumController.php:14
 * @route '/api/forums'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
 * @see app/Http/Controllers/Api/V1/ForumController.php:70
 * @route '/api/forums/{post}'
 */
export const show = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/forums/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
 * @see app/Http/Controllers/Api/V1/ForumController.php:70
 * @route '/api/forums/{post}'
 */
show.url = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: args.post,
                }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
 * @see app/Http/Controllers/Api/V1/ForumController.php:70
 * @route '/api/forums/{post}'
 */
show.get = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
 * @see app/Http/Controllers/Api/V1/ForumController.php:70
 * @route '/api/forums/{post}'
 */
show.head = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
 * @see app/Http/Controllers/Api/V1/ForumController.php:39
 * @route '/api/forums'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/forums',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
 * @see app/Http/Controllers/Api/V1/ForumController.php:39
 * @route '/api/forums'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
 * @see app/Http/Controllers/Api/V1/ForumController.php:39
 * @route '/api/forums'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
 * @see app/Http/Controllers/Api/V1/ForumController.php:103
 * @route '/api/forums/{post}/reply'
 */
export const reply = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/api/forums/{post}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
 * @see app/Http/Controllers/Api/V1/ForumController.php:103
 * @route '/api/forums/{post}/reply'
 */
reply.url = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: args.post,
                }

    return reply.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
 * @see app/Http/Controllers/Api/V1/ForumController.php:103
 * @route '/api/forums/{post}/reply'
 */
reply.post = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
 * @see app/Http/Controllers/Api/V1/ForumController.php:0
 * @route '/api/forums/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/forums/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
 * @see app/Http/Controllers/Api/V1/ForumController.php:0
 * @route '/api/forums/{id}'
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
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
 * @see app/Http/Controllers/Api/V1/ForumController.php:0
 * @route '/api/forums/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ForumController = { index, show, store, reply, destroy }

export default ForumController