-- ============================================
-- E-Learning Platform - Supabase Database Schema
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================

-- 1. PROFILES TABLE
-- Linked to Supabase Auth users, stores name and role
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES TABLE
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LECTURES TABLE
CREATE TABLE lectures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LECTURE PROGRESS TABLE
CREATE TABLE lecture_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 1,
  last_watched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lecture_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecture_progress ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all profiles, update only their own
CREATE POLICY "Anyone can view profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- COURSES: Everyone can read, only admins can write
CREATE POLICY "Anyone can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Admins can insert courses" ON courses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update courses" ON courses FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete courses" ON courses FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- LECTURES: Everyone can read, only admins can write
CREATE POLICY "Anyone can view lectures" ON lectures FOR SELECT USING (true);
CREATE POLICY "Admins can insert lectures" ON lectures FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update lectures" ON lectures FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete lectures" ON lectures FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- LECTURE_PROGRESS: Users can manage their own progress, admins can read all
CREATE POLICY "Users can view own progress" ON lecture_progress FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can insert own progress" ON lecture_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON lecture_progress FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_lectures_course_id ON lectures(course_id);
CREATE INDEX idx_lecture_progress_user_id ON lecture_progress(user_id);
CREATE INDEX idx_lecture_progress_lecture_id ON lecture_progress(lecture_id);
CREATE INDEX idx_lecture_progress_course_id ON lecture_progress(course_id);

-- ============================================
-- SEED DATA: Sample courses
-- ============================================
INSERT INTO courses (title, description) VALUES
  ('C Programming', 'Learn the basics of C programming language'),
  ('C++ Programming', 'Object-Oriented Programming with C++'),
  ('Java', 'Core concepts and advanced Java programming'),
  ('HTML & CSS', 'Build the structure and style of web pages'),
  ('Python', 'Learn Python for programming and AI'),
  ('Data Structures', 'Data Structures and Algorithms'),
  ('DBMS', 'Database Management Systems');

-- ============================================
-- TO MAKE A USER ADMIN, run this after they sign up:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
-- ============================================
