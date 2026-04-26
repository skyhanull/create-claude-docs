# CLAUDE.md

## Purpose
이 문서는 `{{PROJECT_LABEL}}` 저장소에서 Claude Code 또는 사람이 작업할 때 따라야 하는 프로젝트 기준 가이드다.
제품 의도, 아키텍처 경계, 작업 규칙의 시작점으로 사용한다.

## Read First
1. [README.md]({{README_LINK}})
2. [docs/claude/README.md]({{CLAUDE_DOCS_README_LINK}})
3. [docs/claude/00-project-overview.md]({{PROJECT_OVERVIEW_LINK}})
4. [docs/claude/04-architecture-and-boundaries.md]({{BOUNDARIES_LINK}})
5. Area-specific `CLAUDE.md` files when present

## Project Summary
- Product: `{{PROJECT_LABEL}}`
- Type: `{{PRODUCT_TYPE}}`
- Stack: `{{PRIMARY_STACK}}`
- Core value: `{{CORE_VALUE}}`
- Core screens: `{{CORE_SCREENS}}`

## Core Rules
- 관련 파일과 현재 패턴을 먼저 읽는다.
- 작은 작업에 대규모 구조 변경을 섞지 않는다.
- route/app layer는 진입과 조합에 집중하고, feature logic은 feature layer에 둔다.
- 공용 UI는 재사용 가능한 프리미티브만 유지한다.
- 공용 lib에는 feature orchestration을 넣지 않는다.
- 구조 변경이 있으면 문서도 같이 갱신한다.

## Design And UX Rules
- 제품의 디자인 톤은 `{{DESIGN_TONE}}`을 기준으로 유지한다.
- 디자인 시스템 문서가 있으면 그 기준을 먼저 따른다.
- 감성을 이유로 조작 가능성이나 가독성을 해치지 않는다.

## Documentation Rules
- 프로젝트 공통 규칙은 `docs/claude/*`에 둔다.
- area-specific rules는 해당 폴더의 `CLAUDE.md`에 둔다.
- 코드와 문서가 어긋나면 같은 작업에서 정리한다.
