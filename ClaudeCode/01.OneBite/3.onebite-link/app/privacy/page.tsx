import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          개인정보 처리방침
        </h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          시행일: 2026년 7월 28일
        </p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              1. 수집하는 개인정보 항목
            </h2>
            <p>
              한입 링크(이하 &apos;서비스&apos;)는 회원가입 및 서비스 제공을
              위해 이메일 주소와 비밀번호를 수집합니다. 카카오 소셜 로그인을
              이용하는 경우 카카오 계정에서 제공하는 이메일 및 식별 정보를
              수집합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              2. 개인정보의 수집 및 이용 목적
            </h2>
            <p>
              수집한 개인정보는 회원 식별, 로그인 및 인증, 저장한 링크와
              폴더 등 서비스 이용 기록 관리를 위해서만 이용됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <p>
              회원 탈퇴 시 또는 수집 목적 달성 시 지체 없이 개인정보를
              파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당
              기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              4. 개인정보의 제3자 제공
            </h2>
            <p>
              서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만
              카카오 소셜 로그인을 이용하는 경우 인증 절차를 위해 카카오에
              필요한 정보가 전달될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              5. 이용자의 권리
            </h2>
            <p>
              이용자는 언제든지 자신의 개인정보를 열람, 정정, 삭제할 것을
              요청할 수 있으며, 회원 탈퇴를 통해 개인정보 이용에 대한 동의를
              철회할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              6. 문의처
            </h2>
            <p>
              개인정보 처리에 관한 문의사항은 서비스 내 문의 채널을 통해
              연락해 주시기 바랍니다.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-sm font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-50"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
