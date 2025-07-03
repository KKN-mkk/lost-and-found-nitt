import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const INDIGO = "#4F46E5";
const VIOLET = "#8B5CF6";
const BG_GRADIENT = "linear-gradient(135deg, #f3e8ff 0%, #f0fdf4 100%)";
const ERROR_COLOR = "#DC2626";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        navigate("/");
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          })
        );
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: BG_GRADIENT }}
    >
      <AnimatePresence>
        <motion.div
          key="authcard"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
          className="w-full max-w-md p-10 rounded-3xl shadow-lg bg-white flex flex-col gap-8 relative"
          style={{ boxShadow: `0 10px 30px -5px ${INDIGO}22` }}
        >
          {user ? (
            <div className="flex flex-col items-center">
              <svg
                className="w-20 h-20 mb-4"
                fill="none"
                stroke={INDIGO}
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2
                className="text-2xl font-extrabold mb-2"
                style={{ color: INDIGO, letterSpacing: "0.5px" }}
              >
                Welcome,
              </h2>
              <p className="text-gray-700 mb-6">{user.email}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-transform duration-200"
                style={{
                  background: `linear-gradient(90deg, ${INDIGO}, ${VIOLET})`,
                  color: "#fff",
                  letterSpacing: "0.5px",
                  border: "none"
                }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
              noValidate
            >
              <h2
                className="text-3xl font-extrabold text-center mb-6"
                style={{
                  color: INDIGO,
                  letterSpacing: "1px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {isRegister ? "Create Account" : "Sign In"}
              </h2>

             
              <div className="relative">
                <HiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl"
                  style={{ color: VIOLET }}
                />
                <input
                  type="email"
                  placeholder="Nitt Webmail"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                />
              </div>

              
              <div className="relative">
                <HiOutlineLockClosed
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl"
                  style={{ color: VIOLET }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                />
              </div>

              
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: !loading ? 1.05 : 1 }}
                whileTap={{ scale: !loading ? 0.97 : 1 }}
                className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-transform duration-200 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                style={{
                  background: `linear-gradient(90deg, ${INDIGO}, ${VIOLET})`,
                  color: "#fff",
                  letterSpacing: "0.5px",
                  border: "none"
                }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-6 w-6 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : isRegister ? (
                  "Register"
                ) : (
                  "Login"
                )}
              </motion.button>

              
              <motion.button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 rounded-xl border-2 border-indigo-600 font-medium transition-colors duration-200 hover:bg-indigo-600 hover:text-white"
                style={{ letterSpacing: "0.5px" }}
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </motion.button>

              
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="text-center font-semibold mt-2"
                    style={{ color: ERROR_COLOR }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
