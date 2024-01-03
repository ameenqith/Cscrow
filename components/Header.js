import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import {BsInstagram, BsTwitter} from "react-icons/bs"
import {FaTiktok, FaDiscord} from "react-icons/fa"
import {motion} from "framer-motion"
import Image from "next/image";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

function Header() {
  const router = useRouter();
  const activePage = router.pathname;

  const scrollDirection = useScrollDirection();

  return (
    <header 
      className={`flex ${scrollDirection==="down" ? 'justify-center bg-[rgba(49,49,49,.582)] p-5 rounded-b-xl' : 'justify-between p-10'} items-center mx-w-7xl mx-auto fixed w-full z-50`}
    >
        { scrollDirection !== "down" ? 
        <>
        <div className={activePage == "/" ? "flex h-10 mt-10 cursor-pointer my-auto" : "flex h-10 cursor-pointer my-auto"}>
          <Link href='/' legacyBehavior>
              <div className="text-center font-['Bowlby_One_SC']">
                <div className="flex">
                <div className="relative w-10 h-10 mr-[2px]">
                  <Image 
                    src="https://ik.imagekit.io/74qyv5bswgr/Metavists/Logo_new_White2-min_16OOTVCId.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664206195706"
                    layout="fill"
                    blurDataURL="https://ik.imagekit.io/74qyv5bswgr/Metavists/Logo_new_White2-min_16OOTVCId.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664206195706"
                  />
                </div>
                  <h1 className="text-[22.4px] md:text-[32px] font-medium text-white hover:scale-105 transition duration-200 hover:opacity-90">etavists</h1>
                </div>
               
                  <p className="text-gray-200 text-[10.8px] md:text-[12.8px]">The great reset, powered by yoU</p>
              </div>
          </Link>
        </div>
        <div className={activePage == "/" ? "flex mt-10 items-center md:space-x-2 lg:space-x-5 text-white font-['Poppins']" : "flex items-center md:space-x-2 lg:space-x-5 text-white font-['Poppins']"}>
            <Link href="/" legacyBehavior>
              <h3 
                className={activePage==='/' ? 'activeMenuItem' : 'menuItem'}
              >
                Home
              </h3>
            </Link>

            <Link href="/presale" legacyBehavior>
                <h3 className="inline-block md:hidden text-base text-white bg-purple-500 shadow-lg shadow-purple-500/50 px-4 py-1 rounded-full cursor-pointer">
                  Enlist
                </h3>
              </Link>

            {/* <Link href="/application">
              <h3 
                className={activePage==='/application' ? 'activeMenuItem' : 'menuItem'} 
              >
                  The App
              </h3>
            </Link> */}

            <Link href="/roadmap" legacyBehavior>
                <h3 
                  className={activePage==='/roadmap' ? 'activeMenuItem' : 'menuItem'}
                >
                    Roadmap
                </h3>
            </Link>

            <Link href="/mythology" legacyBehavior>
                <h3 
                  className={activePage==='/mythology' ? 'activeMenuItem' : 'menuItem'}
                >
                    Mythology
                </h3>
              </Link>

              <Link href="/team" legacyBehavior>
                <h3 
                  className={activePage==='/team' ? 'activeMenuItem' : 'menuItem'}
                >
                    Team
                </h3>
              </Link>

         
            </div>
        </>
        :
        <>
          <div className="flex justify-center items-center space-x-16 text-white font-['Poppins']">
            <a href="https://www.instagram.com/metavists/" target='_blank'>
              <div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
                <BsInstagram size={24}/>
              </div>
            </a>
            <a href="https://twitter.com/Metavists" target='_blank'>
              <div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
                <BsTwitter size={24}/>
              </div>
             
            </a>
            <a href="https://www.tiktok.com/@metavists"  target='_blank'>
              <div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
                  <FaTiktok size={24}/>
                </div>
            </a>
            <a href="https://discord.gg/9NrVgamBhw"  target='_blank'>
              <div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
                  <FaDiscord size={24}/>
                </div>
            </a>
          </div>
        </>
        }
    </header>
  )
}

export default Header