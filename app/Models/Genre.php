<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genre extends Model
{
    public $timestamps = false;
    protected $fillable = ['name'];

    public function books(): BelongsToMany {
        return $this->belongsToMany(Book::class);
    }
}
