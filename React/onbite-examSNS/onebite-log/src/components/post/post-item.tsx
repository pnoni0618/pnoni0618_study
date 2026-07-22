import { MessageCircle } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatTimeAgo } from "@/lib/time";

import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-ibutton";
import { useSession } from "@/store/session";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import Fallback from "../fallback";
import LikePostButton from "./like-post-button";
import { Link } from "react-router";
import Loader from "../loader";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function PostItem({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();
  const userId = session?.user.id;

  const { data: post, isPending, error } = usePostByIdData({ postId, type });

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  const isMine = post.author_id === userId;

  return (
    <div
      className={`flex flex-col gap-4 pb-8 ${type === "FEED" && "border-b"}`}
    >
      {/* 1. 유저 정보, 수정/삭제 버튼 */}
      <div className="flex justify-between">
        {/* 1-1. 유저 정보 */}
        <div className="flex items-start gap-4">
          <Link to={`/profile/${post.author_id}`}>
            <img
              src={post.author.avatar_url || defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full"
            />
          </Link>

          <div>
            <Link to={`/profile/${post.author_id}`}>
              <div className="font-bold hover:underline">
                {post.author.nickname}
              </div>
            </Link>

            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        {/* 1-2. 수정/삭제 버튼 */}
        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      {/* 2. 컨텐츠, 이미지 캐러셀 */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/* 2-1. 컨텐츠 */}
        {type === "FEED" ? (
          <Link to={`/post/${post.id}`}>
            <div className="line-clamp-2 break-words whitespace-pre-wrap">
              {post.content}
            </div>
          </Link>
        ) : (
          <div className="break-words whitespace-pre-wrap">{post.content}</div>
        )}

        {/* 2-2. 이미지 캐러셀 */}
        <Carousel>
          <CarouselContent className="-ml-4">
            {post.image_urls?.map((url, index) => (
              <CarouselItem className="basis-auto pl-4" key={index}>
                {/* 각 이미지마다 독립된 확대 모달을 장착*/}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer overflow-hidden rounded-xl transition hover:opacity-95">
                      <img
                        src={url}
                        alt="캐러셀 이미지"
                        className="h-80 w-auto"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex h-auto max-h-[80vh] w-[calc(100%-32px)] max-w-[500px] items-center justify-center border-none bg-transparent p-0 shadow-none outline-none [&>button]:text-white [&>button]:hover:text-gray-200">
                    <img
                      src={url}
                      alt="원본 이미지 확대보기"
                      className="h-full max-h-[80vh] w-full rounded-xl object-cover shadow-2xl"
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. 좋아요, 댓글 버튼 */}
      <div className="flex gap-2">
        {/* 3-1. 좋아요 버튼 */}

        <LikePostButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />

        {/* 3-2. 댓글 버튼 */}
        {type === "FEED" && (
          <Link to={`/post/${post.id}`}>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
              <MessageCircle className="h-4 w-4" />
              {/* [수정] "댓글" 고정 텍스트 -> api/post.ts에서 새로 내려주는 comment_count 표시 (좋아요 버튼과 동일한 스타일) */}
              <span>{post.comment_count}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
