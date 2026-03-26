import React, { useState } from 'react';
import {
  Star, Clock, Users, Globe, BarChart2, CheckCircle, PlayCircle,
  ChevronDown, ChevronRight, Award, ArrowLeft, ShoppingCart, Zap,
} from 'lucide-react';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={14} className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
    ))}
  </div>
);

export default function CourseDetail({ course, isDarkMode, onBack, onEnroll, enrolled }) {
  const [openModule, setOpenModule] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => { setEnrolling(false); onEnroll(course); }, 800);
  };

  const tabs = ['overview', 'curriculum', 'reviews'];

  const card = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const muted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="animate-in fade-in duration-300">
      {/* Back */}
      <button type="button" onClick={onBack}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all mb-6 ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
        <ArrowLeft size={14} /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-wider border ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                {course.category}
              </span>
              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-wider border ${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                {course.level}
              </span>
            </div>
            <h1 className={`text-3xl font-black leading-tight mb-3 ${heading}`}>{course.title}</h1>
            <p className={`text-base font-medium mb-4 ${muted}`}>{course.shortDescription}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <StarRating rating={course.rating} />
                <span className="font-black text-amber-500">{course.rating}</span>
                <span className={`text-xs ${muted}`}>({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold ${muted}`}><Users size={14} /> {course.students.toLocaleString()} students</span>
              <span className={`flex items-center gap-1 text-xs font-bold ${muted}`}><Globe size={14} /> {course.language}</span>
              <span className={`flex items-center gap-1 text-xs font-bold ${muted}`}><Clock size={14} /> Updated {course.lastUpdated}</span>
            </div>
          </div>

          {/* Video / Thumbnail */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-xl">
            {showVideo ? (
              <iframe
                src={`${course.videoUrl}?autoplay=1`}
                title="Course Preview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full cursor-pointer group" onClick={() => setShowVideo(true)}>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle size={48} className="text-indigo-600 fill-indigo-600" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Preview Course
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className={`border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex gap-1">
              {tabs.map(t => (
                <button key={t} type="button" onClick={() => setActiveTab(t)}
                  className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-px ${
                    activeTab === t
                      ? 'border-indigo-500 text-indigo-500'
                      : `border-transparent ${muted} hover:text-indigo-400`
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* What you'll learn */}
              <div className={`p-6 rounded-2xl border ${card}`}>
                <h2 className={`text-lg font-black uppercase mb-4 ${heading}`}>What You'll Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                      <span className={`text-sm font-medium ${muted}`}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className={`text-lg font-black uppercase mb-4 ${heading}`}>Skills You'll Gain</h2>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((s, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className={`p-6 rounded-2xl border ${card}`}>
                <h2 className={`text-lg font-black uppercase mb-4 ${heading}`}>Your Instructor</h2>
                <div className="flex items-center gap-4">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/20" />
                  <div>
                    <p className={`font-black text-base ${heading}`}>{course.instructor}</p>
                    <p className={`text-xs font-bold mt-0.5 ${muted}`}>{course.instructorTitle}</p>
                    <p className={`text-xs font-bold mt-0.5 text-indigo-500`}>{course.provider}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-lg font-black uppercase ${heading}`}>Program Structure</h2>
                <span className={`text-xs font-bold ${muted}`}>{course.curriculum.length} modules · {course.curriculum.reduce((a, m) => a + m.lessons, 0)} lessons</span>
              </div>
              {course.curriculum.map((mod, i) => (
                <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <button type="button" onClick={() => setOpenModule(openModule === i ? null : i)}
                    className={`w-full p-5 flex items-center justify-between text-left transition-colors ${openModule === i ? (isDarkMode ? 'bg-indigo-500/5' : 'bg-indigo-50/50') : ''}`}>
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`}>{i + 1}</span>
                      <div className="text-left">
                        <p className={`text-[10px] font-black uppercase tracking-wider ${muted}`}>{mod.module}</p>
                        <p className={`font-black text-sm ${heading}`}>{mod.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-[10px] font-bold hidden sm:block ${muted}`}>{mod.lessons} lessons · {mod.duration}</span>
                      <ChevronDown size={16} className={`transition-transform ${openModule === i ? 'rotate-180 text-indigo-500' : muted}`} />
                    </div>
                  </button>
                  {openModule === i && (
                    <div className={`px-5 pb-5 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <p className={`text-sm font-medium ${muted}`}>{mod.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-[10px] font-black uppercase tracking-wider text-indigo-500">
                        <span>{mod.lessons} lessons</span>
                        <span>·</span>
                        <span>{mod.duration}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className={`text-6xl font-black ${heading}`}>{course.rating}</p>
                  <StarRating rating={course.rating} />
                  <p className={`text-xs font-bold mt-1 ${muted}`}>Course Rating</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: s === 5 ? '72%' : s === 4 ? '20%' : s === 3 ? '5%' : '2%' }}></div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className={`text-xs font-bold ${muted}`}>{s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {course.reviews.map((r, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${card}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className={`font-black text-sm ${heading}`}>{r.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRating rating={r.rating} />
                          <span className={`text-[10px] font-bold ${muted}`}>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm font-medium leading-relaxed ${muted}`}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sticky Purchase Card */}
        <div className="lg:col-span-1">
          <div className={`sticky top-24 rounded-3xl border p-6 space-y-5 shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div>
              <div className="flex items-end gap-3">
                <span className={`text-4xl font-black ${heading}`}>{course.price}</span>
                <span className={`text-lg font-bold line-through ${muted}`}>{course.originalPrice}</span>
                <span className="text-xs font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                  {Math.round((1 - parseFloat(course.price.replace('$','')) / parseFloat(course.originalPrice.replace('$',''))) * 100)}% OFF
                </span>
              </div>
              <p className={`text-[10px] font-bold mt-1 ${muted}`}>One-time payment · Lifetime access</p>
            </div>

            {enrolled ? (
              <div className="w-full py-4 bg-green-500 text-white font-black rounded-2xl text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2">
                <CheckCircle size={18} /> Enrolled
              </div>
            ) : (
              <button type="button" onClick={handleEnroll} disabled={enrolling}
                className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70">
                {enrolling ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Enrolling...</> : <><Zap size={16} /> Enroll Now</>}
              </button>
            )}

            <button type="button" className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
              <ShoppingCart size={16} /> Add to Wishlist
            </button>

            <div className={`space-y-3 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              {[
                { icon: Clock, label: 'Duration', value: course.duration },
                { icon: BarChart2, label: 'Level', value: course.level },
                { icon: Users, label: 'Students', value: course.students.toLocaleString() },
                { icon: Globe, label: 'Language', value: course.language },
                { icon: Award, label: 'Certificate', value: 'Included' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-xs font-bold ${muted}`}><Icon size={14} /> {label}</div>
                  <span className={`text-xs font-black ${heading}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className={`pt-3 border-t text-center ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className={`text-[10px] font-bold ${muted}`}>30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
