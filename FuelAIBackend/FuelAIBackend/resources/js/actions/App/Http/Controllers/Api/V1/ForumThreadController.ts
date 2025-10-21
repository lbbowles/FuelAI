import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
const index19e63521c9ea9977274c13f88272e943 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index19e63521c9ea9977274c13f88272e943.url(options),
    method: 'get',
})

index19e63521c9ea9977274c13f88272e943.definition = {
    methods: ["get","head"],
    url: '/test-threads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
index19e63521c9ea9977274c13f88272e943.url = (options?: RouteQueryOptions) => {
    return index19e63521c9ea9977274c13f88272e943.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
index19e63521c9ea9977274c13f88272e943.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index19e63521c9ea9977274c13f88272e943.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
index19e63521c9ea9977274c13f88272e943.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index19e63521c9ea9977274c13f88272e943.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
const index19e63521c9ea9977274c13f88272e943Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index19e63521c9ea9977274c13f88272e943.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
index19e63521c9ea9977274c13f88272e943Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index19e63521c9ea9977274c13f88272e943.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/test-threads'
*/
index19e63521c9ea9977274c13f88272e943Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index19e63521c9ea9977274c13f88272e943.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index19e63521c9ea9977274c13f88272e943.form = index19e63521c9ea9977274c13f88272e943Form
/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
const index06571dfbf2524f366e60e881abe66174 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index06571dfbf2524f366e60e881abe66174.url(options),
    method: 'get',
})

index06571dfbf2524f366e60e881abe66174.definition = {
    methods: ["get","head"],
    url: '/api/threads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
index06571dfbf2524f366e60e881abe66174.url = (options?: RouteQueryOptions) => {
    return index06571dfbf2524f366e60e881abe66174.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
index06571dfbf2524f366e60e881abe66174.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index06571dfbf2524f366e60e881abe66174.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
index06571dfbf2524f366e60e881abe66174.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index06571dfbf2524f366e60e881abe66174.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
const index06571dfbf2524f366e60e881abe66174Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index06571dfbf2524f366e60e881abe66174.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
index06571dfbf2524f366e60e881abe66174Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index06571dfbf2524f366e60e881abe66174.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::index
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:12
* @route '/api/threads'
*/
index06571dfbf2524f366e60e881abe66174Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index06571dfbf2524f366e60e881abe66174.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index06571dfbf2524f366e60e881abe66174.form = index06571dfbf2524f366e60e881abe66174Form

export const index = {
    '/test-threads': index19e63521c9ea9977274c13f88272e943,
    '/api/threads': index06571dfbf2524f366e60e881abe66174,
}

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
export const show = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/threads/{thread}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
show.url = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{thread}', parsedArgs.thread.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
show.get = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
show.head = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
const showForm = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
showForm.get = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ForumThreadController::show
* @see app/Http/Controllers/Api/V1/ForumThreadController.php:19
* @route '/api/threads/{thread}'
*/
showForm.head = (args: { thread: number | { id: number } } | [thread: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const ForumThreadController = { index, show }

export default ForumThreadController