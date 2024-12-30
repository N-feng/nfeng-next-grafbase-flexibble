"use client";

import { ClerkLoaded, ClerkLoading, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";
import { auth } from "@clerk/nextjs/server";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNewProject } from "@/features/projects/hooks/use-new-project";

const Navbar = () => {
  // const session = await getCurrentUser()
  const { userId, 
    // sessionClaims, metadata 
    
  } = useAuth();

  const { isLoaded, user } = useUser()
  // const role = (sessionClaims?.metadata as { role?: string })?.role;
  const role = (user?.publicMetadata as { role?: string })?.role;
  const { onOpen } = useNewProject();

  const handleClick = () => {
    onOpen()
  }

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            width={116}
            height={43}
            alt='logo'
          />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (
            // <Link href={link.href} key={link.text}>
            //   {link.text}
            // </Link>
            <a key={link.text}>
              {link.text}
            </a>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {/* {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title='Share work' />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )} */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-slate-400 size-8" />
        </ClerkLoading>

        {role === 'admin' && (
          <>
            {/* <Link href="/create-project"> */}
            <a onClick={handleClick}>
              <Button title='Share work' />
            </a>
            {/* </Link> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
