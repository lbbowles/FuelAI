import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
export const destroy = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/forums/{threadId}/posts/{postId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
destroy.url = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{threadId}', parsedArgs.threadId.toString())
            .replace('{postId}', parsedArgs.postId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::destroy
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
destroy.delete = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ForumController::update
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
export const update = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/forums/{threadId}/posts/{postId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ForumController::update
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
update.url = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{threadId}', parsedArgs.threadId.toString())
            .replace('{postId}', parsedArgs.postId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ForumController::update
 * @see app/Http/Controllers/ForumController.php:0
 * @route '/forums/{threadId}/posts/{postId}'
 */
update.put = (args: { threadId: string | number, postId: string | number } | [threadId: string | number, postId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
const posts = {
    destroy,
update,
}

export default posts