import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
const index4d2015918082bc4382052631e0a172a5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d2015918082bc4382052631e0a172a5.url(options),
    method: 'get',
})

index4d2015918082bc4382052631e0a172a5.definition = {
    methods: ["get","head"],
    url: '/forums',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
index4d2015918082bc4382052631e0a172a5.url = (options?: RouteQueryOptions) => {
    return index4d2015918082bc4382052631e0a172a5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
index4d2015918082bc4382052631e0a172a5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d2015918082bc4382052631e0a172a5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
index4d2015918082bc4382052631e0a172a5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4d2015918082bc4382052631e0a172a5.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
const index4d2015918082bc4382052631e0a172a5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d2015918082bc4382052631e0a172a5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
index4d2015918082bc4382052631e0a172a5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d2015918082bc4382052631e0a172a5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/forums'
*/
index4d2015918082bc4382052631e0a172a5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d2015918082bc4382052631e0a172a5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index4d2015918082bc4382052631e0a172a5.form = index4d2015918082bc4382052631e0a172a5Form
/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
const indexd3111a2bab46ae24691c147fd020f1bf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd3111a2bab46ae24691c147fd020f1bf.url(options),
    method: 'get',
})

indexd3111a2bab46ae24691c147fd020f1bf.definition = {
    methods: ["get","head"],
    url: '/api/forums',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
indexd3111a2bab46ae24691c147fd020f1bf.url = (options?: RouteQueryOptions) => {
    return indexd3111a2bab46ae24691c147fd020f1bf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
indexd3111a2bab46ae24691c147fd020f1bf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd3111a2bab46ae24691c147fd020f1bf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
indexd3111a2bab46ae24691c147fd020f1bf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd3111a2bab46ae24691c147fd020f1bf.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
const indexd3111a2bab46ae24691c147fd020f1bfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd3111a2bab46ae24691c147fd020f1bf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
indexd3111a2bab46ae24691c147fd020f1bfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd3111a2bab46ae24691c147fd020f1bf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ForumController::index
* @see app/Http/Controllers/ForumController.php:14
* @route '/api/forums'
*/
indexd3111a2bab46ae24691c147fd020f1bfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd3111a2bab46ae24691c147fd020f1bf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexd3111a2bab46ae24691c147fd020f1bf.form = indexd3111a2bab46ae24691c147fd020f1bfForm

export const index = {
    '/forums': index4d2015918082bc4382052631e0a172a5,
    '/api/forums': indexd3111a2bab46ae24691c147fd020f1bf,
}

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

/**
* @see \App\Http\Controllers\ForumController::destroyPost
* @see app/Http/Controllers/ForumController.php:379
* @route '/forums/{threadId}/posts/{postId}'
*/
export const destroyPost = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPost.url(args, options),
    method: 'delete',
})

destroyPost.definition = {
    methods: ["delete"],
    url: '/forums/{threadId}/posts/{postId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ForumController::destroyPost
* @see app/Http/Controllers/ForumController.php:379
* @route '/forums/{threadId}/posts/{postId}'
*/
destroyPost.url = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            threadId: args[0],
            postId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        threadId: args.threadId,
        postId: args.postId,
    }

    return destroyPost.definition.url
            .replace('{threadId}', parsedArgs.threadId.toString())
            .replace('{postId}', parsedArgs.postId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::destroyPost
* @see app/Http/Controllers/ForumController.php:379
* @route '/forums/{threadId}/posts/{postId}'
*/
destroyPost.delete = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPost.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ForumController::destroyPost
* @see app/Http/Controllers/ForumController.php:379
* @route '/forums/{threadId}/posts/{postId}'
*/
const destroyPostForm = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPost.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::destroyPost
* @see app/Http/Controllers/ForumController.php:379
* @route '/forums/{threadId}/posts/{postId}'
*/
destroyPostForm.delete = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPost.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyPost.form = destroyPostForm

/**
* @see \App\Http\Controllers\ForumController::updatePost
* @see app/Http/Controllers/ForumController.php:412
* @route '/forums/{threadId}/posts/{postId}'
*/
export const updatePost = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePost.url(args, options),
    method: 'put',
})

updatePost.definition = {
    methods: ["put"],
    url: '/forums/{threadId}/posts/{postId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ForumController::updatePost
* @see app/Http/Controllers/ForumController.php:412
* @route '/forums/{threadId}/posts/{postId}'
*/
updatePost.url = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            threadId: args[0],
            postId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        threadId: args.threadId,
        postId: args.postId,
    }

    return updatePost.definition.url
            .replace('{threadId}', parsedArgs.threadId.toString())
            .replace('{postId}', parsedArgs.postId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::updatePost
* @see app/Http/Controllers/ForumController.php:412
* @route '/forums/{threadId}/posts/{postId}'
*/
updatePost.put = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePost.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ForumController::updatePost
* @see app/Http/Controllers/ForumController.php:412
* @route '/forums/{threadId}/posts/{postId}'
*/
const updatePostForm = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePost.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ForumController::updatePost
* @see app/Http/Controllers/ForumController.php:412
* @route '/forums/{threadId}/posts/{postId}'
*/
updatePostForm.put = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePost.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePost.form = updatePostForm

const ForumController = { index, create, store, reply, aiReply, destroy, show, destroyPost, updatePost }

export default ForumController