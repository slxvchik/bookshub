<?php

namespace App\Services;

use App\DTO\Request\BookRequestDto;
use App\DTO\Request\BookFilterRequestDto;
use App\Exceptions\BusinessException;
use App\Models\Book;
use App\Repository\BookRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class BookService
{
    private BookRepository $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function showFiltered(BookFilterRequestDto $filters): AnonymousResourceCollection
    {
        return $this->bookRepository->findFilteredBooks($filters);
    }

    public function showOne(int $id): Book {
        return $this->bookRepository->findOne($id);
    }

    /**
     * @throws BusinessException
     */
    public function create(BookRequestDto $book): Book {

        if ($this->bookRepository->isTitleExists($book->title)) {
            throw new BusinessException('Title already exists', 409);
        }

        return $this->bookRepository->create($book);
    }

    public function update(int $id, BookRequestDto $book): Book {
        return $this->bookRepository->update($id, $book);
    }

    public function delete(int $id): bool {

        $imgCover = $this->bookRepository->getImagePath($id);

        if (Storage::disk('public')->exists($imgCover)) {
            Storage::disk('public')->delete($imgCover);
        }

        $bookDeleted = $this->bookRepository->delete($id);
        return $bookDeleted == null ? false : $bookDeleted;
    }

    public function getBookImagePath(int $bookId): string {
        return $this->bookRepository->getImagePath($bookId);
    }
}
