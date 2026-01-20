import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default App
