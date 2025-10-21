import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AiController::generateMealPlan
* @see app/Http/Controllers/Api/V1/AiController.php:13
* @route '/api/ai/generate-meal-plan'
*/
export const generateMealPlan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateMealPlan.url(options),
    method: 'post',
})

generateMealPlan.definition = {
    methods: ["post"],
    url: '/api/ai/generate-meal-plan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AiController::generateMealPlan
* @see app/Http/Controllers/Api/V1/AiController.php:13
* @route '/api/ai/generate-meal-plan'
*/
generateMealPlan.url = (options?: RouteQueryOptions) => {
    return generateMealPlan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AiController::generateMealPlan
* @see app/Http/Controllers/Api/V1/AiController.php:13
* @route '/api/ai/generate-meal-plan'
*/
generateMealPlan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateMealPlan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AiController::generateMealPlan
* @see app/Http/Controllers/Api/V1/AiController.php:13
* @route '/api/ai/generate-meal-plan'
*/
const generateMealPlanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateMealPlan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AiController::generateMealPlan
* @see app/Http/Controllers/Api/V1/AiController.php:13
* @route '/api/ai/generate-meal-plan'
*/
generateMealPlanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateMealPlan.url(options),
    method: 'post',
})

generateMealPlan.form = generateMealPlanForm

/**
* @see \App\Http\Controllers\Api\V1\AiController::recognizeImage
* @see app/Http/Controllers/Api/V1/AiController.php:36
* @route '/api/ai/recognize-image'
*/
export const recognizeImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recognizeImage.url(options),
    method: 'post',
})

recognizeImage.definition = {
    methods: ["post"],
    url: '/api/ai/recognize-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AiController::recognizeImage
* @see app/Http/Controllers/Api/V1/AiController.php:36
* @route '/api/ai/recognize-image'
*/
recognizeImage.url = (options?: RouteQueryOptions) => {
    return recognizeImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AiController::recognizeImage
* @see app/Http/Controllers/Api/V1/AiController.php:36
* @route '/api/ai/recognize-image'
*/
recognizeImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recognizeImage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AiController::recognizeImage
* @see app/Http/Controllers/Api/V1/AiController.php:36
* @route '/api/ai/recognize-image'
*/
const recognizeImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recognizeImage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AiController::recognizeImage
* @see app/Http/Controllers/Api/V1/AiController.php:36
* @route '/api/ai/recognize-image'
*/
recognizeImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recognizeImage.url(options),
    method: 'post',
})

recognizeImage.form = recognizeImageForm

const AiController = { generateMealPlan, recognizeImage }

export default AiController