<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class AuthService
{

    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @throws BusinessException
     */
    public function register(string $name, string $email, string $password): void
    {

        if ($this->userRepository->isEmailExists($email)) {
            throw new BusinessException('Email is already registered');
        }

        $this->userRepository->registerUser($name, $email, $password);
    }

}
