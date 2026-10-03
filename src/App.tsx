import { useEffect, useState } from 'react'
import './App.css'

type Screen = 'home' | 'battle' | 'arsenal' | 'profile'
type Kind = 'damage' | 'heal' | 'wild'
type Move = { id: string; name: string; phrase: string; kind: Kind; power: number; copy: string; icon: string }
type Ally = { type: 'healBoost' | 'damageBoost' | 'flatBoost' | 'roundHeal' | 'roundDamage' | 'none'; value: number; label: string }
type Rival = { id: string; name: string; title: string; hp: number; color: string; emoji: string; quote: string; ally: Ally }
type Save = { wisdom: number; streak: number; wins: number; unlocked: string[]; loadout: string[]; ownedRivals: string[]; selectedRival: string | null }

const MOVES: Move[] = [
  { id: 'screech', name: 'Screech', phrase: 'SCREEEEEECH', kind: 'damage', power: 18, copy: 'Trifft hart, kratzt aber an der Stimmung.', icon: '⚡' },
  { id: 'suessi', name: 'Süßi', phrase: 'Du bist süßi', kind: 'heal', power: 16, copy: 'Ein ehrliches Kompliment lädt dich auf.', icon: '✦' },
  { id: 'rrruu', name: 'Rrruu', phrase: 'rrrruuu rrrrruuuu', kind: 'wild', power: 26, copy: 'Unberechenbar. Genau wie die Debatte.', icon: '◈' },
  { id: 'machste', name: 'Machste nix', phrase: 'Da machste nichts', kind: 'damage', power: 14, copy: 'Der trockene Konter. Verlässlich.', icon: '▰' },
  { id: 'schmetter', name: 'Schmetterlinge', phrase: 'Königin der Schmetterlinge', kind: 'heal', power: 24, copy: 'Heilt dich kräftig. Aus Versehen die Rivalin mit.', icon: '❋' },
  { id: 'labil', name: 'Labil', phrase: 'Du bist. Labil.', kind: 'damage', power: 20, copy: 'Schaden mit einem kleinen Selbstwert-Boost.', icon: '✹' },
]

const RIVALS: Rival[] = [
  { id: 'felix', name: 'Felix', title: 'Der Nerd', hp: 100, color: '#65a6d3', emoji: '🤓', quote: 'Lass uns das sachlich angehen.', ally: { type: 'healBoost', value: 1.25, label: 'Verstärkt deine Heilung um 25%.' } },
  { id: 'vada', name: 'Vada', title: 'Die Schlagfertige', hp: 100, color: '#e85d9e', emoji: '💬', quote: 'Das war jetzt aber nicht sehr schlagfertig.', ally: { type: 'damageBoost', value: 1.25, label: 'Verstärkt deinen Schaden um 25%.' } },
  { id: 'screech-lady', name: 'Screech Lady', title: 'Die Frequenz', hp: 100, color: '#f07b68', emoji: '📣', quote: 'ICH HABE DA EINE MEINUNG!', ally: { type: 'roundDamage', value: 8, label: 'Schadet der Rivalin zu Rundenbeginn.' } },
  { id: 'junior', name: 'Junior Rakete', title: 'Der Antrieb', hp: 90, color: '#ffbd5b', emoji: '🚀', quote: 'RAKETE RAKETE!', ally: { type: 'roundHeal', value: 4, label: 'Heilt dich zu Rundenbeginn.' } },
  { id: 'bahnhof', name: 'Bahnhof Hänger', title: 'Die Ruhe selbst', hp: 110, color: '#93a66a', emoji: '🎒', quote: 'Jo.', ally: { type: 'none', value: 0, label: 'Keine Fähigkeit. Einfach entspannt.' } },
  { id: 'pigeon', name: 'Pigeon', title: 'König der Gleise', hp: 110, color: '#8cc8c1', emoji: '🐦', quote: 'Gurr. Gurr. Gurr.', ally: { type: 'flatBoost', value: 5, label: '+5% auf Heilung und Schaden.' } },
]

const initialSave: Save = { wisdom: 62, streak: 3, wins: 7, unlocked: ['screech', 'suessi', 'rrruu'], loadout: ['screech', 'suessi', 'rrruu'], ownedRivals: [], selectedRival: null }

function loadSave(): Save {
  try {
    const stored = localStorage.getItem('anni-save-v2')
    return stored ? { ...initialSave, ...JSON.parse(stored) } : initialSave
  } catch {
    return initialSave
  }
}

function App() {
  const [save, setSave] = useState<Save>(loadSave)
  const [screen, setScreen] = useState<Screen>('home')
  const [rival, setRival] = useState<Rival | null>(null)
  const [playerHp, setPlayerHp] = useState(100)
  const [rivalHp, setRivalHp] = useState(100)
  const [round, setRound] = useState(1)
  const [feed, setFeed] = useState<string[]>([])
  const [result, setResult] = useState<'win' | 'lose' | null>(null)
  const [toast, setToast] = useState('')
  const selectedRival = RIVALS.find((item) => item.id === save.selectedRival) ?? null

  useEffect(() => { localStorage.setItem('anni-save-v2', JSON.stringify(save)) }, [save])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const startBattle = () => {
    const next = RIVALS[Math.floor(Math.random() * RIVALS.length)]
    setRival(next); setPlayerHp(100); setRivalHp(next.hp); setRound(1); setResult(null)
    setFeed([`${next.name} betritt den Ring. „${next.quote}“`]); setScreen('battle')
  }

  const playMove = (move: Move) => {
    if (!rival || result) return
    const variance = Math.floor(Math.random() * 8) - 3
    const enemyHit = Math.floor(Math.random() * 12) + 7
    let damage = 0
    let healing = 0
    if (move.kind === 'damage') damage = Math.max(8, move.power + variance)
    if (move.kind === 'heal') healing = move.power + variance
    if (move.kind === 'wild') {
      damage = Math.max(4, Math.floor(Math.random() * move.power))
      healing = Math.max(4, move.power - damage)
    }
    if (selectedRival?.ally.type === 'damageBoost') damage = Math.round(damage * selectedRival.ally.value)
    if (selectedRival?.ally.type === 'healBoost') healing = Math.round(healing * selectedRival.ally.value)
    if (selectedRival?.ally.type === 'flatBoost') {
      damage += damage ? Math.round(damage * selectedRival.ally.value / 100) : 0
      healing += healing ? Math.round(healing * selectedRival.ally.value / 100) : 0
    }
    const companionDamage = selectedRival?.ally.type === 'roundDamage' ? selectedRival.ally.value : 0
    const companionHeal = selectedRival?.ally.type === 'roundHeal' ? selectedRival.ally.value : 0
    const nextRivalHp = Math.max(0, rivalHp - damage - companionDamage)
    const nextPlayerHp = Math.min(100, playerHp + healing + companionHeal - (nextRivalHp > 0 ? enemyHit : 0))
    const companionLine = companionDamage ? ` · ${selectedRival?.name} -${companionDamage}` : companionHeal ? ` · ${selectedRival?.name} +${companionHeal}` : ''
    const line = healing ? `${move.phrase} · +${healing} Energie · ${enemyHit} Gegenwind${companionLine}` : `${move.phrase} · -${damage} Respekt · ${enemyHit} Gegenwind${companionLine}`
    setFeed((current) => [line, ...current].slice(0, 5))
    setRivalHp(nextRivalHp); setPlayerHp(nextPlayerHp); setRound((value) => value + 1)
    if (nextRivalHp === 0 || nextPlayerHp === 0) {
      const won = nextRivalHp === 0 && nextPlayerHp > 0
      setResult(won ? 'win' : 'lose')
      if (won) setSave((current) => ({ ...current, wins: current.wins + 1, streak: current.streak + 1, wisdom: current.wisdom + 12 }))
      else setSave((current) => ({ ...current, streak: 0 }))
    }
  }

  const pull = (kind: 'argument' | 'rival') => {
    if (kind === 'rival') {
      const available = RIVALS.filter((item) => !save.ownedRivals.includes(item.id))
      const found = available.length ? available[Math.floor(Math.random() * available.length)] : RIVALS[Math.floor(Math.random() * RIVALS.length)]
      setSave((current) => ({ ...current, wisdom: Math.max(0, current.wisdom - 25), ownedRivals: [...new Set([...current.ownedRivals, found.id])] }))
      setToast(`${found.emoji} ${found.name} ist jetzt dein Verbündeter`)
      return
    }
    const locked = MOVES.filter((move) => !save.unlocked.includes(move.id))
    const found = locked.length ? locked[Math.floor(Math.random() * locked.length)] : MOVES[Math.floor(Math.random() * MOVES.length)]
    setSave((current) => ({ ...current, wisdom: Math.max(0, current.wisdom - 10), unlocked: [...new Set([...current.unlocked, found.id])] }))
    setToast(`${found.icon} ${found.name} ist jetzt in deiner Sammlung`)
  }

  const equip = (id: string) => {
    setSave((current) => ({ ...current, loadout: current.loadout.includes(id) ? current.loadout.filter((item) => item !== id) : [...current.loadout, id].slice(-3) }))
  }

  const nav = (next: Screen) => { if (screen !== 'battle' || result) setScreen(next) }
  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => nav('home')} aria-label="Zur Startseite"><span className="brand-mark">A</span><span>ANNI<span className="brand-dot">.</span></span></button>
        <div className="top-meta"><span className="live-dot" /> GROMBÜHL / 23:05</div>
        <div className="wisdom"><span>✦</span> {save.wisdom} <small>WEISHEIT</small></div>
      </header>

      <section className="viewport">
        {screen === 'home' && <HomeScreen save={save} onStart={startBattle} onNavigate={nav} />}
        {screen === 'battle' && rival && <BattleScreen rival={rival} companion={selectedRival} playerHp={playerHp} rivalHp={rivalHp} round={round} feed={feed} loadout={save.loadout} result={result} onMove={playMove} onExit={() => nav('home')} />}
        {screen === 'arsenal' && <ArsenalScreen save={save} onPull={pull} onEquip={equip} />}
        {screen === 'profile' && <ProfileScreen save={save} onSelectRival={(id) => setSave((current) => ({ ...current, selectedRival: id }))} />}
      </section>

      <nav className="bottom-nav" aria-label="Hauptnavigation">
        <NavButton active={screen === 'home' || screen === 'battle'} icon="◉" label="Ring" onClick={() => nav('home')} />
        <NavButton active={screen === 'arsenal'} icon="✦" label="Arsenal" onClick={() => nav('arsenal')} />
        <NavButton active={screen === 'profile'} icon="◌" label="Profil" onClick={() => nav('profile')} />
      </nav>
      {toast && <div className="toast">{toast}</div>}
    </main>
  )
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}><span>{icon}</span>{label}</button>
}

function HomeScreen({ save, onStart, onNavigate }: { save: Save; onStart: () => void; onNavigate: (screen: Screen) => void }) {
  return <div className="home-screen">
    <div className="eyebrow"><span className="pulse" /> LIVE AUS DEM DEBATTIER-RING</div>
    <div className="hero-copy"><div className="hero-kicker">ARGUMENTE MIT HALTUNG</div><h1>Deine Stimme.<br /><em>Dein Ring.</em></h1><p>Ein rundenbasiertes Diskussion-Spiel für schlagfertige Menschen und alle, die es werden wollen.</p></div>
    <div className="hero-stage"><div className="sunburst" /><div className="speech speech-left">ICH HABE<br /><strong>RECHT!</strong></div><div className="anni-avatar">A<span>✦</span></div><div className="speech speech-right">NA DANN<br /><strong>LOS!</strong></div><div className="stage-label">RING 01 / HEUTE</div></div>
    <button className="primary-button" onClick={onStart}>Diskussion starten <span>→</span></button>
    <div className="home-grid"><Stat label="SIEGE" value={save.wins} /><Stat label="SERIE" value={save.streak} suffix="×" /><button className="text-button" onClick={() => onNavigate('profile')}>Loadout bearbeiten <span>↗</span></button></div>
    <div className="tip"><span>✦</span><div><b>PRO-TIPP</b><br />Heilung ist manchmal der stärkste Konter.</div></div>
  </div>
}

function Stat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return <div className="stat"><strong>{value}<small>{suffix}</small></strong><span>{label}</span></div>
}

function BattleScreen({ rival, companion, playerHp, rivalHp, round, feed, loadout, result, onMove, onExit }: { rival: Rival; companion: Rival | null; playerHp: number; rivalHp: number; round: number; feed: string[]; loadout: string[]; result: 'win' | 'lose' | null; onMove: (move: Move) => void; onExit: () => void }) {
  return <div className="battle-screen">
    <div className="battle-header"><button className="back-button" onClick={onExit}>← Ring verlassen</button><span>RUNDE {String(round).padStart(2, '0')} {companion ? `· ${companion.name.toUpperCase()} IM EINSATZ` : ''}</span></div>
    <div className="duel">
      <Fighter name="ANNI" hp={playerHp} max={100} player />
      <div className="versus">VS</div>
      <Fighter name={rival.name} hp={rivalHp} max={rival.hp} rival={rival} />
    </div>
    <div className="battle-feed">{feed.map((line, index) => <div className={`feed-line ${index === 0 ? 'latest' : ''}`} key={`${line}-${index}`}><span>{index === 0 ? '›' : '·'}</span>{line}</div>)}</div>
    {!result ? <><div className="choose-label">WÄHLE DEIN ARGUMENT</div><div className="move-grid">{loadout.map((id) => { const move = MOVES.find((item) => item.id === id); return move ? <button className={`move-card ${move.kind}`} key={id} onClick={() => onMove(move)}><span className="move-icon">{move.icon}</span><span><b>{move.name}</b><small>{move.kind === 'heal' ? 'HEILUNG' : move.kind === 'wild' ? 'CHAOS' : 'ANGRIFF'} · {move.power}</small></span><i>→</i></button> : null })}</div></> : <div className={`result-card ${result}`}><span className="result-mark">{result === 'win' ? '✦' : '×'}</span><div><b>{result === 'win' ? 'DISKUSSION GEWONNEN' : 'ZU VIEL GEGENWIND'}</b><small>{result === 'win' ? '+12 Weisheit · Serie verlängert' : 'Nächste Runde wird besser.'}</small></div><button onClick={onExit}>Weiter</button></div>}
  </div>
}

function Fighter({ name, hp, max, player, rival }: { name: string; hp: number; max: number; player?: boolean; rival?: Rival }) {
  return <div className={`fighter ${player ? 'player' : 'opponent'}`}><div className="fighter-avatar" style={rival ? { background: rival.color } : undefined}>{rival?.emoji ?? 'A'}</div><div className="fighter-role">{player ? 'YOU' : 'RIVAL'}</div><div className="fighter-name">{name}</div><div className="health-track"><span style={{ width: `${Math.max(0, (hp / max) * 100)}%` }} /></div><div className="health-label">{hp} <small>/ {max} ENERGIE</small></div></div>
}

function ArsenalScreen({ save, onPull, onEquip }: { save: Save; onPull: (kind: 'argument' | 'rival') => void; onEquip: (id: string) => void }) {
  return <div className="content-screen"><ScreenHeading eyebrow="DEINE SAMMLUNG" title="Arsenal" copy="Sammle Argumente und Verbündete. Baue dein perfektes Team." />
    <div className="pull-card"><div><span className="card-eyebrow">ARGUMENT ZIEHEN · 10 ✦</span><h2>Was liegt heute<br /><em>auf der Zunge?</em></h2><p>Ein neues Argument für dein Loadout.</p></div><button className="pull-button" disabled={save.wisdom < 10} onClick={() => onPull('argument')}>✦<span>ZIEHEN</span></button></div>
    <div className="pull-card rival-pull"><div><span className="card-eyebrow">VERBÜNDETEN ZIEHEN · 25 ✦</span><h2>Wer steht heute<br /><em>hinter dir?</em></h2><p>Ein Rivale mit einer einzigartigen passiven Fähigkeit.</p></div><button className="pull-button" disabled={save.wisdom < 25} onClick={() => onPull('rival')}>★<span>ZIEHEN</span></button></div>
    <div className="section-title">DEINE ARGUMENTE <span>{save.unlocked.length} / {MOVES.length}</span></div><div className="collection-grid">{MOVES.map((move) => { const owned = save.unlocked.includes(move.id); const equipped = save.loadout.includes(move.id); return <button className={`collection-card ${owned ? move.kind : 'locked'} ${equipped ? 'equipped' : ''}`} key={move.id} disabled={!owned} onClick={() => onEquip(move.id)}><span className="collection-icon">{owned ? move.icon : '· · ·'}</span><b>{owned ? move.name : 'VERSIEGELT'}</b><small>{owned ? (equipped ? 'AUSGERÜSTET' : move.kind.toUpperCase()) : 'NOCH NICHT FREIGESCHALTET'}</small></button> })}</div>
    <div className="section-title collection-section-title">DEINE VERBÜNDETEN <span>{save.ownedRivals.length} / {RIVALS.length}</span></div><div className="collection-grid">{RIVALS.map((rival) => { const owned = save.ownedRivals.includes(rival.id); return <div className={`collection-card rival-card ${owned ? 'rival-owned' : 'locked'}`} key={rival.id}><span className="collection-icon">{owned ? rival.emoji : '· · ·'}</span><b>{owned ? rival.name : 'VERSIEGELT'}</b><small>{owned ? rival.ally.label : 'NOCH NICHT FREIGESCHALTET'}</small></div> })}</div>
  </div>
}

function ScreenHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div className="screen-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div> }
function ProfileScreen({ save, onSelectRival }: { save: Save; onSelectRival: (id: string | null) => void }) {
  return <div className="content-screen profile-screen"><ScreenHeading eyebrow="IDENTITÄT" title="Profil" copy="Deine Statistik. Deine Regeln." /><div className="profile-card"><div className="profile-avatar">A<span>✦</span></div><div><span className="card-eyebrow">DISKUTANTIN SEIT 2026</span><h2>Anni</h2><p>Mutig, direkt und immer bereit für eine gute Runde.</p></div></div><div className="profile-stats"><Stat label="SIEGE" value={save.wins} /><Stat label="BESTE SERIE" value={save.streak} /><Stat label="WEISHEIT" value={save.wisdom} /></div><div className="manifesto"><span>„</span><p>Eine Diskussion ist erst vorbei, wenn niemand mehr zuhört.</p></div><div className="loadout-summary"><div className="section-title">AKTIVES LOADOUT <span>3 SLOTS</span></div>{save.loadout.map((id, index) => { const move = MOVES.find((item) => item.id === id); return move ? <div className="loadout-row" key={id}><span>0{index + 1}</span><b>{move.icon} {move.name}</b><small>{move.phrase}</small></div> : null })}</div><div className="companion-summary"><div className="section-title">AKTIVER VERBÜNDETER <span>{save.ownedRivals.length} GESAMMELT</span></div><div className="companion-picker"><button className={!save.selectedRival ? 'selected' : ''} onClick={() => onSelectRival(null)}>Ohne</button>{save.ownedRivals.map((id) => { const rival = RIVALS.find((item) => item.id === id); return rival ? <button className={save.selectedRival === id ? 'selected' : ''} key={id} onClick={() => onSelectRival(id)}><span>{rival.emoji}</span>{rival.name}<small>{rival.ally.label}</small></button> : null })}</div></div></div>
}

export default App
