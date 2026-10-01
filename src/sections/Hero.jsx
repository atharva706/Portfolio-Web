// Hero — cinematic dark editorial
// Visual stack (back → front):
//   1. #000 base
//   2. Grid lines (fade bottom)
//   3. Three vivid aurora orbs (different radii + drift timings)
//   4. Cursor spotlight (900px radial, follows mouse)
//   5. Floating glass chips (xl only, independent drift)
//   6. Main 2-col content
//   7. Dual-direction marquee footer

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowDown, FiCode, FiZap } from 'react-icons/fi'
import { SiLeetcode, SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si'
import personalInfo from '../data/personalInfo'

// ─── Config ─────────────────────────────────────────────────────────
const ROLES  = ['Full Stack Developer','MERN Stack Developer','React Engineer','Node.js Developer','Problem Solver']
const CHARS  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*!?'
// Marquee only — does NOT duplicate the Skills section grid
const MARQUEE_TECH = ['React','Node.js','Express','MongoDB','JavaScript','Tailwind','MySQL','REST APIs','Git','DSA','C++','Vercel']

// Floaters show personality/identity context, not tech stack (that lives in Skills)
const FLOATERS = [
  { icon: <FiCode     size={13}/>, label: 'Full Stack',   cls:'float-a', style:{ top:'17%',  left:'6%'   }, delay:1.5 },
  { icon: <SiLeetcode size={13}/>, label: '100+ DSA',     cls:'float-b', style:{ top:'58%',  left:'4%'   }, delay:1.7 },
  { icon: <FiZap      size={13}/>, label: 'Open to Work', cls:'float-c', style:{ top:'33%',  right:'5%'  }, delay:1.9 },
  { icon: <SiMongodb  size={13}/>, label: 'MERN Stack',   cls:'float-a', style:{ top:'70%',  right:'7%'  }, delay:2.1 },
  { icon: <SiReact    size={13}/>, label: 'React Dev',    cls:'float-b', style:{ top:'10%',  right:'15%' }, delay:2.3 },
]

// ─── Text scramble role roller ───────────────────────────────────────
function RoleScramble() {
  const [idx, setIdx]     = useState(0)
  const [text, setText]   = useState(ROLES[0])
  const raf  = useRef(null)
  const iter = useRef(0)

  const scrambleTo = useCallback(target => {
    cancelAnimationFrame(raf.current); iter.current = 0
    const total = target.length * 3
    const step = () => {
      setText(target.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < Math.floor(iter.current / 3)) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      iter.current++
      if (iter.current < total) raf.current = requestAnimationFrame(step)
      else setText(target)
    }
    raf.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const next = (idx + 1) % ROLES.length
      setIdx(next); scrambleTo(ROLES[next])
    }, 3200)
    return () => { clearInterval(id); cancelAnimationFrame(raf.current) }
  }, [idx, scrambleTo])

  return (
    <span className="gradient-shimmer font-mono font-bold"
      style={{ minWidth: '22ch', display:'inline-block', fontSize:'inherit' }}
      aria-label={ROLES[idx]}>
      {text}
    </span>
  )
}

// ─── Char-by-char name reveal ─────────────────────────────────────────
function AnimatedName({ name }) {
  const words = name.split(' ')
  let charOff = 0
  return (
    <h1 className="font-display font-extrabold text-white leading-[0.93] tracking-[-0.035em] select-none"
      style={{ fontSize:'clamp(3rem,8.5vw,7rem)' }}>
      {words.map((word, wi) => {
        const start = charOff; charOff += word.length + 1
        return (
          <span key={wi} className="block">
            {word.split('').map((ch, ci) => (
              <span key={ci} className="char-clip">
                <motion.span className="char-inner"
                  initial={{ y:'110%', opacity:0 }}
                  animate={{ y:'0%',   opacity:1 }}
                  transition={{ duration:0.65, ease:[0.16,1,0.3,1], delay:0.15+(start+ci)*0.028 }}>
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────
function MagBtn({ children, className, style, onClick, href, target, rel }) {
  const ref = useRef(null)
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const sx = useSpring(mx,{stiffness:260,damping:18}); const sy = useSpring(my,{stiffness:260,damping:18})
  const onMove  = e => { const r=ref.current?.getBoundingClientRect(); if(!r)return; mx.set((e.clientX-r.left-r.width/2)*0.28); my.set((e.clientY-r.top-r.height/2)*0.28) }
  const onLeave = () => { mx.set(0); my.set(0) }
  const Tag = href ? motion.a : motion.button
  return (
    <Tag ref={ref} style={{x:sx,y:sy,...style}} onMouseMove={onMove} onMouseLeave={onLeave}
      onClick={onClick} href={href} target={target} rel={rel} className={className}>
      {children}
    </Tag>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────
function Counter({ end, suffix='', duration=1600 }) {
  const [val,setVal] = useState(0)
  const ref=useRef(null); const started=useRef(false)
  useEffect(()=>{
    const el=ref.current; if(!el)return
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true; const t0=performance.now()
        const tick=now=>{ const p=Math.min((now-t0)/duration,1); setVal(Math.floor((1-Math.pow(2,-10*p))*end)); if(p<1)requestAnimationFrame(tick); else setVal(end) }
        requestAnimationFrame(tick)
      }
    },{threshold:0.5})
    obs.observe(el); return()=>obs.disconnect()
  },[end,duration])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── HERO ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { name, bio, social, email } = personalInfo
  const secRef = useRef(null)

  useEffect(()=>{
    const el=secRef.current; if(!el)return
    const move=e=>{ const r=el.getBoundingClientRect(); el.style.setProperty('--mx',`${((e.clientX-r.left)/r.width)*100}%`); el.style.setProperty('--my',`${((e.clientY-r.top)/r.height)*100}%`) }
    el.addEventListener('mousemove',move)
    return()=>el.removeEventListener('mousemove',move)
  },[])

  const fade = (delay=0,y=28) => ({
    initial:{opacity:0,y}, animate:{opacity:1,y:0},
    transition:{duration:0.7,ease:[0.16,1,0.3,1],delay}
  })

  return (
    <section id="hero" ref={secRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{background:'var(--t-bg)','--mx':'50%','--my':'45%'}}>

      {/* Grid */}
      <div className="hero-grid" aria-hidden />
      {/* Spotlight */}
      <div className="spotlight" aria-hidden />

      {/* Aurora 1 — purple, top-left */}
      <div aria-hidden className="aurora-1 absolute pointer-events-none"
        style={{top:'-15%',left:'-10%',width:750,height:750,borderRadius:'50%',
          background:'radial-gradient(circle,var(--t-glow-1) 0%,rgba(var(--t-primary-rgb),0.22) 38%,transparent 68%)',
          filter:'blur(72px)'}}/>
      {/* Aurora 2 — violet, bottom-right */}
      <div aria-hidden className="aurora-2 absolute pointer-events-none"
        style={{bottom:'-8%',right:'-8%',width:650,height:650,borderRadius:'50%',
          background:'radial-gradient(circle,var(--t-glow-2) 0%,var(--t-glow-2) 42%,transparent 68%)',
          filter:'blur(80px)'}}/>
      {/* Aurora 3 — fuchsia, centre */}
      <div aria-hidden className="aurora-3 absolute pointer-events-none"
        style={{top:'25%',left:'45%',width:500,height:500,borderRadius:'50%',
          background:'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter:'blur(65px)'}}/>

      {/* Floating chips */}
      {FLOATERS.map(({icon,label,cls,style,delay})=>(
        <motion.div key={label}
          initial={{opacity:0,scale:0.65,y:10}} animate={{opacity:1,scale:1,y:0}}
          transition={{delay,duration:0.6,ease:[0.16,1,0.3,1]}}
          className={`${cls} absolute hidden xl:flex items-center gap-2 z-10
                      px-3 py-1.5 rounded-xl text-[11px] font-medium text-white/55
                      border border-white/[0.09] pointer-events-none`}
          style={{...style,background:'var(--t-glass-bg)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)'}}>
          <span className="text-primary/80">{icon}</span>{label}
        </motion.div>
      ))}

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 flex-1 flex items-center
                      px-5 md:px-12 lg:px-20 pt-28 pb-8
                      max-w-[1360px] w-full mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col">

            {/* Availability */}
            <motion.div {...fade(0.08)} className="mb-8 w-fit">
              <span className="flex items-center gap-2.5 px-4 py-2 rounded-full
                               border border-white/[0.1] text-[11px] font-semibold
                               uppercase tracking-[0.16em] text-white/50"
                style={{background:'var(--t-card)',backdropFilter:'blur(12px)'}}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="ping-dot absolute inset-0 rounded-full bg-emerald-400"/>
                  <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400"/>
                </span>
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="mb-6"><AnimatedName name={name}/></div>

            {/* Role */}
            <motion.div {...fade(1.0)} className="flex flex-wrap items-baseline gap-2 mb-7"
              style={{fontSize:'clamp(1rem,2.2vw,1.3rem)'}}>
              <span className="text-white/45 font-medium">I build as a</span>
              <RoleScramble/>
            </motion.div>

            {/* Bio */}
            <motion.p {...fade(1.15)}
              className="max-w-[500px] leading-[1.95] mb-10 text-white/35"
              style={{fontSize:'14.5px'}}>
              {bio}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(1.3)} className="flex flex-wrap gap-3 mb-10">
              <MagBtn
                onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
                className="btn-shine group relative inline-flex items-center gap-2
                           text-[13px] font-semibold px-7 py-3.5 rounded-xl text-white"
                style={{background:'linear-gradient(135deg,#6C63FF,#a855f7)',
                  boxShadow:'0 0 32px rgba(var(--t-primary-rgb),0.40),0 4px 20px rgba(var(--t-primary-rgb),0.28)'}}>
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span animate={{x:[0,3,0]}} transition={{duration:1.8,repeat:Infinity,ease:'easeInOut'}}>
                    <FiArrowRight size={14} strokeWidth={2.5}/>
                  </motion.span>
                </span>
              </MagBtn>

              <MagBtn
                onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="inline-flex items-center gap-2 text-[13px] font-semibold
                           px-7 py-3.5 rounded-xl text-white/55 hover:text-white
                           border border-white/[0.1] hover:border-white/20
                           hover:bg-white/[0.05] transition-all duration-200"
                style={{backdropFilter:'blur(12px)'}}>
                Get in touch
              </MagBtn>
            </motion.div>

            {/* Socials */}
            <motion.div {...fade(1.45)} className="flex items-center gap-5">
              {[
                social.github   && {href:social.github,   icon:<FiGithub   size={18}/>, label:'GitHub'  },
                social.linkedin && {href:social.linkedin, icon:<FiLinkedin size={18}/>, label:'LinkedIn' },
                social.leetcode && {href:social.leetcode, icon:<SiLeetcode size={17}/>, label:'LeetCode' },
                {href:`mailto:${email}`, icon:<FiMail size={18}/>, label:'Email'},
              ].filter(Boolean).map(({href,icon,label})=>(
                <motion.a key={label} href={href}
                  target={href.startsWith('mailto')?undefined:'_blank'}
                  rel="noopener noreferrer" aria-label={label}
                  whileHover={{y:-4,scale:1.22}} whileTap={{scale:0.85}}
                  className="text-white/25 hover:text-primary transition-colors duration-200">
                  {icon}
                </motion.a>
              ))}
              <span className="w-px h-5 bg-white/10 mx-1"/>
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/18">
                Pune · India
              </span>
            </motion.div>
          </div>

          {/* ══ RIGHT ══ */}
          <motion.div
            initial={{opacity:0,x:50,y:20}} animate={{opacity:1,x:0,y:0}}
            transition={{duration:0.9,ease:[0.16,1,0.3,1],delay:0.45}}
            className="hidden lg:flex flex-col gap-3">

            {/* Identity card — who I am at a glance */}
            <div className="border-glow-card rounded-2xl p-5 border border-white/[0.07]"
              style={{background:'var(--t-card)',backdropFilter:'blur(20px)'}}>
              <div className="flex items-center gap-3 mb-5">
                {/* Avatar with orbit */}
                <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden"
                  style={{background:'linear-gradient(135deg,#6C63FF,#a855f7)'}}>
                  <motion.div animate={{rotate:360}} transition={{duration:18,repeat:Infinity,ease:'linear'}}
                    className="absolute inset-0 rounded-xl"
                    style={{background:'conic-gradient(from 0deg,transparent 70%,rgba(255,255,255,0.45) 100%)'}}/>
                  <div className="absolute inset-[3px] rounded-[9px] flex items-center justify-center"
                    style={{background:'linear-gradient(135deg,#0a0a0a,#1a0a2e)'}}>
                    <span className="font-display font-extrabold text-[14px] text-white">AK</span>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white/85">Atharva Kulkarni</p>
                  <p className="text-[11px] text-white/35">B.Tech · SGGSIE&T Nanded · 2026</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20"
                  style={{background:'rgba(16,185,129,0.08)'}}>
                  <motion.span animate={{scale:[1,1.4,1],opacity:[1,0.4,1]}}
                    transition={{duration:2,repeat:Infinity}}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"/>
                  <span className="text-[10px] text-emerald-400 font-semibold">Available</span>
                </div>
              </div>
              {/* Tagline — not the full bio (that lives in About) */}
              <p className="text-[12.5px] leading-[1.8] text-white/42 mb-5">
                {personalInfo.tagline}
              </p>
              {/* Quick action links */}
              <div className="flex gap-2">
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}
                  className="flex-1 py-2 rounded-xl text-[11px] font-semibold text-white/50
                             border border-white/[0.08] hover:border-white/15 hover:text-white/75
                             transition-all duration-200"
                  style={{background:'var(--t-card)'}}>
                  About me →
                </motion.button>
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
                  className="flex-1 py-2 rounded-xl text-[11px] font-semibold text-white/50
                             border border-white/[0.08] hover:border-primary/35 hover:text-white/75
                             transition-all duration-200"
                  style={{background:'var(--t-card)'}}>
                  My work →
                </motion.button>
              </div>
            </div>

            {/* Project teasers — 3 cards, no full detail (Projects section owns that) */}
            <div className="rounded-2xl p-4 border border-white/[0.07]"
              style={{background:'var(--t-card)',backdropFilter:'blur(12px)'}}>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/28 mb-3">
                Featured Work
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { name: "FW3 — Farmer's Portal",  tag: 'MERN'     },
                  { name: 'CampusConnect',           tag: 'MERN'     },
                  { name: 'NewsCom',                 tag: 'React API' },
                ].map(({ name, tag }) => (
                  <div key={name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl
                               border border-white/[0.06] group cursor-default
                               hover:border-primary/25 transition-all duration-200"
                    style={{background:'var(--t-card)'}}>
                    <span className="text-[11.5px] text-white/50 group-hover:text-white/75 transition-colors duration-200">
                      {name}
                    </span>
                    <span className="text-[9px] font-mono font-medium text-white/22
                                     border border-white/[0.07] px-2 py-0.5 rounded"
                      style={{background:'var(--t-card)'}}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{x:3}} whileTap={{scale:0.97}}
                onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
                className="mt-3 w-full text-center text-[10.5px] font-semibold text-primary/60
                           hover:text-primary transition-colors duration-200">
                View all projects →
              </motion.button>
            </div>

            {/* Resume CTA */}
            <motion.a href="/Atharva_Kulkarni_Resume.pdf" target="_blank" rel="noopener noreferrer"
              whileHover={{scale:1.02,y:-2}} whileTap={{scale:0.98}}
              className="group flex items-center justify-between rounded-2xl px-5 py-4
                         border transition-all duration-300"
              style={{background:'rgba(var(--t-primary-rgb),0.07)',borderColor:'rgba(var(--t-primary-rgb),0.22)',backdropFilter:'blur(12px)'}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 16px 44px rgba(var(--t-primary-rgb),0.22)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div>
                <p className="text-[12.5px] font-semibold text-white/80 mb-0.5">View full résumé</p>
                <p className="text-[11px] text-white/30">PDF · Updated 2026</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center
                              border border-primary/25 bg-primary/15
                              group-hover:bg-primary group-hover:border-primary
                              group-hover:shadow-lg group-hover:shadow-primary/35
                              transition-all duration-250">
                <FiArrowRight size={14} className="text-primary group-hover:text-white transition-colors duration-200"/>
              </div>
            </motion.a>

          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5,duration:1}}
        className="relative z-10 flex flex-col items-center gap-1.5 pb-6 scroll-bounce">
        <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/14">scroll</span>
        <FiArrowDown size={11} className="text-white/14"/>
      </motion.div>

      {/* Dual marquee */}
      <div className="relative z-10 border-t border-white/[0.04] overflow-hidden">
        <div className="marquee-wrap py-2.5 border-b border-white/[0.025]">
          <div className="marquee">
            {[...MARQUEE_TECH,...MARQUEE_TECH,...MARQUEE_TECH].map((t,i)=>(
              <span key={i} className="inline-flex items-center gap-3 px-5 text-[10px] font-mono
                                       font-medium uppercase tracking-[0.18em] text-white/18 whitespace-nowrap">
                {t}<span className="w-[3px] h-[3px] rounded-full bg-primary/35 flex-shrink-0"/>
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-wrap py-2.5">
          <div className="marquee-rev">
            {[...MARQUEE_TECH,...MARQUEE_TECH,...MARQUEE_TECH].reverse().map((t,i)=>(
              <span key={i} className="inline-flex items-center gap-3 px-5 text-[10px] font-mono
                                       font-medium uppercase tracking-[0.18em] text-white/12 whitespace-nowrap">
                {t}<span className="w-[3px] h-[3px] rounded-full bg-violet-400/25 flex-shrink-0"/>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
