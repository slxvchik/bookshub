<?php

namespace App\Repository\Impl;

use App\DTO\Request\BookFilterRequestDto;
use App\DTO\Request\BookSortRequestDto;
use App\DTO\Request\BookRequestDto;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Repository\BookRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class BookRepositoryImpl implements BookRepository
{

    protected Book $model;

    public function __construct(Book $book)
    {
        $this->model = $book;
    }

    public function findAll(): array
    {
        return $this->model->all()->toArray();
    }

    public function findFilteredBooks(BookFilterRequestDto $filters): AnonymousResourceCollection
    {
        $query = $this->model->with(['author', 'genres:id,name']);

        if (isset($filters->title)) {
            $query->where('title', 'LIKE', '%'.$filters->title.'%');
        }


        if (isset($filters->authorIds)) {
            $query->whereIn('author_id', $filters->authorIds);
        }

        if (isset($filters->genreIds)) {
            $query->whereHas('genres', function($q) use ($filters) {
                $q->whereIn('genres.id', $filters->genreIds);
            }, '>=', count($filters->genreIds));
        }

        if (isset($filters->yearFrom)) {
            $query->where('year', '>=', $filters->yearFrom);
        }

        if (isset($filters->yearTo)) {
            $query->where('year', '<=', $filters->yearTo);
        }

        $query->orderBy($filters->sortBy, $filters->sortDir);

        return BookResource::collection($query->paginate($filters->perPage, ['*'], 'page', $filters->page)
            ->withQueryString());
    }

    public function findOne(int $id): Book
    {
        return $this->model->with(['genres:id,name'])->findOrFail($id);
    }

    /**
     * @throws \Throwable
     */
    public function create(BookRequestDto $book): Book
    {
        return DB::transaction(function() use ($book) {
            $createdBook = $this->model->create([
                'user_id' => $book->userId,
                'author_id' => $book->authorId,
                'title' => $book->title,
                'year' => $book->year,
                'cover_image' => $book->coverImage,
                'page_count' => $book->pageCount
            ]);

            $createdBook->genres()->sync($book->genreIds);

            $createdBook->save();
            return $createdBook;
        });

    }

    /**
     * @throws \Throwable
     */
    public function update(int $id, BookRequestDto $bookRequest): Book
    {
        $book = $this->model->findOrFail($id);

        $book->author_id = $bookRequest->authorId;
        $book->title = $bookRequest->title;
        $book->year = $bookRequest->year;

        $book->cover_image = $bookRequest->coverImage;
        $book->page_count = $bookRequest->pageCount;

        try {

            return DB::transaction(function() use ($book, $bookRequest) {

                $book->save();

                if (count($bookRequest->genreIds)) {
                    $book->genres()->sync($bookRequest->genreIds);
                }

                return $book->fresh();
            });
        } catch (\Exception $exception) {
            logger()->error('Book update failed: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function delete(int $id): ?bool
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function isTitleExists(string $title): bool
    {
        return $this->model->where('title', $title)->exists();
    }

    public function getImagePath(int $bookId): string
    {
        return $this->model->findOrFail($bookId)->cover_image;
    }
}
