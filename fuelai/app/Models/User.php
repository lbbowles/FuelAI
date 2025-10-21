<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; //

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'profile_image_url',
    ];

    /**
     * The attributes that should be hidden
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // relationships

    public function mealPlans()
    {
        return $this->hasMany(MealPlan::class);
    }

    public function mealLogs()
    {
        return $this->hasMany(UserMealLog::class);
    }

    public function createdMeals()
    {
        return $this->hasMany(Meal::class, 'created_by');
    }

    public function threads()
    {
        return $this->hasMany(ForumThread::class);
    }

    public function posts()
    {
        return $this->hasMany(ForumPost::class);
    }

    public function imageRecognitionResults()
    {
        return $this->hasMany(ImageRecognitionResult::class);
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_user_id', 'followed_user_id')->withTimestamps();
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_user_id', 'following_user_id')->withTimestamps();
    }
}
