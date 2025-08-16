<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookFilteredRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'sometimes|integer|min:1',
            'perPage' => 'sometimes|integer|min:1|max:100',
            'sortBy' => 'sometimes|string|in:author,title,year,page_count',
            'sortDir' => 'sometimes|string|in:asc,desc',
            'authorIds' => 'sometimes|array|exists:authors,id',
            'title' => 'sometimes|string',
            'yearFrom' => 'sometimes|integer|min:1800',
            'yearTo' => 'sometimes|integer|min:1800|gte:yearFrom',
            'genreIds' => 'sometimes|array|exists:genres,id',
        ];
    }

}
