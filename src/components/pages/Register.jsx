import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const { createUser } = useContext(AuthContext); // Access createUser from AuthContext
    const navigate = useNavigate(); // Navigate to other routes
    const [passwordError, setPasswordError] = useState(""); // For password validation errors

    const handleSignUp = (e) => {
        e.preventDefault();

        // Get form data
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value || "https://via.placeholder.com/150";
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Validate password
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUpperCase || !hasLowerCase || !isValidLength) {
            setPasswordError(
                "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            return;
        }

        setPasswordError(""); // Clear errors if password is valid

        // Call createUser to register the user
        createUser(email, password, name, photoUrl)
            .then(() => {
                Swal.fire({
                    title: "Registration Successful!",
                    text: "Welcome to Movie Flix!",
                    icon: "success",
                    confirmButtonText: "Go to Home",
                    confirmButtonColor: "#6B46C1",
                }).then(() => {
                    navigate("/"); // Redirect to home after successful registration
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: error.message || "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#EF4444",
                });
            });
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white mt-8 mb-8 p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Sign Up Now</h1>
                    <p className="text-lg text-gray-600 mt-2">Please register below</p>
                </div>
                <form onSubmit={handleSignUp}>
                    {/* Name Input */}
                    <div className="mb-6">
                        <label
                            className="block text-lg font-semibold text-gray-700"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Photo URL Input */}
                    <div className="mb-6">
                        <label
                            className="block text-lg font-semibold text-gray-700"
                            htmlFor="photoUrl"
                        >
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            placeholder="Enter your photo URL"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label
                            className="block text-lg font-semibold text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label
                            className="block text-lg font-semibold text-gray-700"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Redirect to Login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;


