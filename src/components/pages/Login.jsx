import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const handleSignin = (e) => {
    e.preventDefault();

    setLoading(true);
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Email and Password are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    signInUser(email, password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage;
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          default:
            errorMessage = "Something went wrong. Please try again later.";
        }

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setLoading(false);
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome, ${result.user.displayName}!`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to log in with Google.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Reset Password",
      text: "Enter your email to reset your password.",
      input: "email",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Send Reset Email",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value.trim();
        setLoading(true);
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setLoading(false);
            Swal.fire({
              title: "Success!",
              text: "Password reset email sent. Please check your inbox.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            setLoading(false);
            let errorMessage;
            switch (error.code) {
              case "auth/user-not-found":
                errorMessage = "No account found with this email.";
                break;
              case "auth/invalid-email":
                errorMessage = "Invalid email address.";
                break;
              default:
                errorMessage = "Failed to send reset email. Please try again.";
            }

            Swal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 mt-8 mb-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-lg text-gray-600 mt-2">Please login to continue</p>
        </div>
        <form onSubmit={handleSignin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
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
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="mt-4 w-full py-3 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
            className="h-6 w-6 mr-2"
          />
          {loading ? "Logging in with Google..." : "Login with Google"}
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-purple-500 hover:underline font-semibold">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

