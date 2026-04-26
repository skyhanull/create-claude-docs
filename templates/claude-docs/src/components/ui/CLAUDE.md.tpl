# CLAUDE.md

## UI Context
이 문서는 `{{UI_PRIMITIVES_PATH}}/*` 작업 시 적용되는 추가 규칙이다.
루트 [CLAUDE.md]({{ROOT_CLAUDE_LINK}})와 함께 읽는다.

## Read Before Editing
1. [Development Conventions]({{CONVENTIONS_LINK}})
2. [Architecture And Boundaries]({{BOUNDARIES_LINK}})

## Local Rules
- 이 폴더는 공용 프리미티브용이다.
- 재사용 가능한 variant만 추가한다.
- 단일 화면 전용 요구사항 때문에 공용 컴포넌트를 과적재하지 않는다.
- 접근성 관련 focus, disabled, interaction 동작을 깨뜨리지 않는다.
