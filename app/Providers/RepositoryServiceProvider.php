<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected array $repositories = [
        [
            'interface' => \App\Repository\BookRepository::class,
            'implementation' => \App\Repository\Impl\BookRepositoryImpl::class
        ],
        [
            'interface' => \App\Repository\GenreRepository::class,
            'implementation' => \App\Repository\Impl\GenreRepositoryImpl::class
        ],
        [
            'interface' => \App\Repository\AuthorRepository::class,
            'implementation' => \App\Repository\Impl\AuthorRepositoryImpl::class
        ],
        [
            'interface' => \App\Repository\UserRepository::class,
            'implementation' => \App\Repository\Impl\UserRepositoryImpl::class
        ]
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        foreach ($this->repositories as $repository) {
            $this->app->bind(
                $repository['interface'],
                $repository['implementation']
            );
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
