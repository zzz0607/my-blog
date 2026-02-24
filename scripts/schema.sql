-- Supabase Database Schema for My Blog
-- 运行此文件创建所有数据库表

-- ============================================
-- Posts 表 - 博客文章
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
  -- 主键，UUID 格式
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- 文章唯一标识，用于 URL
  slug TEXT UNIQUE NOT NULL,
  -- 文章标题
  title TEXT NOT NULL,
  -- 文章正文内容，支持 Markdown
  content TEXT,
  -- 文章摘要，用于列表展示
  excerpt TEXT,
  -- 封面图片 URL
  cover_image TEXT,
  -- 文章分类
  category TEXT DEFAULT '未分类',
  -- 文章标签，数组形式
  tags TEXT[] DEFAULT '{}',
  -- 文章浏览次数
  view_count INT DEFAULT 0,
  -- 创建时间
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- 更新时间
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Microposts 表 - 短动态/微博
-- ============================================
CREATE TABLE IF NOT EXISTS microposts (
  -- 主键，UUID 格式
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- 短动态正文内容
  content TEXT NOT NULL,
  -- 点赞数量
  likes INT DEFAULT 0,
  -- 评论数量
  comment_count INT DEFAULT 0,
  -- 创建时间
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 启用行级安全策略 (RLS)
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE microposts ENABLE ROW LEVEL SECURITY;

-- Posts 策略
CREATE POLICY "Allow public read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow insert posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update posts" ON posts FOR UPDATE USING (true);

-- Microposts 策略
CREATE POLICY "Allow public read microposts" ON microposts FOR SELECT USING (true);
CREATE POLICY "Allow insert microposts" ON microposts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update microposts" ON microposts FOR UPDATE USING (true);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_microposts_created_at ON microposts(created_at DESC);
