import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::store
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:16
* @route '/api/admin/recipes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/recipes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::store
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:16
* @route '/api/admin/recipes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::store
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:16
* @route '/api/admin/recipes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::store
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:16
* @route '/api/admin/recipes'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::store
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:16
* @route '/api/admin/recipes'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::update
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:52
* @route '/api/admin/recipes/{recipe}'
*/
export const update = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/admin/recipes/{recipe}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::update
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:52
* @route '/api/admin/recipes/{recipe}'
*/
update.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { recipe: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { recipe: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            recipe: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        recipe: typeof args.recipe === 'object'
        ? args.recipe.id
        : args.recipe,
    }

    return update.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::update
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:52
* @route '/api/admin/recipes/{recipe}'
*/
update.patch = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::update
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:52
* @route '/api/admin/recipes/{recipe}'
*/
const updateForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::update
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:52
* @route '/api/admin/recipes/{recipe}'
*/
updateForm.patch = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::destroy
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:77
* @route '/api/admin/recipes/{recipe}'
*/
export const destroy = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/recipes/{recipe}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::destroy
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:77
* @route '/api/admin/recipes/{recipe}'
*/
destroy.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { recipe: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { recipe: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            recipe: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        recipe: typeof args.recipe === 'object'
        ? args.recipe.id
        : args.recipe,
    }

    return destroy.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::destroy
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:77
* @route '/api/admin/recipes/{recipe}'
*/
destroy.delete = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::destroy
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:77
* @route '/api/admin/recipes/{recipe}'
*/
const destroyForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\Admin\RecipeController::destroy
* @see app/Http/Controllers/Api/V1/Admin/RecipeController.php:77
* @route '/api/admin/recipes/{recipe}'
*/
destroyForm.delete = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const recipes = {
    store,
    update,
    destroy,
}

export default recipes