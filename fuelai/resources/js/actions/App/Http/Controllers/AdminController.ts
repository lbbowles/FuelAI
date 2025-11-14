import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:15
 * @route '/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:15
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:15
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:15
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::stats
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/admin/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::stats
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::stats
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::stats
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::getUsers
 * @see app/Http/Controllers/AdminController.php:34
 * @route '/admin/users'
 */
export const getUsers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUsers.url(options),
    method: 'get',
})

getUsers.definition = {
    methods: ["get","head"],
    url: '/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::getUsers
 * @see app/Http/Controllers/AdminController.php:34
 * @route '/admin/users'
 */
getUsers.url = (options?: RouteQueryOptions) => {
    return getUsers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getUsers
 * @see app/Http/Controllers/AdminController.php:34
 * @route '/admin/users'
 */
getUsers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUsers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::getUsers
 * @see app/Http/Controllers/AdminController.php:34
 * @route '/admin/users'
 */
getUsers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUsers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::createUser
 * @see app/Http/Controllers/AdminController.php:43
 * @route '/admin/users'
 */
export const createUser = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(options),
    method: 'post',
})

createUser.definition = {
    methods: ["post"],
    url: '/admin/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::createUser
 * @see app/Http/Controllers/AdminController.php:43
 * @route '/admin/users'
 */
createUser.url = (options?: RouteQueryOptions) => {
    return createUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::createUser
 * @see app/Http/Controllers/AdminController.php:43
 * @route '/admin/users'
 */
createUser.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::updateUser
 * @see app/Http/Controllers/AdminController.php:63
 * @route '/admin/users/{user}'
 */
export const updateUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

updateUser.definition = {
    methods: ["put"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminController::updateUser
 * @see app/Http/Controllers/AdminController.php:63
 * @route '/admin/users/{user}'
 */
updateUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return updateUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::updateUser
 * @see app/Http/Controllers/AdminController.php:63
 * @route '/admin/users/{user}'
 */
updateUser.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\AdminController::deleteUser
 * @see app/Http/Controllers/AdminController.php:88
 * @route '/admin/users/{user}'
 */
export const deleteUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUser.url(args, options),
    method: 'delete',
})

deleteUser.definition = {
    methods: ["delete"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteUser
 * @see app/Http/Controllers/AdminController.php:88
 * @route '/admin/users/{user}'
 */
deleteUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return deleteUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteUser
 * @see app/Http/Controllers/AdminController.php:88
 * @route '/admin/users/{user}'
 */
deleteUser.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUser.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AdminController::getForumPosts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
export const getForumPosts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getForumPosts.url(options),
    method: 'get',
})

getForumPosts.definition = {
    methods: ["get","head"],
    url: '/admin/forum-posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::getForumPosts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
getForumPosts.url = (options?: RouteQueryOptions) => {
    return getForumPosts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getForumPosts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
getForumPosts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getForumPosts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::getForumPosts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
getForumPosts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getForumPosts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::deleteForumPost
 * @see app/Http/Controllers/AdminController.php:123
 * @route '/admin/forum-posts/{post}'
 */
export const deleteForumPost = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteForumPost.url(args, options),
    method: 'delete',
})

deleteForumPost.definition = {
    methods: ["delete"],
    url: '/admin/forum-posts/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteForumPost
 * @see app/Http/Controllers/AdminController.php:123
 * @route '/admin/forum-posts/{post}'
 */
deleteForumPost.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { post: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.id
                : args.post,
                }

    return deleteForumPost.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteForumPost
 * @see app/Http/Controllers/AdminController.php:123
 * @route '/admin/forum-posts/{post}'
 */
deleteForumPost.delete = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteForumPost.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AdminController::getForumReplies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
export const getForumReplies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getForumReplies.url(options),
    method: 'get',
})

getForumReplies.definition = {
    methods: ["get","head"],
    url: '/admin/forum-replies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::getForumReplies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
getForumReplies.url = (options?: RouteQueryOptions) => {
    return getForumReplies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getForumReplies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
getForumReplies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getForumReplies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::getForumReplies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
getForumReplies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getForumReplies.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::deleteForumReply
 * @see app/Http/Controllers/AdminController.php:146
 * @route '/admin/forum-replies/{thread}'
 */
export const deleteForumReply = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteForumReply.url(args, options),
    method: 'delete',
})

deleteForumReply.definition = {
    methods: ["delete"],
    url: '/admin/forum-replies/{thread}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteForumReply
 * @see app/Http/Controllers/AdminController.php:146
 * @route '/admin/forum-replies/{thread}'
 */
deleteForumReply.url = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { thread: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { thread: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    thread: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        thread: typeof args.thread === 'object'
                ? args.thread.id
                : args.thread,
                }

    return deleteForumReply.definition.url
            .replace('{thread}', parsedArgs.thread.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteForumReply
 * @see app/Http/Controllers/AdminController.php:146
 * @route '/admin/forum-replies/{thread}'
 */
deleteForumReply.delete = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteForumReply.url(args, options),
    method: 'delete',
})
const AdminController = { index, stats, getUsers, createUser, updateUser, deleteUser, getForumPosts, deleteForumPost, getForumReplies, deleteForumReply }

export default AdminController