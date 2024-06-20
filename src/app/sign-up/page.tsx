'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { useForm } from 'react-hook-form';
import { SignUpForm } from './sign-up.types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<SignUpForm>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    setUserId(Cookies.get('user_id'));
  }, []);

  if (userId) {
    router.push('/chat');
  }

  const onSubmit = ({ firstName, lastName }: SignUpForm) => {
    const userIdCookie = self.crypto.randomUUID();
    Cookies.set('user_id', userIdCookie);
    Cookies.set('first_name', firstName);
    Cookies.set('last_name', lastName);
    router.push('/chat');
  };

  return (
    <>
      <Card className="flex flex-col justify-center items-center text-center p-6 border-transparent shadow-none pt-28">
        <Image src="/la-ronde-logo-light.svg" width={250} height={250} alt="La Ronde Logo" />
        <CardHeader className="items-center gap-3">
          <CardTitle className="font-oswald">BE PART OF THE PERFORMANCE</CardTitle>
          <CardDescription className="font-inter font-light">
            Interact with characters during the live performance using AI powered technology. Create
            your profile to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <form
            className="flex flex-col gap-6 min-w-96 px-6"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="flex flex-col gap-6 w-full">
              <div className="relative h-11">
                <input
                  placeholder=""
                  className="peer h-full w-full border-b font-inter font-bold border-secondary-cream placeholder-secondary-cream bg-transparent pt-4 pb-1.5 focus:border-primary-yellow focus:outline-0"
                  required
                  {...register('firstName')}
                />
                <label className="pointer-events-none absolute font-inter font-light text-secondary-cream -top-1 flex truncate text-[11px] leading-tight transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight">
                  First name
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <div className="relative h-11">
                <input
                  placeholder=""
                  className="peer h-full w-full border-b font-inter font-bold border-secondary-cream placeholder-secondary-cream bg-transparent pt-4 pb-1.5 focus:border-primary-yellow focus:outline-0"
                  required
                  {...register('lastName')}
                />
                <label className="pointer-events-none absolute font-inter font-light text-secondary-cream -top-1 flex truncate text-[11px] leading-tight transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight">
                  Last name
                </label>
              </div>
            </div>
            <Button
              className="bg-primary-yellow font-oswald font-medium text-primary-dark-brown py-4 px-2.5"
              type="submit"
            >
              GET STARTED
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
          <CardDescription className="font-inter font-light">
            By clicking ‘Get Started’ you are agreeing to the Terms and conditions of the Young Vic
          </CardDescription>
          <Image
            className="pt-20"
            src="/yv-logo-dark.svg"
            width={150}
            height={150}
            alt="Young Vic Logo"
          />
        </CardFooter>
      </Card>
      <Image
        className="pt-16"
        src="/sign-up-background-circle.svg"
        width={3000}
        height={1000}
        alt="Sign Up Background Design"
      />
    </>
  );
}
