<?php

namespace App\DTO\Request;

readonly class BookFilterRequestDto
{
    public function __construct(
        public string        $sortBy,
        public string        $sortDir,
        public int           $perPage,
        public int           $page,

        public ?string $title = null,
        public ?array  $authorIds = null,
        public ?array  $genreIds = null,
        public ?int    $yearFrom = null,
        public ?int    $yearTo = null,
    ) {}

    public static function fromArray(array $filters): self
    {
        return new self(
            sortBy: in_array(
                strtolower($filters['sortBy'] ?? ''),
                self::getSortsBy()
            ) ? strtolower($filters['sortBy']) : 'title',
            sortDir: in_array(
                strtolower($filters['sortDir'] ?? ''),
                ['asc', 'desc']
            ) ? strtolower($filters['sortDir']) : 'asc',
            perPage: min((int)($filters['perPage'] ?? 10), 100),
            page: max((int)($filters['page'] ?? 1), 1),

            title: $filters['title'] ?? null,
            authorIds: isset($filters['authorIds'])
                ? (array)$filters['authorIds']
                : null,
            genreIds: isset($filters['genreIds'])
                ? (array)$filters['genreIds']
                : null,
            yearFrom: isset($filters['yearFrom'])
                ? (int)$filters['yearFrom']
                : null,
            yearTo: isset($filters['yearTo'])
                ? (int)$filters['yearTo']
                : null,
        );
    }

    private static function getSortsBy(): array
    {
        return [
            'title', 'year', 'page_count'
        ];
    }
}
