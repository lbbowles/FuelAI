import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CalendarController::index
 * @see app/Http/Controllers/CalendarController.php:12
 * @route '/calendar'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CalendarController::index
 * @see app/Http/Controllers/CalendarController.php:12
 * @route '/calendar'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::index
 * @see app/Http/Controllers/CalendarController.php:12
 * @route '/calendar'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CalendarController::index
 * @see app/Http/Controllers/CalendarController.php:12
 * @route '/calendar'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const CalendarController = { index }

export default CalendarController