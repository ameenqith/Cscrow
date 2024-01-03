import React from 'react';
import images from "../../img";
import Image from "next/image";
import Link from 'next/link';

export default function JoinAmbasadorPopup({show,setShow}) {


  return (
    <>
        <div className='ambasadorPopup'>
            <div className='popupBox'>
                <button type='button' onClick={() => setShow(false)}>
                <Image
                    src={images.cross}
                    alt="NFT images"
                    width={{}}
                    height={{}}
                />
                </button>
                <p>Join our <Link href="https://discord.gg/9NrVgamBhw" target="_blank">discord server</Link> & create a ticket for 'Ambassadors'. Our team will respond to your request soon.</p>
            </div>
        </div>
    </>
  )
}
