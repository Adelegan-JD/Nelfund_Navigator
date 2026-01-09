import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setMessage("Name, email and password are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      localStorage.setItem("chat_user_id", user.uid);
      localStorage.setItem("isLoggedIn", "true");
      setMessage("Signup successful! Redirecting to chatbot...");
      setEmail("");
      setPassword("");
      setName("");
      setTimeout(() => navigate("/chatbot"), 1000);
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setMessage("User already exists");
      } else if (error.code === 'auth/weak-password') {
        setMessage("Password should be at least 6 characters");
      } else {
        setMessage("Error signing up: " + error.message);
      }
    }
  };

  return (
   <div className="bg-gradient-to-br from-emerald-200/30 via-transparent to-green-300/20 dark:from-emerald-900/30">
    <NavBar />
     <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started with NelFund AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
<div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="name"
              placeholder="Micheal Ojo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-center text-emerald-600">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            Sign up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-emerald-600 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
   </div>
  );
}

export default Signup;
