<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealPlanMeal extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'meal_plan_id',
        'meal_id',
        'day_of_week',
        'meal_time',
    ];

    /**
     * Get the meal plan that this meal belongs to
     */
    public function mealPlan()
    {
        return $this->belongsTo(MealPlan::class);
    }

    /**
     * Get the meal
     */
    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }

    /**
     * Scope to filter by day of week
     */
    public function scopeByDay($query, $day)
    {
        return $query->where('day_of_week', $day);
    }

    /**
     * Scope to filter by meal time
     */
    public function scopeByMealTime($query, $mealTime)
    {
        return $query->where('meal_time', $mealTime);
    }
}
