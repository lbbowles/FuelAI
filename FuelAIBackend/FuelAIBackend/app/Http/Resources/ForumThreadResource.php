<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class ForumThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'user' => new UserResource($this->whenLoaded('user')),
            'createdAt' => $this->created_at->diffForHumans(),
            'posts' => ForumPostResource::collection($this->whenLoaded('posts')),
        ];
    }
}
