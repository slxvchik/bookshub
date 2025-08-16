<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Author;
use App\Repository\AuthorRepository;

class AuthorService
{
    private AuthorRepository $authorRepository;

    public function __construct(AuthorRepository $authorRepository) {
        $this->authorRepository = $authorRepository;
    }

    public function getAll(): array {
        return $this->authorRepository->findAll();
    }

    /**
     * @throws BusinessException
     */
    public function create(string $name): Author {
        if ($this->authorRepository->isAuthorExists($name)) {
            throw new BusinessException("Author '$name' already exists", 409);
        }
        return $this->authorRepository->create($name);
    }

    /**
     * @throws BusinessException
     */
    public function update(int $id, string $name): Author {

        if ($this->authorRepository->isAuthorExists($name)) {
            throw new BusinessException("Author '$name' already exists", 409);
        }

        return $this->authorRepository->update($id, $name);
    }

    public function delete(int $id): ?bool {
        $authorDeleted = $this->authorRepository->delete($id);
        return $authorDeleted == null ? false : $authorDeleted;
    }
}
