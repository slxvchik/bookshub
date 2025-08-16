<?php

namespace App\Repository;

use App\Models\Genre;

interface GenreRepository
{
    public function findAll(): array;
    public function findOne(int $id): ?Genre;
    public function create(string $name): Genre;
    public function update(int $id, string $name): Genre;
    public function delete(int $id): ?bool;
    public function isGenreExists(string $name): bool;
}
