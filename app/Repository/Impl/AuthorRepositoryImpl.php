<?php

namespace App\Repository\Impl;

use App\Models\Author;
use App\Repository\AuthorRepository;

class AuthorRepositoryImpl implements AuthorRepository
{
    protected Author $model;

    public function __construct(Author $author)
    {
        $this->model = $author;
    }

    public function findAll(): array
    {
        return $this->model->all()->toArray();
    }

    public function findOne(int $id): Author
    {
        return $this->model->findOrFail($id);
    }

    public function create(string $name): Author
    {
        return $this->model->create([
            'name' => $name
        ]);
    }

    public function update(int $id, string $name): Author
    {
        $author = $this->model->findOrFail($id);

        $author->name = $name;

        $author->save();

        return $author;
    }

    public function delete(int $id): ?bool
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function isAuthorExists(string $name): bool
    {
        return $this->model->where('name', $name)->exists();
    }
}
