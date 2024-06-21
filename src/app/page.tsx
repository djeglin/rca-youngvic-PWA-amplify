'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    setUserId(Cookies.get('user_id'));
  }, []);
  useEffect(() => {
    if (userId) {
      router.push('/dashboard');
    } else {
      router.push('/sign-up');
    }
  }, [userId, router])
  
}
