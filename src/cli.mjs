import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const claudeTemplateRoot = path.join(repoRoot, 'templates', 'claude-docs');
const designTemplateRoot = path.join(repoRoot, 'templates', 'design-system-docs');

function parseArgs(argv) {
  const parsed = {
    target: process.cwd(),
    force: false,
    yes: false,
    withDesignSystem: false,
    values: {}
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--force') {
      parsed.force = true;
      continue;
    }

    if (arg === '--yes') {
      parsed.yes = true;
      continue;
    }

    if (arg === '--with-design-system') {
      parsed.withDesignSystem = true;
      continue;
    }

    if (!arg.startsWith('--')) continue;

    const key = arg.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      parsed.values[key] = 'true';
      continue;
    }

    parsed.values[key] = next;
    index += 1;
  }

  if (parsed.values.target) {
    parsed.target = path.resolve(parsed.values.target);
  }

  return parsed;
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists(filePath) {
  if (!(await pathExists(filePath))) return null;
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function humanizeName(value) {
  return value
    .replace(/^@[^/]+\//, '')
    .replace(/[-_]+/g, ' ')
    .trim();
}

function toTitleCase(value) {
  return humanizeName(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function detectDefaults(targetDir) {
  const packageJson = await readJsonIfExists(path.join(targetDir, 'package.json'));
  const hasSrcDir = await pathExists(path.join(targetDir, 'src'));
  const hasAppDir = await pathExists(path.join(targetDir, 'src', 'app'));
  const hasUiDir = await pathExists(path.join(targetDir, 'src', 'components', 'ui'));
  const hasLibDir = await pathExists(path.join(targetDir, 'src', 'lib'));
  const hasFeaturesDir = await pathExists(path.join(targetDir, 'src', 'features'));
  const hasTailwindTs = await pathExists(path.join(targetDir, 'tailwind.config.ts'));
  const hasTailwindJs = await pathExists(path.join(targetDir, 'tailwind.config.js'));
  const hasGlobals = await pathExists(path.join(targetDir, 'src', 'app', 'globals.css'));
  const features = hasFeaturesDir ? await readdir(path.join(targetDir, 'src', 'features')) : [];

  const projectName = packageJson?.name ? humanizeName(packageJson.name) : path.basename(targetDir);
  const stack = [
    hasAppDir ? 'Next.js App Router' : null,
    packageJson?.dependencies?.react ? 'React' : null,
    packageJson?.dependencies?.vue ? 'Vue' : null,
    packageJson?.dependencies?.svelte ? 'Svelte' : null,
    packageJson?.dependencies?.express ? 'Express' : null,
    packageJson?.dependencies?.typescript || packageJson?.devDependencies?.typescript ? 'TypeScript' : null,
    hasTailwindTs || hasTailwindJs ? 'Tailwind CSS' : null
  ].filter(Boolean).join(', ') || 'Project stack';

  return {
    projectName,
    projectLabel: toTitleCase(projectName),
    productType: 'web application',
    stack,
    coreValue: 'safe, consistent product changes with low surprise',
    coreScreens: features.filter((name) => !name.startsWith('.')).slice(0, 5).join(', ') || 'home, editor, dashboard',
    uiPrimitivesPath: hasUiDir ? 'src/components/ui' : hasSrcDir ? 'src/components' : 'components',
    appPath: hasAppDir ? 'src/app' : 'app',
    libPath: hasLibDir ? 'src/lib' : 'src/lib',
    tokenSource: hasTailwindTs
      ? 'tailwind.config.ts, src/app/globals.css'
      : hasTailwindJs
        ? 'tailwind.config.js, src/app/globals.css'
        : hasGlobals
          ? 'src/app/globals.css'
          : 'design token source files',
    designTone: 'Warm, calm, product-specific',
    hasAppDir,
    hasUiDir,
    hasLibDir
  };
}

async function askQuestions(defaults, argValues, skipPrompts, withDesignSystemFlag) {
  const preset = {
    projectName: argValues['project-name'] ?? defaults.projectName,
    productType: argValues['product-type'] ?? defaults.productType,
    stack: argValues.stack ?? defaults.stack,
    coreValue: argValues['core-value'] ?? defaults.coreValue,
    coreScreens: argValues['core-screens'] ?? defaults.coreScreens,
    appPath: argValues['app-path'] ?? defaults.appPath,
    uiPrimitivesPath: argValues['ui-path'] ?? defaults.uiPrimitivesPath,
    libPath: argValues['lib-path'] ?? defaults.libPath,
    tokenSource: argValues['token-source'] ?? defaults.tokenSource,
    designTone: argValues.tone ?? defaults.designTone,
    withDesignSystem: withDesignSystemFlag || argValues['with-design-system'] === 'true'
  };

  if (skipPrompts) {
    return {
      ...preset,
      projectLabel: toTitleCase(preset.projectName)
    };
  }

  const rl = createInterface({ input, output });
  try {
    const projectName = (await rl.question(`Project name [${preset.projectName}]: `)).trim() || preset.projectName;
    const productType = (await rl.question(`Product type [${preset.productType}]: `)).trim() || preset.productType;
    const stack = (await rl.question(`Primary stack [${preset.stack}]: `)).trim() || preset.stack;
    const coreValue = (await rl.question(`Core value [${preset.coreValue}]: `)).trim() || preset.coreValue;
    const coreScreens = (await rl.question(`Core screens (comma-separated) [${preset.coreScreens}]: `)).trim() || preset.coreScreens;
    const appPath = (await rl.question(`App path [${preset.appPath}]: `)).trim() || preset.appPath;
    const uiPrimitivesPath = (await rl.question(`UI primitives path [${preset.uiPrimitivesPath}]: `)).trim() || preset.uiPrimitivesPath;
    const libPath = (await rl.question(`Lib path [${preset.libPath}]: `)).trim() || preset.libPath;
    const tokenSource = (await rl.question(`Token source [${preset.tokenSource}]: `)).trim() || preset.tokenSource;
    const designTone = (await rl.question(`Design tone [${preset.designTone}]: `)).trim() || preset.designTone;
    const withDesignSystemAnswer = (await rl.question(`Include docs/design-system? (${preset.withDesignSystem ? 'Y/n' : 'y/N'}): `)).trim().toLowerCase();
    const withDesignSystem = withDesignSystemAnswer
      ? ['y', 'yes'].includes(withDesignSystemAnswer)
      : preset.withDesignSystem;

    return {
      projectName,
      projectLabel: toTitleCase(projectName),
      productType,
      stack,
      coreValue,
      coreScreens,
      appPath,
      uiPrimitivesPath,
      libPath,
      tokenSource,
      designTone,
      withDesignSystem
    };
  } finally {
    rl.close();
  }
}

async function collectTemplateFiles(dir, relativeBase = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeBase, entry.name);
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTemplateFiles(absolutePath, relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

function renderTemplate(content, variables) {
  return content.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_match, key) => variables[key] ?? '');
}

function buildVariables(targetDir, answers) {
  const abs = (filePath) => path.join(targetDir, filePath).split(path.sep).join('/');
  return {
    PROJECT_NAME: answers.projectName,
    PROJECT_LABEL: answers.projectLabel,
    PRODUCT_TYPE: answers.productType,
    PRIMARY_STACK: answers.stack,
    CORE_VALUE: answers.coreValue,
    CORE_SCREENS: answers.coreScreens,
    APP_PATH: answers.appPath,
    UI_PRIMITIVES_PATH: answers.uiPrimitivesPath,
    LIB_PATH: answers.libPath,
    TOKEN_SOURCE: answers.tokenSource,
    DESIGN_TONE: answers.designTone,
    README_LINK: abs('README.md'),
    ROOT_CLAUDE_LINK: abs('CLAUDE.md'),
    ARCHITECTURE_LINK: abs('docs/ARCHITECTURE.md'),
    CLAUDE_DOCS_README_LINK: abs('docs/claude/README.md'),
    PROJECT_OVERVIEW_LINK: abs('docs/claude/00-project-overview.md'),
    STACK_COMMANDS_LINK: abs('docs/claude/01-stack-and-commands.md'),
    CONVENTIONS_LINK: abs('docs/claude/02-development-conventions.md'),
    WORKFLOW_LINK: abs('docs/claude/03-workflow-and-quality-gates.md'),
    BOUNDARIES_LINK: abs('docs/claude/04-architecture-and-boundaries.md'),
    APP_CONTEXT_LINK: abs(path.join(answers.appPath, 'CLAUDE.md')),
    UI_CONTEXT_LINK: abs(path.join(answers.uiPrimitivesPath, 'CLAUDE.md')),
    LIB_CONTEXT_LINK: abs(path.join(answers.libPath, 'CLAUDE.md')),
    DESIGN_SYSTEM_README_LINK: abs('docs/design-system/README.md')
  };
}

function shouldIncludeClaudeTemplate(relativeFile, defaults) {
  if (relativeFile === path.join('src', 'app', 'CLAUDE.md.tpl')) return defaults.hasAppDir;
  if (relativeFile === path.join('src', 'components', 'ui', 'CLAUDE.md.tpl')) return defaults.hasUiDir;
  if (relativeFile === path.join('src', 'lib', 'CLAUDE.md.tpl')) return defaults.hasLibDir;
  return true;
}

async function generateFromTemplateRoot(templateRoot, targetDir, variables, force, shouldInclude) {
  const templateFiles = await collectTemplateFiles(templateRoot);
  const created = [];
  const skipped = [];

  for (const relativeFile of templateFiles) {
    if (shouldInclude && !shouldInclude(relativeFile)) continue;

    const sourcePath = path.join(templateRoot, relativeFile);
    const targetRelative = relativeFile.endsWith('.tpl') ? relativeFile.slice(0, -4) : relativeFile;
    const targetPath = path.join(targetDir, targetRelative);

    if (!force && (await pathExists(targetPath))) {
      skipped.push(targetRelative);
      continue;
    }

    const template = await readFile(sourcePath, 'utf8');
    const rendered = renderTemplate(template, variables);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, rendered, 'utf8');
    created.push(targetRelative);
  }

  return { created, skipped };
}

function printSummary(targetDir, answers, claudeResult, designResult) {
  console.log('');
  console.log(`Scaffolded Claude docs for "${answers.projectName}"`);
  console.log(`Target: ${targetDir}`);
  console.log('');

  if (claudeResult.created.length > 0) {
    console.log('Created Claude docs:');
    for (const file of claudeResult.created) console.log(`- ${file}`);
    console.log('');
  }

  if (designResult?.created?.length) {
    console.log('Created design-system docs:');
    for (const file of designResult.created) console.log(`- ${file}`);
    console.log('');
  }

  const skipped = [...claudeResult.skipped, ...(designResult?.skipped ?? [])];
  if (skipped.length > 0) {
    console.log('Skipped existing files:');
    for (const file of skipped) console.log(`- ${file}`);
    console.log('');
  }

  console.log('Next steps:');
  console.log('- Review the generated CLAUDE.md and docs/claude/* files.');
  console.log('- Replace template text with real product, architecture, and workflow rules.');
  console.log('- Re-run with --with-design-system if you also want design docs.');
  console.log('- Re-run with --force to overwrite existing scaffold files.');
}

export async function run(argv) {
  const parsed = parseArgs(argv);
  const targetDir = parsed.target;
  await mkdir(targetDir, { recursive: true });

  const defaults = await detectDefaults(targetDir);
  const answers = await askQuestions(defaults, parsed.values, parsed.yes, parsed.withDesignSystem);
  const variables = buildVariables(targetDir, answers);

  const claudeResult = await generateFromTemplateRoot(
    claudeTemplateRoot,
    targetDir,
    variables,
    parsed.force,
    (relativeFile) => shouldIncludeClaudeTemplate(relativeFile, defaults)
  );

  const designResult = answers.withDesignSystem
    ? await generateFromTemplateRoot(designTemplateRoot, targetDir, variables, parsed.force)
    : { created: [], skipped: [] };

  printSummary(targetDir, answers, claudeResult, designResult);
}
