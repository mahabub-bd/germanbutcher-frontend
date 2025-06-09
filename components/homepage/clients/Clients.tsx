"use client";

import Image from "next/image";
import styles from "./lientLogos.module.css";

const logos = [
  "/clients/c1.png",
  "/clients/c2.png",
  "/clients/c3.png",
  "/clients/c4.png",
  "/clients/c5.png",
  "/clients/c6.png",
  "/clients/c7.png",
  "/clients/c8.png",
  "/clients/c9.png",
  "/clients/c10.png",
];

const ClientS = ({children}) => {
  return (
    <div className="">
        {children}
      <div className="container mx-auto px-4">
        <div className={`${styles.marqueeWrapper} mb-6`}>
          <div className={`${styles.marquee} ${styles.leftToRight}`}>
            {[...logos, ...logos].map((logo, i) => (
              <div key={`top-${i}`} className="w-[70px] md:w-[100px] lg:w-[120px] flex-shrink-0">
                <Image
                  src={logo}
                  alt={`Logo ${i}`}
                  width={120}
                  height={80}
                  className="mx-2 md:mx-4 lg:mx-6 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={`${styles.marquee} ${styles.rightToLeft}`}>
            {[...logos, ...logos].map((logo, i) => (
              <div key={`bottom-${i}`} className="w-[70px] md:w-[100px] lg:w-[120px] flex-shrink-0">
                <Image
                  src={logo}
                  alt={`Logo ${i}`}
                  width={120}
                  height={80}
                  className="mx-2 md:mx-4 lg:mx-6 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientS;
