import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { Search, Calendar, User, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-white">
      {/* Page header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Skin Science Journal
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          LUMÉA Skincare Journal
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
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
                  className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-xl hover:border-[#C5A880] transition-all flex flex-col justify-between group text-[#1C1917]"
                >
                  <div className="space-y-4">
                    {/* Featured Image */}
                    <div className="aspect-video bg-[#EAE4DC] overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/images/skincare_vanity_1784603112992.jpg";
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-[#122315] border border-[#C5A880]/40 px-3 py-1 rounded-full text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata & Description */}
                    <div className="px-6 space-y-2">
                      <div className="flex items-center gap-3 text-xs text-[#6E6A63]">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-serif text-[#1C1917] tracking-tight group-hover:text-[#1A3121] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#6E6A63] leading-relaxed line-clamp-3 pt-1">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer read trigger */}
                  <div className="p-6 pt-4 border-t border-[#E5DFD5] flex items-center justify-between text-xs mt-4">
                    <div className="flex items-center gap-1.5 text-[#6E6A63] font-medium">
                      <User className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{post.author}</span>
                    </div>
                    <button
                      id={`btn-read-post-${post.id}`}
                      onClick={() => setActiveArticle(post)}
                      className="inline-flex items-center gap-1.5 font-bold text-[#1A3121] hover:text-[#26452F] transition-all cursor-pointer"
                    >
                      Read Post <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-12 text-center space-y-4 shadow-xl text-[#1C1917]">
              <div className="w-12 h-12 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center mx-auto border border-[#C5A880]/30">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-serif text-[#1C1917]">No Journal Posts Found</p>
                <p className="text-xs text-[#6E6A63] mt-1">We couldn't locate any matching skin science articles. Please clear your filters.</p>
              </div>
              <button
                id="btn-clear-blog-filters"
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="px-5 py-2.5 rounded-full bg-[#1A3121] text-white text-xs font-bold border border-[#C5A880]/30 hover:bg-[#26452F] transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

        {/* Right column: Search & Filters sidebar widgets */}
        <aside className="lg:col-span-4 space-y-8 text-[#1C1917]">
          {/* Search Box Widget */}
          <div className="bg-[#FBF9F5] border border-[#E5DFD5] rounded-[28px] p-6 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-[#6E6A63] uppercase tracking-wider">Search Journal</h4>
            <div className="relative">
              <input
                id="blog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, laser, acne..."
                className="w-full text-xs p-3.5 pl-10 rounded-full border border-[#E5DFD5] bg-white focus:outline-hidden focus:border-[#C5A880]"
              />
              <Search className="w-4 h-4 text-[#6E6A63] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Categories Filter Widget */}
          <div className="bg-[#FBF9F5] border border-[#E5DFD5] rounded-[28px] p-6 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold text-[#6E6A63] uppercase tracking-wider">Categories</h4>
            <div className="flex flex-col gap-1.5 text-xs">
              <button
                id="blog-cat-select-all"
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center justify-between p-3 rounded-xl text-left cursor-pointer transition-all ${
                  selectedCategory === null 
                    ? 'bg-[#1A3121] text-[#C5A880] font-bold border border-[#C5A880]/30' 
                    : 'hover:bg-white text-[#1C1917]'
                }`}
              >
                <span>All Categories</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
              {categories.map((cat, idx) => (
                <button
                  id={`blog-cat-select-${idx}`}
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between p-3 rounded-xl text-left cursor-pointer transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#1A3121] text-[#C5A880] font-bold border border-[#C5A880]/30' 
                      : 'hover:bg-white text-[#1C1917]'
                  }`}
                >
                  <span>{cat}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              ))}
            </div>
          </div>

          {/* Editor Note Widget */}
          <div className="bg-[#FBF9F5] border border-[#E5DFD5] rounded-[28px] p-6 space-y-3 shadow-xl">
            <div className="flex gap-2 text-[#1A3121] items-center">
              <BookOpen className="w-5 h-5 text-[#C5A880]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Editorial Standard</h4>
            </div>
            <p className="text-xs text-[#6E6A63] leading-relaxed">
              Every skincare article published here is written by certified dermatologists and references standard clinical protocols.
            </p>
          </div>
        </aside>
      </div>

      {/* FULL POST DETAIL VIEWER MODAL */}
      {activeArticle && (
        <div 
          id="blog-reader-modal"
          className="fixed inset-0 z-50 bg-[#0D180E]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#FBF9F5] rounded-[32px] border border-[#E5DFD5] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in text-[#1C1917]">
            {/* Close trigger */}
            <button
              id="btn-close-blog-modal"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1A3121] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] hover:bg-[#26452F] shadow-md transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content banner */}
            <div className="relative aspect-video sm:aspect-5/2 bg-[#EAE4DC] overflow-hidden">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:left-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 uppercase tracking-wider mb-1">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-[#1C1917] tracking-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Article body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Writer info */}
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center font-bold text-xs border border-[#C5A880]/30">
                    {activeArticle.author.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-bold text-[#1C1917]">{activeArticle.author}</span>
                    <span className="block text-[10px] text-[#6E6A63]">Consultant Dermatologist</span>
                  </div>
                </div>
                <div className="text-right text-xs text-[#6E6A63]">
                  <span>Published: {activeArticle.date}</span>
                  <span className="block">{activeArticle.readTime}</span>
                </div>
              </div>

              {/* MD text blocks */}
              <div className="text-xs sm:text-sm text-[#1C1917] leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Disclaimer */}
              <div className="bg-white border border-[#E5DFD5] p-4 rounded-2xl text-xs text-[#6E6A63] leading-relaxed italic">
                Disclaimer: Skincare guidelines provided in this article are intended strictly for educational awareness purposes. They must not substitute individual personalized medical diagnoses or professional clinical evaluations by a certified dermatologist.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


