<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $primaryKey = 'id';  // Changed to match Dump I was given

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'title',           // Added title, this shouldn't affect anything as this is a nullable property, but needed for the DB schema to match.
        'content',
        'description',
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
