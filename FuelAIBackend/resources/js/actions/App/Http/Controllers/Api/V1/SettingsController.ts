import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
const show7502e9a8d63736d63c468026f89f24e4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7502e9a8d63736d63c468026f89f24e4.url(options),
    method: 'get',
})

show7502e9a8d63736d63c468026f89f24e4.definition = {
    methods: ["get","head"],
    url: '/test-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
show7502e9a8d63736d63c468026f89f24e4.url = (options?: RouteQueryOptions) => {
    return show7502e9a8d63736d63c468026f89f24e4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
show7502e9a8d63736d63c468026f89f24e4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7502e9a8d63736d63c468026f89f24e4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
show7502e9a8d63736d63c468026f89f24e4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show7502e9a8d63736d63c468026f89f24e4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
const show7502e9a8d63736d63c468026f89f24e4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7502e9a8d63736d63c468026f89f24e4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
show7502e9a8d63736d63c468026f89f24e4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7502e9a8d63736d63c468026f89f24e4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/test-settings'
*/
show7502e9a8d63736d63c468026f89f24e4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7502e9a8d63736d63c468026f89f24e4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show7502e9a8d63736d63c468026f89f24e4.form = show7502e9a8d63736d63c468026f89f24e4Form
/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
const show68a6718475f44f9c38857865541e66e3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show68a6718475f44f9c38857865541e66e3.url(options),
    method: 'get',
})

show68a6718475f44f9c38857865541e66e3.definition = {
    methods: ["get","head"],
    url: '/api/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
show68a6718475f44f9c38857865541e66e3.url = (options?: RouteQueryOptions) => {
    return show68a6718475f44f9c38857865541e66e3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
show68a6718475f44f9c38857865541e66e3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show68a6718475f44f9c38857865541e66e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
show68a6718475f44f9c38857865541e66e3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show68a6718475f44f9c38857865541e66e3.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
const show68a6718475f44f9c38857865541e66e3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show68a6718475f44f9c38857865541e66e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
show68a6718475f44f9c38857865541e66e3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show68a6718475f44f9c38857865541e66e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::show
* @see app/Http/Controllers/Api/V1/SettingsController.php:12
* @route '/api/settings'
*/
show68a6718475f44f9c38857865541e66e3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show68a6718475f44f9c38857865541e66e3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show68a6718475f44f9c38857865541e66e3.form = show68a6718475f44f9c38857865541e66e3Form

export const show = {
    '/test-settings': show7502e9a8d63736d63c468026f89f24e4,
    '/api/settings': show68a6718475f44f9c38857865541e66e3,
}

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::update
* @see app/Http/Controllers/Api/V1/SettingsController.php:18
* @route '/api/settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/settings',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::update
* @see app/Http/Controllers/Api/V1/SettingsController.php:18
* @route '/api/settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::update
* @see app/Http/Controllers/Api/V1/SettingsController.php:18
* @route '/api/settings'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::update
* @see app/Http/Controllers/Api/V1/SettingsController.php:18
* @route '/api/settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\SettingsController::update
* @see app/Http/Controllers/Api/V1/SettingsController.php:18
* @route '/api/settings'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const SettingsController = { show, update }

export default SettingsController