<?php

namespace App\Repository\Impl;

use App\Models\User;
use App\Repository\UserRepository;

class UserRepositoryImpl implements UserRepository
{

    private User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function registerUser(string $name, string $email, string $password): User
    {
        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password
        ]);
    }

    public function isEmailExists(string $email): bool
    {
        return $this->model->where('email', $email)->exists();
    }
}
