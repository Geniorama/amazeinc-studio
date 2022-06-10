import Layout from "./../../components/layout/Layout";
import styles from "./../../styles/ProjectsArchive.module.css";
import TextArrow from "../../components/TextArrow";
import Link from "next/link";

export default function Projects() {
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"principal"}
      headerFixed={true}
      footer={true}
    >
      <div className={styles.contProjectArchive}>
        <div className="container">
          <div className={styles.contProjectsTop}>
            <div className={styles.contTitle}>
              <h2>
                OUR<br></br>WORK
              </h2>
            </div>
            <div className={styles.contCategories}>
              <ul className={styles.contItemsCategories}>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Photography"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Commercial"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Film"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Video"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
