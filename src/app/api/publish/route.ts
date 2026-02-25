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

    // 获取环境变量
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
    const REPO_NAME = process.env.GITHUB_REPO_NAME;
    const isDev = process.env.NODE_ENV === 'development';

    // 生产模式：必须使用 GitHub API
    console.log('[Publish] 开始发布:', { type: body.type, title: body.title || body.content.slice(0, 30) });
    console.log('[Publish] 环境变量检查:', {
      hasToken: !!GITHUB_TOKEN,
      hasOwner: !!REPO_OWNER,
      hasRepo: !!REPO_NAME,
      nodeEnv: process.env.NODE_ENV,
      tokenPrefix: GITHUB_TOKEN ? GITHUB_TOKEN.slice(0, 10) : 'none',
      repoOwner: REPO_OWNER || 'none',
      repoName: REPO_NAME || 'none'
    });

    // 本地开发模式：写入本地文件
    if (isDev) {
      const rootDir = path.join(__dirname, '../../..');
      const fullDir = path.join(rootDir, filePath.replace(/[^/]+$/, ''));
      const fullPath = path.join(rootDir, filePath);
      
      if (!fs.existsSync(fullDir)) {
        fs.mkdirSync(fullDir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, content);
      console.log('[Publish] 本地保存成功:', filePath);
      
      return NextResponse.json({ 
        success: true, 
        message: '本地保存成功',
        filePath
      });
    }

    // 生产模式：必须使用 GitHub API
    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
      console.error('[Publish] GitHub 环境变量未配置');
      return NextResponse.json({ 
        error: 'GitHub 未配置，请设置环境变量',
        debug: {
          hasToken: !!GITHUB_TOKEN,
          hasOwner: !!REPO_OWNER,
          hasRepo: !!REPO_NAME,
          nodeEnv: process.env.NODE_ENV
        }
      }, { status: 500 });
    }

    // 检查文件是否已存在，获取 SHA
    let sha: string | undefined;
    const checkResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      sha = checkData.sha;
      console.log('[Publish] 文件已存在，获取 SHA:', sha);
    } else if (checkResponse.status !== 404) {
      const error = await checkResponse.json();
      console.error('[Publish] 检查文件失败:', error);
      return NextResponse.json({ error: error.message || '检查文件失败' }, { status: checkResponse.status });
    }

    const putBody: Record<string, unknown> = {
      message: `feat: 添加新的${body.type === 'post' ? '文章' : '短动态'}`,
      content: Buffer.from(content).toString('base64'),
    };

    if (sha) {
      putBody.sha = sha;
      console.log('[Publish] 更新已存在的文件');
    } else {
      console.log('[Publish] 创建新文件');
    }

    const githubResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(putBody),
      }
    );

    if (!githubResponse.ok) {
      const error = await githubResponse.json();
      console.error('[Publish] GitHub API 错误:', error);
      return NextResponse.json({ error: error.message || 'GitHub API 错误' }, { status: githubResponse.status });
    }

    const githubData = await githubResponse.json();
    console.log('[Publish] 发布成功:', { filePath, commitUrl: githubData.commit?.html_url });

    return NextResponse.json({ 
      success: true, 
      message: '发布成功',
      filePath,
      commitUrl: githubData.commit?.html_url
    });

  } catch (error: any) {
    console.error('[Publish] 异常:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
