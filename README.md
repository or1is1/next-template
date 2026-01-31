# Template

Next.js 기반의 풀스택 웹 애플리케이션 템플릿

## 환경 구성

### 1. 의존성 설치

```bash
pnpm i
```

### 2. 환경 변수 설정

`.env.example`을 `.env`로 복사 후 값 입력

```bash
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://..."    # PostgreSQL 연결 URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_ENVIRONMENT="development"
```

"BETTER_AUTH_?" 의 값은 [better-auth 문서](https://www.better-auth.com/docs/installation#set-environment-variables)를 참고하여 생성할 수 있습니다.

### 3. 데이터베이스 설정

```bash
pnpm db:push    # 스키마 동기화
```

## 로컬 실행

```bash
pnpm dev        # 개발 서버 실행 (http://localhost:3000)
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버 실행
```

## 배포

### Vercel 배포

```bash
pnpm env:prd    # 프로덕션 환경 변수 가져오기
```

환경 변수 설정 후 Vercel에 배포

## 아키텍처

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 라우트 그룹
│   ├── api/               # API 라우트
│   └── post/              # 게시글 페이지
├── feature/               # 도메인 로직
│   └── post/
│       ├── postEntity.ts      # 엔티티 정의
│       ├── postRepository.ts  # 데이터 접근
│       ├── postRoute.ts       # tRPC 라우트
│       └── postStore.ts       # 상태 관리
└── lib/                   # 공통 라이브러리
    ├── auth/              # Better Auth 인증
    ├── db/                # Drizzle ORM
    └── trpc/              # tRPC 설정
```

### 기술 스택

- **프레임워크**: Next.js 16 (App Router, React Compiler)
- **인증**: Better Auth (이메일/비밀번호)
- **데이터베이스**: PostgreSQL + Drizzle ORM
- **API**: tRPC + TanStack Query
- **상태 관리**: Zustand
- **스타일링**: Tailwind CSS 4
- **검증**: Zod
- **타입 안전성**: TypeScript 5

## 주요 의존성

| 패키지                  | 용도                 |
| ----------------------- | -------------------- |
| `next`                  | React 프레임워크     |
| `better-auth`           | 인증 시스템          |
| `drizzle-orm`           | 타입 안전 ORM        |
| `@trpc/server`          | 타입 안전 API        |
| `@tanstack/react-query` | 서버 상태 관리       |
| `zustand`               | 클라이언트 상태 관리 |
| `zod`                   | 스키마 검증          |
| `tailwindcss`           | 유틸리티 CSS         |
| `typescript`            | 정적 타입 검사       |

## 유용한 명령어

```bash
pnpm check      # TypeScript 타입 체크
pnpm lint       # ESLint 검사
pnpm format     # Prettier 포맷팅
pnpm db:gen     # 마이그레이션 파일 생성
pnpm db:pull    # DB 스키마 가져오기
```
