<?php

namespace App\Http\Requests;

use App\Models\Menu;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:255'],
            'order' => ['required', 'numeric', 'min:0'],
            'is_active' => ['nullable', 'boolean'],

        ];
    }
}
