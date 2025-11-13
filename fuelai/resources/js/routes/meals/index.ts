import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/image_rec',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MealController::store
* @see app/Http/Controllers/MealController.php:39
* @route '/image_rec'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const meals = {
    store,
}

export default meals