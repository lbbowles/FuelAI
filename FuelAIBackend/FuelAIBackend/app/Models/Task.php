<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $primaryKey = 'task_id';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'content',
        'difficulty',
        'category',
        'is_completed',
        'deadline',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'deadline' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $hidden = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
