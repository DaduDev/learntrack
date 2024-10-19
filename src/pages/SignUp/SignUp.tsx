import { useState } from "react";
import "./SignUp.css"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('student');
  const [course, setCourse] = useState<string>('B.Tech');
  const [fullname, setFullname] = useState<string>('');

  const avatarEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', 
    '😊', '😇', '🥰', '😍', '😘', '😋', '😎', '🤓', 
    '🧐', '😐', '😑', '😶', '🙄', '😏', '😣', '😥',
    '😮', '😱', '😲', '😵', '😳', '😬', '😕', '😶‍🌫️'
];

const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * avatarEmojis.length);
  return avatarEmojis[randomIndex];
};


  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        name: fullname,
        email: email,
        role: role, 
        course: course,
        avatar: getRandomEmoji(),
        isTeacher: role === 'teacher',
      });
  
      console.log("User created and details saved.");
      if(role === 'teacher') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="signup-container" style={{
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
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fullname">fullname</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <div>
        <label htmlFor="course">Course</label>
        <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="B.Tech">B. Tech</option>
          <option value="BCA">BCA</option>
          <option value="M. Tech">M. Tech</option>
          <option value="MCA">MCA</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>
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
            <p>Already have an account?</p>
            <button style={{
              backgroundColor: '#333',
              padding: '10px',
              color: 'white',
              borderRadius: '5px',
            }} onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}
export default SignUp