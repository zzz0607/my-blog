-- Supabase Database Schema for My Blog
-- 运行此文件创建所有数据库表

-- ============================================
-- Posts 表 - 博客文章
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
  -- 主键
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 文章唯一标识（URL 友好）
  slug TEXT UNIQUE NOT NULL,
  
  -- 文章标题
  title TEXT NOT NULL,
  
  -- 文章正文内容（Markdown 格式）
  content TEXT,
  
  -- 文章摘要/简介
  excerpt TEXT,
  
  -- 封面图片 URL
  cover_image TEXT,
  
  -- 分类
  category TEXT DEFAULT '未分类',
  
  -- 标签数组
  tags TEXT[] DEFAULT '{}',
  
  -- 浏览次数
  view_count INT DEFAULT 0,
  
  -- 创建时间
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 更新时间
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 字段注释
COMMENT ON COLUMN posts.id IS '主键，UUID 格式';
COMMENT ON COLUMN posts.slug IS '文章唯一标识，用于 URL';
COMMENT ON COLUMN posts.title IS '文章标题';
COMMENT ON COLUMN posts.content IS '文章正文内容，支持 Markdown';
COMMENT ON COLUMN posts.excerpt IS '文章摘要，用于列表展示';
COMMENT ON COLUMN posts.cover_image IS '封面图片 URL';
COMMENT ON COLUMN posts.category IS '文章分类';
COMMENT ON COLUMN posts.tags IS '文章标签，数组形式';
COMMENT ON COLUMN posts.view_count IS '文章浏览次数';
COMMENT ON COLUMN posts.created_at IS '创建时间';
COMMENT ON COLUMN posts.updated_at IS '更新时间';

-- ============================================
-- Microposts 表 - 短动态/微博
-- ============================================
CREATE TABLE IF NOT EXISTS microposts (
  -- 主键
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 短动态内容
  content TEXT NOT NULL,
  
  -- 点赞数
  likes INT DEFAULT 0,
  
  -- 评论数
  comment_count INT DEFAULT 0,
  
  -- 创建时间
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 字段注释
COMMENT ON COLUMN microposts.id IS '主键，UUID 格式';
COMMENT ON COLUMN microposts.content IS '短动态正文内容';
COMMENT ON COLUMN microposts.likes IS '点赞数量';
COMMENT ON COLUMN microposts.comment_count IS '评论数量';
COMMENT ON COLUMN microposts.created_at IS '创建时间';

-- ============================================
-- 启用行级安全策略 (RLS)
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE microposts ENABLE ROW LEVEL SECURITY;

-- Posts 读取策略（公开可读）
CREATE POLICY "Allow public read posts" ON posts 
  FOR SELECT USING (true);

-- Posts 写入策略（允许插入和更新）
CREATE POLICY "Allow insert posts" ON posts 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update posts" ON posts 
  FOR UPDATE USING (true);

-- Microposts 读取策略（公开可读）
CREATE POLICY "Allow public read microposts" ON microposts 
  FOR SELECT USING (true);

-- Microposts 写入策略（允许插入和更新）
CREATE POLICY "Allow insert microposts" ON microposts 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update microposts" ON microposts 
  FOR UPDATE USING (true);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_microposts_created_at ON microposts(created_at DESC);
