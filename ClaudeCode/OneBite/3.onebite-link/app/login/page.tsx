import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-8 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">
          한입 링크
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="비밀번호를 입력하세요"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-50"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
