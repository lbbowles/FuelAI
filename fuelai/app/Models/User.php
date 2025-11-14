<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'image_data',
        'mime_type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
         'image_data',
    ];
     protected $appends = ['image_base64'];

     public function getImageBase64Attribute()
    {
        if (!$this->image_data) {
            return null;
        }

        $mime = $this->mime_type ?? 'image/jpeg';

        return "data:{$mime};base64,{$this->image_data}";
    }

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'email_verified_at' => 'datetime',
        ];
    }

}
