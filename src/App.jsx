import { useEffect, useRef, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL
const pathId = () => {
  const p = window.location.pathname
  return (p.startsWith(BASE) ? p.slice(BASE.length) : p.slice(1)).replace(/\/$/, '')
}
const PHONE = '+91 90325 10000'
const TEL = 'tel:+919032510000'
const WA = 'https://wa.me/919032510000?text=Hi%20MAX%20Hair%20Clinic%2C%20I%20want%20to%20book%20an%20appointment'
const MAP = 'https://www.google.com/maps/search/?api=1&query=MAX+Hair+Clinic+Road+No+36+Jubilee+Hills+Hyderabad'
const IMG = 'https://mymaxhair.com/wp-content/uploads/'

const NAV = [
  ['options', 'Options'], ['journey', 'Journey'], ['compare', 'Compare'],
  ['why', 'Why Us'], ['faqs', 'FAQs'], ['contact', 'Contact'],
]

const OPTIONS = [
  ['Sapphire FUE Hair Transplant', 'Advanced Sapphire blade technology used for creating recipient channels during FUE hair transplantation.'],
  ['FUE Hair Transplant', 'A hair transplantation technique involving individual follicular unit extraction from the donor area.'],
  ['DHI Hair Transplant', 'A hair transplantation approach using an implantation device for placing extracted hair follicles.'],
  ['IGM Hair Transplant', 'Explore the IGM hair transplant approach offered at MAX Hair Clinic.'],
  ['Beard Hair Transplant', 'Hair transplantation for beard restoration and enhancement.'],
  ['Eyebrow Hair Transplant', 'Hair restoration options for eyebrow enhancement.'],
]

const COMPARE = [
  ['Blade', 'Sapphire blades', 'Conventional metal blades'],
  ['Technology', 'Sapphire blade technology', 'Traditional channel creation tools'],
  ['Channel creation', 'Channel creation using sapphire blades', 'Channel creation using conventional blades'],
]

const SAPPHIRE = [
  'Precise recipient channel planning',
  'Hairline design based on facial proportions',
  'Attention to natural hair direction and angle',
  'Personalized graft planning',
  'Surgeon-led treatment assessment',
]

const WHY = [
  ['22+', 'Years of Experience', 'In hair restoration'],
  ['NABH', 'Accredited Hair Clinic', "India's first NABH accredited hair clinic"],
  ['5 Lakh+', 'Clients Served', 'Across every stage of hair loss'],
]
const WHY_LIST = ['Surgeon-Led Treatment Planning', 'Multiple Hair Restoration Options Under One Roof', 'Personalized Hair Transplant Assessment']

const RESULTS = [
  '2026/10/max-hair-clinic-male-pattern-baldness-treatment-hydrabad.webp',
  '2026/10/max-hair-clinic-hairline-restoration-results-hydrabad.webp',
  '2026/10/max-hair-clinic-hair-transplant-hairline-results-hydrabad.webp',
  '2026/10/max-hair-clinic-crown-hair-growth-before-after-hydrabad.webp',
  '2026/10/max-hair-clinic-hair-regrowth-before-after-hydrabad.webp',
  '2026/10/max-hair-clinic-baldness-treatment-before-after-hydrabad.webp',
  '2026/10/max-hair-clinic-hair-transplant-before-after-hydrabad.webp',
  '2026/10/max-hair-clinic-hair-thinning-treatment-results-hydrabad.webp',
]

const DOCTORS = [
  ['Dr. Tajaly Saneen', 'MBBS, MS, DrNB – Plastic & Reconstructive Surgery', 'tajaly-saneen'],
  ['Dr. Hiba Fayaz', 'Consultant', 'hiba-fayaz'],
  ['Dr. K. R. G. Aravind Kumar', 'Oral & Maxillofacial Surgeon', 'aravind-kumar'],
  ['Dr. Aswini Teja', 'Consultant', 'aswini-teja'],
]

const JOURNEY = [
  ['Book Your Appointment', 'Schedule your hair transplant consultation with MAX Hair Clinic.'],
  ['Hair & Scalp Assessment', 'Understand your hair loss pattern, donor area, and treatment requirements.'],
  ['Personalized Treatment Plan', 'Discuss suitable hair transplant techniques and your hair restoration goals.'],
  ['Hair Transplant Procedure', 'Your procedure is planned and performed according to your treatment requirements.'],
  ['Aftercare & Follow-Up', 'Receive post-procedure guidance and follow-up support throughout your recovery.'],
]

const FAQS = [
  ['What is Sapphire FUE Hair Transplant?', 'Sapphire FUE is a hair transplantation technique that uses sapphire blades for recipient channel creation during the procedure.'],
  ['Am I suitable for a hair transplant?', 'Suitability depends on your hair loss pattern, donor area, medical history, and treatment goals. A medical assessment is required.'],
  ['What is the difference between Sapphire FUE and conventional FUE?', 'The primary difference highlighted is the blade material used during recipient channel creation.'],
  ['How long does a hair transplant procedure take?', 'The duration depends on the number of grafts and individual treatment requirements.'],
  ['When can I expect hair transplant results?', 'Hair transplant results develop gradually over several months. The timeline varies between individuals.'],
  ['Is a consultation required before a hair transplant?', 'Yes. A medical assessment helps determine suitability and plan the treatment according to individual requirements.'],
  ['Can I choose between FUE, Sapphire FUE, and DHI?', 'Available techniques can be discussed during your consultation based on your treatment requirements and suitability.'],
]

const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)
const PHONE_D = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'
const USER_D = 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
const CAL_D = 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'
const STAR_D = 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z'
const CHECK_D = 'M20 6 9 17l-5-5'
const ARROW_D = 'M5 12h14M12 5l7 7-7 7'

function Reveal({ as: Tag = 'div', type = 'up', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold: 0.02, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal reveal-${type} ${seen ? 'is-in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>{children}</Tag>
}

function DocTrack({ children, cls = "grid g4 doc-track" }) {
  const ref = useRef(null)
  const hold = useRef(false)
  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current
      if (!el || hold.current || el.scrollWidth <= el.clientWidth + 4) return
      const first = el.children[0]
      const stepW = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 14)
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      el.scrollTo({ left: end ? 0 : (Math.round(el.scrollLeft / stepW) + 1) * stepW, behavior: 'smooth' })
    }, 2600)
    return () => clearInterval(t)
  }, [])
  const pause = () => (hold.current = true)
  const resume = () => setTimeout(() => (hold.current = false), 3500)
  return <div className={cls} ref={ref} onTouchStart={pause} onTouchEnd={resume} onMouseEnter={pause} onMouseLeave={resume}>{children}</div>
}

function ResultsCarousel({ className = '', interval = 3800 }) {
  const ref = useRef(null)
  const hold = useRef(false)
  const [i, setI] = useState(0)
  const step = () => {
    const el = ref.current
    const c = el && el.children[0]
    return c ? c.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 20) : 1
  }
  const go = (n) => ref.current && ref.current.scrollTo({ left: n * step(), behavior: 'smooth' })
  const onScroll = () => setI(Math.round(ref.current.scrollLeft / step()))
  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current
      if (!el || hold.current) return
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      go(end ? 0 : Math.round(el.scrollLeft / step()) + 1)
    }, interval)
    return () => clearInterval(t)
  }, [interval])
  return (
    <div className={`rc ${className}`} onMouseEnter={() => (hold.current = true)} onMouseLeave={() => (hold.current = false)} onTouchStart={() => (hold.current = true)} onTouchEnd={() => setTimeout(() => (hold.current = false), 4000)}>
      <div className="rc-track" ref={ref} onScroll={onScroll}>
        {RESULTS.map((src, n) => (
          <figure className="rc-slide" key={src}>
            <figcaption><span className="b">Before</span><span className="a">After</span></figcaption>
            <img loading="lazy" src={IMG + src} alt={`Hair transplant result ${n + 1}: before and after`} draggable="false" />
          </figure>
        ))}
      </div>
      <div className="rc-dots" role="tablist" aria-label="Results">
        {RESULTS.map((_, n) => (
          <button key={n} type="button" role="tab" aria-selected={i === n} aria-label={`Result ${n + 1}`} className={i === n ? 'on' : ''} onClick={() => go(n)} />
        ))}
      </div>
    </div>
  )
}

function CTA({ children, className = 'btn-primary btn-lg', to = 'book' }) {
  return (
    <a href={`#${to}`} className={`btn ${className}`} onClick={(e) => { e.preventDefault(); document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' }) }}>{children} <Icon d={ARROW_D} size={18} /></a>
  )
}

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [])
  const pick = (o) => { onChange(o); setOpen(false) }
  const key = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) { setHi(Math.max(0, options.indexOf(value))); setOpen(true) } else setHi((hi + 1) % options.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((hi - 1 + options.length) % options.length) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open ? pick(options[hi]) : (setHi(Math.max(0, options.indexOf(value))), setOpen(true)) }
  }
  return (
    <div className={`dd ${open ? 'open' : ''}`} ref={ref}>
      <button type="button" className="dd-btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => { setHi(Math.max(0, options.indexOf(value))); setOpen(!open) }} onKeyDown={key}>
        <span className={value ? '' : 'ph'}>{value || 'Select treatment'}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <ul className="dd-list" role="listbox">
        {options.map((o, i) => (
          <li key={o} role="option" aria-selected={o === value} className={`${o === value ? 'sel' : ''} ${i === hi ? 'hi' : ''}`}
            onMouseEnter={() => setHi(i)} onMouseDown={(e) => { e.preventDefault(); pick(o) }}>
            {o}{o === value && <Icon d={CHECK_D} size={16} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BookingForm() {
  const today = new Date().toISOString().slice(0, 10)
  const [f, setF] = useState({ name: '', phone: '', date: '', treatment: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = 'Please enter your full name'
    if (!/^(\+91)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) er.phone = 'Enter a valid 10-digit mobile number'
    if (!f.date) er.date = 'Choose a preferred date'
    setErr(er)
    if (Object.keys(er).length) return
    setBusy(true)
    // TODO: connect to your CRM / Google Ads conversion tracking here
    setTimeout(() => { setBusy(false); setSent(true) }, 900)
  }

  if (sent) {
    return (
      <div className="book-card sent">
        <span className="tick done-ring"><Icon d={CHECK_D} size={28} /></span>
        <h3>Thank you, {f.name.split(' ')[0]}!</h3>
        <p>Our team will contact you to confirm your appointment.</p>
      </div>
    )
  }
  return (
    <form className="book-card" onSubmit={submit} noValidate>
      <div className="book-head">
        <span className="pill-tag"><Icon d={PHONE_D} size={13} /> Book Appointment</span>
        <h2>Book Your <span className="gold">Hair Transplant</span> Appointment</h2>
        <p>Share your details and our team will contact you to confirm your appointment.</p>
      </div>
      <div className="book-fields">
        <label>Full Name
          <span className="inp"><Icon d={USER_D} size={18} />
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your full name" autoComplete="name" aria-invalid={!!err.name} /></span>
          {err.name && <small className="err">{err.name}</small>}
        </label>
        <label>Mobile Number
          <span className="inp"><Icon d={PHONE_D} size={18} /><em>+91</em>
            <input className="has-pre" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Mobile number" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} /></span>
          {err.phone && <small className="err">{err.phone}</small>}
        </label>
        <label>Preferred Appointment Date
          <span className="inp"><Icon d={CAL_D} size={18} />
            <input type="date" min={today} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} aria-invalid={!!err.date} /></span>
          {err.date && <small className="err">{err.date}</small>}
        </label>
        <div className="field">Treatment Interest (Optional)
          <span className="inp"><Icon d={STAR_D} size={18} />
            <Dropdown value={f.treatment} onChange={(v) => setF({ ...f, treatment: v })} options={['Sapphire FUE Hair Transplant', 'FUE Hair Transplant', 'DHI Hair Transplant', 'IGM Hair Transplant', 'Beard Hair Transplant', 'Eyebrow Hair Transplant']} /></span>
        </div>
      </div>
      <button className="btn btn-primary btn-lg book-btn" disabled={busy}>{busy ? 'Sending…' : 'Book My Appointment'}</button>
      <small className="micro"><Icon d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" size={14} /> 100% confidential. No obligation.</small>
    </form>
  )
}

function Landing() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [faq, setFaq] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const lock = useRef(NAV.some(([n]) => n === pathId()))

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1))
      setShowTop(h.scrollTop > 600)
      const y = h.scrollTop + 120
      let cur = ''
      for (const [id] of NAV) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const path = pathId()
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const goTo = () => document.getElementById(path)?.scrollIntoView({ behavior: 'smooth' })
    const known = NAV.some(([n]) => n === path)
    const t1 = known ? setTimeout(goTo, 600) : null
    const t2 = known ? setTimeout(() => {
      const el = document.getElementById(path)
      if (el && Math.abs(el.getBoundingClientRect().top - 84) > 120) goTo()
    }, 1900) : null
    const t3 = setTimeout(() => { lock.current = false }, 2300)
    const pop = () => {
      const id = pathId()
      if (!id) window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('popstate', pop)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); window.removeEventListener('popstate', pop) }
  }, [])

  useEffect(() => {
    if (lock.current) return
    const want = active ? `${BASE}${active}` : BASE
    if (window.location.pathname !== want) window.history.replaceState(null, '', want)
  }, [active])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (NAV.some(([n]) => n === id)) window.history.pushState(null, '', `${BASE}${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="nav dark">
        <div className="container nav-inner">
          <a href={BASE} className="brand" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', BASE); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <img src={`${BASE}logo.png`} alt="MAX Hair Clinic" />
          </a>
          <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={(e) => go(e, id)}>{label}</a>
            ))}
            <a href="#book" className="btn btn-primary nav-cta-m" onClick={(e) => go(e, 'book')}>Book Appointment</a>
          </nav>
          <div className="nav-actions">
            <a href={TEL} className="nav-call" aria-label={`Call ${PHONE}`}><Icon d={PHONE_D} size={18} /><span>{PHONE}</span></a>
            <a href="#book" className="btn btn-primary nav-cta" onClick={(e) => go(e, 'book')}>Book Appointment</a>
            <button className={`menu ${open ? 'on' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><i /><i /><i /></button>
          </div>
        </div>
        <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero dark">
          <span className="glow g1" /><span className="glow g2" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-eyebrow hero-in" style={{ '--i': 0 }}>MAX Hair Clinic · Hyderabad</span>
              <h1 className="hero-in" style={{ '--i': 1 }}>Sapphire FUE Hair Transplant in <span className="accent">Hyderabad</span></h1>
              <h2 className="sub hero-in" style={{ '--i': 2 }}>Restore Your Hairline with Advanced Hair Transplant Techniques</h2>
              <div className="pills hero-in" style={{ '--i': 3 }}>
                {["India's First NABH Accredited Hair Clinic", '22+ Years of Experience', 'Surgeon-Led Care'].map((t) => <span key={t}>{t}</span>)}
              </div>
              <p className="lead hero-in" style={{ '--i': 4 }}>Explore personalized hair transplant options planned by experienced surgeons based on your hair loss pattern, donor area, and aesthetic goals.</p>
              <div className="cta-row hero-in" style={{ '--i': 5 }}>
                <CTA className="btn-gold btn-lg">Book Your Appointment</CTA>
                <a href={TEL} className="btn btn-outline btn-lg"><Icon d={PHONE_D} size={18} /> Call Now</a>
              </div>
            </div>
            <div className="ba-show hero-in" style={{ '--i': 3 }}>
              <ResultsCarousel className="rc-hero" interval={2000} />
            </div>
          </div>
          <p className="container fine hero-in" style={{ '--i': 6 }}>Results vary based on individual hair loss, donor area, graft availability, and treatment plan.</p>
        </section>

        {/* BOOKING */}
        <section className="book" id="book">
          <div className="container"><Reveal><BookingForm /></Reveal></div>
        </section>

        {/* OPTIONS */}
        <section className="section dark slate" id="options">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Explore Hair Transplant Options</span>
              <h2>Personalized Hair Restoration Solutions</h2>
              <p>Explore hair transplant options designed around your hair loss pattern, donor area, and treatment goals.</p></Reveal>
            <div className="grid g3">
              {OPTIONS.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 3) * 90} className="card"><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <Reveal className="center mt"><CTA className="btn-dark btn-lg">Book a Hair Transplant Consultation</CTA></Reveal>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section" id="journey">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Your Hair Transplant Journey</span><h2>What to Expect</h2></Reveal>
            <ol className="steps">
              {JOURNEY.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90}><span className="step-n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </ol>
            <Reveal className="center mt"><CTA>Schedule Your Hair Assessment</CTA></Reveal>
          </div>
        </section>

        {/* COMPARE */}
        <section className="section line" id="compare">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Sapphire FUE vs Conventional FUE</span>
              <h2>Understanding the Difference Between<br className="br-d" /> Sapphire FUE and Conventional FUE</h2>
              <p>Both techniques involve follicular unit extraction. The primary difference highlighted here is the blade material used during recipient channel creation.</p></Reveal>
            <div className="cmp-wrap">
              <Reveal className="cmp-img"><img loading="lazy" src={IMG + '2026/08/sapphire-ht-1024x437.webp'} alt="Surgeon creating recipient channels with a sapphire blade during a hair transplant" width="1024" height="437" /></Reveal>
            <Reveal className="cmp">
                <div className="cmp-row cmp-top"><span /><b>Sapphire FUE</b><b>Conventional FUE</b></div>
                {COMPARE.map(([k, a, b]) => (
                  <div className="cmp-row" key={k}><span className="k">{k}</span><span>{a}</span><span>{b}</span></div>
                ))}
              </Reveal>
            </div>
            <Reveal className="center mt"><p className="fine">The suitability of each technique depends on your hair loss pattern, donor area, and treatment requirements.</p>
              <CTA className="btn-dark btn-lg">Discuss Your Hair Transplant Options</CTA></Reveal>
          </div>
        </section>

        {/* SAPPHIRE */}
        <section className="section dark" id="sapphire">
          <div className="container split">
            <Reveal>
              <span className="eyebrow">Why Consider Sapphire FUE?</span>
              <h2>Advanced Hair Transplant Planning</h2>
              <p>Sapphire FUE uses sapphire blades for recipient channel creation during hair transplantation.</p>
              <p className="fine left">Every hair transplant plan is customized according to individual requirements.</p>
              <CTA>Book Your Consultation</CTA>
            </Reveal>
            <Reveal delay={150}>
              <ul className="ticks">{SAPPHIRE.map((c) => <li key={c}><span className="ck"><Icon d={CHECK_D} size={14} /></span>{c}</li>)}</ul>
            </Reveal>
          </div>
        </section>

        {/* WHY */}
        <section className="section line" id="why">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Why MAX Hair Clinic?</span><h2>Your Hair Restoration Journey at MAX</h2></Reveal>
            <div className="grid g3 stats-grid">
              {WHY.map(([n, t, d], i) => (
                <Reveal key={t} delay={i * 100} className="card stat"><b>{n}</b><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <Reveal className="chiprow">{WHY_LIST.map((x) => <span key={x}><Icon d={CHECK_D} size={14} />{x}</span>)}</Reveal>
            <Reveal className="center"><p className="note">At MAX Hair Clinic, your hair restoration journey begins with understanding your hair loss and identifying suitable treatment options.</p>
              <CTA>Schedule Your Appointment</CTA></Reveal>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section line" id="results">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Real Patient Results</span><h2><span className="tone">Hair</span> Transplant <span className="tone">Results</span></h2>
              <p>Explore actual hair transplant results from patients treated at MAX Hair Clinic.</p></Reveal>
            <DocTrack cls="rg rg-track">
              {RESULTS.map((src, n) => (
                <Reveal as="figure" key={src} delay={(n % 4) * 90} className="rc-slide rg-card">
                  <figcaption><span className="b">Before</span><span className="a">After</span></figcaption>
                  <img loading="lazy" src={IMG + src} alt={`Hair transplant result ${n + 1}: before and after`} draggable="false" />
                </Reveal>
              ))}
            </DocTrack>
            <Reveal className="center"><p className="fine">Results vary based on individual hair loss, donor area, graft availability, and treatment plan.</p>
              <CTA>Book Your Hair Transplant Consultation</CTA></Reveal>
          </div>
        </section>

        {/* SURGEONS */}
        <section className="section line" id="surgeons">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Meet Our Surgeons</span><h2>Experienced Hair Transplant Team</h2>
              <p>Meet the medical professionals involved in your hair restoration journey.</p></Reveal>
            <DocTrack>
              {DOCTORS.map(([n, c, f], i) => (
                <Reveal key={n} delay={i * 90} className="doc">
                  <div className="doc-photo"><img loading="lazy" src={`${BASE}doctors/${f}.webp`} alt={`${n}, ${c} – MAX Hair Clinic Hyderabad`} width="640" height="800" /></div>
                  <h3>{n}</h3><p>{c}</p>
                </Reveal>
              ))}
            </DocTrack>
            <Reveal className="center mt"><CTA>Book an Appointment</CTA></Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section line" id="faqs">
          <div className="container narrow">
            <Reveal className="head"><span className="eyebrow">Frequently Asked Questions</span><h2>Hair Transplant – FAQs</h2></Reveal>
            {FAQS.map(([q, a], i) => (
              <div key={q} className={`faq ${faq === i ? 'open' : ''}`}>
                <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>{q}<span className="plus" /></button>
                <div className="faq-body"><div><p>{a}</p></div></div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL / CONTACT */}
        <section className="section dark slate" id="contact">
          <div className="container split">
            <Reveal>
              <span className="eyebrow">Final Appointment</span>
              <h2>Ready to Explore Hair Transplant Options?</h2>
              <p>Take the first step towards understanding your hair restoration options at MAX Hair Clinic Hyderabad. Book your appointment for a personalized hair transplant assessment.</p>
              <div className="cta-row">
                <CTA>Book Your Hair Transplant Appointment</CTA>
              </div>
              <div className="cta-row tight">
                <a href={TEL} className="btn btn-outline"><Icon d={PHONE_D} size={18} /> Call Now</a>
                <a href={WA} target="_blank" rel="noreferrer" className="btn btn-wa">WhatsApp</a>
                <a href={MAP} target="_blank" rel="noreferrer" className="btn btn-outline">Get Directions</a>
              </div>
              <h3 className="clinic-name">MAX Hair Clinic – Hyderabad</h3>
              <ul className="contact">
                <li><b>Address</b><span>1130/A, Road No. 36, Jubilee Hills, Hyderabad, Telangana – 500034</span></li>
                <li><b>Phone</b><span><a href={TEL}>{PHONE}</a></span></li>
                <li><b>Timings</b><span>Monday–Friday: 10 AM – 8 PM<br />Saturday–Sunday: 10 AM – 7 PM</span></li>
              </ul>
            </Reveal>
            <Reveal delay={150} type="scale" className="map">
              <iframe title="MAX Hair Clinic map" loading="lazy" src="https://www.google.com/maps?q=MAX+Hair+Clinic+Road+No+36+Jubilee+Hills+Hyderabad&output=embed" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer dark">
        <div className="container">
          <img src={`${BASE}logo.png`} alt="MAX Hair Clinic" />
          <p><b>MAX Hair Clinic</b> · India's First NABH Accredited Hair Clinic</p>
          <p>Hair Transplant | Hair Restoration | Hair Care</p>
          <p><a href="#top">Privacy Policy</a> · <a href="#top">Terms &amp; Conditions</a></p>
          <p className="fine">Hair transplant suitability and results vary between individuals. A medical assessment is required to determine the appropriate treatment.</p>
        </div>
      </footer>

      <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0 12 12 0 0 0 1.7 17.9L0 24l6.3-1.6A12 12 0 0 0 24 12a11.8 11.8 0 0 0-3.5-8.5zM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7 0a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.7 14.7 0 0 0 5.6 4.9c2.1.9 2.9.9 3.4.8a2.9 2.9 0 0 0 1.9-1.3 2.4 2.4 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" /></svg>
      </a>
      <button className={`to-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Icon d="M18 15l-6-6-6 6" /></button>

      <div className="mobile-bar">
        <a href={TEL}><Icon d={PHONE_D} size={18} /> Call Now</a>
        <a href="#book" onClick={(e) => go(e, 'book')}>Book Appointment</a>
      </div>
    </>
  )
}

export default function App() {
  return <Landing />
}
