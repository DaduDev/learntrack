import { useState } from "react";
import "./Login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      } else {
        console.log("No such user!");
      }
      const userData = userDoc.data();
      if (userData && userData.role === 'student') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = () => {
    window.location.href = '/signup';
  }

  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
        <div>
            <h1 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                borderBottom: '1px solid #0A3D62',
            }} onClick={() => {
              window.location.href = '/';
            }}>Learn Track</h1>
        </div>
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                
                <label>Password</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                
                <button type="submit">Login</button>
            </form>
        </div>
        <div style={{
            marginTop: '1rem',
            fontSize: '0.8rem',
            flexDirection: 'row',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
        }}>
            <p>Don't have an account?</p>
            <button style={{
              backgroundColor: '#333',
              padding: '10px',
              color: 'white',
              borderRadius: '5px',
            }} onClick={handleSignup}>Sign Up</button>
        </div>
    </div>
  )
}

export default Login