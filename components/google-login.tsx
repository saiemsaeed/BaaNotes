'use client';

import React, { FC } from 'react';
import { Button } from './ui/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { USER } from '@/app/actions';
import { useRouter } from 'next/navigation';

// TODO: Make Typing Better
interface GoogleLoginProps {
  verifyUser: USER;
}

const GoogleLogin: FC<GoogleLoginProps> = ({ verifyUser }) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      if (idToken == null) throw result;

      const res = await verifyUser(idToken);

      if (res) {
        await auth.signOut();

        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export default GoogleLogin;
