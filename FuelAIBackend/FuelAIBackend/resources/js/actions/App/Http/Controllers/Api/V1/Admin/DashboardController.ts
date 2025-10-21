import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
const indexfb27db31370af490e0e83ab2e37b9f79 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfb27db31370af490e0e83ab2e37b9f79.url(options),
    method: 'get',
})

indexfb27db31370af490e0e83ab2e37b9f79.definition = {
    methods: ["get","head"],
    url: '/test-admin-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
indexfb27db31370af490e0e83ab2e37b9f79.url = (options?: RouteQueryOptions) => {
    return indexfb27db31370af490e0e83ab2e37b9f79.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
indexfb27db31370af490e0e83ab2e37b9f79.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfb27db31370af490e0e83ab2e37b9f79.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
indexfb27db31370af490e0e83ab2e37b9f79.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexfb27db31370af490e0e83ab2e37b9f79.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
const indexfb27db31370af490e0e83ab2e37b9f79Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexfb27db31370af490e0e83ab2e37b9f79.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
indexfb27db31370af490e0e83ab2e37b9f79Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexfb27db31370af490e0e83ab2e37b9f79.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/test-admin-dashboard'
*/
indexfb27db31370af490e0e83ab2e37b9f79Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexfb27db31370af490e0e83ab2e37b9f79.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexfb27db31370af490e0e83ab2e37b9f79.form = indexfb27db31370af490e0e83ab2e37b9f79Form
/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
const indexd28bb0e722c977ff881218c0660d884b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd28bb0e722c977ff881218c0660d884b.url(options),
    method: 'get',
})

indexd28bb0e722c977ff881218c0660d884b.definition = {
    methods: ["get","head"],
    url: '/api/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
indexd28bb0e722c977ff881218c0660d884b.url = (options?: RouteQueryOptions) => {
    return indexd28bb0e722c977ff881218c0660d884b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
indexd28bb0e722c977ff881218c0660d884b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd28bb0e722c977ff881218c0660d884b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
indexd28bb0e722c977ff881218c0660d884b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd28bb0e722c977ff881218c0660d884b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
const indexd28bb0e722c977ff881218c0660d884bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd28bb0e722c977ff881218c0660d884b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
indexd28bb0e722c977ff881218c0660d884bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd28bb0e722c977ff881218c0660d884b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\DashboardController::index
* @see app/Http/Controllers/Api/V1/Admin/DashboardController.php:17
* @route '/api/admin/dashboard'
*/
indexd28bb0e722c977ff881218c0660d884bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd28bb0e722c977ff881218c0660d884b.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexd28bb0e722c977ff881218c0660d884b.form = indexd28bb0e722c977ff881218c0660d884bForm

export const index = {
    '/test-admin-dashboard': indexfb27db31370af490e0e83ab2e37b9f79,
    '/api/admin/dashboard': indexd28bb0e722c977ff881218c0660d884b,
}

const DashboardController = { index }

export default DashboardController