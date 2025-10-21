import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
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
* @see \App\Http\Controllers\ForumController::create
* @see app/Http/Controllers/ForumController.php:28
* @route '/forums/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::create
* @see app/Http/Controllers/ForumController.php:28
* @route '/forums/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::create
* @see app/Http/Controllers/ForumController.php:28
* @route '/forums/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\ForumController::store
* @see app/Http/Controllers/ForumController.php:41
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
* @see app/Http/Controllers/ForumController.php:41
* @route '/forums'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::store
* @see app/Http/Controllers/ForumController.php:41
* @route '/forums'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::store
* @see app/Http/Controllers/ForumController.php:41
* @route '/forums'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::store
* @see app/Http/Controllers/ForumController.php:41
* @route '/forums'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ForumController::reply
* @see app/Http/Controllers/ForumController.php:140
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
* @see app/Http/Controllers/ForumController.php:140
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
* @see app/Http/Controllers/ForumController.php:140
* @route '/forums/{id}/reply'
*/
reply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::reply
* @see app/Http/Controllers/ForumController.php:140
* @route '/forums/{id}/reply'
*/
const replyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::reply
* @see app/Http/Controllers/ForumController.php:140
* @route '/forums/{id}/reply'
*/
replyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

reply.form = replyForm

/**
* @see \App\Http\Controllers\ForumController::aiReply
* @see app/Http/Controllers/ForumController.php:241
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
* @see app/Http/Controllers/ForumController.php:241
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
* @see app/Http/Controllers/ForumController.php:241
* @route '/forums/{id}/ai-reply'
*/
aiReply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aiReply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::aiReply
* @see app/Http/Controllers/ForumController.php:241
* @route '/forums/{id}/ai-reply'
*/
const aiReplyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aiReply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::aiReply
* @see app/Http/Controllers/ForumController.php:241
* @route '/forums/{id}/ai-reply'
*/
aiReplyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aiReply.url(args, options),
    method: 'post',
})

aiReply.form = aiReplyForm

/**
* @see \App\Http\Controllers\ForumController::destroy
* @see app/Http/Controllers/ForumController.php:348
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
* @see app/Http/Controllers/ForumController.php:348
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
* @see app/Http/Controllers/ForumController.php:348
* @route '/forums/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ForumController::destroy
* @see app/Http/Controllers/ForumController.php:348
* @route '/forums/{id}'
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
* @see \App\Http\Controllers\ForumController::destroy
* @see app/Http/Controllers/ForumController.php:348
* @route '/forums/{id}'
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
* @see \App\Http\Controllers\ForumController::show
* @see app/Http/Controllers/ForumController.php:84
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
* @see app/Http/Controllers/ForumController.php:84
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
* @see app/Http/Controllers/ForumController.php:84
* @route '/forums/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::show
* @see app/Http/Controllers/ForumController.php:84
* @route '/forums/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ForumController::show
* @see app/Http/Controllers/ForumController.php:84
* @route '/forums/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::show
* @see app/Http/Controllers/ForumController.php:84
* @route '/forums/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::show
* @see app/Http/Controllers/ForumController.php:84
* @route '/forums/{id}'
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