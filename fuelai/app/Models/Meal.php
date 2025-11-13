<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'image_data',
        'created_by',
        'mime_type',
        'instruction'
    ];

    
/**
 * Hide raw binary image data from JSON responses.
 */
protected $hidden = ['image_data'];

/**
 * Automatically append base64 image string when converting to array or JSON.
 */
protected $appends = ['image_base64'];

public function getImageBase64Attribute()
    {
        if (!$this->image_data) {
            return null;
        }

        $mime = $this->mime_type ?? 'image/jpeg';

        return "data:{$mime};base64,{$this->image_data}";
    }




    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function nutritionalInfo()
    {
        return $this->hasOne(NutritionalInfo::class);
    }

    public function mealPlans()
    {
        return $this->belongsToMany(MealPlan::class, 'meal_plan_meals');
    }

    public function userMealLogs()
    {
        return $this->hasMany(UserMealLog::class);
    }
}
