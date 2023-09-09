import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Merchant.module.css";

const Merchant = () => {
  const merchant = [
    {
      name: "Subscription",
      link: "subscription",
    },
  ];
  return (
    <div>
      {merchant.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Merchant;
