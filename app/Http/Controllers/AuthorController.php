<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Services\AuthorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    protected AuthorService $authorService;

    public function __construct(AuthorService $authorService) {
        $this->authorService = $authorService;
    }

    public function index(): Response
    {
        $authors = $this->authorService->getAll();
        return Inertia::render('Authors/Index', ['authors' => $authors]);
    }

    /**
     * @throws BusinessException
     */
    public function create(Request $request): RedirectResponse
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        $this->authorService->create($validator->validated()['name']);

        return Redirect::route('authors.index');
    }

    /**
     * @throws BusinessException
     */
    public function update(Request $request, int $authorId): RedirectResponse {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string'
        ]);

        $this->authorService->update($authorId, $validator->validated()['name']);

        return Redirect::route('authors.index');
    }

    public function delete(int $authorId): RedirectResponse {

        $this->authorService->delete($authorId);

        return Redirect::route('authors.index');
    }

}
