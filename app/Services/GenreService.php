<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Genre;
use App\Repository\GenreRepository;

class GenreService
{
    private GenreRepository $genreRepository;

    public function __construct(GenreRepository $genreRepository) {
        $this->genreRepository = $genreRepository;
    }

    public function getAll(): array {
        return $this->genreRepository->findAll();
    }

    /**
     * @throws BusinessException
     */
    public function create(string $name): Genre {
        if ($this->genreRepository->isGenreExists($name)) {
            throw new BusinessException("Genre '$name' already exists", 409);
        }
        return $this->genreRepository->create($name);
    }

    /**
     * @throws BusinessException
     */
    public function update(int $id, string $name): Genre {
        if ($this->genreRepository->isGenreExists($name)) {
            throw new BusinessException("Genre '$name' already exists", 409);
        }
        return $this->genreRepository->update($id, $name);
    }

    public function delete(int $id): ?bool {
        $genreDeleted = $this->genreRepository->delete($id);
        return $genreDeleted == null ? false : $genreDeleted;
    }
}
