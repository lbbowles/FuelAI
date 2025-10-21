<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'imageUrl' => $this->image_url,
            'nutritionalInfo' => $this->whenLoaded('nutritionalInfo', [
                'calories' => $this->nutritionalInfo->calories,
                'protein' => $this->nutritionalInfo->protein,
                'carbs' => $this->nutritionalInfo->carbs,
                'fat' => $this->nutritionalInfo->fat,
            ]),
        ];
    }
}

