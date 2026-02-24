#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const MICROPESTS_DIR = path.join(__dirname, '../content/microposts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createPost() {
  console.log('\n📝 创建新文章\n');
  
  const title = await askQuestion('标题: ');
  const excerpt = await askQuestion('摘要: ');
  const category = await askQuestion('分类: ');
  const tags = await askQuestion('标签 (逗号分隔): ');
  
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const date = new Date().toISOString().split('T')[0];
  
  const content = `# ${title}

${excerpt}

---

在这里编写你的文章内容...

## 开始写作

写下你想分享的内容...
`;

  const frontmatter = `---
title: ${title}
slug: ${slug}
excerpt: ${excerpt}
coverImage: 
category: ${category || '未分类'}
tags:
${tags.split(',').map(t => `  - ${t.trim()}`).join('\n')}
createdAt: ${date}
---

${content}
`;

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`\n✅ 文章已创建: content/posts/${slug}.md\n`);
  rl.close();
}

async function createMicroPost() {
  console.log('\n📝 创建新短动态\n');
  
  const content = await askQuestion('内容: ');
  
  const id = content.slice(0, 20).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const date = new Date().toISOString();
  
  const frontmatter = `---
content: ${content}
createdAt: ${date}
likes: 0
---
`;

  if (!fs.existsSync(MICROPESTS_DIR)) {
    fs.mkdirSync(MICROPESTS_DIR, { recursive: true });
  }

  const filePath = path.join(MICROPESTS_DIR, `${id}.md`);
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`\n✅ 短动态已创建: content/microposts/${id}.md\n`);
  rl.close();
}

const args = process.argv.slice(2);
const type = args[0];

if (type === 'post') {
  createPost();
} else if (type === 'micropost') {
  createMicroPost();
} else {
  console.log(`
用法:
  node scripts/create-content.js post       # 创建文章
  node scripts/create-content.js micropost   # 创建短动态
`);
  rl.close();
}
