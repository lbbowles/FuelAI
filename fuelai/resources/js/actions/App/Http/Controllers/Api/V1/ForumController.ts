import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
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
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::index
* @see app/Http/Controllers/Api/V1/ForumController.php:22
* @route '/api/forums'
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
* @see \App\Http\Controllers\Api\V1\ForumController::show
* @see app/Http/Controllers/Api/V1/ForumController.php:78
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
* @see app/Http/Controllers/Api/V1/ForumController.php:78
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
* @see app/Http/Controllers/Api/V1/ForumController.php:78
* @route '/api/forums/{post}'
*/
show.get = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
* @see app/Http/Controllers/Api/V1/ForumController.php:78
* @route '/api/forums/{post}'
*/
show.head = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
* @see app/Http/Controllers/Api/V1/ForumController.php:78
* @route '/api/forums/{post}'
*/
const showForm = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
* @see app/Http/Controllers/Api/V1/ForumController.php:78
* @route '/api/forums/{post}'
*/
showForm.get = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::show
* @see app/Http/Controllers/Api/V1/ForumController.php:78
* @route '/api/forums/{post}'
*/
showForm.head = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
* @see app/Http/Controllers/Api/V1/ForumController.php:47
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
* @see app/Http/Controllers/Api/V1/ForumController.php:47
* @route '/api/forums'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
* @see app/Http/Controllers/Api/V1/ForumController.php:47
* @route '/api/forums'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
* @see app/Http/Controllers/Api/V1/ForumController.php:47
* @route '/api/forums'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::store
* @see app/Http/Controllers/Api/V1/ForumController.php:47
* @route '/api/forums'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
* @see app/Http/Controllers/Api/V1/ForumController.php:110
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
* @see app/Http/Controllers/Api/V1/ForumController.php:110
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
* @see app/Http/Controllers/Api/V1/ForumController.php:110
* @route '/api/forums/{post}/reply'
*/
reply.post = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
* @see app/Http/Controllers/Api/V1/ForumController.php:110
* @route '/api/forums/{post}/reply'
*/
const replyForm = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::reply
* @see app/Http/Controllers/Api/V1/ForumController.php:110
* @route '/api/forums/{post}/reply'
*/
replyForm.post = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

reply.form = replyForm

/**
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
* @see app/Http/Controllers/Api/V1/ForumController.php:151
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
* @see app/Http/Controllers/Api/V1/ForumController.php:151
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
* @see app/Http/Controllers/Api/V1/ForumController.php:151
* @route '/api/forums/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
* @see app/Http/Controllers/Api/V1/ForumController.php:151
* @route '/api/forums/{id}'
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
* @see \App\Http\Controllers\Api\V1\ForumController::destroy
* @see app/Http/Controllers/Api/V1/ForumController.php:151
* @route '/api/forums/{id}'
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

const ForumController = { index, show, store, reply, destroy }

export default ForumController