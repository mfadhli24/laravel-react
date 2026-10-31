export default function Login() {
    return (
        <div className="w-svh bg-blue-50  px-auto">
            <p className="text-red-500 mt-3">
                    Tailwind CSS berhasil diintegrasikan!
                </p>
            <h1>Login</h1>

            <form>
                <input
                    type="email"
                    placeholder="Email"
                />

                <input
                    type="password"
                    placeholder="Password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}