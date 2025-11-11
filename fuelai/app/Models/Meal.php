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
    ];

    
    /**
     * Hide raw binary image data from JSON responses.
     */
    protected $hidden = ['image_data'];

    /**
     * Automatically append base64 image string when converting to array or JSON.
     */
    protected $appends = ['image_base64'];

    /**
     * Accessor to safely read image_data from PostgreSQL BYTEA.
     */
    public function getImageDataAttribute($value)
    {
        if (is_resource($value)) {
            // Convert stream to actual binary string
            $value = stream_get_contents($value);
        }
        return $value;
    }

    /**
     * Accessor to create base64 image string automatically.
     */
    public function getImageBase64Attribute()
    {
        $data = $this->image_data;

        if ($data) {
            $encoded = base64_encode($data);

            // Ensure UTF-8 safety for JSON encoding
            $safe = mb_convert_encoding($encoded, 'UTF-8', 'UTF-8');

            return "data:image/jpeg;base64,{$safe}";
        }

        return null;
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
