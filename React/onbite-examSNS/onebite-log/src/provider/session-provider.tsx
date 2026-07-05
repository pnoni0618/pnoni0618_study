import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/use-profiledata";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  // Zustand 전역 창고에서 필요한 도구를 꺼냅니다
  const session = useSession();
  const setSession = useSetSession(); // 창고의 session 데이터를 최신화하는 함수 리모컨
  const isSessionLoaded = useIsSessionLoaded(); // 로컬스토리지에서 세션을 다 읽어왔는지 감시하는 센서

  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    /**
     * Supabase 실시간 인증 상태 감시 센서 가동
     * 사용자가 새로고침을 하거나, 로그인/로그아웃을 할 때마다
     * 수파베이스 서버가 이 콜백 함수를 원격으로 실시간 호출해 줍니다
     */
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  /**
   * 리액트가 화면을 그리는 속도가 Supabase가 로컬스토리지 서랍장을 열어보는 속도보다 빠릅ㄴ디ㅏ
   * 아직 세션 데이터를 다 불러오지 못했다면,
   * 인증된 유저를 로그인 안 된 유저로 오해해서 로그인창으로 튕겨버리는 버그를 막기 위해
   * 잠시 로딩중 화면을 보여주며 시간을 벌 수 있습니다
   */

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  // 세션 로딩이 완벽히 끝나면, 그제야 진짜 우리의 앱인 메인 화면(라우터) 문을 활짝 열어줍니다
  return children;
}
