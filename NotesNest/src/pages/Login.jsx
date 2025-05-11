import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
const { user, refreshUser } = useAuth(); // <-- add refreshUser

  // Email/Password Login
  const login = async () => {
    setErrorMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  // Email/Password Signup with name
const signup = async () => {
  setErrorMsg("");
  try {
    if (!email || !password || !name) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      uid: userCredential.user.uid,
    });
    await refreshUser();
    window.location.replace("/"); // <-- Force reload and redirect to home
  } catch (error) {
    setErrorMsg(error.message);
  }
};

  // Google Sign-In
  const googleLogin = async () => {
    setErrorMsg("");
    try {
      const result = await signInWithPopup(auth, provider);
      // Save name to Firestore if not already present
      await setDoc(
        doc(db, "users", result.user.uid),
        {
          name: result.user.displayName || "",
          email: result.user.email,
          uid: result.user.uid,
        },
        { merge: true }
      );
      navigate("/"); // Redirect to home after Google login
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Welcome to NoteNest 📝</h2>
      {errorMsg && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{errorMsg}</div>
      )}
      {isSignup && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: "block", margin: "1rem 0", width: "100%" }}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", margin: "1rem 0", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", margin: "1rem 0", width: "100%" }}
      />

      {!isSignup ? (
        <>
          <button onClick={login} style={{ marginRight: "1rem" }}>Login</button>
          <button onClick={() => setIsSignup(true)}>Sign Up</button>
        </>
      ) : (
        <>
          <button onClick={signup} style={{ marginRight: "1rem" }}>Sign Up</button>
          <button onClick={() => setIsSignup(false)}>Back to Login</button>
        </>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <button onClick={googleLogin}>Sign in with Google</button>
    </div>
  );
}