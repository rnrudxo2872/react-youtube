import { useForm } from "react-hook-form";
import { NavbarProps, SearchForm } from "../interfaces/navbar.interface";
import styles from "../styles/navbar.module.css";
import { SearchValidatoin } from "../validations/navbar.validation";

export default function Navbar({ onSubmit, clickLogo }: NavbarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();

  if (errors) console.log(errors);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <section className={styles.start}>
          <div className={styles.menubar}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </div>
          <div className={styles.logo} onClick={clickLogo}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="youtube"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 94"
            >
              <path
                stroke="null"
                id="svg_1"
                d="m127.41471,14.23842c-1.49665,-5.60456 -5.9063,-10.01853 -11.50522,-11.51648c-10.14844,-2.72194 -50.8425,-2.72194 -50.8425,-2.72194s-40.69383,0 -50.8425,2.72194c-5.59892,1.49818 -10.00857,5.91192 -11.50522,11.51648c-2.71928,10.15859 -2.71928,31.35353 -2.71928,31.35353s0,21.19494 2.71928,31.35353c1.49665,5.60456 5.9063,9.83464 11.50522,11.33258c10.14867,2.72194 50.8425,2.72194 50.8425,2.72194s40.69383,0 50.8425,-2.72194c5.59892,-1.49795 10.00857,-5.72802 11.50522,-11.33258c2.71928,-10.15859 2.71928,-31.35353 2.71928,-31.35353s0,-21.19494 -2.71928,-31.35353zm-75.65696,50.59695l0,-38.48684l34.01216,19.24389l-34.01216,19.24295z"
                fill="currentColor"
              />
              <text
                transform="matrix(1.55013 0 0 1.90946 -74.4312 20.3495)"
                stroke="null"
                textAnchor="start"
                fontFamily="Noto Sans JP"
                fontSize="60"
                strokeWidth="0"
                id="svg_2"
                y="34.50874"
                x="134.32615"
                className={styles["logo-text"]}
              >
                YouTube
              </text>
            </svg>
          </div>
        </section>
        <section className={styles.center}>
          <form
            className={styles["search-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={styles.searchbox}
              type="text"
              {...register("navSearch", SearchValidatoin)}
              placeholder="검색"
            />
            <button className={styles["search-btn"]}>
              <div className={styles["search-btn__img"]}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </div>
            </button>
          </form>
        </section>
        <section className={styles.end}>
          <div className={styles.menu}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="shapes"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"
              ></path>
            </svg>
          </div>
        </section>
      </div>
    </nav>
  );
}
