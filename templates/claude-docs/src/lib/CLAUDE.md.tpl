# CLAUDE.md

## Lib Context
이 문서는 `{{LIB_PATH}}/*` 작업 시 적용되는 추가 규칙이다.
루트 [CLAUDE.md]({{ROOT_CLAUDE_LINK}})와 함께 읽는다.

## Read Before Editing
1. [Lib Context Guide]({{CLAUDE_DOCS_README_LINK}})
2. [Architecture And Boundaries]({{BOUNDARIES_LINK}})

## Local Rules
- 이 폴더는 공용 유틸과 서비스 경계만 둔다.
- feature 전용 orchestration 로직은 넣지 않는다.
- 환경변수 의존 로직은 명시적으로 유지한다.
- nullability와 설정 여부를 숨기지 않는다.
