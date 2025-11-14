import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import posts from './posts'
/**
* @see \App\Http\Controllers\ForumController::index
 * @see app/Http/Controllers/ForumController.php:14
 * @route '/forums'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/forums',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ForumController::index
 * @see app/Http/Controllers/ForumController.php:14
 * @route '/forums'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::index
 * @see app/Http/Controllers/ForumController.php:14
 * @route '/forums'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ForumController::index
 * @see app/Http/Controllers/ForumController.php:14
 * @route '/forums'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ForumController::create
 * @see app/Http/Controllers/ForumController.php:28
 * @route '/forums/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/forums/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ForumController::create
 * @see app/Http/Controllers/ForumController.php:28
 * @route '/forums/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::create
 * @see app/Http/Controllers/ForumController.php:28
 * @route '/forums/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ForumController::create
 * @see app/Http/Controllers/ForumController.php:28
 * @route '/forums/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ForumController::store
 * @see app/Http/Controllers/ForumController.php:42
 * @route '/forums'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/forums',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ForumController::store
 * @see app/Http/Controllers/ForumController.php:42
 * @route '/forums'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::store
 * @see app/Http/Controllers/ForumController.php:42
 * @route '/forums'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::reply
 * @see app/Http/Controllers/ForumController.php:144
 * @route '/forums/{id}/reply'
 */
export const reply = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/forums/{id}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ForumController::reply
 * @see app/Http/Controllers/ForumController.php:144
 * @route '/forums/{id}/reply'
 */
reply.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reply.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::reply
 * @see app/Http/Controllers/ForumController.php:144
 * @route '/forums/{id}/reply'
 */
reply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::aiReply
 * @see app/Http/Controllers/ForumController.php:238
 * @route '/forums/{id}/ai-reply'
 */
export const aiReply = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aiReply.url(args, options),
    method: 'post',
})

aiReply.definition = {
    methods: ["post"],
    url: '/forums/{id}/ai-reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ForumController::aiReply
 * @see app/Http/Controllers/ForumController.php:238
 * @route '/forums/{id}/ai-reply'
 */
aiReply.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return aiReply.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::aiReply
 * @see app/Http/Controllers/ForumController.php:238
 * @route '/forums/{id}/ai-reply'
 */
aiReply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aiReply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:354
 * @route '/forums/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/forums/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:354
 * @route '/forums/{id}'
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
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:354
 * @route '/forums/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ForumController::show
 * @see app/Http/Controllers/ForumController.php:71
 * @route '/forums/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/forums/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ForumController::show
 * @see app/Http/Controllers/ForumController.php:71
 * @route '/forums/{id}'
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
* @see \App\Http\Controllers\ForumController::show
 * @see app/Http/Controllers/ForumController.php:71
 * @route '/forums/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ForumController::show
 * @see app/Http/Controllers/ForumController.php:71
 * @route '/forums/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const forums = {
    index,
create,
store,
reply,
aiReply,
destroy,
show,
posts,
}

export default forums