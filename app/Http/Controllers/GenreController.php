<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Services\GenreService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class GenreController extends Controller
{
    protected GenreService $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
    }

    public function index(): Response
    {
        $genres = $this->genreService->getAll();
        return Inertia::render('Genres/Index', ['genres' => $genres]);
    }

    /**
     * @throws BusinessException
     */
    public function create(Request $request): RedirectResponse
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        $this->genreService->create($validator->validated()['name']);

        return Redirect::route('genres.index');
    }

    /**
     * @throws BusinessException
     */
    public function update(Request $request, int $genreId): RedirectResponse
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        $this->genreService->update($genreId, $validator->validated()['name']);

        return Redirect::route('genres.index');
    }

    public function delete(int $genreId): RedirectResponse
    {
        $this->genreService->delete($genreId);
        return Redirect::route('genres.index');
    }

}
