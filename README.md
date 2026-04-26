# create-claude-docs

프로젝트 전반의 Claude 문서 세트를 스캐폴드하는 CLI입니다.

생성 대상:
- 루트 `CLAUDE.md`
- `docs/claude/*`
- 경로가 존재할 경우 `src/app/CLAUDE.md`, `src/components/ui/CLAUDE.md`, `src/lib/CLAUDE.md`
- 선택적으로 `docs/design-system/*`

배포 후에는 아래처럼 바로 사용할 수 있습니다.

```bash
npm create claude-docs@latest
```

## 로컬 실행
```bash
node ./bin/create-claude-docs.mjs
```

다른 레포를 대상으로 실행:

```bash
node /absolute/path/to/create-claude-docs/bin/create-claude-docs.mjs --target /absolute/path/to/other-repo
```

프롬프트 없이 실행:

```bash
node /absolute/path/to/create-claude-docs/bin/create-claude-docs.mjs --target /absolute/path/to/other-repo --yes
```

디자인 시스템 문서까지 함께 생성:

```bash
node /absolute/path/to/create-claude-docs/bin/create-claude-docs.mjs --target /absolute/path/to/other-repo --with-design-system
```

기존 파일 덮어쓰기:

```bash
node /absolute/path/to/create-claude-docs/bin/create-claude-docs.mjs --target /absolute/path/to/other-repo --force
```

## Publish Checklist
```bash
npm login
npm publish
```

패키지 이름이 `create-claude-docs`이므로, publish 후 사용 명령은 `npm create claude-docs@latest`입니다.
