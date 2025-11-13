import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::destroy
* @see app/Http/Controllers/AdminController.php:146
* @route '/admin/forum-replies/{thread}'
*/
export const destroy = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/forum-replies/{thread}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::destroy
* @see app/Http/Controllers/AdminController.php:146
* @route '/admin/forum-replies/{thread}'
*/
destroy.url = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{thread}', parsedArgs.thread.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::destroy
* @see app/Http/Controllers/AdminController.php:146
* @route '/admin/forum-replies/{thread}'
*/
destroy.delete = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AdminController::destroy
* @see app/Http/Controllers/AdminController.php:146
* @route '/admin/forum-replies/{thread}'
*/
const destroyForm = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::destroy
* @see app/Http/Controllers/AdminController.php:146
* @route '/admin/forum-replies/{thread}'
*/
destroyForm.delete = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const replies = {
    destroy,
}

export default replies