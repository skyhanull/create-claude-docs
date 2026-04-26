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

## Git Setup Notes
첫 커밋 author가 로컬 자동 설정값으로 들어갔다면 아래 명령으로 작성자를 다시 설정할 수 있습니다.

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
git commit --amend --reset-author
```

이미 원격에 push한 뒤라면, amend 후에는 force push가 필요합니다.

```bash
git push --force-with-lease
```

## Recommended Next Steps

### 1. npm 공개 배포
배포 전 체크:
- `package.json`의 `name`, `version`, `description` 확인
- `npm login` 상태 확인
- `npm pack --dry-run`으로 포함 파일 확인

배포:

```bash
npm login
npm pack --dry-run
npm publish
```

배포 후 사용:

```bash
npm create claude-docs@latest
```

### 2. README 예시 보강
첫 배포 전에 아래 예시를 추가하면 좋습니다.
- Next.js + Tailwind 레포 대상 실행 예시
- 기존 React 레포 대상 실행 예시
- `--with-design-system` 사용 전후 생성 파일 비교
- 생성 후 사람이 꼭 채워야 하는 문서 항목

### 3. 첫 릴리즈 태그 생성
첫 배포 버전과 Git 태그를 맞춰두는 걸 권장합니다.

```bash
git tag v0.1.0
git push origin v0.1.0
```

버전을 올릴 때는 아래 순서를 추천합니다.

```bash
npm version patch
git push origin main --tags
npm publish
```
