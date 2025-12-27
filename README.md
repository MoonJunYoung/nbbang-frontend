# Nbbang Frontend - 로그인 시스템 구조

## 로그인 시스템 개요

Nbbang은 4가지 로그인 방식을 지원합니다:

1. **게스트 로그인** - 토큰 없이 바로 사용
2. **일반 로그인** - 아이디/비밀번호
3. **회원가입** - 아이디/비밀번호/이름
4. **소셜 로그인** - 카카오, 네이버, 구글

---

## 파일 구조

```
src/
├── pages/
│   └── SigndPage/
│       └── index.jsx (로그인 선택 페이지)
│
├── components/
│   ├── Auth/
│   │   ├── SignIn.jsx (로그인 페이지)
│   │   ├── SignUp.jsx (회원가입 페이지)
│   │   ├── AuthComponent.jsx (공통 인증 컴포넌트)
│   │   ├── AuthComponent.styled.js (스타일 컴포넌트)
│   │   └── SigndLogo.jsx (로고 컴포넌트)
│   │
│   └── SocialLogin/
│       ├── SocialPlatformLogin.jsx (소셜 로그인 버튼 컴포넌트)
│       ├── SocialLoginForm.jsx (소셜 로그인 폼)
│       ├── SocialLoginForm.styled.js (스타일)
│       ├── SocialPlatformRedirect.jsx (소셜 리다이렉트 처리)
│       └── SocialRedirectApi.jsx (소셜 로그인 API 호출)
│
└── api/
    └── api.js (인증 API 함수들)
```

---

## 로그인 플로우

### 1. SigndPage (로그인 선택 페이지)

**경로:** `/signd`  
**파일:** `src/pages/SigndPage/index.jsx`

**기능:**

- 게스트 로그인 버튼
- 소셜 로그인 버튼 (카카오, 네이버, 구글)
- 회원가입/로그인 링크

**주요 로직:**

```javascript
// 게스트 로그인
handleGuestLogin() {
  1. postGuestLogin() API 호출
  2. 토큰 받아서 쿠키에 저장 (expires: 36500일)
  3. Amplitude 사용자 ID 설정
  4. 메인 페이지로 리다이렉트
}

// 게스트 로그인 상태 확인
- authToken이 있으면 "메인으로 가기" 버튼 표시
- 없으면 "게스트로 시작하기" 버튼 표시
```

**소셜 로그인 버튼:**

- KakaoLogin: 카카오톡 앱 내에서는 구글 로그인 숨김
- NaverLogin
- GoogleLogin: 카카오톡 앱 내에서는 표시 안 함

---

### 2. SignIn (일반 로그인)

**경로:** `/sign-in`  
**파일:** `src/components/Auth/SignIn.jsx`

**구조:**

```javascript
SignIn 컴포넌트
  └── AuthComponent (공통 인증 컴포넌트)
      - title: "로그인"
      - formData: { identifier, password }
      - AuthApiRequest: postSignInData
```

**API 호출:**

- `POST /user/sign-in`
- 요청: `{ identifier, password }`
- 응답: JWT 토큰 (문자열)

**성공 시:**

1. 토큰을 쿠키에 저장 (`authToken`, expires: 30일)
2. Amplitude 사용자 ID 설정
3. 메인 페이지(`/`)로 리다이렉트

---

### 3. SignUp (회원가입)

**경로:** `/sign-up`  
**파일:** `src/components/Auth/SignUp.jsx`

**구조:**

```javascript
SignUp 컴포넌트
  └── AuthComponent (공통 인증 컴포넌트)
      - title: "회원가입"
      - formData: { identifier, password, name }
      - additionalFields: [{ type: 'text', name: 'name', placeholder: ' 이름을 입력해주세요' }]
      - AuthApiRequest: postSignUpData
```

**API 호출:**

- `POST /user/sign-up`
- 요청: `{ identifier, password, name }`
- 응답: JWT 토큰 (문자열)

**유효성 검사:**

- 아이디: 소문자 + 숫자 포함, 최소 5자 이상
- 비밀번호: 소문자 + 숫자 + 특수문자 포함, 최소 8자 이상
- 이용약관 동의 필수

---

### 4. AuthComponent (공통 인증 컴포넌트)

**파일:** `src/components/Auth/AuthComponent.jsx`

**Props:**

- `title`: "로그인" 또는 "회원가입"
- `formData`: 폼 데이터 객체
- `setFormData`: 폼 데이터 업데이트 함수
- `AuthApiRequest`: API 호출 함수
- `additionalFields`: 추가 입력 필드 배열

**주요 기능:**

**1. 입력 유효성 검사:**

```javascript
// 아이디 검증
identifierRegex = /^(?=.*[a-z])(?=.*\d).{5,}$/
- 소문자 포함 필수
- 숫자 포함 필수
- 최소 5자 이상

// 비밀번호 검증
passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
- 소문자 포함 필수
- 숫자 포함 필수
- 특수문자 포함 필수
- 최소 8자 이상
```

**2. 폼 제출 처리:**

```javascript
handleSubmit() {
  1. API 호출 (AuthApiRequest)
  2. 성공 시:
     - 토큰을 쿠키에 저장 (expires: 30일)
     - sameSite: 'Strict'
     - secure: HTTPS일 때만
  3. Amplitude 사용자 ID 설정
  4. 메인 페이지로 리다이렉트
  5. 실패 시: 토스트 알림 표시
}
```

**3. 버튼 활성화 조건:**

- 로그인: 아이디 유효 && 비밀번호 유효
- 회원가입: 아이디 유효 && 비밀번호 유효 && 이용약관 동의

**4. 애니메이션:**

- Framer Motion 사용
- 컨테이너: fade in/out, y축 이동
- 아이템: x축 이동, stagger 효과

---

### 5. 소셜 로그인

#### 5-1. SocialPlatformLogin (소셜 로그인 버튼)

**파일:** `src/components/SocialLogin/SocialPlatformLogin.jsx`

**컴포넌트:**

- `KakaoLogin`: 카카오 로그인 버튼
- `NaverLogin`: 네이버 로그인 버튼
- `GoogleLogin`: 구글 로그인 버튼

**카카오 로그인:**

```javascript
socialLoginUrl: 'https://kauth.kakao.com/oauth/authorize?client_id=3d14355e2c9679326b4c15d249b82bc5&redirect_uri=https://nbbang.shop/kakao-redirect&response_type=code'
- 배경색: #FEE500 (노란색)
- 텍스트: 검정색
```

**네이버 로그인:**

```javascript
socialLoginUrl: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QND4X2NgUTIuoNUvS2uz&redirect_uri=https://nbbang.shop/naver-redirect';
```

**구글 로그인:**

```javascript
socialLoginUrl: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=...&client_id=...&redirect_uri=https://nbbang.shop/google-redirect'
- 배경색: 흰색
- 텍스트: 검정색
```

#### 5-2. SocialLoginForm (소셜 로그인 폼)

**파일:** `src/components/SocialLogin/SocialLoginForm.jsx`

**기능:**

- 소셜 로그인 버튼 렌더링
- 클릭 시 `socialLoginUrl`로 리다이렉트
- Amplitude 이벤트 전송

#### 5-3. SocialPlatformRedirect (소셜 리다이렉트 처리)

**파일:** `src/components/SocialLogin/SocialPlatformRedirect.jsx`

**라우트:**

- `/kakao-redirect` → `KakaoRedirect`
- `/naver-redirect` → `NaverRedirect`
- `/google-redirect` → `GooglesRedirect`

**처리 방식:**

**카카오/네이버:**

```javascript
- URL 파라미터에서 code 추출
- API URL: https://api.nbbang.shop/user/{kakao|naver}-login
- POST 요청: { token: code }
```

**구글:**

```javascript
- URL 해시에서 access_token 추출
- API URL: https://api.nbbang.shop/user/google-login
- POST 요청: { token: access_token }
```

#### 5-4. SocialRedirectApi (소셜 로그인 API 호출)

**파일:** `src/components/SocialLogin/SocialRedirectApi.jsx`

**주요 로직:**

```javascript
RedirectAPI() {
  1. axios.post(apiUrl, { token: accessToken })
  2. 응답 상태 확인:
     - 201: 로그인 성공
       → 토큰 저장 (쿠키, expires: 30일)
       → Amplitude 사용자 ID 설정
       → 메인 페이지로 리다이렉트
     - 202: 추가 정보 필요 (신규 사용자)
       → AgreementModal 표시 (이름 입력)
     - 기타: 에러 처리
}
```

**AgreementModal:**

- 신규 소셜 로그인 사용자에게 이름 입력 요청
- 이용약관 동의
- 완료 후 로그인 처리

---

## API 함수 (api.js)

### 인증 관련 API

**일반 로그인:**

```javascript
postSignInData(data)
- Method: POST
- URL: /user/sign-in
- Body: { identifier, password }
- Response: JWT 토큰 (문자열)
```

**회원가입:**

```javascript
postSignUpData(data)
- Method: POST
- URL: /user/sign-up
- Body: { identifier, password, name }
- Response: JWT 토큰 (문자열)
```

**게스트 로그인:**

```javascript
postGuestLogin()
- Method: POST
- URL: /user/guest
- Headers: 없음 (인증 불필요)
- Response: JWT 토큰 (문자열)
- 토큰 저장: expires: 36500일 (약 100년)
```

**소셜 로그인:**

```javascript
POST /user/kakao-login
POST /user/naver-login
POST /user/google-login
- Body: { token: accessToken 또는 code }
- Response:
  - 201: JWT 토큰 (문자열)
  - 202: { userData } (추가 정보 필요)
```

### 토큰 관리

**토큰 가져오기:**

```javascript
Token(); // Cookies.get('authToken')
```

**Axios 인스턴스:**

```javascript
axiosData() {
  baseURL: 'https://api.nbbang.shop'
  headers: {
    Authorization: `Bearer ${Token()}`
  }
}
```

**게스트용 Axios (인증 없음):**

```javascript
axiosWithoutAuth() {
  baseURL: 'https://api.nbbang.shop'
  // headers 없음
}
```

---

## 토큰 저장 방식

**쿠키 설정:**

```javascript
Cookies.set('authToken', token, {
    expires: 30, // 일반 로그인: 30일, 게스트: 36500일
    path: '/',
    sameSite: 'Strict',
    secure: window.location.protocol === 'https:',
});
```

**토큰 확인:**

```javascript
const authToken = Token(); // Cookies.get('authToken')
const isLoggedIn = !!authToken;
```

---

## 라우팅 (App.jsx)

**로그인 관련 라우트:**

```javascript
<Route path="/signd" element={<SigndPage />} />
<Route path="/sign-in" element={<SignIn />} />
<Route path="/sign-up" element={<SignUp />} />
<Route path="/kakao-redirect" element={<KakaoRedirect />} />
<Route path="/naver-redirect" element={<NaverRedirect />} />
<Route path="/google-redirect" element={<GooglesRedirect />} />
<Route path="/user-protocol" element={<UserProtocolPage />} />
```

---

## 인증 상태 관리

**MainPage에서 토큰 확인:**

```javascript
useEffect(() => {
    if (!authToken) {
        navigate('/signd');
    }
}, [authToken]);
```

**API 요청 실패 시 (401):**

```javascript
if (error.response.status === 401) {
    Cookies.remove('authToken', { path: '/' });
    navigate('/signd');
}
```

---

## 유효성 검사 규칙

**아이디 (identifier):**

- 정규식: `/^(?=.*[a-z])(?=.*\d).{5,}$/`
- 소문자 포함 필수
- 숫자 포함 필수
- 최소 5자 이상

**비밀번호 (password):**

- 정규식: `/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/`
- 소문자 포함 필수
- 숫자 포함 필수
- 특수문자 포함 필수 (`!@#$%^&*`)
- 최소 8자 이상

---

## Amplitude 이벤트

**로그인 관련 이벤트:**

- `view sign in`: 로그인 페이지 조회
- `view sign up`: 회원가입 페이지 조회
- `click 3rd party sign in`: 소셜 로그인 버튼 클릭
- `complete auth`: 일반 로그인/회원가입 완료
- `complete guest login`: 게스트 로그인 완료
- `complete 3rd party sign in`: 소셜 로그인 완료

---

## 주요 컴포넌트 상세

### AuthComponent 주요 상태

```javascript
- notAllow: 버튼 비활성화 여부
- isIdentifierValid: 아이디 유효성
- isPasswordValid: 비밀번호 유효성
- SginAgreement: 이용약관 동의 (회원가입만)
- toastPopUp: 에러 토스트 표시
- isLoading: 로딩 상태
```

### AuthComponent 주요 함수

```javascript
handleInputChange(e)
- 입력값 업데이트
- 실시간 유효성 검사
- 유효성 상태 업데이트

handleSubmit(e)
- 폼 제출
- API 호출
- 토큰 저장
- 리다이렉트

handleReset(name)
- 입력 필드 초기화
- 유효성 상태 초기화
```

---

## 스타일링

**AuthComponent.styled.js:**

- SigndContainer, SigndBox, Form
- Input, InputBox, SignInButton
- Valid (유효성 검사 메시지)
- AgreementContainer, AgreementChenckBox
- NavBar, NavComent, NavIcon
- AuthenticationTitleContainer, AuthenticationTitle, AuthenticationSubtitle
- ResetButton, LinkStyle, AuthRequestContainer

**SocialLoginForm.styled.js:**

- SocialLoginContainer
- Button
- SocialLoginIcon

---

## 보안 고려사항

1. **토큰 저장:**

    - 쿠키에 저장 (httpOnly는 사용 안 함, 클라이언트에서 접근 필요)
    - sameSite: 'Strict' (CSRF 방지)
    - secure: HTTPS에서만 전송

2. **입력 검증:**

    - 클라이언트 사이드 유효성 검사
    - 서버 사이드 검증도 필요 (백엔드에서 처리)

3. **에러 처리:**
    - 구체적인 에러 메시지 노출 최소화
    - 일반적인 메시지: "아이디와 비밀번호를 확인해 주세요."

---

## 파일 위치 요약

- **로그인 선택 페이지:** `src/pages/SigndPage/index.jsx`
- **로그인 페이지:** `src/components/Auth/SignIn.jsx`
- **회원가입 페이지:** `src/components/Auth/SignUp.jsx`
- **공통 인증 컴포넌트:** `src/components/Auth/AuthComponent.jsx`
- **소셜 로그인 버튼:** `src/components/SocialLogin/SocialPlatformLogin.jsx`
- **소셜 리다이렉트:** `src/components/SocialLogin/SocialPlatformRedirect.jsx`
- **소셜 API 호출:** `src/components/SocialLogin/SocialRedirectApi.jsx`
- **API 함수:** `src/api/api.js`
