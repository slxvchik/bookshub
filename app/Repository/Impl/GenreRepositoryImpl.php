<?php

namespace App\Repository\Impl;

use App\Models\Genre;
use App\Repository\GenreRepository;

class GenreRepositoryImpl implements GenreRepository
{
    protected Genre $model;

    public function __construct(Genre $genre)
    {
        $this->model = $genre;
    }

    public function findAll(): array
    {
        return $this->model->all()->toArray();
    }

    public function findOne(int $id): Genre
    {
        return $this->model->findOrFail($id);
    }

    public function create(string $name): Genre
    {
        return $this->model->create([
            'name' => $name
        ]);
    }

    public function update(int $id, string $name): Genre
    {
        $genre = $this->model->findOrFail($id);

        $genre->name = $name;

        $genre->save();

        return $genre;
    }

    public function delete(int $id): ?bool
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function isGenreExists(string $name): bool
    {
        return $this->model->where('name', $name)->exists();
    }
}
