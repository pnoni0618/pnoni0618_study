import { useProfileData } from "@/hooks/queries/use-profiledata";
import Fallback from "../fallback";

import defaultAvatar from "@/assets/default-avatar.png";
import Loader from "../loader";
import { useSession } from "@/store/session";
import EditProfileButton from "./edit-profile-button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetchProfilePending) return <Loader />;

  const isMine = session?.user.id === userId;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Dialog>
        <DialogTrigger asChild>
          <img
            src={profile.avatar_url || defaultAvatar}
            className="h-30 w-30 cursor-pointer rounded-full object-cover transition hover:brightness-90"
          />
        </DialogTrigger>

        <DialogContent className="flex h-auto max-h-[80vh] w-[calc(100%-32px)] max-w-[400px] items-center justify-center border-none bg-transparent p-0 shadow-none outline-none [&>button]:text-white [&>button]:hover:text-gray-200">
          <img
            src={profile.avatar_url || defaultAvatar}
            alt="프로필 사진 원본 크기"
            className="h-auto max-h-[70vh] w-full rounded-2xl bg-black/5 object-cover shadow-2xl"
          />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}
