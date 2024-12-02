<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'created_at')->get();

        return Inertia::render('MyUsers', [
            'users' => $users,
        ]);
    }
}
