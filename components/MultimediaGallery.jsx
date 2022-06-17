import Photo from "./../public/imagenes/photo-1.jpg";
import styles from "./../styles/MultimediaGallery.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MultimediaGallery({title, customer, coverImage, link}) {
  return (

    <Link href={link}>
      <a className={styles.cardLink}>
        <div className={styles.contImage}>
          <Image
            src={coverImage}
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
