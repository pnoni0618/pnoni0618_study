import { SkeletonTheme } from "react-loading-skeleton";
import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  //   return new Array(count)
  //     .fill(0)
  //     .map((_, idx) => <BookItemSkeleton key={`book-item-${idx}`} />);

  return (
    <>
      <SkeletonTheme baseColor="#d7e1f4" highlightColor="#adbff7">
        {new Array(count).fill(0).map((_, idx) => (
          <BookItemSkeleton key={`book-item-skeleton-${idx}`} />
        ))}
      </SkeletonTheme>
    </>
  );
}
