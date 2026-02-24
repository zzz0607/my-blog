#!/usr/bin/env node

const { execSync } = require('child_process');

function run(command) {
  console.log(`$ ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ 命令执行失败: ${command}`);
    return false;
  }
}

function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    return output.trim().split('\n').filter(line => line.length > 0);
  } catch {
    return [];
  }
}

function main() {
  const args = process.argv.slice(2);
  const commitMessage = args[0] || `Update: ${new Date().toLocaleString('zh-CN')}`;

  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    console.log('✅ 没有需要发布的更改');
    return;
  }

  console.log(`\n📦 检测到 ${changedFiles.length} 个更改\n`);

  if (!run('git add -A')) return;
  if (!run(`git commit -m "${commitMessage}"`)) return;
  if (!run('git push')) return;

  console.log('\n✅ 已发布到远程仓库，Vercel 将自动部署\n');
}

main();
