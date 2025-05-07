## JWT Setup

To integrate **JWT (JSON Web Token)** authentication in **Laravel 10** for a REST API, you typically use the popular package **`tymon/jwt-auth`**. Here's a step-by-step guide:

---

### ✅ Step 1: Install the Package

```bash
composer require tymon/jwt-auth
```

---

### ✅ Step 2: Publish the Config

```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

This will publish the `config/jwt.php` file.

---

### ✅ Step 3: Generate JWT Secret Key

```bash
php artisan jwt:secret
```

This sets the `JWT_SECRET` in your `.env` file.

---

### ✅ Step 4: Configure `auth.php`

In `config/auth.php`, update the `guards` section:

```php
'guards' => [
    'api' => [
        'driver' => 'jwt',
        'provider' => 'users',
    ],
],
```

---

### ✅ Step 5: Create Authentication Controller

You can create a controller like this:

```bash
php artisan make:controller AuthController
```

Then add the logic for registration, login, logout, and user retrieval:

```php
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = JWTAuth::fromUser($user);
        return response()->json(['token' => $token]);
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me() {
        return response()->json(JWTAuth::user());
    }
}
```

---

### ✅ Step 6: Define API Routes

In `routes/api.php`:

```php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
```

---

### ✅ Step 7: Test the API

Use Postman or any REST client to test `/register`, `/login`, `/me`, and `/logout`.

---

Would you like me to generate the full boilerplate files for you?
