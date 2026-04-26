# CLAUDE.md

## App Context
이 문서는 `{{APP_PATH}}/*` 작업 시 적용되는 추가 규칙이다.
루트 [CLAUDE.md]({{ROOT_CLAUDE_LINK}})와 함께 읽는다.

## Read Before Editing
1. [App Context Guide]({{CLAUDE_DOCS_README_LINK}})
2. [Architecture And Boundaries]({{BOUNDARIES_LINK}})

## Local Rules
- app layer는 진입과 조합에 집중한다.
- 페이지 파일에 무거운 기능 로직을 쌓지 않는다.
- feature로 내릴 수 있는 UI/상태는 feature layer로 분리한다.
