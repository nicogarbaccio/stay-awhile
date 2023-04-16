'use client';

import Image from "next/image"
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

// Save this for later!
// interface LogoProps {
//     currentUser?: SafeUser | null;
// }

// const Logo: React.FC<LogoProps> = ({currentUser}) => {
//     const router = useRouter();

//     return (
//         <h1 onClick={() => {currentUser?.favoriteIds !== null ? router.push('/favorites') : router.push('/')}} className="hidden md:block cursor-pointer text-xl text-green-800 font-extrabold">
//             🏡 STAY AWHILE
//         </h1>
//     )
// }

const Logo = () => {
    const router = useRouter();

    return (
        <h1 onClick={() => router.push('/')} className="hidden md:block cursor-pointer text-xl text-green-800 font-extrabold">
            🏡 STAY AWHILE
        </h1>
        // <Image
        //     onClick={() => router.push('/')}
        //     alt="Logo"
        //     className="hidden md:block cursor-pointer"
        //     height="100"
        //     width="100"
        //     src="/images/logo.png"
        // />
    )
}

export default Logo;