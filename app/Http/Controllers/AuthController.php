<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    private AuthService $authService;
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @throws BusinessException
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed',
        ]);

        $this->authService->register($request->name, $request->email, $request->password);

        return redirect()->route('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required',
            'remember' => 'required|boolean'
        ]);

        if(!Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ], $request->input('remember_me'))) {
            return redirect()->route('error.index')->withErrors(
                ['error' => 'Пароль или почта не валидны']
            );
        }

        $request->session()->regenerate();

        return redirect()->route('books.index');
    }

    public function logout(Request $request)
    {

        if (!Auth::check()) {
            return redirect()->route('error.index')->withErrors(
                ['error' => 'Нет активных сессий']
            );
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('books.index');
    }
}
