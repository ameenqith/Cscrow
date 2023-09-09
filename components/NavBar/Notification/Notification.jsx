import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";

const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <Image
            src={images.user2}
            alt="profile image"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className={Style.notification_box_info}>
          <h4>Cain Akhter</h4>
          <pp>Measure action your user...</pp>
          <p className="text-xs">3 minutes ago</p>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  );
};

export default Notification;
