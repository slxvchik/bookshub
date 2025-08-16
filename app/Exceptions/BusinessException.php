<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class BusinessException extends Exception
{
    protected $code = 400;
    protected $message = 'Произошла ошибка';
    public function render(): RedirectResponse
    {
        return back()->withErrors([
            $this->message ?? 'message' => $this->getMessage(),
        ]);
    }
}
