import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";
import { Button } from "../ui/button";

export default function EditProfileButton() {
  const openProfileModal = useOpenProfileEditorModal();
  return (
    <Button
      onClick={openProfileModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      프로필 수정
    </Button>
  );
}
