import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import posts from './posts'
import replies from './replies'
/**
* @see \App\Http\Controllers\AdminController::posts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
export const posts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})

posts.definition = {
    methods: ["get","head"],
    url: '/admin/forum-posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::posts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
posts.url = (options?: RouteQueryOptions) => {
    return posts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::posts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
posts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::posts
 * @see app/Http/Controllers/AdminController.php:106
 * @route '/admin/forum-posts'
 */
posts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: posts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::replies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
export const replies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: replies.url(options),
    method: 'get',
})

replies.definition = {
    methods: ["get","head"],
    url: '/admin/forum-replies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::replies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
replies.url = (options?: RouteQueryOptions) => {
    return replies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::replies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
replies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: replies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::replies
 * @see app/Http/Controllers/AdminController.php:130
 * @route '/admin/forum-replies'
 */
replies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: replies.url(options),
    method: 'head',
})
const forum = {
    posts,
replies,
}

export default forum