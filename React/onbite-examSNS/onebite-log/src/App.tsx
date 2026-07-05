import RootRoute from "./root-route";
import SessionProvider from "./provider/session-provider";
import ModalProvider from "./provider/modal-provider";

export default function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}

// 깃 커밋을 확인하기위한 주석
// 이거는 개발한다음 디벨롭 머지전에 허락받아해요