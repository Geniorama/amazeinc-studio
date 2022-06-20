import Photo from "./../public/imagenes/photo-1.jpg";
import styles from "./../styles/MultimediaGallery.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function MultimediaGallery({title, customer, coverImage, link, gifImage}) {
  const [urlImage, setUrlImage] = useState(coverImage)

  function handleEnter(){
    if(gifImage) return setUrlImage(gifImage)
  }

  function handleLeave(){
    if(gifImage) return setUrlImage(coverImage)
  }

  return (

    <Link href={link}>
      <a className={styles.cardLink} onMouseEnter={() => handleEnter()} onMouseLeave={() => handleLeave()}>
        <div className={styles.contImage}>
          <Image
            src={urlImage}
            layout="fill"
            objectFit="cover"
            objectPosition={"top"}
            alt="Image test"
          />
          <div className={styles.overlayGallery}>
            <h2 className={styles.titleProject}>{title}</h2>
            <span className={styles.subTitleProject}>{customer}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
