<?php

namespace App\DTO\Request;

readonly class BookRequestDto
{
    public function __construct(
        public int    $userId,
        public int    $authorId,
        public string $title,
        public array  $genreIds,
        public int    $year,
        public string $coverImage,
        public int    $pageCount
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId: $data['userId'] ?? $data['user_id'],
            authorId: $data['authorId'] ?? $data['author_id'],
            title: $data['title'],
            genreIds: $data['genreIds'] ?? $data['genre_ids'],
            year: $data['year'],
            coverImage: $data['coverImage'] ?? $data['cover_image'],
            pageCount: $data['pageCount'] ?? $data['page_count'],
        );
    }
}
