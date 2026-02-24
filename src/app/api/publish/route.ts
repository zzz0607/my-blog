import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface PublishBody {
  type: 'post' | 'micropost';
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .slice(0, 50);
}

function createFileContent(body: PublishBody): { path: string; content: string } {
  const date = new Date().toISOString();
  const slug = generateSlug(body.title || body.content.slice(0, 30));

  if (body.type === 'post') {
    const filePath = `content/posts/${slug}.md`;
    const content = `---
title: ${body.title}
slug: ${slug}
excerpt: ${body.content.slice(0, 100)}...
coverImage: 
category: ${body.category || '未分类'}
tags:
${(body.tags || []).map(t => `  - ${t}`).join('\n')}
createdAt: ${date.split('T')[0]}
---

${body.content}
`;
    return { path: filePath, content };
  } else {
    const filePath = `content/microposts/${slug}.md`;
    const content = `---
content: ${body.content}
createdAt: ${date}
likes: 0
---
`;
    return { path: filePath, content };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PublishBody = await request.json();

    if (!body.content?.trim()) {
      return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
    }

    if (body.type !== 'post' && body.type !== 'micropost') {
      return NextResponse.json({ error: '类型错误' }, { status: 400 });
    }

    const { path: filePath, content } = createFileContent(body);

    // 生产环境必须使用 GitHub API
    const isDev = process.env.NODE_ENV === 'development';
    const hasGitHubConfig = process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_OWNER && process.env.GITHUB_REPO_NAME;
    
    // 本地开发模式且没有配置 GitHub 时，写入本地文件
    if (isDev && !hasGitHubConfig) {
      const rootDir = path.join(__dirname, '../../..');
      const fullDir = path.join(rootDir, filePath.replace(/[^/]+$/, ''));
      const fullPath = path.join(rootDir, filePath);
      
      if (!fs.existsSync(fullDir)) {
        fs.mkdirSync(fullDir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, content);
      
      return NextResponse.json({ 
        success: true, 
        message: '本地保存成功',
        filePath,
        note: '开发模式下文件已保存到本地，请重启开发服务器查看'
      });
    }

    // 生产模式：使用 GitHub API
    if (!hasGitHubConfig) {
      return NextResponse.json({ 
        error: 'GitHub 未配置，请设置环境变量 GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME' 
      }, { status: 500 });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
    const REPO_NAME = process.env.GITHUB_REPO_NAME;

    const githubResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `feat: 添加新的${body.type === 'post' ? '文章' : '短动态'}`,
          content: Buffer.from(content).toString('base64'),
        }),
      }
    );

    if (!githubResponse.ok) {
      const error = await githubResponse.json();
      return NextResponse.json({ error: error.message || 'GitHub API 错误' }, { status: githubResponse.status });
    }

    const githubData = await githubResponse.json();

    return NextResponse.json({ 
      success: true, 
      message: '发布成功',
      filePath,
      commitUrl: githubData.commit.html_url,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
