<?php

namespace App\Http\Controllers;

use App\DTO\Request\BookRequestDto;
use App\DTO\Request\BookFilterRequestDto;
use App\Exceptions\BusinessException;
use App\Http\Requests\BookFilteredRequest;
use App\Services\AuthorService;
use App\Services\BookService;
use App\Services\GenreService;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    protected BookService $bookService;
    protected GenreService $genreService;
    protected AuthorService $authorService;

    public function __construct(BookService $bookService,
                                GenreService $genreService,
                                AuthorService $authorService
    ) {
        $this->bookService = $bookService;
        $this->genreService = $genreService;
        $this->authorService = $authorService;
    }

    public function index(BookFilteredRequest $request): Response
    {

        $validated = $request->validated();

        $books = $this->bookService->showFiltered(BookFilterRequestDto::fromArray($validated));

        $genres = $this->genreService->getAll();

        $authors = $this->authorService->getAll();

        return Inertia::render('Books/Index', [
            'books' => $books,
            'authors' => $authors,
            'genres' => $genres
        ]);
    }

    public function create(): Response
    {
        $genres = $this->genreService->getAll();
        $authors = $this->authorService->getAll();
        return Inertia::render('Books/Create', [
            'genres' => $genres,
            'authors' => $authors
        ]);
    }

    /**
     * @throws BusinessException
     */
    public function store(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'authorId' => 'required|integer|exists:authors,id',
            'title' => 'required|string',
            'year' => 'required|integer|min:1800|max:' . date('Y'),
            'genreIds' => 'required|array|exists:genres,id',
            'coverImage' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'pageCount' => 'required|integer|min:1',
        ]);

        try {

            $coverImagePath = $request->file('coverImage')->store('images/books', 'public');

            $bookCreateDto = BookRequestDto::fromArray([
                'userId' => auth()->id(),
                'authorId' => $validated['authorId'],
                'title' => $validated['title'],
                'genreIds' => $validated['genreIds'],
                'year' => $validated['year'],
                'coverImage' => $coverImagePath,
                'pageCount' => $validated['pageCount']
            ]);

            $this->bookService->create($bookCreateDto);

            return redirect()->route('books.index')->with('success', 'The book was added successfully');

        } catch (\Exception $e) {

            if (isset($coverImagePath) && Storage::disk('public')->exists($coverImagePath)) {
                Storage::disk('public')->delete($coverImagePath);
            }

            return redirect()->route('error.index')->with('message', $e->getMessage());
        }
    }

    public function show(int $bookId): Response
    {
        $book = $this->bookService->showOne($bookId);
        $genres = $this->genreService->getAll();
        $authors = $this->authorService->getAll();
        return Inertia::render('Books/Edit', [
            'book' => $book,
            'authors' => $authors,
            'genres' => $genres
        ]);
    }

    public function update(Request $request, int $bookId): RedirectResponse
    {

        $validated = $request->validate([
            'authorId' => 'required|integer|exists:authors,id',
            'title' => 'required|string',
            'year' => 'required|integer|min:1800|max:' . date('Y'),
            'genreIds' => 'required|array',
            'genreIds.*' => 'integer|exists:genres,id',
            'coverImage' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'pageCount' => 'required|integer|min:1',
        ]);

        try {

            $oldImagePath = $this->bookService->getBookImagePath($bookId);

            $coverImagePath = $request->hasFile('coverImage') ?
                $request->file('coverImage')->store('images/books', 'public') : $oldImagePath;


            $bookCreateDto = BookRequestDto::fromArray([
                'userId' => auth()->id(),
                'authorId' => $validated['authorId'],
                'title' => $validated['title'],
                'genreIds' => $validated['genreIds'],
                'year' => $validated['year'],
                'coverImage' => $coverImagePath,
                'pageCount' => $validated['pageCount']
            ]);

            $this->bookService->update($bookId, $bookCreateDto);

            if ($request->hasFile('coverImage') && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }

            return redirect()->route('books.index')->with('success', 'The book was edited successfully');

        } catch (\Exception $e) {

            if (isset($coverImagePath) && $coverImagePath !== $oldImagePath) {
                Storage::disk('public')->delete($coverImagePath);
            }

            return redirect()->route('error.index')->with('message', $e->getMessage());

        }

    }

    public function delete(int $bookId): RedirectResponse
    {
        $this->bookService->delete($bookId);
        return redirect()->route('books.index');
    }
}
