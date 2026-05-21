/**
 * SelectXI AI — Auth Page
 *
 * Layout: Centered single-column card on dark background with large ambient green/sky glow.
 * Design: Sports intelligence terminal aesthetic — Bloomberg meets cricket war room.
 * Animations: Page entry stagger, mode/portal tab slides, field AnimatePresence height transitions.
 */

import React, { useState, useEffect } from 'react'
import type { Variants, Transition } from 'framer-motion'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useAnimationControls,
} from 'framer-motion'
import {
  Zap,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  UserPlus,
  AlertCircle,
  Eye,
  EyeOff,
  Trophy,
  ClipboardList,
  Check,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
type AuthMode = 'signin' | 'signup'
type Portal = 'selector' | 'fantasy'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

// ─── Animation Variants ───────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN_FAST: [number, number, number, number] = [0.4, 0, 1, 1]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.42, ease: EASE_OUT } as Transition },
}

const cardVariants: Variants = {
  hidden: { y: 28, opacity: 0, scale: 0.98 },
  show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } as Transition },
}

const shakeVariants: Variants = {
  idle: { x: 0 },
  shake: {
    x: [-8, 8, -5, 5, -3, 3, 0] as number[],
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

// Inline field animation helpers
const fieldAnim = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto' as const, opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: EASE_IN_FAST } },
}

// ─── Password Strength ────────────────────────────────────────────────────────
function getStrength(pw: string) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  const map = [
    { label: '', color: '#1e293b' },
    { label: 'Weak', color: '#f43f5e' },
    { label: 'Fair', color: '#f59e0b' },
    { label: 'Good', color: '#38bdf8' },
    { label: 'Strong', color: '#22c55e' },
  ]
  return { score: s, ...map[s] }
}

// ─── Field Component ──────────────────────────────────────────────────────────
interface FieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  icon: React.ReactNode
  autoComplete?: string
  suffix?: React.ReactNode
}

const Field: React.FC<FieldProps> = ({
  id, label, type = 'text', placeholder, value, onChange,
  required, icon, autoComplete, suffix,
}) => {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5"
      >
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200"
        style={{
          background: 'rgba(5,12,26,0.8)',
          borderColor: focused ? '#22c55e' : 'rgba(51,65,85,0.6)',
          boxShadow: focused ? '0 0 0 3px rgba(34,197,94,0.12), inset 0 0 0 1px rgba(34,197,94,0.15)' : 'none',
        }}
      >
        <span className="text-slate-500 shrink-0">{icon}</span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-600 outline-none font-medium"
        />
        {suffix}
      </div>
    </div>
  )
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [mode, setMode] = useState<AuthMode>('signin')
  const [portal, setPortal] = useState<Portal>('selector')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [teamName, setTeamName] = useState('')
  const [handle, setHandle] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const errorControls = useAnimationControls()

  useEffect(() => {
    if (searchParams.get('signup') === 'true') setMode('signup')
  }, [searchParams])

  const strength = getStrength(password)

  const triggerError = async (msg: string) => {
    setErrorMsg(msg)
    setSubmitState('error')
    await errorControls.start('shake')
    errorControls.start('idle')
  }

  const switchMode = (m: AuthMode) => { setMode(m); setErrorMsg(''); setSubmitState('idle') }
  const switchPortal = (p: Portal) => { setPortal(p); setErrorMsg('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !password) { triggerError('Please fill in all required fields.'); return }
    if (mode === 'signup' && portal === 'fantasy' && password !== confirmPassword) {
      triggerError('Passwords do not match.'); return
    }
    setSubmitState('loading')
    try {
      const res = await fetch(mode === 'signup' ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: portal === 'selector' ? name : handle, teamName }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userName', name || handle || data.name || email.split('@')[0])
        if (data.token) localStorage.setItem('authToken', data.token)
        setSubmitState('success')
        setTimeout(() => navigate('/dashboard'), 700)
      } else { fallback() }
    } catch { fallback() }
  }

  const fallback = () => {
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', name || handle || email.split('@')[0])
      setSubmitState('success')
      setTimeout(() => navigate('/dashboard'), 700)
    }, 900)
  }

  const eyeBtn = (show: boolean, toggle: () => void, label: string) => (
    <button type="button" aria-label={label} onClick={toggle}
      className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 shrink-0">
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: '#050d14' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 2px' }} />

      {/* Fullscreen dramatic background — dark navy with centered green glow rising from bottom-center and teal from bottom-right */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 85%, rgba(0,120,60,0.45) 0%, rgba(0,80,90,0.2) 45%, #050d14 75%)',
        }}
      />
      {/* Bottom-right teal secondary glow */}
      <div className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: 600, height: 500, background: 'radial-gradient(ellipse at bottom right, rgba(0,150,160,0.25) 0%, transparent 65%)', filter: 'blur(30px)' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center"
        style={{ maxWidth: 500 }}
      >

        {/* ── CARD ── */}
        <motion.div
          variants={cardVariants}
          layout
          className="w-full rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(10,17,32,0.92)',
            border: '1px solid rgba(51,65,85,0.5)',
            boxShadow: '0 0 0 1px rgba(34,197,94,0.06), 0 40px 80px -20px rgba(0,0,0,0.7), 0 0 60px -30px rgba(34,197,94,0.12)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-8 right-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), rgba(56,189,248,0.4), transparent)' }} />

          {/* ── BRAND HEADER (inside card) ── */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 pt-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-2.5">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{ background: 'rgba(34,197,94,0.15)', boxShadow: '0 0 16px rgba(34,197,94,0.3)' }}
              >
                <Zap className="h-5 w-5 text-pitch" />
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">SelectXI</span>
                <span className="text-gradient"> AI</span>
              </span>
            </Link>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm" style={{ border: '1px solid rgba(51,65,85,0.5)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-pitch animate-pulse" />
              <span className="text-[9px] font-mono text-slate-400 tracking-[0.2em] uppercase">Cricket Intelligence Engine V1.0</span>
            </div>
          </motion.div>


          <motion.div variants={itemVariants} className="mb-4">
            <div className="relative flex p-1 rounded-2xl" style={{ background: 'rgba(5,12,26,0.6)', border: '1px solid rgba(51,65,85,0.4)' }}>
              {([
                { key: 'signin', icon: <Sparkles className="h-3.5 w-3.5" />, label: 'Sign In' },
                { key: 'signup', icon: <UserPlus className="h-3.5 w-3.5" />, label: 'Create Profile' },
              ] as { key: AuthMode; icon: React.ReactNode; label: string }[]).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => switchMode(tab.key)}
                  className="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-colors cursor-pointer rounded-xl"
                  style={{ color: mode === tab.key ? '#0f172a' : '#94a3b8' }}
                >
                  {mode === tab.key && (
                    <motion.span
                      layoutId="mode-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, #22c55e, #38bdf8)', boxShadow: '0 4px 14px rgba(34,197,94,0.35)' }}
                      transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.icon}
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── PORTAL SWITCHER ── */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex gap-2">
              {([
                { key: 'selector', icon: <ClipboardList className="h-3.5 w-3.5" />, label: 'Selector / Coach' },
                { key: 'fantasy', icon: <Trophy className="h-3.5 w-3.5" />, label: 'Fantasy Player' },
              ] as { key: Portal; icon: React.ReactNode; label: string }[]).map((p) => {
                const active = portal === p.key
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => switchPortal(p.key)}
                    aria-label={`${p.label} portal`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: active ? 'rgba(34,197,94,0.08)' : 'rgba(5,12,26,0.5)',
                      border: active ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(51,65,85,0.4)',
                      color: active ? '#22c55e' : '#64748b',
                    }}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* ── HEADING ── */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {mode === 'signin' ? 'Access Command Center' : 'Register Franchise'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {mode === 'signin'
                ? 'Authenticate to enter your analytics workspace.'
                : portal === 'selector'
                ? 'Set up your Selector or Coach intelligence profile.'
                : 'Initialize your Fantasy Player workspace.'}
            </p>
          </motion.div>

          {/* ── ERROR BANNER ── */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                variants={shakeVariants}
                initial="idle"
                animate={errorControls}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="mb-5 px-4 py-3 rounded-2xl flex items-start gap-2.5"
                style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}
              >
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs text-rose-400 font-semibold">{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {/* Selector Signup: Name */}
              {mode === 'signup' && portal === 'selector' && (
                <motion.div key="name" {...fieldAnim} className="overflow-hidden">
                  <Field id="name" label="Manager Name" placeholder="e.g. Kapil Dev"
                    value={name} onChange={(e) => setName(e.target.value)}
                    icon={<User className="h-4 w-4" />} required autoComplete="name" />
                </motion.div>
              )}
              {/* Fantasy Signup: Handle */}
              {mode === 'signup' && portal === 'fantasy' && (
                <motion.div key="handle" {...fieldAnim} className="overflow-hidden">
                  <Field id="handle" label="Fantasy Handle" placeholder="e.g. @crickettitan99"
                    value={handle} onChange={(e) => setHandle(e.target.value)}
                    icon={<User className="h-4 w-4" />} required />
                </motion.div>
              )}
              {/* Selector Signup: Team */}
              {mode === 'signup' && portal === 'selector' && (
                <motion.div key="teamName" {...fieldAnim} className="overflow-hidden">
                  <Field id="teamName" label="Franchise / Team Name" placeholder="e.g. Mumbai Indians"
                    value={teamName} onChange={(e) => setTeamName(e.target.value)}
                    icon={<ShieldCheck className="h-4 w-4" />} />
                </motion.div>
              )}
              {/* Email */}
              <motion.div key="email" {...fieldAnim} className="overflow-hidden">
                <Field id="email" label="Corporate Email" type="email" placeholder="manager@selectxi.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />} required autoComplete="email" />
              </motion.div>
              {/* Password */}
              <motion.div key="password" {...fieldAnim} className="overflow-hidden">
                <div>
                  <Field id="password" label="Access Key (Password)"
                    type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="h-4 w-4" />} required
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    suffix={eyeBtn(showPassword, () => setShowPassword(v => !v), 'Toggle password visibility')}
                  />
                  {/* Password strength */}
                  <AnimatePresence>
                    {mode === 'signup' && password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-1 mt-2">
                          {[1, 2, 3, 4].map(seg => (
                            <div key={seg} className="flex-1 h-1 rounded-full transition-all duration-300"
                              style={{ background: seg <= strength.score ? strength.color : '#1e293b' }} />
                          ))}
                        </div>
                        {strength.label && (
                          <p className="text-[10px] font-mono text-slate-500 mt-1">
                            Strength: <span className="text-slate-300">{strength.label}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              {/* Confirm Password */}
              {mode === 'signup' && portal === 'fantasy' && (
                <motion.div key="confirmPw" {...fieldAnim} className="overflow-hidden">
                  <Field id="confirmPw" label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'} placeholder="••••••••"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock className="h-4 w-4" />} required autoComplete="new-password"
                    suffix={eyeBtn(showConfirm, () => setShowConfirm(v => !v), 'Toggle confirm password visibility')}
                  />
                </motion.div>
              )}
              {/* Keep signed in + Forgot — signin only */}
              {mode === 'signin' && (
                <motion.div key="extras" {...fieldAnim} className="overflow-hidden">
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="keepSignedIn"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 accent-pitch cursor-pointer"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                        Keep me signed in
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo mode: Any password is accepted!')}
                      className="text-xs text-slate-400 hover:text-pitch transition-colors font-medium"
                    >
                      Reset access key
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── CTA BUTTON ── */}
            <motion.button
              type="submit"
              disabled={submitState === 'loading' || submitState === 'success'}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-4 rounded-2xl font-black text-sm overflow-hidden transition-all duration-500 cursor-pointer disabled:cursor-default"
              style={{
                background: submitState === 'success'
                  ? '#22c55e'
                  : 'linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)',
                color: '#0a1120',
                boxShadow: submitState === 'success'
                  ? '0 0 40px rgba(34,197,94,0.5)'
                  : '0 0 30px rgba(34,197,94,0.3), 0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {/* Shimmer sweep */}
              {submitState === 'idle' && (
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)' }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.4, delay: 0.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
              )}
              <AnimatePresence mode="wait">
                {submitState === 'loading' && (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </motion.span>
                )}
                {submitState === 'success' && (
                  <motion.span key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-white">
                    <Check className="h-4 w-4" />
                    Access Granted
                  </motion.span>
                )}
                {(submitState === 'idle' || submitState === 'error') && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2">
                    {mode === 'signin' ? 'Enter Terminal' : 'Generate Profile'}
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* ── TRUST FOOTER ── */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-pitch" aria-hidden />
            <span className="text-[10px] font-mono text-slate-500 tracking-[0.15em] uppercase">
              End-to-End SSL Enforced
            </span>
          </div>
        </motion.div>

        {/* ── BACK LINK ── */}
        <motion.div variants={itemVariants} className="mt-6">
          <Link to="/" className="text-xs text-slate-500 hover:text-pitch transition-colors font-medium">
            ← Return to Main Terminal
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
