import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import { courses, Course } from '@/data/mockData';
import { toast } from 'sonner';

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'available'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' ||
      (filter === 'enrolled' && course.enrolled) ||
      (filter === 'available' && !course.enrolled);
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    toast.success('Successfully enrolled in the course!');
  };

  const handleView = (courseId: string) => {
    toast.info('Opening course...');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">Courses</h1>
        <p className="text-muted-foreground">Explore our curated collection of AI-powered courses</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'enrolled' | 'available')}
            className="input-field w-40"
          >
            <option value="all">All Courses</option>
            <option value="enrolled">Enrolled</option>
            <option value="available">Available</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>{filteredCourses.length} courses found</span>
        </div>
        <div className="text-muted-foreground">
          {courses.filter((c) => c.enrolled).length} enrolled
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              onView={handleView}
              delay={300 + index * 100}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
