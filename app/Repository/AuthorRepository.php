<?php

namespace App\Repository;

use App\Models\Author;

interface AuthorRepository
{
    public function findAll(): array;
    public function findOne(int $id): ?Author;
    public function create(string $name): Author;
    public function update(int $id, string $name): Author;
    public function delete(int $id): ?bool;
    public function isAuthorExists(string $name): bool;
}
