<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return $next($request);
        }
        $user = Auth::user();
        
        
        $roles = Role::pluck('name')->toArray();
       

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        // Check if the user has the super admin role
        if ($user->hasRole('super admin')) {
            return $next($request);
        }
    
        // Check if the user has one of the allowed roles
        $userRoles = $user->getRoleNames()->toArray(); // Convert to array
        if (!array_intersect($userRoles, $roles)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        return $next($request);

    
    }
}
