import React from 'react';
import images from "../../img";
import Image from "next/image";

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
                <p>Join our discord server & create a ticket for 'Ambassadors'. Our team will respond to your request soon.</p>
            </div>
        </div>
    </>
  )
}
