<?php

namespace App\Repository;

use App\DTO\Request\BookFilterRequestDto;
use App\DTO\Request\BookRequestDto;
use App\Models\Book;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface BookRepository
{
    public function findAll(): array;
    public function findFilteredBooks(BookFilterRequestDto $filters): AnonymousResourceCollection;
    public function findOne(int $id): Book;
    public function create(BookRequestDto $book): Book;
    public function update(int $id, BookRequestDto $bookRequest): Book;
    public function delete(int $id): ?bool;
    public function isTitleExists(string $title): bool;

    public function getImagePath(int $bookId);
}
