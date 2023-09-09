import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit,FaPlus } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount, user }) => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
      {(user.photo)?
          <Image
            src={user.photo}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />
              :
          <Image
            src={images.user2}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          /> 
            }
        

        <div>
          {(user.username)?
            <p className="text-2xl">{user.username}</p>
            :
            <p className="text-2xl">User</p>}
            
            <p className="text-sm">{currentAccount.slice(0, 18)}..</p>
        </div>
      </div>

      <div>
        <div>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/profile" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/profile" }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaPlus />
            <p>
              <Link href={{ pathname: "/uploadNFT" }}>Add to Inventory</Link>
            </p>
          </div>
        </div>

        {/* <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/aboutus" }}>About Us</Link>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
