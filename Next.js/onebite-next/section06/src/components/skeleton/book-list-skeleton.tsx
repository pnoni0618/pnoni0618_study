import { SkeletonTheme } from "react-loading-skeleton";
import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  //   return new Array(count)
  //     .fill(0)
  //     .map((_, idx) => <BookItemSkeleton key={`book-item-${idx}`} />);

  return (
    <>
      <SkeletonTheme baseColor="#2d3748" highlightColor="#4fd1c5">
        v
      </SkeletonTheme>
    </>
  );
}
