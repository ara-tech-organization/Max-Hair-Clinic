import { useEffect, useRef, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL
const pathId = () => {
  const p = window.location.pathname
  return (p.startsWith(BASE) ? p.slice(BASE.length) : p.slice(1)).replace(/\/$/, '')
}
const PHONE = '+91 90325 10000'
const TEL = 'tel:+919032510000'
const WA = 'https://wa.me/919032510000?text=Hi%20MAX%20Hair%20Clinic%2C%20I%20want%20to%20book%20a%20medical%20assessment'
const MAP = 'https://www.google.com/maps/search/?api=1&query=MAX+Hair+Clinic+Road+No+36+Jubilee+Hills+Hyderabad'
const IMG = 'https://mymaxhair.com/wp-content/uploads/'

const NAV = [
  ['options', 'Options'], ['compare', 'Compare'], ['why', 'Why Us'],
  ['journey', 'Journey'], ['faqs', 'FAQs'], ['contact', 'Contact'],
]

const OPTIONS = [
  ['Sapphire Hair Transplant', 'FUE using sapphire blades for precise channels, minimal scarring and a comfortable recovery.'],
  ['FUE Hair Transplant', 'Individual follicles extracted and implanted with metal blades. A proven method for many cases.'],
  ['IGM Hair Transplant', 'High-density restoration with improved graft handling for natural angles and strong follicle survival.'],
  ['Direct Hair Transplant (DHI)', 'Grafts placed with the Choi implanter pen for accurate placement and faster recovery.'],
  ['Beard Transplant', 'Restores patchy or sparse facial hair using your own follicles.'],
  ['Eyebrow Transplant', 'Micro-FUE for fuller, well-defined eyebrows.'],
  ["Women's Hair Transplant", 'FUE and FUT for suitable candidates, after assessment.'],
  ['Hair Growth & Cosmetic Hair System', 'GFC/PRP for thinning, and a non-surgical option for instant coverage.'],
]

const WHY_SAPPHIRE = [
  ['Finer, more precise channels', 'Sapphire blades can be made very thin with a smooth edge, creating smaller recipient sites.'],
  ['Gentler on the scalp', 'Smoother cuts mean less tissue trauma, so healing may be faster than with other techniques.'],
  ['Natural-looking density', 'Precise channels allow grafts to sit closer together at the right angle and direction.'],
  ['Minimal scarring, comfortable recovery', 'Smaller incisions are designed to leave little visible marking.'],
  ['Planned around your face', 'Hairline design, graft count and technique are set by your surgeon after assessment.'],
]

const COST = ['Number of follicles (grafts) required', 'Grade of hair loss', 'Technique: Sapphire FUE or FUE', 'Blade type: Sapphire or Titanium', 'Number of sessions', 'Supporting treatments such as GFC']

const WHY_US = [
  ['Surgeon-led', 'Planned and performed by trained surgeons, including plastic and reconstructive surgery specialists.'],
  ['NABH accredited', "India's first NABH accredited hair clinic, built around patient safety."],
  ['22+ years, 5,00,000+ clients', 'Experience across every stage of hair loss.'],
  ['Recognised locally', 'Times of India recognised hair transplant clinic for 8 consecutive years in Hyderabad.'],
  ['Clear written cost plan', 'No fixed packages. Your plan reflects your hair loss.'],
  ['All solutions under one roof', 'Hair transplant, cosmetic hair systems and hair growth treatments.'],
]

const RESULTS = [
  ['2026/09/8500-follicles-sapphire-fue-hair-transplant.webp', '8,500 follicles · Sapphire FUE'],
  ['2026/09/9500-follicles-sapphire-fue-hair-transplant.webp', '9,500 follicles · Sapphire FUE'],
  ['2026/09/hair-transplant-hair-growth-before-after.webp', 'Hair growth before & after'],
  ['2026/09/early-hair-regrowth-after-hair-transplant.webp', 'Early regrowth after surgery'],
]

const JOURNEY = [
  ['Medical assessment', 'Your doctor checks your scalp, donor area and the cause of your hair loss.'],
  ['Your plan', 'Hairline design, graft estimate, technique and a written cost plan.'],
  ['Surgery day', 'One session takes about 6 to 7 hours depending on the stage of hair loss, under local anaesthesia, performed by a plastic surgeon.'],
  ['Aftercare', 'Written aftercare instructions and a direct contact for your questions.'],
  ['Follow-ups', 'Bandage removal on day 3, hair wash on day 10, then a monthly review every 30 days to track growth.'],
]

const DOCTORS = [
  ['Dr. Tajaly Saneen', 'MBBS, MS, DrNB (Plastic and Reconstructive Surgery)'],
  ['Dr. Hiba Fayaz', 'Consultant Doctor'],
  ['Dr. K R G Aravind Kumar', 'OMFS'],
  ['Dr. Aswini Teja', 'Consultant Doctor'],
]

const REVIEWS = [
  ['Karthik S', 'Liked that the doctor explained the Sapphire FUE technique instead of simply recommending it, and says his hairline is looking more natural.'],
  ['Arjun', 'Appreciated the detailed consultation and a cost explained by graft requirement. Already seeing new growth.'],
  ['Aditya K', 'Wanted a natural receding-hairline design, and the doctor planned it carefully instead of going unnecessarily low.'],
]

const FAQS = [
  ['What is the Sapphire hair transplant method?', 'It is an advancement of traditional FUE that uses blades made of sapphire gemstone to create the recipient channels. It may support faster healing compared with other techniques.'],
  ['Is Sapphire FUE better than conventional FUE?', "Many patients and surgeons prefer it for the finer channels and gentler healing. The right choice depends on your hair, donor area and your surgeon's assessment."],
  ['How much does a hair transplant cost in Hyderabad?', 'Cost depends on the number of follicles, grade of hair loss, technique, blade type, sessions and supporting treatments. You get a written cost plan at your assessment.'],
  ['Are there financing options?', 'Yes. EMI options are available through finance partners. Our team shares the options and documents needed during your assessment.'],
  ['How long does the surgery take?', 'One session takes about 6 to 7 hours depending on the stage of hair loss, under local anaesthesia.'],
  ['How long until I see results?', 'Transplanted hair sheds in the first few weeks, which is expected. New growth begins in the following months, and fuller results typically take around a year.'],
  ['Are the results permanent?', 'Transplanted follicles come from donor areas that are usually resistant to hair loss, so results are long-lasting for most patients. Your existing hair may continue to thin, so follow-up care may be advised.'],
  ['Is a hair transplant safe?', 'It is a surgical procedure and carries some risk, like any procedure. At MAX Hair Clinic it is performed by trained surgeons following strict safety protocols. Your doctor explains risks and aftercare before you decide.'],
  ['What is the difference between PRP and GFC?', "Both use your blood's platelet-rich plasma to support hair growth. GFC contains a higher level of growth factors, and your doctor will advise which suits you."],
  ['What is a Cosmetic Hair System?', 'A non-surgical option that gives immediate volume and coverage, customised to your hair type, colour and style.'],
  ['How can I book a consultation?', `Use the form on this page, tap to call ${PHONE}, or message us on WhatsApp.`],
]

const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)
const PHONE_D = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'
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

function CTA({ children, className = 'btn-primary btn-lg', to = 'hero-form' }) {
  return (
    <a href={`#${to}`} className={`btn ${className}`} onClick={(e) => { e.preventDefault(); document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' }) }}>{children} <Icon d={ARROW_D} size={18} /></a>
  )
}

function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        setV(to * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
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
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) { setHi(options.indexOf(value)); setOpen(true) } else setHi((hi + 1) % options.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((hi - 1 + options.length) % options.length) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open ? pick(options[hi]) : (setHi(options.indexOf(value)), setOpen(true)) }
  }
  return (
    <div className={`dd ${open ? 'open' : ''}`} ref={ref}>
      <button type="button" className="dd-btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => { setHi(options.indexOf(value)); setOpen(!open) }} onKeyDown={key}>
        <span>{value}</span>
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

function LeadForm({ id, compact }) {
  const [f, setF] = useState({ name: '', phone: '', service: 'Hair Transplant' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = 'Please enter your full name'
    if (!/^(\+91)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) er.phone = 'Enter a valid 10-digit mobile number'
    setErr(er)
    if (Object.keys(er).length) return
    setBusy(true)
    // TODO: connect to your CRM / Google Ads conversion tracking here
    setTimeout(() => { setBusy(false); setSent(true) }, 900)
  }

  if (sent) {
    return (
      <div className="form-card sent">
        <span className="tick"><Icon d={CHECK_D} size={28} /></span>
        <h3>Thank you, {f.name.split(' ')[0]}!</h3>
        <p>Our team will call you within 10 minutes during clinic hours.</p>
      </div>
    )
  }
  return (
    <form className="form-card" onSubmit={submit} noValidate id={id}>
      {!compact && <>
        <h3>Get Your Hair Transplant Cost Plan for Hyderabad</h3>
        <p className="form-sub">Medical assessment at 50% off. Our team will call you within 10 minutes during clinic hours. <em>(Offer terms apply.)</em></p>
      </>}
      <label>Full Name
        <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your full name" autoComplete="name" aria-invalid={!!err.name} />
        {err.name && <small className="err">{err.name}</small>}
      </label>
      <label>Phone
        <input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="10-digit mobile number" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />
        {err.phone && <small className="err">{err.phone}</small>}
      </label>
      <div className="field">Service
        <Dropdown value={f.service} onChange={(v) => setF({ ...f, service: v })} options={['Hair Transplant', 'Cosmetic Hair Replacement', 'Hair Care']} />
      </div>
      <button className="btn btn-primary btn-lg" disabled={busy}>{busy ? 'Sending…' : 'Book Your Consultation'}</button>
      <small className="micro">No obligation. Your details are used only to contact you about your assessment.</small>
    </form>
  )
}

function Landing() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [faq, setFaq] = useState(0)
  const [showTop, setShowTop] = useState(false)

  // scroll progress + scroll-spy
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
    const t = NAV.some(([n]) => n === path) ? setTimeout(() => document.getElementById(path)?.scrollIntoView(), 350) : null
    const pop = () => {
      const id = pathId()
      if (!id) window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('popstate', pop)
    return () => { clearTimeout(t); window.removeEventListener('popstate', pop) }
  }, [])

  useEffect(() => {
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
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', BASE); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <img src={`${BASE}logo.png`} alt="MAX Hair Clinic" />
          </a>
          <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={(e) => go(e, id)}>{label}</a>
            ))}
            <a href="#hero-form" className="btn btn-primary nav-cta-m" onClick={(e) => go(e, 'hero-form')}>Enquire Now</a>
          </nav>
          <div className="nav-actions">
            <a href={TEL} className="nav-call" aria-label={`Call ${PHONE}`}><Icon d={PHONE_D} /><span>{PHONE}</span></a>
            <a href="#hero-form" className="btn btn-primary nav-cta" onClick={(e) => go(e, 'hero-form')}>Enquire Now</a>
            <button className={`menu ${open ? 'on' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><i /><i /><i /></button>
          </div>
        </div>
        <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="blob b1" /><div className="blob b2" />
          <div className="container hero-grid">
            <div>
              <div className="trust hero-in" style={{ '--i': 0 }}>
                {["India's First NABH Accredited Hair Clinic", '22+ Years of Expertise', 'Plastic Surgeon-Led', '5,00,000+ Clients'].map((t) => <span key={t}><Icon d={CHECK_D} size={14} />{t}</span>)}
              </div>
              <h1 className="hero-in" style={{ '--i': 1 }}>Sapphire FUE Hair Transplant in Hyderabad, <span className="gold">Planned by Experienced Surgeons</span></h1>
              <p className="lead hero-in" style={{ '--i': 2 }}>MAX Hair Clinic, Jubilee Hills. Natural-looking hair transplant using Sapphire FUE and FUE techniques, starting with a detailed medical assessment of your hair loss, donor area and goals.</p>
              <div className="cta-row hero-in" style={{ '--i': 3 }}>
                <CTA>Get My Cost Plan</CTA>
                <a href={TEL} className="btn btn-ghost btn-lg"><Icon d={PHONE_D} size={18} /> Call Now: {PHONE}</a>
              </div>
              <ul className="chips hero-in" style={{ '--i': 4 }}>
                {['Surgeon-Led Procedures', 'EMI Available', 'Natural Results', 'Jubilee Hills, Hyderabad'].map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div className="hero-in" style={{ '--i': 3 }}><LeadForm id="hero-form" /></div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="container stats-grid">
            <Reveal><b><Counter to={22} suffix="+" /></b><span>Years of Expertise</span></Reveal>
            <Reveal delay={100}><b><Counter to={5} suffix="+ Lakh" /></b><span>Clients</span></Reveal>
            <Reveal delay={200}><b>NABH</b><span>Accredited Clinic</span></Reveal>
            <Reveal delay={300}><b><Counter to={8} /></b><span>Years TOI Recognised*</span></Reveal>
          </div>
        </section>

        {/* OPTIONS */}
        <section className="section" id="options">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Know Your Hair Restoration Choices</span>
              <h2>One clinic, every hair restoration option, matched to your hair loss</h2>
              <p>Your plan depends on your hair loss, donor area and goals. After assessment, your surgeon recommends the technique that fits.</p></Reveal>
            <div className="grid g4">
              {OPTIONS.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 4) * 90} className="card"><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <Reveal className="center mt"><CTA className="btn-dark btn-lg">Find the Right Option for Me</CTA></Reveal>
          </div>
        </section>

        {/* COMPARE */}
        <section className="section alt" id="compare">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Sapphire FUE vs Conventional FUE</span>
              <h2>Sapphire FUE vs Conventional FUE: What's the Difference?</h2>
              <p>Both are FUE techniques where follicles are taken individually from the donor area. The difference is the blade used to create the recipient channels where hair is placed.</p></Reveal>
            <div className="grid g2 photos">
              <Reveal type="wipe" className="photo"><img loading="lazy" src={`${IMG}2026/09/hair-transplant-grafts-implanted-with-precision.webp`} alt="Conventional FUE hairline" /><span className="pill">Conventional FUE</span></Reveal>
              <Reveal type="wipe" delay={150} className="photo"><img loading="lazy" src={`${IMG}2026/01/max-hair-clinic-ice-cell-sapphire-fue.webp-1024x437.webp`} alt="Sapphire FUE hairline" /><span className="pill">Sapphire FUE</span></Reveal>
            </div>
            <div className="grid g2 cmp">
              <Reveal className="cmp-card light"><h3>Conventional FUE <small>(Metal Blades)</small></h3>
                <ul>{['Metal (steel or titanium) blades create the recipient channels', 'Incisions can be slightly larger', 'Healing time may be longer in some cases', 'Less fine control for very dense placement', 'Suitable for many standard cases'].map((x) => <li key={x}>{x}</li>)}</ul></Reveal>
              <Reveal delay={150} className="cmp-card dark"><h3>Sapphire FUE</h3>
                <ul className="ticks">{['Blades made of sapphire gemstone with a smooth, sharp edge', 'Finer, more precise incisions', 'Gentler on the scalp, so healing may be faster', 'Supports natural angles and closer graft placement', 'Often chosen for hairline design and detailed work'].map((x) => <li key={x}><Icon d={CHECK_D} size={16} />{x}</li>)}</ul></Reveal>
            </div>
            <Reveal className="center mt"><p>Not sure which technique is suitable for you? Our hair transplant team can help you understand your options following a clinical assessment.</p>
              <CTA>Book a Consultation</CTA>
              <p className="fine">Results vary from person to person and depend on donor hair, hair type, aftercare and individual healing. The technique is decided by the surgeon after assessment.</p></Reveal>
          </div>
        </section>

        {/* WHY SAPPHIRE */}
        <section className="section dark">
          <div className="container">
            <Reveal className="head"><span className="eyebrow light">Why Sapphire FUE Is Often the Better Choice</span>
              <h2>Why many patients choose Sapphire FUE</h2>
              <p>Sapphire FUE is an advancement of traditional FUE, not a different surgery. Changing the blade changes the finish.</p></Reveal>
            <div className="grid g3 g5">
              {WHY_SAPPHIRE.map(([t, d], i) => (
                <Reveal key={t} type="scale" delay={(i % 3) * 100} className="card card-dark"><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <Reveal className="center fine light sp">Benefits depend on surgeon skill and your individual case. Sapphire FUE is not suitable for everyone.</Reveal>
          </div>
        </section>

        {/* COST */}
        <section className="section" id="cost">
          <div className="container split">
            <Reveal>
              <span className="eyebrow">Hair Transplant Cost in Hyderabad</span>
              <h2>Your hair transplant cost depends on your hair loss, not a fixed package</h2>
              <p>At your medical assessment, your surgeon examines your scalp and donor area and gives you a written plan with the full cost.</p>
              <p className="emi"><b>EMI:</b> EMI options are available through finance partners. Our team shares details during your assessment.</p>
              <CTA>Get My Cost Plan</CTA>
            </Reveal>
            <Reveal delay={150} className="panel">
              <h3>What affects the cost</h3>
              <ul className="ticks">{COST.map((c) => <li key={c}><Icon d={CHECK_D} size={16} />{c}</li>)}</ul>
            </Reveal>
          </div>
        </section>

        {/* WHY US */}
        <section className="section alt" id="why">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Why MAX Hair Clinic</span><h2>Why patients across Hyderabad choose MAX Hair Clinic</h2></Reveal>
            <div className="grid g3">
              {WHY_US.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 3) * 100} className="card"><span className="dot"><Icon d={CHECK_D} size={18} /></span><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <Reveal className="proof">22+ Years <i /> NABH Accredited <i /> 5+ Lakh Clients</Reveal>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section" id="results">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Real People. Real Results.</span><h2>Real growth, shown honestly</h2>
              <p>See client progress, including 8-month growth updates from Sapphire FUE procedures.</p></Reveal>
            <div className="grid g4 gallery">
              {RESULTS.map(([src, cap], i) => (
                <Reveal key={src} type="scale" delay={i * 90} className="shot"><img loading="lazy" src={IMG + src} alt={cap} /><span>{cap}</span></Reveal>
              ))}
            </div>
            <Reveal className="center mt"><p className="fine">Results vary from case to case.</p><CTA>Start a Medical Assessment</CTA></Reveal>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section dark slate" id="journey">
          <div className="container">
            <Reveal className="head"><span className="eyebrow light">Journey</span><h2>Your Hair Transplant Surgery in Hyderabad</h2></Reveal>
            <ol className="steps">
              {JOURNEY.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90}><span className="step-n">{i + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </ol>
            <Reveal className="center mt"><CTA>Start a Medical Assessment</CTA></Reveal>
          </div>
        </section>

        {/* DOCTORS */}
        <section className="section">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Our Surgeons</span><h2>Meet Your Hyderabad Hair Transplant Surgeons</h2></Reveal>
            <div className="grid g4">
              {DOCTORS.map(([n, c], i) => (
                <Reveal key={n} delay={i * 90} className="doc">
                  <div className="avatar">{n.replace('Dr. ', '').split(' ').slice(0, 2).map((w) => w[0]).join('')}</div>
                  <h3>{n}</h3><p>{c}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section alt">
          <div className="container">
            <Reveal className="head"><span className="eyebrow">Client Reviews</span><h2>What clients say about MAX Hair Clinic</h2></Reveal>
            <div className="grid g3">
              {REVIEWS.map(([n, t], i) => (
                <Reveal key={n} delay={i * 100} className="card review"><div className="stars">★★★★★</div><p>“{t}”</p><b>{n}</b></Reveal>
              ))}
            </div>
            <Reveal className="center fine">Reviews are sourced from Google and reflect individual experiences. Results may vary.</Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faqs">
          <div className="container narrow">
            <Reveal className="head"><span className="eyebrow">FAQs</span><h2>Frequently asked questions</h2></Reveal>
            {FAQS.map(([q, a], i) => (
              <Reveal key={q} className={`faq ${faq === i ? 'open' : ''}`}>
                <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>{q}<span className="plus" /></button>
                <div className="faq-body"><div><p>{a}</p></div></div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section dark slate" id="contact">
          <div className="container split">
            <Reveal>
              <span className="eyebrow light">Contact</span>
              <h2>Hair transplant clinic in Jubilee Hills, Hyderabad</h2>
              <p>Our clinic is on Road No. 36, Jubilee Hills, opposite the Jubilee Hills Police Station. It is a short drive from Banjara Hills, Madhapur and Gachibowli.</p>
              <ul className="contact">
                <li><b>Address</b>1130/A, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500034</li>
                <li><b>Phone</b><a href={TEL}>{PHONE}</a></li>
                <li><b>Timings</b>Mon to Fri 10:00 AM to 8:00 PM<br />Sat and Sun 10:00 AM to 7:00 PM</li>
              </ul>
              <div className="cta-row">
                <a href={TEL} className="btn btn-primary"><Icon d={PHONE_D} size={18} /> Call Now</a>
                <a href={WA} target="_blank" rel="noreferrer" className="btn btn-wa">WhatsApp</a>
                <a href={MAP} target="_blank" rel="noreferrer" className="btn btn-ghost">Get Directions</a>
              </div>
            </Reveal>
            <Reveal delay={150} type="scale" className="map">
              <iframe title="MAX Hair Clinic map" loading="lazy" src="https://www.google.com/maps?q=MAX+Hair+Clinic+Road+No+36+Jubilee+Hills+Hyderabad&output=embed" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <img src={`${BASE}logo.png`} alt="MAX Hair Clinic" />
          <p>Results might vary from case to case. *Awards and accreditations subject to verification.</p>
          <p><a href="#top">Privacy Policy</a> · <a href="#top">Terms</a> · <a href="#top">Cookie Policy</a></p>
          <p>© {new Date().getFullYear()} MAX Hair Clinic, Hyderabad</p>
        </div>
      </footer>

      <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0 12 12 0 0 0 1.7 17.9L0 24l6.3-1.6A12 12 0 0 0 24 12a11.8 11.8 0 0 0-3.5-8.5zM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7 0a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.700 6.400 6.400 0 0 0 1.300 3.400 14.700 14.700 0 0 0 5.600 4.900c2.100.9 2.900.9 3.400.8a2.900 2.900 0 0 0 1.900-1.300 2.400 2.400 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z" /></svg>
      </a>
      <button className={`to-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Icon d="M18 15l-6-6-6 6" /></button>

      <div className="mobile-bar">
        <a href={TEL}><Icon d={PHONE_D} size={18} /> Tap to Call</a>
        <a href="#hero-form" onClick={(e) => go(e, 'hero-form')}>Book Now</a>
      </div>
    </>
  )
}

const HEADLINES = ['Sapphire FUE Hair Transplant','Hair Transplant in Hyderabad','MAX Hair Clinic Jubilee Hills','NABH Accredited Hair Clinic','22+ Years of Experience','Surgeon-Led Hair Transplant','EMI Options Available','50% Off Medical Assessment','Get Your Hair Transplant Cost','Natural Hairline Planning','5 Lakh+ Clients Treated','Sapphire vs FUE: Know More','Hair Transplant Cost Plan',"Women's Hair Transplant",'Book Medical Assessment']
const DESCS = ['Sapphire FUE planned by experienced surgeons. Jubilee Hills, Hyderabad. Enquire now.','NABH accredited clinic, 22+ years, 5 lakh+ clients. Get your written cost plan today.','Surgeon-led hair transplant with EMI options. Callback within 10 minutes.','Sapphire FUE vs FUE: understand the difference at your medical assessment.']
const CRO = [
  ['Fix on the live page first','The page carries two different phone numbers (+91 90325 10000 and +91 9032520000), the word "Jubliee" is misspelt, and doctor images are labelled "chennai". These hurt trust and ad quality.'],
  ['Make the cost plan the hero offer','Cost is what people search for, so lead with Get My Cost Plan and keep the form above the fold on mobile.'],
  ['Shorten time-to-form','Move the compare section directly after the hero, since Sapphire vs FUE is the decision question.'],
  ['Add a dedicated ads page',"Remove the main menu, keep one goal, and match H1 to the ad group (Sapphire, cost, beard, women's)."],
  ['Proof near every CTA','NABH, 22+ years and 5 lakh+ clients beside each button.'],
  ['Call and WhatsApp tracking','Track form fills, call clicks and WhatsApp clicks as separate conversions.'],
  ['Offer clarity','State the terms of the 50% assessment offer, or Google may flag it as misleading.'],
  ['Policy check','Avoid "best", "guaranteed" and "permanent" in ads and unverified before/after claims. The live page title uses "Best", so substantiate or remove it in ad copy.'],
  ['A/B test','Hero headline (Sapphire-led vs cost-led) and CTA (Get My Cost Plan vs Book a Medical Assessment).'],
]

function Internal() {
  useEffect(() => {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'
    document.head.appendChild(m); window.scrollTo(0, 0)
    return () => m.remove()
  }, [])
  return (
    <div className="internal container narrow">
      <a href={BASE} className="btn btn-dark">← Back to landing page</a>
      <h1>Internal notes (not part of the public page)</h1>
      <p><b>Before publishing:</b> Details (address, phone, doctors, accreditation, EMI, offer) are taken from the live page. Please re-verify them, especially the NABH and award claims and the 50% assessment offer, because Google Ads healthcare policy needs substantiation. Items in [BRACKETS] still need your input: offer terms and validity, NABH certificate number, finance partner names and documents, TOI citation, verbatim Google reviews, Hyderabad team photos.</p>
      <h2>14. Google Ads Copy (Responsive Search Ad)</h2>
      <p><b>Final URL:</b> mymaxhair.com/hyderabad (or a dedicated ads landing page)</p>
      <h3>Headlines (30 characters max)</h3>
      <ol className="plain">{HEADLINES.map((h) => <li key={h}>{h} <small>({h.length})</small></li>)}</ol>
      <h3>Descriptions (90 characters max)</h3>
      <ol className="plain">{DESCS.map((h) => <li key={h}>{h} <small>({h.length})</small></li>)}</ol>
      <p><b>Callouts:</b> Surgeon-Led | NABH Accredited | EMI Available | Written Cost Plan</p>
      <p><b>Sitelinks:</b> Sapphire vs FUE | Cost Plan | Surgeons | Contact</p>
      <p><b>Keyword themes:</b> sapphire hair transplant hyderabad, hair transplant in hyderabad, hair transplant cost hyderabad, FUE hair transplant hyderabad, hair transplant jubilee hills</p>
      <h2>15. CRO Recommendations</h2>
      <ul className="plain">{CRO.map(([t, d]) => <li key={t}><b>{t}:</b> {d}</li>)}</ul>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const h = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])
  return (route === '#/internal' || pathId() === 'internal') ? <Internal /> : <Landing />
}
