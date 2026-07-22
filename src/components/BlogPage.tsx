import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { Search, Calendar, User, Clock, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

  // Filter blog posts based on search query and category
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Page header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Skin Science Journal
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Clinical Skincare Journal
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Read clinically certified guidelines, scientific ingredient breakthroughs, and routine advice authored directly by our dermatology panel.
        </p>
      </section>

      {/* Search and Category Filter Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left main: Blog Posts Grid */}
        <main className="lg:col-span-8 space-y-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  id={`blog-article-card-${post.id}`}
                  key={post.id}
                  className="bg-white rounded-3xl border border-[#F6D6D8]/15 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Featured Image */}
                    <div className="aspect-video bg-slate-50 overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-white border border-[#F6D6D8]/20 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider text-slate-800 uppercase">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata & Description */}
                    <div className="px-6 space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#A8C3A0]" /> {post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-semibold text-[#2E2E2E] tracking-tight group-hover:text-[#A8C3A0] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#2E2E2E]/65 leading-relaxed line-clamp-3 pt-1">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer read trigger */}
                  <div className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs mt-4">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <User className="w-3.5 h-3.5 text-[#A8C3A0]" />
                      <span>{post.author}</span>
                    </div>
                    <button
                      id={`btn-read-post-${post.id}`}
                      onClick={() => setActiveArticle(post)}
                      className="inline-flex items-center gap-1.5 font-bold text-[#A8C3A0] hover:text-[#96b18f] transition-all"
                    >
                      Read Post <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#F6D6D8]/25 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2E2E2E]">No Journal Posts Found</p>
                <p className="text-xs text-[#2E2E2E]/60 mt-1">We couldn't locate any matching skin science articles. Please clear your filters.</p>
              </div>
              <button
                id="btn-clear-blog-filters"
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-[#2E2E2E] font-medium"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

        {/* Right column: Search & Filters sidebar widgets */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Search Box Widget */}
          <div className="bg-white border border-[#F6D6D8]/20 rounded-3xl p-6 space-y-3 shadow-xs">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Search Journal</h4>
            <div className="relative">
              <input
                id="blog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, laser, acne..."
                className="w-full text-xs p-3 pl-10 rounded-xl border border-[#F6D6D8]/40 focus:outline-hidden focus:border-[#A8C3A0]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Categories Filter Widget */}
          <div className="bg-white border border-[#F6D6D8]/20 rounded-3xl p-6 space-y-4 shadow-xs">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Categories</h4>
            <div className="flex flex-col gap-1 text-xs">
              <button
                id="blog-cat-select-all"
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-left ${
                  selectedCategory === null 
                    ? 'bg-[#A8C3A0]/10 text-slate-800 font-semibold' 
                    : 'hover:bg-slate-50 text-[#2E2E2E]/70'
                }`}
              >
                <span>All Categories</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
              {categories.map((cat, idx) => (
                <button
                  id={`blog-cat-select-${idx}`}
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-left ${
                    selectedCategory === cat 
                      ? 'bg-[#A8C3A0]/10 text-slate-800 font-semibold' 
                      : 'hover:bg-slate-50 text-[#2E2E2E]/70'
                  }`}
                >
                  <span>{cat}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Editor Note Widget */}
          <div className="bg-[#FAF8F8] border border-[#F6D6D8]/30 rounded-3xl p-6 space-y-4">
            <div className="flex gap-2 text-[#A8C3A0] items-center">
              <BookOpen className="w-5 h-5" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Aesthetic Editorial Policy</h4>
            </div>
            <p className="text-[11px] text-[#2E2E2E]/70 leading-relaxed">
              Every skincare article published here is written by certified dermatologists. Our contents undergo meticulous reviews and reference standard FDA clinical manuals to ensure safety and clinical accuracy.
            </p>
          </div>
        </aside>
      </div>

      {/* FULL POST DETAIL VIEWER MODAL */}
      {activeArticle && (
        <div 
          id="blog-reader-modal"
          className="fixed inset-0 z-50 bg-[#2E2E2E]/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl border border-[#F6D6D8]/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in">
            {/* Close trigger */}
            <button
              id="btn-close-blog-modal"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 hover:scale-105 shadow-sm transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content banner */}
            <div className="relative aspect-video sm:aspect-5/2 bg-slate-100 overflow-hidden">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:left-8">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-widest bg-[#A8C3A0] text-white uppercase font-bold mb-1">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#2E2E2E] tracking-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Article body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Writer info */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700">
                    {activeArticle.author.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-semibold text-[#2E2E2E]">{activeArticle.author}</span>
                    <span className="block text-[10px] text-gray-400">Consultant Board Specialist</span>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono text-gray-400 space-y-0.5">
                  <span>Published: {activeArticle.date}</span>
                  <span className="block">{activeArticle.readTime}</span>
                </div>
              </div>

              {/* MD text blocks */}
              <div className="text-xs sm:text-sm text-[#2E2E2E]/80 leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Disclaimer */}
              <div className="bg-[#FAF8F8] border border-[#F6D6D8]/20 p-4 rounded-xl text-[10px] text-gray-400 leading-relaxed italic">
                Disclaimer: Skincare guidelines provided in this article are intended strictly for educational awareness purposes. They must not substitute individual personalized medical diagnoses or professional clinical evaluations by a certified dermatologist.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
