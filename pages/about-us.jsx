import styles from "./../styles/AboutUs.module.css";
import Layout from "../components/layout/Layout";

export default function AboutUs() {
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"principal"}
      headerFixed={true}
      footer={true}
    >
      <div className={styles.contAbout}>
        <div className="container">
          <div className={styles.contentAbout}>
            <h2 className={styles.titleAbout}>
              ABOUT<br></br>US
            </h2>
            <p className={styles.textAbout}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
