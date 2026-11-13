// import style from "./book-item-skeleton.module.css";

// export default function BookItemSkeleton() {
//   return (
//     <div className={style.container}>
//       <div className={style.cover_img}></div>
//       <div className={style.info_container}>
//         <div className={style.title}></div>
//         <div className={style.subtitle}></div>
//         <br />
//         <div className={style.author}></div>
//       </div>
//     </div>
//   );
// }

import Skeleton from "react-loading-skeleton";
import style from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
  return (
    <div className={style.container}>
      {/* 책 표지 뼈대 */}
      <div className={style.cover_img}>
        <Skeleton height={105} width={80} />
      </div>
      {/* 텍스트 뼈대 (제목, 부제목, 저자 등) */}
      <div className={style.info_container}>
        <div className={style.title}>
          <Skeleton width="80%" />
        </div>
        <div className={style.subtitle}>
          <Skeleton width="60%" />
        </div>
        <br />
        <div className={style.author}>
          <Skeleton width="40%" />
        </div>
      </div>
      {/* 텍스트 뼈대 */}
      <div className={style.info_container}>
        <Skeleton height={22} width="80%" style={{ marginBottom: "10px" }} />
        <Skeleton height={16} width="60%" style={{ marginBottom: "10px" }} />
        <Skeleton height={16} width="40%" />
      </div>
    </div>
  );
}
