import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Briefcase, CheckCircle, Layout, Search, Bell, LogOut, Award,
  HelpCircle, CreditCard, ChevronDown, Globe, MoreVertical, ChevronRight,
  ExternalLink, Twitter, Linkedin, Facebook, Instagram, Youtube,
  User as UserIcon, Star, Filter, X, Clock, Settings, User, Eye, EyeOff,
  Lock, GraduationCap, DollarSign, Sun, Moon, ArrowLeft, Mail, AtSign
} from 'lucide-react';
import { CATALOG_COURSES, COURSE_TITLE_MAP } from './courseData';
import CourseDetail from './CourseDetail';

// --- Mock Data & Content ---
const SKILLS = ["Accounting","Artificial Intelligence (AI)","Cybersecurity","Data Analytics","Digital Marketing","Human Resources (HR)","Microsoft Excel","Project Management","Python","SQL"];
const PROFESSIONAL_CERTIFICATES = ["Google AI Certificate","Google Cybersecurity Certificate","Google Data Analytics Certificate","Google IT Support Certificate","Google Project Management Certificate","Google UX Design Certificate","IBM AI Engineering Certificate","IBM AI Product Manager Certificate","IBM Data Science Certificate","Intuit Academy Bookkeeping Certificate"];
const COURSES_SPECIALIZATIONS = ["AI Essentials Specialization","AI For Business Specialization","AI For Everyone Course","AI in Healthcare Specialization","Deep Learning Specialization","Excel Skills for Business Specialization","Financial Markets Course","Machine Learning Specialization","Prompt Engineering for ChatGPT Course","Python for Everybody Specialization"];
const CAREER_RESOURCES = ["Career Aptitude Test","CAPM Certification Requirements","CompTIA A+ Certification Requirements","CompTIA Security+ Certification Requirements","Essential IT Certifications","Free IT Certifications and Courses","High-Income Skills to Learn","How to Learn Artificial Intelligence","PMP Certification Requirements","Popular Cybersecurity Certifications"];

const SCHOLARSHIPS = [
  { id: 1, title: "Tech Excellence Grant", provider: "Future Leaders Fund", amount: "$5,000", deadline: "Oct 15, 2024", category: "STEM" },
  { id: 2, title: "Women in Data Science Scholarship", provider: "Global Analytics Corp", amount: "Full Tuition", deadline: "Nov 01, 2024", category: "Data Science" },
  { id: 3, title: "Emerging AI Researcher Award", provider: "LearnFlow Foundation", amount: "$2,500", deadline: "Dec 10, 2024", category: "AI/ML" },
  { id: 4, title: "Global Accessibility Grant", provider: "EduForAll", amount: "Variable", deadline: "Rolling", category: "Financial Need" },
  { id: 5, title: "Cybersecurity Innovators Fund", provider: "SecureNet Systems", amount: "$3,000", deadline: "Jan 15, 2025", category: "Security" },
  { id: 6, title: "Creative Arts Digital Scholarship", provider: "Modern Media Group", amount: "$1,500", deadline: "Oct 30, 2024", category: "Design" },
];

const FAQ_ITEMS = [
  { question: "How do I subscribe to courses?", answer: "You can subscribe by navigating to the 'Subscription' tab in your dashboard or profile menu. Choose a plan that fits your needs and complete the secure checkout process to get instant access to all premium certificates." },
  { question: "How do I earn a certificate?", answer: "Complete all modules within a course and pass the final assessment with a score of 80% or higher to automatically generate your verified digital certificate." },
  { question: "Can I cancel anytime?", answer: "Yes, our subscriptions are flexible. You can cancel your LearnFlow Plus membership at any time through the Billing section in your account settings without any hidden fees." },
  { question: "Are these recognized by employers?", answer: "Our certificates are co-branded with industry leaders like Google, IBM, and Meta. They are designed to demonstrate job-ready skills and are highly valued by recruiters globally." },
  { question: "Is financial aid available?", answer: "We offer financial aid for learners who cannot afford the full cost of a subscription. You can apply directly on the course landing page by clicking the 'Financial Aid Available' link." },
];

const SUBSCRIPTION_PLANS = [
  { id: 'monthly', label: 'Monthly', duration: '1 Month', price: '$19.99', priceNote: '/month', savings: null, badge: null },
  { id: '3months', label: '3 Months', duration: '3 Months', price: '$49.99', priceNote: '/3 months', savings: 'Save 17%', badge: null },
  { id: '6months', label: '6 Months', duration: '6 Months', price: '$89.99', priceNote: '/6 months', savings: 'Save 25%', badge: 'Popular' },
  { id: 'yearly', label: 'Annual', duration: '1 Year', price: '$149.99', priceNote: '/year', savings: 'Save 37%', badge: 'Best Value' },
];

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';

const INITIAL_USER = {
  id: 'u1',
  name: 'Alex Rivera',
  username: 'alexrivera',
  email: 'alex@example.com',
  bio: '',
  role: 'STUDENT',
  profileImage: DEFAULT_AVATAR,
  password: 'password123',
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: "Course Update", message: "New module added to Fullstack Web Development.", time: "2 hours ago", read: false, type: "update" },
  { id: 2, title: "Achievement Unlocked", message: "You've earned the 'Fast Learner' badge!", time: "5 hours ago", read: false, type: "award" },
  { id: 3, title: "Job Match", message: "A new Junior Dev position matches your profile.", time: "1 day ago", read: true, type: "job" },
];

const DASHBOARD_COURSES = [
  { id: 'c1', title: 'Fullstack Web Development Professional Certificate', instructor: 'Sarah Chen', progress: 65, rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop' },
  { id: 'c2', title: 'Advanced Digital Marketing Specialization', instructor: 'Marketing Pros', progress: 12, rating: 4.6, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  { id: 'c3', title: 'The Complete Freelancing Mastery Course', instructor: 'Marcus Thorne', progress: 40, rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop' },
  { id: 'c4', title: 'IBM Data Science Professional Certificate', instructor: 'IBM Training', progress: 5, rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1551288049-bbda38a88ad8?w=400&h=250&fit=crop' },
];

// --- Shared Components ---
const SidebarItem = ({ icon: Icon, label, active, onClick, danger, isDarkMode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-200 ${
      active
        ? isDarkMode
          ? 'bg-indigo-900/40 text-indigo-400 font-bold border-l-4 border-indigo-500'
          : 'bg-indigo-50 text-indigo-700 font-bold border-l-4 border-indigo-700'
        : danger
        ? 'text-red-500 hover:bg-red-50'
        : isDarkMode
        ? 'text-slate-400 hover:bg-slate-800'
        : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const SectionHeader = ({ title, isDarkMode }) => (
  <div className="flex items-center gap-4 mb-6">
    <h2 className={`text-xl font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    <div className={`flex-1 h-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
  </div>
);

const ListGrid = ({ items, isDarkMode, onCourseClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
    {items.map((item, idx) => {
      const courseId = COURSE_TITLE_MAP[item];
      const course = courseId ? CATALOG_COURSES.find(c => c.id === courseId) : null;
      return (
        <div key={idx}
          onClick={() => course && onCourseClick && onCourseClick(course)}
          className={`p-4 border rounded-xl transition-all flex items-center justify-between group ${course ? 'cursor-pointer' : 'cursor-default'} ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'}`}>
          <div className="flex-1 min-w-0">
            <span className={`text-sm font-semibold group-hover:text-indigo-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
            {course && (
              <div className={`flex items-center gap-3 mt-1 text-[10px] font-bold ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                <span>{course.duration}</span>
                <span>·</span>
                <span>{course.level}</span>
                <span>·</span>
                <span className="text-indigo-500">{course.price}</span>
              </div>
            )}
          </div>
          <ChevronRight size={14} className={`shrink-0 ml-2 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
        </div>
      );
    })}
  </div>
);

// Back Button Component
const BackButton = ({ onClick, isDarkMode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all mb-6 ${
      isDarkMode
        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
    }`}
  >
    <ArrowLeft size={14} /> Back
  </button>
);

// --- localStorage helpers ---
const LS_USERS_KEY = 'learnflow_users';
const LS_SESSION_KEY = 'learnflow_session';

function loadUsers() {
  try {
    const stored = localStorage.getItem(LS_USERS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Always ensure the demo account exists
      if (!parsed.find(u => u.username === INITIAL_USER.username)) {
        parsed.unshift(INITIAL_USER);
      }
      return parsed;
    }
  } catch (_) {}
  return [INITIAL_USER];
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const stored = localStorage.getItem(LS_SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (_) { return null; }
}

function saveSession(user) {
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(LS_SESSION_KEY);
}

// --- Main App ---
export default function App() {
  const savedSession = loadSession();
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedSession);
  const [authMode, setAuthMode] = useState('login');
  const [registeredUsers, setRegisteredUsers] = useState(loadUsers);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tabHistory, setTabHistory] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedPlan, setSelectedPlan] = useState('6months');
  const [activeSub, setActiveSub] = useState(null);

  // Signup form
  const [signupForm, setSignupForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [signupError, setSignupError] = useState('');

  // User state — restore from session if available
  const [user, setUser] = useState(savedSession || INITIAL_USER);
  const [settingsForm, setSettingsForm] = useState({
    name: (savedSession || INITIAL_USER).name,
    email: (savedSession || INITIAL_USER).email,
    bio: (savedSession || INITIAL_USER).bio || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, activeTab]);
    setActiveTab(tab);
    setShowProfileMenu(false);
    if (tab !== 'courses') setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (tabHistory.length === 0) return;
    const prev = tabHistory[tabHistory.length - 1];
    setTabHistory(h => h.slice(0, -1));
    setActiveTab(prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setPassword('');
    setLoginInput('');
    setLoginError('');
    setTabHistory([]);
    setActiveTab('dashboard');
    setAuthMode('login');
  };

  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const clearNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnroll = (course) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      setEnrolledCourses(prev => [...prev, course]);
      setNotifications(prev => [{
        id: Date.now(),
        title: 'Enrollment Confirmed',
        message: `You are now enrolled in "${course.title}". Start learning today!`,
        time: 'Just now',
        read: false,
        type: 'award',
      }, ...prev]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isEmail = loginInput.includes('@');
    const users = loadUsers();
    const found = users.find(u =>
      isEmail ? u.email === loginInput : u.username === loginInput
    );
    if (found && found.password === password) {
      saveSession(found);
      setUser(found);
      setSettingsForm({ name: found.name, email: found.email, bio: found.bio || '' });
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email/username or password.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, username, email, password, confirmPassword } = signupForm;
    if (!name || !username || !email || !password) { setSignupError('All fields are required.'); return; }
    if (password !== confirmPassword) { setSignupError('Passwords do not match.'); return; }
    if (password.length < 6) { setSignupError('Password must be at least 6 characters.'); return; }
    const users = loadUsers();
    const exists = users.find(u => u.email === email || u.username === username);
    if (exists) { setSignupError('Email or username already taken.'); return; }
    const newUser = {
      id: `u${Date.now()}`,
      name,
      username,
      email,
      password,
      bio: '',
      role: 'STUDENT',
      profileImage: DEFAULT_AVATAR,
    };
    const updated = [...users, newUser];
    saveUsers(updated);
    setRegisteredUsers(updated);
    saveSession(newUser);
    setUser(newUser);
    setSettingsForm({ name: newUser.name, email: newUser.email, bio: '' });
    setIsLoggedIn(true);
    setSignupError('');
  };

  const handleSaveSettings = () => {
    const updated = { ...user, name: settingsForm.name, email: settingsForm.email, bio: settingsForm.bio };
    setUser(updated);
    saveSession(updated);
    // Update in the users store too
    const users = loadUsers();
    const updatedUsers = users.map(u => u.id === updated.id ? updated : u);
    saveUsers(updatedUsers);
    setRegisteredUsers(updatedUsers);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync settings form when user changes
  useEffect(() => {
    setSettingsForm({ name: user.name, email: user.email, bio: user.bio });
  }, [user]);

  if (!isLoggedIn) {
    // Shared background
    const AuthBg = () => (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800"></div>
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 border-[1px] border-amber-500/20 rotate-45"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 border-[1px] border-amber-500/10 rotate-12"></div>
        <div className="absolute bottom-[-15%] left-[10%] w-80 h-80 border-[1px] border-amber-500/15 rotate-[30deg]"></div>
        <div className="absolute top-[40%] left-[60%] opacity-20 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute border border-amber-400/30 rotate-45" style={{ width: `${(i+1)*60}px`, height: `${(i+1)*60}px`, top: `-${(i+1)*30}px`, left: `-${(i+1)*30}px` }}></div>
          ))}
        </div>
      </div>
    );

    const inputCls = "w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all";
    const iconCls = "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-500 transition-colors";

    if (authMode === 'signup') {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
          <AuthBg />
          <div className="max-w-md w-full bg-neutral-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-neutral-800 text-center space-y-7 relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-500/40 rounded-tr-[2.5rem]"></div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">C</div>
              <span className="text-3xl font-black tracking-tighter text-white italic">learnflow</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
              <p className="text-neutral-400 text-sm">Join thousands of professional learners.</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-4 text-left">
              {/* Full Name */}
              <div className="relative group">
                <div className={iconCls}><UserIcon size={18} /></div>
                <input type="text" placeholder="Full Name" value={signupForm.name}
                  onChange={e => { setSignupForm(f => ({ ...f, name: e.target.value })); setSignupError(''); }}
                  className={inputCls} required />
              </div>
              {/* Username */}
              <div className="relative group">
                <div className={iconCls}><AtSign size={18} /></div>
                <input type="text" placeholder="Username" value={signupForm.username}
                  onChange={e => { setSignupForm(f => ({ ...f, username: e.target.value })); setSignupError(''); }}
                  className={inputCls} required />
              </div>
              {/* Email */}
              <div className="relative group">
                <div className={iconCls}><Mail size={18} /></div>
                <input type="email" placeholder="Email Address" value={signupForm.email}
                  onChange={e => { setSignupForm(f => ({ ...f, email: e.target.value })); setSignupError(''); }}
                  className={inputCls} required />
              </div>
              {/* Password */}
              <div className="relative group">
                <div className={iconCls}><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Password (min 6 chars)" value={signupForm.password}
                  onChange={e => { setSignupForm(f => ({ ...f, password: e.target.value })); setSignupError(''); }}
                  className="w-full pl-12 pr-12 py-4 bg-neutral-800/50 border border-neutral-700 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Confirm Password */}
              <div className="relative group">
                <div className={iconCls}><Lock size={18} /></div>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={signupForm.confirmPassword}
                  onChange={e => { setSignupForm(f => ({ ...f, confirmPassword: e.target.value })); setSignupError(''); }}
                  className="w-full pl-12 pr-12 py-4 bg-neutral-800/50 border border-neutral-700 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {signupError && <p className="text-red-400 text-xs font-bold px-1">{signupError}</p>}
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)] uppercase tracking-widest text-sm mt-2">
                Create Account
              </button>
            </form>
            <p className="text-xs text-neutral-500">
              Already have an account?{' '}
              <span onClick={() => { setAuthMode('login'); setSignupError(''); setSignupForm({ name: '', username: '', email: '', password: '', confirmPassword: '' }); }}
                className="text-white font-bold cursor-pointer hover:underline">Sign In</span>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <AuthBg />
        <div className="max-w-md w-full bg-neutral-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-neutral-800 text-center space-y-8 relative z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-500/40 rounded-tr-[2.5rem]"></div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-4xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">C</div>
            <span className="text-4xl font-black tracking-tighter text-white italic">learnflow</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-neutral-400 text-sm">Sign in with your email or username.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className={iconCls}><AtSign size={18} /></div>
                <input type="text" placeholder="Email or Username" value={loginInput}
                  onChange={(e) => { setLoginInput(e.target.value); setLoginError(''); }}
                  className={inputCls} required />
              </div>
              <div className="relative group">
                <div className={iconCls}><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                  className="w-full pl-12 pr-12 py-4 bg-neutral-800/50 border border-neutral-700 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {loginError && <p className="text-red-400 text-xs font-bold text-left px-1">{loginError}</p>}
            </div>
            <div className="flex items-center justify-between text-[11px] px-1 font-bold">
              <label className="flex items-center gap-2 text-neutral-500 cursor-pointer hover:text-neutral-300">
                <input type="checkbox" className="accent-amber-500" /> Remember Me
              </label>
              <button type="button" className="text-amber-500 hover:text-amber-400">Forgot Password?</button>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)] uppercase tracking-widest text-sm">
              Sign In
            </button>
          </form>
          <p className="text-xs text-neutral-500">
            Don't have an account?{' '}
            <span onClick={() => { setAuthMode('signup'); setLoginError(''); setPassword(''); setLoginInput(''); }}
              className="text-white font-bold cursor-pointer hover:underline">Create Account</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} animate-in fade-in duration-700`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r hidden lg:flex flex-col sticky top-0 h-screen z-50 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigateTo('dashboard')}>
            <div className="w-8 h-8 bg-indigo-700 rounded-sm flex items-center justify-center text-white font-black italic">C</div>
            <span className={`font-black tracking-tighter italic text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>learnflow</span>
          </div>
          <nav className="space-y-1">
            <SidebarItem icon={Layout} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => navigateTo('dashboard')} isDarkMode={isDarkMode} />
            <SidebarItem icon={BookOpen} label="Course Catalog" active={activeTab === 'courses'} onClick={() => navigateTo('courses')} isDarkMode={isDarkMode} />
            <SidebarItem icon={Briefcase} label="Job Application" active={activeTab === 'jobs'} onClick={() => navigateTo('jobs')} isDarkMode={isDarkMode} />
            <SidebarItem icon={GraduationCap} label="Scholarships" active={activeTab === 'scholarships'} onClick={() => navigateTo('scholarships')} isDarkMode={isDarkMode} />
            <SidebarItem icon={CreditCard} label="Subscription" active={activeTab === 'subscribe'} onClick={() => navigateTo('subscribe')} isDarkMode={isDarkMode} />
            <SidebarItem icon={Settings} label="Profile Settings" active={activeTab === 'settings'} onClick={() => navigateTo('settings')} isDarkMode={isDarkMode} />
            <SidebarItem icon={HelpCircle} label="FAQ & Support" active={activeTab === 'faq'} onClick={() => navigateTo('faq')} isDarkMode={isDarkMode} />
            <div className={`h-px my-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
            <SidebarItem icon={LogOut} label="Log Out" onClick={handleLogout} danger isDarkMode={isDarkMode} />
          </nav>
        </div>
        <div className={`mt-auto p-6 border-t flex items-center gap-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <img src={user.profileImage} className="w-10 h-10 rounded-full border-2 border-indigo-100/20" alt="" />
          <div className="min-w-0">
            <p className={`text-xs font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wide">Premium Plus</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 backdrop-blur z-40 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}>
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            {tabHistory.length > 0 && (
              <button
                type="button"
                onClick={goBack}
                className={`p-2 rounded-full transition-all border shrink-0 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}
                title="Go Back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="relative group w-full">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`} size={16} />
              <input
                type="text"
                placeholder="Search for skills, certificates, or courses..."
                className={`w-full pl-10 pr-4 py-2 border-none rounded-full text-sm focus:ring-2 transition-all outline-none ${isDarkMode ? 'bg-slate-900 text-white focus:ring-indigo-500/50' : 'bg-slate-100 text-slate-900 focus:ring-indigo-700'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button type="button" onClick={toggleTheme} className={`p-2 rounded-full transition-all border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-indigo-700'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button type="button" onClick={() => setShowNotifications(!showNotifications)} className={`relative p-2 rounded-full transition-colors border ${showNotifications ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-indigo-400' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-indigo-700'}`}>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-white">{unreadCount}</span>
                )}
              </button>
              {showNotifications && (
                <div className={`absolute right-0 mt-3 w-80 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/50 border-slate-100'}`}>
                    <h3 className="font-black text-sm uppercase tracking-wider">Notifications</h3>
                    <button type="button" onClick={markAllAsRead} className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center space-y-2">
                        <Bell size={24} className="mx-auto text-slate-300" />
                        <p className="text-xs text-slate-400 font-bold">No notifications yet</p>
                      </div>
                    ) : notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b flex gap-3 transition-colors relative group ${isDarkMode ? 'border-slate-800 hover:bg-slate-800/50' : 'border-slate-50 hover:bg-slate-50'} ${!n.read ? 'bg-indigo-500/5' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-indigo-500' : 'bg-transparent'}`}></div>
                        <div className="flex-1 space-y-1">
                          <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{n.title}</p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                          <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase"><Clock size={10} /> {n.time}</div>
                        </div>
                        <button type="button" onClick={() => clearNotification(n.id)} className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button type="button" onClick={() => setShowProfileMenu(!showProfileMenu)} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all overflow-hidden ${showProfileMenu ? 'border-indigo-600 scale-110 shadow-lg shadow-indigo-500/20' : isDarkMode ? 'border-slate-800 bg-slate-900 hover:border-slate-600' : 'border-slate-200 bg-slate-100 hover:border-indigo-300'}`}>
                <img src={user.profileImage} className="w-full h-full object-cover" alt="Profile" />
              </button>
              {showProfileMenu && (
                <div className={`absolute right-0 mt-3 w-64 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
                  <div className={`p-5 border-b ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <img src={user.profileImage} className="w-10 h-10 rounded-full border border-white/10 shadow-sm" alt="" />
                      <div className="min-w-0">
                        <p className="text-sm font-black truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-0.5">
                    {[
                      { id: 'dashboard', icon: Layout, label: 'Dashboard' },
                      { id: 'courses', icon: BookOpen, label: 'Course Catalog' },
                      { id: 'jobs', icon: Briefcase, label: 'Job Applications' },
                      { id: 'scholarships', icon: GraduationCap, label: 'Scholarships' },
                      { id: 'subscribe', icon: CreditCard, label: 'Subscription' },
                      { id: 'settings', icon: Settings, label: 'Profile Settings' },
                      { id: 'faq', icon: HelpCircle, label: 'Support & FAQ' },
                    ].map(item => (
                      <button type="button" key={item.id} onClick={() => navigateTo(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${activeTab === item.id ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-700') : (isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50')}`}>
                        <item.icon size={16} /> <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className={`p-2 border-t mt-1 ${isDarkMode ? 'border-slate-800 bg-slate-950/30' : 'border-slate-100 bg-slate-50/30'}`}>
                    <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} /> <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          <div className="p-8 lg:p-12 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">

            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight uppercase italic">Dashboard</h1>
                    <p className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Welcome back, {user.name.split(' ')[0]}. Continue your certificates from where you left off.</p>
                  </div>
                  <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm font-black border transition-colors ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                    <Award size={18} /> <span>1,245 POINTS</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DASHBOARD_COURSES.map(course => (
                    <div key={course.id} className={`rounded-2xl border overflow-hidden shadow-sm transition-all cursor-pointer group ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)]' : 'bg-white border-slate-200 hover:shadow-xl'}`}>
                      <div className="aspect-video relative overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded tracking-wide uppercase">Enrolled</div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className={`font-bold text-sm leading-tight line-clamp-2 h-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                          <div className="h-full bg-indigo-500" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black text-indigo-500">
                          <span>{course.progress}% COMPLETE</span>
                          <span className="underline uppercase tracking-tighter">Resume</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Catalog */}
            {activeTab === 'courses' && (
              <div className="space-y-12 animate-in slide-in-from-bottom-2">
                {selectedCourse ? (
                  <CourseDetail
                    course={selectedCourse}
                    isDarkMode={isDarkMode}
                    onBack={() => setSelectedCourse(null)}
                    onEnroll={handleEnroll}
                    enrolled={!!enrolledCourses.find(c => c.id === selectedCourse.id)}
                  />
                ) : (
                  <>
                    <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                    <div className={`border-b pb-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <h1 className="text-4xl font-black tracking-tighter italic uppercase">Course Catalog</h1>
                      <p className={`mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Explore professional specializations and industry-leading certificates. Click any course to see details.</p>
                    </div>
                    <section><SectionHeader title="Skills" isDarkMode={isDarkMode} /><ListGrid items={SKILLS} isDarkMode={isDarkMode} onCourseClick={handleCourseClick} /></section>
                    <section><SectionHeader title="Professional Certificates" isDarkMode={isDarkMode} /><ListGrid items={PROFESSIONAL_CERTIFICATES} isDarkMode={isDarkMode} onCourseClick={handleCourseClick} /></section>
                    <section><SectionHeader title="Courses & Specializations" isDarkMode={isDarkMode} /><ListGrid items={COURSES_SPECIALIZATIONS} isDarkMode={isDarkMode} onCourseClick={handleCourseClick} /></section>
                    <section><SectionHeader title="Career Resources" isDarkMode={isDarkMode} /><ListGrid items={CAREER_RESOURCES} isDarkMode={isDarkMode} onCourseClick={handleCourseClick} /></section>
                  </>
                )}
              </div>
            )}

            {/* Scholarships */}
            {activeTab === 'scholarships' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                <div className={`border-b pb-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <h1 className="text-4xl font-black tracking-tighter italic uppercase flex items-center gap-4">
                    <GraduationCap size={40} className="text-indigo-500" /> Scholarships
                  </h1>
                  <p className={`mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Financial assistance for your academic and professional development.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SCHOLARSHIPS.map(scholarship => (
                    <div key={scholarship.id} className={`border rounded-[2rem] p-7 transition-all group flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(79,70,229,0.1)]' : 'bg-white border-slate-200 hover:shadow-xl'}`}>
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-wider border ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>{scholarship.category}</span>
                          <ExternalLink size={18} className={isDarkMode ? 'text-slate-700' : 'text-slate-300'} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-black leading-tight group-hover:text-indigo-400 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{scholarship.title}</h3>
                          <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{scholarship.provider}</p>
                        </div>
                        <div className="flex items-center gap-6 py-2">
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Amount</p>
                            <p className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{scholarship.amount}</p>
                          </div>
                          <div className={`w-px h-8 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Deadline</p>
                            <p className="text-sm font-bold text-red-500">{scholarship.deadline}</p>
                          </div>
                        </div>
                      </div>
                      <button type="button" className={`w-full mt-8 py-4 font-black text-xs uppercase tracking-widest rounded-2xl transition-all ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_10px_20px_rgba(79,70,229,0.3)]' : 'bg-slate-900 text-white hover:bg-indigo-700'}`}>Apply Now</button>
                    </div>
                  ))}
                </div>
                <div className={`rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8 border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-indigo-50 border-indigo-100'}`}>
                  <div className="space-y-2 text-center md:text-left max-w-lg">
                    <h3 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-indigo-900'}`}>Need Financial Aid?</h3>
                    <p className={`font-bold leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-indigo-700/70'}`}>We offer up to 90% off for qualifying learners on all professional certificates and expert sessions.</p>
                  </div>
                  <button type="button" className="whitespace-nowrap bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-95">Request Aid</button>
                </div>
              </div>
            )}

            {/* Subscribe Tab */}
            {activeTab === 'subscribe' && (
              <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 py-10">
                <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                <div className="text-center space-y-4">
                  <h1 className="text-5xl font-black tracking-tighter uppercase italic">Membership</h1>
                  <p className={`font-bold max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Get unlimited access to all professional certificates and expert-led mentor sessions.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SUBSCRIPTION_PLANS.map(plan => {
                    const isSelected = selectedPlan === plan.id;
                    const isActive = activeSub === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative rounded-[2rem] p-7 border-2 cursor-pointer transition-all flex flex-col gap-5 ${
                          isSelected
                            ? 'border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.2)] bg-indigo-600 text-white'
                            : isDarkMode
                            ? 'border-slate-800 bg-slate-900 hover:border-indigo-500/50 text-white'
                            : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-900'
                        }`}
                      >
                        {plan.badge && (
                          <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-wider ${isSelected ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'}`}>
                            {plan.badge}
                          </span>
                        )}
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.label}</p>
                          <p className={`text-3xl font-black tracking-tight`}>{plan.price}</p>
                          <p className={`text-xs font-bold mt-1 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.priceNote}</p>
                        </div>
                        {plan.savings && (
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full w-fit ${isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>{plan.savings}</span>
                        )}
                        <div className={`mt-auto space-y-2 text-[11px] font-black uppercase ${isSelected ? 'text-indigo-200' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          <div className="flex items-center gap-2"><CheckCircle size={12} /> Unlimited Certificates</div>
                          <div className="flex items-center gap-2"><CheckCircle size={12} /> Mentor Calls</div>
                          {plan.id !== 'monthly' && <div className="flex items-center gap-2"><CheckCircle size={12} /> Priority Support</div>}
                          {(plan.id === '6months' || plan.id === 'yearly') && <div className="flex items-center gap-2"><CheckCircle size={12} /> Career Coaching</div>}
                        </div>
                        {isActive && (
                          <span className={`text-[10px] font-black uppercase tracking-wider text-center py-1 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>Active Plan</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeSub !== selectedPlan) {
                        setActiveSub(selectedPlan);
                        const plan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);
                        setNotifications(prev => [{
                          id: Date.now(),
                          title: 'Subscription Active',
                          message: `Your ${plan.label} plan (${plan.price}) is now active. Enjoy unlimited access!`,
                          time: 'Just now',
                          read: false,
                          type: 'award',
                        }, ...prev]);
                      }
                    }}
                    className="px-16 py-5 bg-indigo-600 text-white font-black rounded-3xl uppercase tracking-widest text-sm hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95"
                  >
                    {activeSub === selectedPlan ? 'Current Plan' : 'Start 7-Day Free Trial'}
                  </button>
                </div>
                {activeSub && (
                  <p className={`text-center text-xs font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Active plan: {SUBSCRIPTION_PLANS.find(p => p.id === activeSub)?.label} — {SUBSCRIPTION_PLANS.find(p => p.id === activeSub)?.price}
                  </p>
                )}
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'settings' && (
              <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
                <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                <div className={`border-b pb-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <h1 className="text-4xl font-black tracking-tighter italic uppercase flex items-center gap-4">
                    <Settings size={40} className="text-indigo-500" /> Settings
                  </h1>
                  <p className={`mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage your account settings and personal preferences.</p>
                </div>
                {saveSuccess && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-500 text-sm font-black">
                    <CheckCircle size={18} /> Changes saved successfully.
                  </div>
                )}
                <div className="space-y-8">
                  <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h2 className={`text-xl font-black uppercase mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Personal Information</h2>
                    <div className="flex flex-col sm:flex-row gap-8 items-start">
                      <div className="flex flex-col items-center gap-4">
                        <img src={user.profileImage} alt="Profile" className={`w-24 h-24 rounded-full border-4 object-cover shadow-md ${isDarkMode ? 'border-indigo-900/50' : 'border-indigo-50'}`} />
                        <button type="button" className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-600 tracking-wider transition-colors">Change Avatar</button>
                      </div>
                      <div className="flex-1 space-y-5 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Full Name</label>
                            <input
                              type="text"
                              value={settingsForm.name}
                              onChange={(e) => setSettingsForm(f => ({ ...f, name: e.target.value }))}
                              className={`w-full p-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email Address</label>
                            <input
                              type="email"
                              value={settingsForm.email}
                              onChange={(e) => setSettingsForm(f => ({ ...f, email: e.target.value }))}
                              className={`w-full p-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Bio</label>
                          <textarea
                            rows="4"
                            placeholder="Tell the community a bit about yourself..."
                            value={settingsForm.bio}
                            onChange={(e) => setSettingsForm(f => ({ ...f, bio: e.target.value }))}
                            className={`w-full p-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-sm font-medium ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h2 className={`text-xl font-black uppercase mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Preferences</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Email Notifications</h4>
                          <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Receive updates about new courses and recommendations.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                        </label>
                      </div>
                      <div className={`h-px w-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Marketing Communications</h4>
                          <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Receive offers, promotions, and related news.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                        </label>
                      </div>
                      <div className={`h-px w-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dark Mode</h4>
                          <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Toggle the appearance of the application.</p>
                        </div>
                        <button onClick={toggleTheme} type="button" className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                          {isDarkMode ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => setSettingsForm({ name: user.name, email: user.email, bio: user.bio })} className={`px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                      Cancel
                    </button>
                    <button type="button" onClick={handleSaveSettings} className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <div className="max-w-2xl mx-auto py-10 space-y-12 animate-in fade-in duration-500">
                <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                <div className="text-center">
                  <h1 className="text-4xl font-black italic uppercase">Support & FAQ</h1>
                  <p className="text-slate-500 font-bold mt-2">Find answers to common questions about LearnFlow.</p>
                </div>
                <div className="space-y-4">
                  {FAQ_ITEMS.map((faq, i) => (
                    <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-indigo-200'}`}>
                      <button type="button" onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className={`w-full p-6 flex justify-between items-center text-left font-bold transition-colors ${openFaqIndex === i ? (isDarkMode ? 'text-indigo-400 bg-indigo-500/5' : 'text-indigo-700 bg-indigo-50/30') : (isDarkMode ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50')}`}>
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-indigo-500' : 'text-slate-500'}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                        <div className={`p-6 pt-0 text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <div className={`h-px mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-10 rounded-3xl text-center border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900'}`}>
                  <HelpCircle className="mx-auto mb-4 text-indigo-400" size={40} />
                  <h3 className="text-2xl font-black mb-2 italic uppercase text-white">Still need help?</h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium">Our support team is available 24/7 to assist you with your professional learning journey.</p>
                  <a href="https://chat.whatsapp.com/GbVG6rVZQjTAvOmF9p4Jyn?mode=gi_t" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20">Contact Support</a>
                </div>
              </div>
            )}

            {/* Jobs */}
            {activeTab === 'jobs' && (
              <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                <BackButton onClick={goBack} isDarkMode={isDarkMode} />
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-700' : 'bg-slate-50 text-slate-200'}`}>
                  <Briefcase size={48} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase italic">Jobs Catalog</h2>
                  <p className={`font-bold uppercase text-[10px] tracking-[0.4em] ${isDarkMode ? 'text-indigo-400/50' : 'text-slate-400'}`}>Syncing with global talent network...</p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <footer className={`border-t pt-20 pb-10 px-8 lg:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                {[
                  { title: 'LearnFlow', links: ['About', 'Leadership', 'Careers', 'Catalog'] },
                  { title: 'Products', links: ['Professional Certs', 'Degrees', 'For Enterprise', 'For Campus'] },
                  { title: 'Community', links: ['Learners', 'Partners', 'Blog', 'Tech Blog'] },
                  { title: 'Support', links: ['Help Center', 'Contact', 'Affiliates'] },
                ].map(col => (
                  <div key={col.title} className="space-y-6">
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-500">{col.title}</h4>
                    <ul className={`space-y-3 text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {col.links.map(l => <li key={l} className="hover:text-indigo-500 cursor-pointer transition-colors">{l}</li>)}
                    </ul>
                  </div>
                ))}
                <div className="col-span-2 lg:col-span-1 space-y-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-black italic">C</div>
                    <span className={`font-black italic text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>learnflow</span>
                  </div>
                  <div className="flex gap-5">
                    {[Facebook, Linkedin, Twitter, Youtube].map((Icon, i) => (
                      <Icon key={i} size={22} className="text-slate-500 hover:text-indigo-500 cursor-pointer transition-all" />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`border-t pt-10 flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2026 LearnFlow Inc. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {['Terms', 'Privacy', 'Accessibility', 'Cookies'].map(l => (
                    <span key={l} className="hover:text-indigo-500 cursor-pointer">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
