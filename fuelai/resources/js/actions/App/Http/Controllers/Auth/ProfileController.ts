import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::show
* @see app/Http/Controllers/Auth/ProfileController.php:12
* @route '/profile'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Auth\ProfileController::update
* @see app/Http/Controllers/Auth/ProfileController.php:19
* @route '/profile/update'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/profile/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\ProfileController::update
* @see app/Http/Controllers/Auth/ProfileController.php:19
* @route '/profile/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ProfileController::update
* @see app/Http/Controllers/Auth/ProfileController.php:19
* @route '/profile/update'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::update
* @see app/Http/Controllers/Auth/ProfileController.php:19
* @route '/profile/update'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\ProfileController::update
* @see app/Http/Controllers/Auth/ProfileController.php:19
* @route '/profile/update'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const ProfileController = { show, update }

export default ProfileController