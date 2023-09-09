import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";


const NFTCard = ({ NFTData }) => {

  const [like, setLike] = useState(true);

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  console.log(NFTData);
  return (
    <div className={Style.NFTCard}>
      {NFTData.map((el, i) => (
        
        <Link href={{}} key={i + 1}>
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
            
              <Image
                className="aspect-auto mb-3 rounded-2xl object-cover h-80 w-100"
                src={el.image}
                alt="NFT images"
                width={600}
                height={600}
                
              />
            </div>
            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}>
                <div
                  className={Style.NFTCard_box_update_left_like}
                  onClick={() => likeNft()}
                >
                  {like ? (
                    <AiOutlineHeart />
                  ) : (
                    <AiFillHeart
                      className={Style.NFTCard_box_update_left_like_icon}
                    />
                  )}
                  {""} 0
                </div>
              </div>

              
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4 className="mt-5 mb-1">
                    {el.name}
                  </h4>
                </div>
                
              </div>
             
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
