<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    public function threads()
    {
        return $this->hasMany(ForumThread::class);
    }

    public function posts()
    {
        return $this->hasManyThrough(ForumPost::class, ForumThread::class);
    }
}
