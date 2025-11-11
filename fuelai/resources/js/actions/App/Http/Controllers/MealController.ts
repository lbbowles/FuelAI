import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/api/meals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
const apiIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
apiIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::apiIndex
* @see app/Http/Controllers/MealController.php:133
* @route '/api/meals'
*/
apiIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apiIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

apiIndex.form = apiIndexForm

/**
* @see \App\Http\Controllers\MealController::apiStore
* @see app/Http/Controllers/MealController.php:145
* @route '/api/meals'
*/
export const apiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

apiStore.definition = {
    methods: ["post"],
    url: '/api/meals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::apiStore
* @see app/Http/Controllers/MealController.php:145
* @route '/api/meals'
*/
apiStore.url = (options?: RouteQueryOptions) => {
    return apiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::apiStore
* @see app/Http/Controllers/MealController.php:145
* @route '/api/meals'
*/
apiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::apiStore
* @see app/Http/Controllers/MealController.php:145
* @route '/api/meals'
*/
const apiStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::apiStore
* @see app/Http/Controllers/MealController.php:145
* @route '/api/meals'
*/
apiStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apiStore.url(options),
    method: 'post',
})

apiStore.form = apiStoreForm

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/meal_list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::index
* @see app/Http/Controllers/MealController.php:16
* @route '/meal_list'
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
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/meals'
*/
const store57b3a6105afb17387b56dc33f17ab3eb = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

store57b3a6105afb17387b56dc33f17ab3eb.definition = {
    methods: ["post"],
    url: '/meals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/meals'
*/
store57b3a6105afb17387b56dc33f17ab3eb.url = (options?: RouteQueryOptions) => {
    return store57b3a6105afb17387b56dc33f17ab3eb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/meals'
*/
store57b3a6105afb17387b56dc33f17ab3eb.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/meals'
*/
const store57b3a6105afb17387b56dc33f17ab3ebForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/meals'
*/
store57b3a6105afb17387b56dc33f17ab3ebForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store57b3a6105afb17387b56dc33f17ab3eb.url(options),
    method: 'post',
})

store57b3a6105afb17387b56dc33f17ab3eb.form = store57b3a6105afb17387b56dc33f17ab3ebForm
/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
const store52e5a0320a836d69c93fa4c5d64160e9 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

store52e5a0320a836d69c93fa4c5d64160e9.definition = {
    methods: ["post"],
    url: '/image_rec',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
store52e5a0320a836d69c93fa4c5d64160e9.url = (options?: RouteQueryOptions) => {
    return store52e5a0320a836d69c93fa4c5d64160e9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
store52e5a0320a836d69c93fa4c5d64160e9.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
const store52e5a0320a836d69c93fa4c5d64160e9Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
store52e5a0320a836d69c93fa4c5d64160e9Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store52e5a0320a836d69c93fa4c5d64160e9.url(options),
    method: 'post',
})

store52e5a0320a836d69c93fa4c5d64160e9.form = store52e5a0320a836d69c93fa4c5d64160e9Form

export const store = {
    '/meals': store57b3a6105afb17387b56dc33f17ab3eb,
    '/image_rec': store52e5a0320a836d69c93fa4c5d64160e9,
}

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/meals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::create
* @see app/Http/Controllers/MealController.php:34
* @route '/meals/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MealController::show
* @see app/Http/Controllers/MealController.php:89
* @route '/meals/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\MealController::update
* @see app/Http/Controllers/MealController.php:105
* @route '/meals/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MealController::update
* @see app/Http/Controllers/MealController.php:105
* @route '/meals/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::update
* @see app/Http/Controllers/MealController.php:105
* @route '/meals/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MealController::update
* @see app/Http/Controllers/MealController.php:105
* @route '/meals/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::update
* @see app/Http/Controllers/MealController.php:105
* @route '/meals/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\MealController::destroy
* @see app/Http/Controllers/MealController.php:121
* @route '/meals/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/meals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MealController::destroy
* @see app/Http/Controllers/MealController.php:121
* @route '/meals/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::destroy
* @see app/Http/Controllers/MealController.php:121
* @route '/meals/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MealController::destroy
* @see app/Http/Controllers/MealController.php:121
* @route '/meals/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::destroy
* @see app/Http/Controllers/MealController.php:121
* @route '/meals/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const MealController = { apiIndex, apiStore, index, store, create, show, update, destroy }

export default MealController