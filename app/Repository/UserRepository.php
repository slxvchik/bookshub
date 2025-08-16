<?php

namespace App\Repository;

use App\Models\User;

interface UserRepository
{
    public function registerUser(string $username, string $email, string $password): User;
    public function isEmailExists(string $email): bool;
}
