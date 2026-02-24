-- Supabase Database Schema for My Blog
-- 运行此文件创建所有数据库表

-- ============================================
-- Posts 表 - 博客文章
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT DEFAULT '未分类',
  tags TEXT[] DEFAULT '{}',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE posts IS '博客文章表';

-- ============================================
-- Microposts 表 - 短动态/微博
-- ============================================
CREATE TABLE IF NOT EXISTS microposts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE microposts IS '短动态表';

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
