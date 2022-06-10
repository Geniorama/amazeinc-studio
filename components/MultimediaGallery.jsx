import Photo from "./../public/imagenes/photo-1.jpg";
import styles from "./../styles/MultimediaGallery.module.css";
import Image from "next/image";

export default function MultimediaGallery() {
  return (
    <div className={styles.contGallery}>
      <div className={styles.contImage}>
        <Image
          src={Photo}
          width={100}
          layout="fill"
          objectFit="cover"
          objectPosition={"top"}
        />
        <div className={styles.overlayGallery}>
          <h2 className={styles.titleProject}>PROJECT NAME</h2>
          <span className={styles.subTitleProject}>COMPANY NAME</span>
        </div>
      </div>
    </div>
  );
}
