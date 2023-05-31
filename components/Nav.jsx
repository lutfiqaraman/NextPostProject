"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import provider from "@components/Provider";

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            await setProviders(response);
        }
        setProviders().then();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" alt="Logo" width={30} height={30} className="object-contain"></Image>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ?
                    (<div className="flex gap-3 md:gap-5">
                        <Link href="/create-post" className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image className="rounded-full" src="/assets/images/profile.svg" alt="Profile" width={37} height={37}></Image>
                        </Link>
                    </div>)
                    :
                    (<>
                        {providers && Object.values(providers).map((provider) =>
                            (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                    Sign In
                                </button>
                            ))}
                    </>)
                }
            </div>

            {/* Mobile Navigation*/}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ?
                    (<div className="flex">
                        <Image className="rounded-full" src="/assets/images/profile.svg" alt="Profile" width={37} height={37} onClick={() => { setToggleDropDown((prev) => !prev) }}></Image>

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/Profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                                    My Profile
                                </Link>

                                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                                    Create Prompt
                                </Link>

                                <button type="button" onClick={() => {
                                    setToggleDropDown(false);
                                    signOut().then();
                                }} className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>

                            </div>
                        )}
                    </div>)
                    :
                    (
                        <>
                            {providers && Object.values(providers).map((provider) =>
                                (
                                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                        Sign In
                                    </button>
                                ))}
                        </>
                    )}
            </div>
        </nav>
    );
};

export default Nav;
