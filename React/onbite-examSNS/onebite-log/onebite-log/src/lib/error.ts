import { AuthError } from "@supabase/supabase-js";

/**
 * 1. 에러 코드 매핑 테이블 (Dictionary)
 * Supabase 가 반환하는 영문 error.code 문자열을 key로 삼아,
 * 화면에 보여줄 친절한 한국어 메시지를 value로 짝지어 둡니다
 * Record<string, string> 타입을 사용해 안전한 객체 구조를 정의했습니다
 */

const AUTH_ERROR_MESSAGE_MAP: Record<string, string> = {
  email_exists: "이미 사용 중인 이메일입니다.",
  phone_exists: "이미 사용 중인 전화번호입니다.",
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  user_not_found: "해당 유저를 찾을 수 없습니다.",
  session_expired: "세션이 만료되었습니다. 다시 로그인해주세요.",
  email_not_confirmed: "이메일 인증이 필요합니다.",
  phone_not_confirmed: "전화번호 인증이 필요합니다.",
  weak_password: "비밀번호가 너무 약합니다.",
  signup_disabled: "현재 회원가입이 불가능한 상태입니다.",
  user_already_exists: "이미 가입된 사용자입니다.",
  captcha_failed: "보안 인증에 실패했습니다. 다시 시도해주세요.",
  over_email_send_rate_limit:
    "이메일 전송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
  over_sms_send_rate_limit:
    "문자 전송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
  otp_expired: "OTP 코드가 만료되었습니다. 다시 시도해주세요.",
  otp_disabled: "OTP 사용이 비활성화되어 있습니다.",
  email_address_invalid: "유효하지 않은 이메일 주소입니다.",
  same_password: "이전과 동일한 비밀번호는 사용할 수 없습니다.",
  validation_failed: "이메일 주소가 올바르게 입력되지 않았습니다",
};

/**
 * 2. 에러 메시지 생성 유틸리티 함수
 * try-catch 문이나 훅에서 잡힌 알 수 없는 형태의 에러(unknown)를 분석하여
 * 매핑 테이블에 맞춰 알맞은 한국어 문장을 리턴합니다
 */

export function generateErrorMessage(error: unknown) {
  //안전장치 1단계
  // 던져진 에러가 진짜 Supabase 인증 에러가 맞는지 검사하고, code가 존재하는지 확인합니다
  if (error instanceof AuthError && error.code) {
    return (
      // -> 내 번역 Map에서 코드를 찾아보고 있다며 그걸 리턴!
      // -> 만약 Map에 없는 신종 에러코드가 들어오면 fallback 메시지를 리턴! (?? null 병합 연산자 사용)
      AUTH_ERROR_MESSAGE_MAP[error.code] ??
      "알 수 없는 인증 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
    );
  }
  // 안전장치 2단계
  // 네트워크 단절이나 코드 가동 중 터진 일반 자바스크립트 시스템 에러일 때 뱉을 최종 방어선
  return "문제가 발생했습니다. 잠시 후 다시 시도해주세요";
}
