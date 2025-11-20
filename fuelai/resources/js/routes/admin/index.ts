import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users from './users'
import forum from './forum'
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
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:15
* @route '/admin'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:15
* @route '/admin'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:15
* @route '/admin'
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
* @see \App\Http\Controllers\AdminController::stats
* @see app/Http/Controllers/AdminController.php:21
* @route '/admin/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::stats
* @see app/Http/Controllers/AdminController.php:21
* @route '/admin/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::stats
* @see app/Http/Controllers/AdminController.php:21
* @route '/admin/stats'
*/
statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

const admin = {
    index: Object.assign(index, index),
    stats: Object.assign(stats, stats),
    users: Object.assign(users, users),
    forum: Object.assign(forum, forum),
}

export default admin