"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/contexts/ToastContext";

function getResetPasswordErrorMessage(error: unknown): string {
  if (!(error instanceof AuthError)) {
    return "비밀번호를 변경하지 못했습니다. 다시 시도해주세요.";
  }

  switch (error.code) {
    case "weak_password":
      return "비밀번호는 6자 이상이어야 합니다.";
    case "same_password":
      return "이전과 다른 비밀번호를 입력해주세요.";
    default:
      return "비밀번호를 변경하지 못했습니다. 다시 시도해주세요.";
  }
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const canSubmit = isReady && password !== "" && passwordConfirm !== "";

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      router.push("/");
    } catch (error) {
      showToast(getResetPasswordErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-8 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">
          한입 링크
        </h1>

        {!isReady ? (
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            링크를 확인하는 중입니다...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                새 비밀번호
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="새 비밀번호를 입력하세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                새 비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                required
                placeholder="새 비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isSubmitting ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
