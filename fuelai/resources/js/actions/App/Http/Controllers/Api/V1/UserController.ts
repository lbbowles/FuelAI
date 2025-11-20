import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\UserController::update
* @see app/Http/Controllers/Api/V1/UserController.php:14
* @route '/api/user/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/user/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\UserController::update
* @see app/Http/Controllers/Api/V1/UserController.php:14
* @route '/api/user/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\UserController::update
* @see app/Http/Controllers/Api/V1/UserController.php:14
* @route '/api/user/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::update
* @see app/Http/Controllers/Api/V1/UserController.php:14
* @route '/api/user/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::update
* @see app/Http/Controllers/Api/V1/UserController.php:14
* @route '/api/user/profile'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\V1\UserController::follow
* @see app/Http/Controllers/Api/V1/UserController.php:33
* @route '/api/users/{user}/follow'
*/
export const follow = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: follow.url(args, options),
    method: 'post',
})

follow.definition = {
    methods: ["post"],
    url: '/api/users/{user}/follow',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\UserController::follow
* @see app/Http/Controllers/Api/V1/UserController.php:33
* @route '/api/users/{user}/follow'
*/
follow.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return follow.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\UserController::follow
* @see app/Http/Controllers/Api/V1/UserController.php:33
* @route '/api/users/{user}/follow'
*/
follow.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: follow.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::follow
* @see app/Http/Controllers/Api/V1/UserController.php:33
* @route '/api/users/{user}/follow'
*/
const followForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: follow.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::follow
* @see app/Http/Controllers/Api/V1/UserController.php:33
* @route '/api/users/{user}/follow'
*/
followForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: follow.url(args, options),
    method: 'post',
})

follow.form = followForm

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
export const followers = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: followers.url(args, options),
    method: 'get',
})

followers.definition = {
    methods: ["get","head"],
    url: '/api/users/{user}/followers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
followers.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return followers.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
followers.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: followers.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
followers.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: followers.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
const followersForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: followers.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
followersForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: followers.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\UserController::followers
* @see app/Http/Controllers/Api/V1/UserController.php:45
* @route '/api/users/{user}/followers'
*/
followersForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: followers.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

followers.form = followersForm

const UserController = { update, follow, followers }

export default UserController