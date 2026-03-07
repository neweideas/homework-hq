import { useState, useEffect } from "react"; 
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gjujjdmpxowzosnlrcum.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdWpqZG1weG93em9zbmxyY3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzA5OTMsImV4cCI6MjA4ODM0Njk5M30.cqgdBE_qOe0GIyhamBp7HHBC9Knb0oeqwQGsy62if0s";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const USER_ID = "student";


const SUBJECTS = [
  "Math (Algebra)",
  "Science (Biology)",
  "English (Literature)",
  "World History",
  "Spanish",
  "Health",
  "Music Theory",
  "Adv. Band",
];
const PLATFORMS = ["PowerSchool", "Brightspace", "HMH", "Worksheet", "Progress Learning", "Delta Math"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const QUOTES = [
  { text: "Everybody's got a hungry heart.", author: "Bruce Springsteen" },
  { text: "What's comin' will come, and we'll meet it when it does.", author: "Hagrid, Harry Potter" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "You just gotta keep going and fighting for everything.", author: "Taylor Swift" },
  { text: "To live will be an awfully big adventure.", author: "J.M. Barrie, Peter Pan" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "We keep moving forward, opening new doors, and doing new things.", author: "Walt Disney" },
  { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
  { text: "Some people want it to happen, some wish it would happen, others make it happen.", author: "Michael Jordan" },
  { text: "Don't tell me the sky's the limit when there are footprints on the moon.", author: "Paul Brandt" },
  { text: "You've gotta dance like there's nobody watching.", author: "William W. Purkey" },
  { text: "I can't change the direction of the wind, but I can adjust my sails.", author: "Jimmy Dean" },
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Shoot for the moon. Even if you miss, you'll land among the stars.", author: "Norman Vincent Peale" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh" },
  { text: "We are all stars, and we deserve to twinkle.", author: "Marilyn Monroe" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Sharon Begley" },
  { text: "I survived because the fire inside me burned brighter than the fire around me.", author: "Joshua Graham" },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
  { text: "You didn't come this far to only come this far.", author: "" },
  { text: "Darkness cannot drive out darkness; only light can do that.", author: "Martin Luther King Jr." },
  { text: "We do not need magic to transform our world. We carry all the power we need inside ourselves.", author: "J.K. Rowling" },
  { text: "I am the master of my fate, I am the captain of my soul.", author: "William Ernest Henley" },
  { text: "The comeback is always stronger than the setback.", author: "" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Legends don't chase — they create.", author: "" },
  { text: "Out of the night that covers me, black as the pit from pole to pole, I thank whatever gods may be for my unconquerable soul.", author: "William Ernest Henley" },
  { text: "Real eyes realize real lies.", author: "Tupac Shakur" },
  { text: "I got a lot to prove to myself.", author: "Kendrick Lamar" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "It's not about the size of the dog in the fight, it's about the size of the fight in the dog.", author: "Mark Twain" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne, Winnie the Pooh" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "You can't go back and change the beginning, but you can start where you are and change the ending.", author: "C.S. Lewis" },
  { text: "Throw me to the wolves and I'll return leading the pack.", author: "" },
  { text: "Work hard in silence. Let success be your noise.", author: "Frank Ocean" },
  { text: "No pressure, no diamonds.", author: "Thomas Carlyle" },
  { text: "She believed she could, so she did.", author: "R.S. Grey" },
  { text: "We accept the love we think we deserve.", author: "Stephen Chbosky, The Perks of Being a Wallflower" },
  { text: "God places the heaviest burden on those who can carry its weight.", author: "Reggie White" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "I hated every minute of training, but I said, don't quit. Suffer now and live the rest of your life as a champion.", author: "Muhammad Ali" },
  { text: "Success is not final, failure is not fatal — it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "When the going gets tough, the tough get going.", author: "Billy Ocean" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Stars can't shine without darkness.", author: "" },
  { text: "Two roads diverged in a wood, and I — I took the one less traveled by.", author: "Robert Frost" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "I raise up my voice — not so that I can shout, but so that those without a voice can be heard.", author: "Malala Yousafzai" },
  { text: "If you're going through hell, keep going.", author: "Winston Churchill" },
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "To infinity and beyond.", author: "Buzz Lightyear" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "It's not about being the best. It's about being better than you were yesterday.", author: "" },
  { text: "You've got to be in it to win it.", author: "" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "I'm starting with the man in the mirror.", author: "Michael Jackson" },
  { text: "Prove them wrong.", author: "" },
  { text: "I am not afraid. I was born to do this.", author: "Joan of Arc" },
  { text: "Your only competition is who you were yesterday.", author: "" },
  { text: "The grind includes the weekdays.", author: "" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "I've failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" },
  { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr." },
  { text: "Don't wish it were easier. Wish you were better.", author: "Jim Rohn" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "You were born to stand out.", author: "Dr. Seuss" },
  { text: "The best way out is always through.", author: "Robert Frost" },
  { text: "We keep moving forward.", author: "Walt Disney" },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "A smooth sea never made a skilled sailor.", author: "Franklin D. Roosevelt" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "Logic will get you from A to B. Imagination will take you everywhere.", author: "Albert Einstein" },
  { text: "If you want to fly, give up everything that weighs you down.", author: "Toni Morrison" },
  { text: "The question isn't who is going to let me — it's who is going to stop me.", author: "Ayn Rand" },
  { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
  { text: "I can. I will. End of story.", author: "" },
  { text: "You have to fight through some bad days to earn the best days of your life.", author: "" },
  { text: "Make yourself proud.", author: "" },
  { text: "One day or day one. You decide.", author: "" },
  { text: "Your future self is watching you right now through your memories.", author: "" },
];

const getDailyQuote = () => {
  const d = new Date();
  const dayIndex = d.getFullYear() * 1000 + d.getMonth() * 31 + d.getDate();
  return QUOTES[dayIndex % QUOTES.length];
};

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

const defaultCheckins = () => ({
  date: todayKey(),
  checkedPlatforms: [],
  assignments: [],
  notes: "",
  completed: false,
});

function PendingView({ checkin, history, subjectColors, platformColors, tomorrowType, aSubjects, bSubjects }) {
  const allDays = [checkin, ...history];
  const pending = [];
  const completed = [];
  allDays.forEach(day => {
    (day.assignments || []).forEach(a => {
      const entry = { ...a, fromDate: day.date };
      if (a.done) completed.push(entry);
      else pending.push(entry);
    });
  });
  const withDate = pending.filter(a => a.dueDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const withoutDate = pending.filter(a => !a.dueDate);
  const sorted = [...withDate, ...withoutDate];
  const today = todayKey();
  const isOverdue = (d) => d && d < today;
  const isDueToday = (d) => d === today;
  const isDueSoon = (d) => {
    if (!d) return false;
    const diff = (new Date(d + "T00:00:00") - new Date(today + "T00:00:00")) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 2;
  };

  // Focus Tonight: assignments for tomorrow's day type
  const tomorrowSubjects = tomorrowType === "A" ? aSubjects : tomorrowType === "B" ? bSubjects : [];
  const focusTonight = sorted.filter(a => tomorrowSubjects.some(s => a.subject && a.subject.includes(s.split(" ")[0])));

  return (
    <div>
      {/* Focus Tonight banner */}
      {tomorrowType && focusTonight.length > 0 && (
        <div style={{
          background: tomorrowType === "A" ? "#0a1220" : "#140f00",
          border: `1px solid ${tomorrowType === "A" ? "#3b82f633" : "#f59e0b33"}`,
          borderRadius: 10, padding: "16px 18px", marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: tomorrowType === "A" ? "#3b82f6" : "#f59e0b", letterSpacing: 2, marginBottom: 10, fontWeight: "bold" }}>
            {tomorrowType === "A" ? "📘" : "📙"} FOCUS TONIGHT — {tomorrowType} DAY SUBJECTS DUE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {focusTonight.map(a => {
              const overdue = isOverdue(a.dueDate);
              const tagColor = overdue ? "#ef4444" : isDueToday(a.dueDate) ? "#f59e0b" : isDueSoon(a.dueDate) ? "#f59e0b" : "#aaa";
              const tagLabel = overdue ? "OVERDUE" : isDueToday(a.dueDate) ? "DUE TODAY" : a.dueDate
                ? `Due ${new Date(a.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                : "No due date";
              return (
                <div key={`focus-${a.fromDate}-${a.id}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${tomorrowType === "A" ? "#3b82f611" : "#f59e0b11"}` }}>
                  <span style={{ fontSize: 12, color: tomorrowType === "A" ? "#3b82f6" : "#f59e0b" }}>→</span>
                  <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{a.description}</span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                  <span style={{ fontSize: 10, color: tagColor, fontWeight: "bold" }}>{tagLabel}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}


      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Overdue", count: sorted.filter(a => isOverdue(a.dueDate)).length, color: "#ef4444" },
          { label: "Due Soon", count: sorted.filter(a => isDueSoon(a.dueDate) && !isOverdue(a.dueDate)).length, color: "#f59e0b" },
          { label: "Pending", count: sorted.filter(a => !isOverdue(a.dueDate) && !isDueSoon(a.dueDate)).length, color: "#aaa" },
          { label: "Completed", count: completed.length, color: "#2a9d5c" },
        ].map(s => (
          <div key={s.label} style={{ background: "#16181f", border: "1px solid #2a2d3a", borderRadius: 8, padding: "12px 18px", flex: 1, minWidth: 80, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: "bold", color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 10, color: "#999", letterSpacing: 1, marginTop: 3 }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
      {sorted.length === 0 && <div style={{ color: "#777", textAlign: "center", padding: 40 }}>🎉 No pending assignments!</div>}
      {sorted.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map(a => {
            const overdue = isOverdue(a.dueDate);
            const soon = isDueSoon(a.dueDate) && !overdue;
            const dueTdy = isDueToday(a.dueDate);
            const tagColor = overdue ? "#ef4444" : dueTdy ? "#f59e0b" : soon ? "#f59e0b" : "#aaa";
            const tagLabel = overdue ? "OVERDUE" : dueTdy ? "DUE TODAY" : a.dueDate
              ? `Due ${new Date(a.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
              : "No due date";
            return (
              <div key={`${a.fromDate}-${a.id}`} style={{ background: overdue ? "#1a0505" : soon ? "#1a0900" : "#16181f", border: `1px solid ${overdue ? "#ef444466" : soon ? "#f9731688" : "#2a2d3a"}`, borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ fontSize: 13, color: "#e8eaf0", marginBottom: 6 }}>{a.description}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${platformColors[a.platform]}22`, color: platformColors[a.platform] }}>{a.platform}</span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${tagColor}22`, color: tagColor, fontWeight: "bold" }}>{tagLabel}</span>
                  <span style={{ fontSize: 10, color: "#888" }}>Added {new Date(a.fromDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  {overdue && (
                    <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: "#fff", flexShrink: 0 }}>!</div>
                  )}
                  {soon && !overdue && (
                    <div title="Due soon!" style={{ marginLeft: "auto", position: "relative", flexShrink: 0, width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderBottom: "19px solid #f97316" }}>
                      <span style={{ position: "absolute", top: 4, left: "-4px", fontSize: 11, fontWeight: "bold", color: "#fff" }}>!</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {completed.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#777", marginBottom: 12, textTransform: "uppercase" }}>✓ Completed</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {completed.map(a => (
              <div key={`${a.fromDate}-${a.id}`} style={{ background: "#0a1a10", border: "1px solid #2a9d5c22", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, opacity: 0.6 }}>
                <span style={{ color: "#2a9d5c", fontSize: 12 }}>✓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>{a.description}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: "#777" }}>{a.subject}</span>
                    <span style={{ fontSize: 10, color: "#777" }}>{a.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HomeworkTracker() {
  const [view, setView] = useState("today"); // today | history | add
  const [checkin, setCheckin] = useState(defaultCheckins());
  const [history, setHistory] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    subject: SUBJECTS[0],
    platform: PLATFORMS[0],
    description: "",
    dateAssigned: "",
    dueDate: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [celebrateVisible, setCelebrateVisible] = useState(false);
  const [habitsCelebrate, setHabitsCelebrate] = useState(false);
  const [showTempHabitForm, setShowTempHabitForm] = useState(false);
  const [newTempHabit, setNewTempHabit] = useState({ label: "", startDate: "", endDate: "", color: "#a78bfa" });
  const [tests, setTests] = useState([]);
  const [showTestForm, setShowTestForm] = useState(false);
  const [newTest, setNewTest] = useState({ subject: SUBJECTS[0], description: "", testDate: "", type: "Quiz" });
  const [showWeekendPrep, setShowWeekendPrep] = useState(false);
  const [currentQuote] = useState(getDailyQuote());
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTime, setReminderTime] = useState("17:00");

  const [tempHabits, setTempHabits] = useState([]);
  const [syncStatus, setSyncStatus] = useState(null); // null | 'saving' | 'saved' | 'error'

  // Load from Supabase
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('checkins')
          .select('data')
          .eq('user_id', USER_ID)
          .maybeSingle();
        if (data?.data) {
          const d = data.data;
          setHistory(d.history || []);
          if (d.today && d.today.date === todayKey()) {
            setCheckin(d.today);
          }
          if (d.tempHabits) setTempHabits(d.tempHabits);
          if (d.tests) setTests(d.tests);
        }
      } catch (e) {}
    };
    load();
  }, []);

  // Re-sync when tab regains focus (fixes cross-device stale data)
  useEffect(() => {
    const syncFromSupabase = () => {
      supabase.from('checkins').select('data').eq('user_id', USER_ID).maybeSingle()
        .then(({ data }) => {
          if (data?.data) {
            const d = data.data;
            setHistory(d.history || []);
            if (d.today && d.today.date === todayKey()) setCheckin(d.today);
            if (d.tempHabits) setTempHabits(d.tempHabits);
            if (d.tests) setTests(d.tests);
          }
        })
        .catch(() => {});
    };
    const handleVisibility = () => { if (!document.hidden) syncFromSupabase(); };
    window.addEventListener('focus', syncFromSupabase);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('focus', syncFromSupabase);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Save to Supabase
  const save = (updatedCheckin, updatedHistory, updatedTempHabits, updatedTests) => {
    setSyncStatus('saving');
    supabase.from('checkins').upsert({
      user_id: USER_ID,
      data: {
        today: updatedCheckin,
        history: updatedHistory,
        tempHabits: updatedTempHabits !== undefined ? updatedTempHabits : tempHabits,
        tests: updatedTests !== undefined ? updatedTests : tests,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
      .then(() => {
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus(null), 2000);
      })
      .catch(() => {
        setSyncStatus('error');
        setTimeout(() => setSyncStatus(null), 4000);
      });
  };

  const checkHabitsComplete = (nextCheckin, currentTempHabits) => {
    const today = todayKey();
    const bioNotes = nextCheckin.habitBioNotes || false;
    const bioPractice = nextCheckin.habitBioPractice || false;
    const activeTempHabitsDone = (currentTempHabits || tempHabits)
      .filter(h => today >= h.startDate && today <= h.endDate)
      .every(h => nextCheckin[`tempHabit_${h.id}`] || false);
    const deltaPacketsDone = (nextCheckin.deltaMathPackets || [])
      .filter(p => !p.done).length === 0;
    const allHabitsDone = bioNotes && bioPractice && activeTempHabitsDone && deltaPacketsDone;
    if (allHabitsDone && !habitsCelebrate) {
      setHabitsCelebrate(true);
      setTimeout(() => setHabitsCelebrate(false), 3000);
      // Play a pleasant chime
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.15 + 0.05);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.4);
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 0.5);
        });
      } catch(e) {}
    }
  };

  const checkHabitsComplete_ref = checkHabitsComplete;

  const togglePlatform = (platform) => {
    const isChecking = !checkin.checkedPlatforms.includes(platform);
    const updated = isChecking
      ? [...checkin.checkedPlatforms, platform]
      : checkin.checkedPlatforms.filter(p => p !== platform);
    let next = { ...checkin, checkedPlatforms: updated };
    if (platform === "Progress Learning") {
      next = { ...next, habitBioPractice: isChecking };
    }
    setCheckin(next);
    save(next, history);
  };

  const toggleAssignment = (id) => {
    const updated = checkin.assignments.map(a =>
      a.id === id ? { ...a, done: !a.done } : a
    );
    const next = { ...checkin, assignments: updated };
    setCheckin(next);
    save(next, history);
    const allDone = updated.length > 0 && updated.every(a => a.done);
    if (allDone) {
      setCelebrateVisible(true);
      setTimeout(() => setCelebrateVisible(false), 3000);
    }
  };

  const addAssignment = () => {
    if (!newAssignment.description.trim()) return;
    if (!newAssignment.dateAssigned || !newAssignment.dueDate) return;
    const a = {
      ...newAssignment,
      id: Date.now(),
      done: false,
      addedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    let next;
    if (newAssignment.platform === "Delta Math") {
      const packet = {
        id: a.id,
        description: newAssignment.description,
        dateAssigned: newAssignment.dateAssigned,
        dueDate: newAssignment.dueDate,
        pct: 0,
        done: false,
      };
      next = {
        ...checkin,
        assignments: [...checkin.assignments, a],
        deltaMathPackets: [...(checkin.deltaMathPackets || []), packet],
      };
    } else {
      next = { ...checkin, assignments: [...checkin.assignments, a] };
    }
    setCheckin(next);
    save(next, history);
    setNewAssignment({ subject: SUBJECTS[0], platform: PLATFORMS[0], description: "", dateAssigned: "", dueDate: "" });
    setShowAddForm(false);
  };

  const removeAssignment = (id) => {
    const next = { ...checkin, assignments: checkin.assignments.filter(a => a.id !== id) };
    setCheckin(next);
    save(next, history);
  };

  const completeCheckin = () => {
    const entry = { ...checkin, completed: true, completedAt: new Date().toLocaleString() };
    const newHistory = [entry, ...history.filter(h => h.date !== todayKey())];
    setHistory(newHistory);
    const next = { ...entry };
    setCheckin(next);
    save(next, newHistory);
  };

  const resetToday = () => {
    const fresh = defaultCheckins();
    setCheckin(fresh);
    save(fresh, history);
  };

  const parseDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const allPlatformsChecked = checkin.checkedPlatforms.length === PLATFORMS.length;
  const doneCount = checkin.assignments.filter(a => a.done).length;
  const totalCount = checkin.assignments.length;
  const allDone = totalCount > 0 && doneCount === totalCount;
  const progressPct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  // Streak counter — consecutive completed check-in days
  const calcStreak = () => {
    if (history.length === 0) return checkin.completed ? 1 : 0;
    let streak = checkin.completed ? 1 : 0;
    const allEntries = checkin.completed ? [checkin, ...history] : [...history];
    for (let i = 0; i < allEntries.length - 1; i++) {
      const curr = allEntries[i];
      const next = allEntries[i + 1];
      try {
        const diff = Math.round((parseDate(curr.date) - parseDate(next.date)) / (1000 * 60 * 60 * 24));
        if (next.completed && diff <= 3) {
          streak++;
        } else {
          break;
        }
      } catch(e) { break; }
    }
    return streak;
  };
  const streak = calcStreak();

  // Weekly grade — this week's completed vs total assignments
  const getWeekGrade = () => {
    const now = new Date();
    const dow = now.getDay();
    const daysFromMon = dow === 0 ? 6 : dow - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - daysFromMon);
    weekStart.setHours(0,0,0,0);
    const allEntries = [checkin, ...history];
    let total = 0, done = 0;
    allEntries.forEach(entry => {
      const parts = entry.date.split("-").map(Number);
      const entryDate = new Date(parts[0], parts[1]-1, parts[2]);
      if (entryDate >= weekStart) {
        (entry.assignments || []).forEach(a => {
          total++;
          if (a.done) done++;
        });
      }
    });
    if (total === 0) return null;
    const pct = Math.round((done / total) * 100);
    const grade = pct >= 93 ? "A" : pct >= 85 ? "B" : pct >= 75 ? "C" : pct >= 65 ? "D" : "F";
    const color = pct >= 85 ? "#2a9d5c" : pct >= 75 ? "#f59e0b" : "#ef4444";
    return { pct, grade, color, done, total };
  };
  const weekGrade = getWeekGrade();

  // Win wall — days where all assignments were completed on or before due date
  const isPerfectDay = (entry) => {
    const assignments = entry.assignments || [];
    if (!entry.completed || assignments.length === 0) return false;
    return assignments.every(a => {
      if (!a.done) return false;
      if (!a.dueDate) return true; // no due date, counts as on time
      return entry.date <= a.dueDate; // completed on or before due date
    });
  };
  const winDays = [...history, checkin].filter(isPerfectDay).length;

  const platformColors = {
    PowerSchool: "#e8611a",
    Brightspace: "#0078d4",
    HMH: "#6c3eb8",
    Worksheet: "#2a9d5c",
    "Progress Learning": "#e91e8c",
    "Delta Math": "#f97316",
  };

  const subjectColors = {
    "Math (Algebra)": "#3b82f6",
    "Science (Biology)": "#06b6d4",
    "English (Literature)": "#8b5cf6",
    "World History": "#f59e0b",
    "Spanish": "#ef4444",
    "Health": "#2a9d5c",
    "Music Theory": "#ec4899",
    "Adv. Band": "#f97316",
  };

  // A/B Day schedule logic
  // Anchor: Monday 3/2/2026 = A Day week (A=MON,WED,FRI  B=TUE,THU)
  const getScheduleInfo = (dateStr) => {
    const parts = dateStr.split("-").map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const dow = date.getDay(); // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
    if (dow === 0 || dow === 6) return null;
    const anchorMonday = new Date(2026, 2, 2); // March 2 2026
    const daysFromMon = dow === 0 ? 6 : dow - 1;
    const weekMonday = new Date(parts[0], parts[1] - 1, parts[2] - daysFromMon);
    const weeksSinceAnchor = Math.round((weekMonday - anchorMonday) / (7 * 24 * 60 * 60 * 1000));
    const isAWeekStart = weeksSinceAnchor % 2 === 0;
    const isMWF = dow === 1 || dow === 3 || dow === 5;
    return (isAWeekStart ? isMWF : !isMWF) ? "A" : "B";
  };

  const todayType = getScheduleInfo(todayKey());
  const getTomorrowKey = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };
  const tomorrowType = getScheduleInfo(getTomorrowKey());
  const tomorrowDate = new Date(getTomorrowKey() + "T00:00:00");
  const tomorrowName = tomorrowDate.toLocaleDateString("en-US", { weekday: "long" });

  const A_DAY_SUBJECTS = ["Math (Algebra)", "Science (Biology)", "English (Literature)", "Spanish"];
  const B_DAY_SUBJECTS = ["World History", "Health", "Music Theory", "Adv. Band"];

  const dateDisplay = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      color: "#e8eaf0",
      fontFamily: "'Courier New', monospace",
      padding: "0",
    }}>
      <style>{`body, html { background: #0f1117 !important; margin: 0; padding: 0; }`}</style>
      {/* Confetti + Sound celebrate overlay — all assignments done */}
      {celebrateVisible && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)", zIndex: 999, flexDirection: "column",
          animation: "fadeIn 0.3s ease",
        }} onClick={() => setCelebrateVisible(false)}>
          {/* Confetti bursts */}
          {[...Array(30)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: ["#ffd700","#ef4444","#3b82f6","#2a9d5c","#a78bfa","#ec4899","#f97316"][Math.floor(Math.random()*7)],
              animation: `confettiFall ${1.5 + Math.random() * 2}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: 0,
            }} />
          ))}
          <div style={{ fontSize: 80, position: "relative", zIndex: 1 }}>🎉</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#ffd700", marginTop: 12, position: "relative", zIndex: 1 }}>All done!</div>
          <div style={{ color: "#aaa", marginTop: 8, position: "relative", zIndex: 1 }}>Great work today. Tap to dismiss.</div>
        </div>
      )}

      {/* Habits celebrate — mini banner */}
      {habitsCelebrate && (
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          background: "#2a9d5c", color: "#fff", borderRadius: 12,
          padding: "14px 28px", zIndex: 998, textAlign: "center",
          boxShadow: "0 4px 24px rgba(42,157,92,0.4)",
          animation: "fadeIn 0.3s ease",
          fontFamily: "'Courier New', monospace",
        }}>
          <div style={{ fontSize: 22 }}>✅</div>
          <div style={{ fontWeight: "bold", marginTop: 4 }}>Daily Habits Complete!</div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Locked in 🔒</div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "#16181f",
        borderBottom: "1px solid #2a2d3a",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        {/* Top row: title left, date right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>
              Daily Check-In
            </div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
              📚 Homework HQ
            </div>
          </div>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{ fontSize: 13, color: "#aaa" }}>{dateDisplay}</div>
            {todayType && (
              <div style={{ fontSize: 12, color: todayType === "A" ? "#3b82f6" : "#f59e0b", fontWeight: "bold", letterSpacing: 1 }}>
                {todayType === "A" ? "📘" : "📙"} TODAY: {todayType} DAY
              </div>
            )}
            {checkin.completed && (
              <div style={{ fontSize: 11, color: "#2a9d5c" }}>✓ Check-in complete</div>
            )}
            {syncStatus === 'saving' && (
              <div style={{ fontSize: 10, color: "#888", letterSpacing: 1 }}>⟳ Syncing...</div>
            )}
            {syncStatus === 'saved' && (
              <div style={{ fontSize: 10, color: "#2a9d5c", letterSpacing: 1 }}>✓ Synced</div>
            )}
            {syncStatus === 'error' && (
              <div style={{ fontSize: 10, color: "#ef4444", letterSpacing: 1 }}>✗ Sync failed</div>
            )}
          </div>
        </div>
        {/* Bottom row: buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setShowWeekendPrep(true)} style={{
            padding: "6px 14px", background: "#a78bfa22",
            border: "1px solid #a78bfa55", color: "#a78bfa",
            borderRadius: 6, cursor: "pointer", fontSize: 11,
            fontFamily: "'Courier New', monospace", letterSpacing: 1,
          }}>
            🗓 WEEKEND PREP
          </button>
          <button onClick={() => setShowReminderModal(true)} style={{
            padding: "6px 14px", background: "#2a9d5c22",
            border: "1px solid #2a9d5c55", color: "#2a9d5c",
            borderRadius: 6, cursor: "pointer", fontSize: 11,
            fontFamily: "'Courier New', monospace", letterSpacing: 1,
          }}>
            🔔 REMINDERS
          </button>
        </div>
      </div>
      {/* Reminder Modal */}
      {showReminderModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#16181f", border: "1px solid #2a2d3a", borderRadius: 12, padding: 28, width: "100%", maxWidth: 360 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#2a9d5c", marginBottom: 16, textTransform: "uppercase" }}>🔔 Daily Reminder</div>
            <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>Set a daily weekday reminder for everyone using the app.</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#777", letterSpacing: 1, marginBottom: 8 }}>REMINDER TIME</div>
              <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} style={{
                width: "100%", padding: "10px 14px", background: "#0f1117",
                border: "1px solid #2a2d3a", borderRadius: 6, color: "#e8eaf0",
                fontSize: 16, fontFamily: "'Courier New', monospace", boxSizing: "border-box",
              }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={async () => {
                try {
                  const permission = await Notification.requestPermission();
                  if (permission !== 'granted') { alert('Please enable notifications in your browser settings.'); return; }
                  const reg = await navigator.serviceWorker.ready;
                  const sub = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: "BN5SCuZMCcbif275MKwCPNzoXAVQG5jRb58U8qnWqAdZ-0Fte6buu9_9NawI_U5rXdF9rFiH5ihSCf6smfw1Ykk",
                  });
                  await supabase.from('push_subscriptions').upsert({ user_id: USER_ID, subscription: sub.toJSON(), reminder_time: reminderTime }, { onConflict: 'user_id' });
                  // Save shared reminder time
                  await supabase.from('checkins').upsert({ user_id: 'reminder_settings', data: { time: reminderTime }, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
                  setShowReminderModal(false);
                  alert(`✅ Reminders set for ${reminderTime} every weekday!`);
                } catch (err) { alert('Could not enable notifications: ' + err.message); }
              }} style={{
                flex: 1, padding: "10px", background: "#2a9d5c", border: "none",
                color: "#fff", borderRadius: 6, cursor: "pointer", fontSize: 12,
                fontFamily: "'Courier New', monospace", letterSpacing: 1, fontWeight: "bold",
              }}>SAVE & ENABLE</button>
              <button onClick={() => setShowReminderModal(false)} style={{
                padding: "10px 16px", background: "none", border: "1px solid #2a2d3a",
                color: "#777", borderRadius: 6, cursor: "pointer", fontSize: 12,
                fontFamily: "'Courier New', monospace",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Weekend Prep Modal */}
      {showWeekendPrep && (() => {
        const today = todayKey();
        const todayParts = today.split("-").map(Number);
        const todayDate = new Date(todayParts[0], todayParts[1]-1, todayParts[2]);
        const dow = todayDate.getDay();
        // Find next Monday
        const daysToMon = dow === 1 ? 7 : (8 - dow) % 7;
        const nextMon = new Date(todayDate); nextMon.setDate(todayDate.getDate() + daysToMon);
        const nextFri = new Date(nextMon); nextFri.setDate(nextMon.getDate() + 4);
        const toKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
        const monKey = toKey(nextMon);
        const friKey = toKey(nextFri);

        // Pending assignments due next week
        const allEntries = [checkin, ...history];
        const nextWeekAssignments = [];
        allEntries.forEach(day => {
          (day.assignments || []).forEach(a => {
            if (!a.done && a.dueDate && a.dueDate >= monKey && a.dueDate <= friKey) {
              nextWeekAssignments.push(a);
            }
          });
        });
        nextWeekAssignments.sort((a,b) => a.dueDate.localeCompare(b.dueDate));

        // Tests next week
        const nextWeekTests = tests.filter(t => t.testDate >= monKey && t.testDate <= friKey)
          .sort((a,b) => a.testDate.localeCompare(b.testDate));

        // Already overdue
        const overdueItems = [];
        allEntries.forEach(day => {
          (day.assignments || []).forEach(a => {
            if (!a.done && a.dueDate && a.dueDate < today) overdueItems.push(a);
          });
        });

        // Next week day schedule
        const weekDays = [];
        for (let i = 0; i < 5; i++) {
          const d = new Date(nextMon); d.setDate(nextMon.getDate() + i);
          const key = toKey(d);
          const dayType = getScheduleInfo(key);
          weekDays.push({ date: d, key, dayType, name: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) });
        }

        return (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.85)", zIndex: 1000,
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "40px 20px", overflowY: "auto",
          }} onClick={e => { if (e.target === e.currentTarget) setShowWeekendPrep(false); }}>
            <div style={{
              background: "#16181f", border: "1px solid #a78bfa44",
              borderRadius: 14, padding: "28px", width: "100%", maxWidth: 680,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 2, textTransform: "uppercase" }}>Weekend Prep Mode</div>
                  <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 4 }}>
                    🗓 Week of {nextMon.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </div>
                </div>
                <button onClick={() => setShowWeekendPrep(false)} style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 24 }}>×</button>
              </div>

              {/* Next week schedule */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: "#999", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Next Week Schedule</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {weekDays.map(d => (
                    <div key={d.key} style={{
                      flex: 1, minWidth: 100, background: "#0f1117",
                      border: `1px solid ${d.dayType === "A" ? "#3b82f633" : "#f59e0b33"}`,
                      borderRadius: 8, padding: "10px 12px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: 10, color: "#888" }}>{d.name}</div>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: d.dayType === "A" ? "#3b82f6" : "#f59e0b", marginTop: 4 }}>
                        {d.dayType} Day
                      </div>
                      <div style={{ fontSize: 9, color: "#777", marginTop: 3 }}>
                        {(d.dayType === "A" ? A_DAY_SUBJECTS : B_DAY_SUBJECTS).map(s => s.split(" ")[0]).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overdue — clear before Monday */}
              {overdueItems.length > 0 && (
                <div style={{ marginBottom: 20, background: "#1a0505", border: "1px solid #ef444433", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, color: "#ef4444", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>🚨 Clear These Before Monday</div>
                  {overdueItems.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0", borderBottom: "1px solid #ef444411" }}>
                      <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                      <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{a.description}</span>
                      <span style={{ fontSize: 10, color: "#ef4444" }}>Was due {a.dueDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Next week assignments */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#999", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>
                  📋 Due Next Week ({nextWeekAssignments.length})
                </div>
                {nextWeekAssignments.length === 0 ? (
                  <div style={{ color: "#777", fontSize: 13, padding: "10px 0" }}>Nothing logged due next week yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {nextWeekAssignments.map((a, i) => {
                      const parts = a.dueDate.split("-").map(Number);
                      const dt = new Date(parts[0], parts[1]-1, parts[2]);
                      const dayInfo = getScheduleInfo(a.dueDate);
                      return (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", background: "#0f1117", borderRadius: 6 }}>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                          <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{a.description}</span>
                          {dayInfo && <span style={{ fontSize: 10, color: dayInfo === "A" ? "#3b82f6" : "#f59e0b" }}>{dayInfo} Day</span>}
                          <span style={{ fontSize: 10, color: "#aaa" }}>{dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tests next week */}
              {nextWeekTests.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, color: "#ffd700", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>🎯 Tests & Quizzes Next Week</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {nextWeekTests.map(t => {
                      const parts = t.testDate.split("-").map(Number);
                      const dt = new Date(parts[0], parts[1]-1, parts[2]);
                      const dayInfo = getScheduleInfo(t.testDate);
                      return (
                        <div key={t.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", background: "#1a1200", border: "1px solid #ffd70022", borderRadius: 6 }}>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[t.subject]}22`, color: subjectColors[t.subject] }}>{t.subject}</span>
                          <span style={{ fontSize: 10, color: "#ffd700", padding: "2px 7px", borderRadius: 3, background: "#ffd70011" }}>{t.type}</span>
                          <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{t.description}</span>
                          {dayInfo && <span style={{ fontSize: 10, color: dayInfo === "A" ? "#3b82f6" : "#f59e0b" }}>{dayInfo} Day</span>}
                          <span style={{ fontSize: 10, color: "#aaa" }}>{dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ fontSize: 11, color: "#777", textAlign: "center", marginTop: 8 }}>
                Use this weekend to get ahead. Clear overdue work first, then tackle what's due early next week.
              </div>
            </div>
          </div>
        );
      })()}

      {/* Daily Quote */}
      {(() => {
        const q = currentQuote;
        return (
          <div style={{
            background: "linear-gradient(135deg, #1a1200 0%, #0f1117 60%)",
            borderBottom: "1px solid #f9731622",
            padding: "12px 28px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>⚡</span>
            <div>
              <div style={{
                fontSize: 13,
                color: "#ffd700",
                fontStyle: "italic",
                letterSpacing: 0.3,
              }}>
                "{q.text}"
              </div>
              {q.author && (
                <div style={{ fontSize: 10, color: "#999", marginTop: 3, letterSpacing: 1 }}>
                  — {q.author}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Tomorrow's Schedule Banner */}
      {tomorrowType && (
        <div style={{
          background: tomorrowType === "A" ? "#0a1220" : "#140f00",
          borderBottom: `1px solid ${tomorrowType === "A" ? "#3b82f622" : "#f59e0b22"}`,
          padding: "10px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>{tomorrowType === "A" ? "📘" : "📙"}</span>
            <div>
              <span style={{ fontSize: 12, color: tomorrowType === "A" ? "#3b82f6" : "#f59e0b", fontWeight: "bold", letterSpacing: 1 }}>
                {tomorrowName.toUpperCase()} IS A{tomorrowType === "A" ? "N" : ""} {tomorrowType} DAY
              </span>
              <span style={{ fontSize: 11, color: "#888", marginLeft: 10 }}>
                — prioritize {tomorrowType} day subjects tonight
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(tomorrowType === "A" ? A_DAY_SUBJECTS : B_DAY_SUBJECTS).map(s => (
              <span key={s} style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 3,
                background: `${subjectColors[s]}22`, color: subjectColors[s],
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Test alerts — today and tomorrow */}
      {(() => {
        const tomorrowKey = getTomorrowKey();
        const todayTests = tests.filter(t => t.testDate === todayKey());
        const tomorrowTests = tests.filter(t => t.testDate === tomorrowKey);
        if (todayTests.length === 0 && tomorrowTests.length === 0) return null;
        return (
          <div style={{ background: "#1a0505", borderBottom: "1px solid #ef444433", padding: "10px 28px", display: "flex", flexWrap: "wrap", gap: 10 }}>
            {todayTests.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>🔴</span>
                <span style={{ fontSize: 12, color: "#ef4444", fontWeight: "bold", letterSpacing: 0.5 }}>
                  {t.type} TODAY: {t.description}
                </span>
                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[t.subject]}22`, color: subjectColors[t.subject] }}>{t.subject}</span>
              </div>
            ))}
            {tomorrowTests.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: "bold", letterSpacing: 0.5 }}>
                  {t.type} TOMORROW: {t.description}
                </span>
                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[t.subject]}22`, color: subjectColors[t.subject] }}>{t.subject}</span>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Nav */}
      <div style={{
        borderBottom: "1px solid #2a2d3a",
        background: "#16181f",
      }}>
        {/* Mobile dropdown */}
        <div style={{ display: "block" }} className="mobile-nav">
          <select
            value={view}
            onChange={e => setView(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "#16181f",
              color: "#ffd700",
              border: "none",
              borderBottom: "2px solid #ffd700",
              fontSize: 14,
              fontFamily: "'Courier New', monospace",
              letterSpacing: 1,
              textTransform: "uppercase",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffd700' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
            }}
          >
            <option value="today">📋 Today</option>
            <option value="pending">📚 Homework Stack</option>
            <option value="history">📅 History</option>
            <option value="parent">⚡ TL;DR</option>
          </select>
        </div>
        <style>{`
          @media (min-width: 600px) {
            .mobile-nav { display: none !important; }
            .desktop-nav { display: flex !important; }
          }
          @media (max-width: 599px) {
            .mobile-nav { display: block !important; }
            .desktop-nav { display: none !important; }
          }
        `}</style>
        {/* Desktop tabs */}
        <div className="desktop-nav" style={{ display: "none", justifyContent: "center" }}>
          {["today", "pending", "history", "parent"].map(tab => (
            <button key={tab} onClick={() => setView(tab)} style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              color: view === tab ? "#ffd700" : "#999",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              borderBottom: view === tab ? "2px solid #ffd700" : "2px solid transparent",
              fontFamily: "'Courier New', monospace",
            }}>
              {tab === "today" ? "📋 Today" : tab === "pending" ? "📚 Stack" : tab === "history" ? "📅 History" : "⚡ TL;DR"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 20px" }}>

        {view === "today" && (
          <>
            {/* Daily Habits */}
            <div style={{
              background: "#16181f",
              border: "1px solid #2a2d3a",
              borderRadius: 10,
              padding: "20px",
              marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", textTransform: "uppercase" }}>
                  Daily Habits
                </div>
                <button onClick={() => setShowTempHabitForm(!showTempHabitForm)} style={{
                  padding: "6px 14px",
                  background: showTempHabitForm ? "#2a2d3a" : "#a78bfa22",
                  border: `1px solid ${showTempHabitForm ? "#777" : "#a78bfa66"}`,
                  color: showTempHabitForm ? "#999" : "#a78bfa",
                  borderRadius: 6, cursor: "pointer", fontSize: 11,
                  fontFamily: "'Courier New', monospace", letterSpacing: 1,
                }}>
                  {showTempHabitForm ? "✕ CANCEL" : "+ TEMP HABIT"}
                </button>
              </div>

              {/* Temp habit form */}
              {showTempHabitForm && (
                <div style={{
                  background: "#0f1117", border: "1px solid #a78bfa33",
                  borderRadius: 8, padding: 16, marginBottom: 16,
                }}>
                  <div style={{ fontSize: 10, color: "#a78bfa", letterSpacing: 1, marginBottom: 10 }}>NEW TEMPORARY HABIT</div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>HABIT / STUDY GOAL *</div>
                    <input
                      placeholder="e.g. Study Bio Chapter 14 for quiz"
                      value={newTempHabit.label}
                      onChange={e => setNewTempHabit({ ...newTempHabit, label: e.target.value })}
                      style={{
                        width: "100%", padding: "8px 10px", background: "#16181f",
                        border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5,
                        fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>START DATE *</div>
                      <input type="date" value={newTempHabit.startDate}
                        onChange={e => setNewTempHabit({ ...newTempHabit, startDate: e.target.value })}
                        style={{ width: "100%", padding: "8px 10px", background: "#16181f", border: `1px solid ${!newTempHabit.startDate ? "#a78bfa55" : "#2a2d3a"}`, color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 12, boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>END DATE *</div>
                      <input type="date" value={newTempHabit.endDate}
                        onChange={e => setNewTempHabit({ ...newTempHabit, endDate: e.target.value })}
                        style={{ width: "100%", padding: "8px 10px", background: "#16181f", border: `1px solid ${!newTempHabit.endDate ? "#a78bfa55" : "#2a2d3a"}`, color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 12, boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                  <button onClick={() => {
                    if (!newTempHabit.label.trim() || !newTempHabit.startDate || !newTempHabit.endDate) return;
                    const habit = { id: Date.now(), ...newTempHabit };
                    const updated = [...tempHabits, habit];
                    setTempHabits(updated);
                    save(checkin, history, updated);
                    setNewTempHabit({ label: "", startDate: "", endDate: "", color: "#a78bfa" });
                    setShowTempHabitForm(false);
                  }} style={{
                    padding: "9px 20px",
                    background: (newTempHabit.label.trim() && newTempHabit.startDate && newTempHabit.endDate) ? "#a78bfa" : "#2a2d3a",
                    color: (newTempHabit.label.trim() && newTempHabit.startDate && newTempHabit.endDate) ? "#0f1117" : "#888",
                    border: "none", borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Courier New', monospace", fontWeight: "bold", fontSize: 12, letterSpacing: 1,
                  }}>
                    ADD HABIT
                  </button>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Static habits */}
                {[
                  { key: "habitBioNotes", label: "Review Biology class notes", sublabel: "At least 10 minutes", color: "#e91e8c" },
                  { key: "habitBioPractice", label: "Complete Biology practice models", sublabel: "Progress Learning", color: "#e91e8c" },
                ].map(habit => {
                  const done = checkin[habit.key] || false;
                  return (
                    <div key={habit.key} style={{
                      background: done ? "#0d1a0d" : "#0f1117",
                      border: `1px solid ${done ? "#2a9d5c44" : habit.color + "33"}`,
                      borderRadius: 8, padding: "12px 14px", transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button onClick={() => {
                          const newVal = !done;
                          const next = { ...checkin, [habit.key]: newVal };
                          let nextFinal = next;
                          // habitBioPractice = Progress Learning — keep Step 1 in sync
                          if (habit.key === "habitBioPractice") {
                            const platforms = newVal
                              ? [...new Set([...checkin.checkedPlatforms, "Progress Learning"])]
                              : checkin.checkedPlatforms.filter(p => p !== "Progress Learning");
                            nextFinal = { ...next, checkedPlatforms: platforms };
                          }
                          setCheckin(nextFinal);
                          save(nextFinal, history);
                          checkHabitsComplete(nextFinal);
                        }} style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          border: `2px solid ${done ? "#2a9d5c" : habit.color}`,
                          background: done ? "#2a9d5c" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, color: "#fff", cursor: "pointer", transition: "all 0.2s",
                        }}>
                          {done ? "✓" : ""}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 13, color: done ? "#888" : "#e8eaf0",
                            textDecoration: done ? "line-through" : "none", transition: "all 0.2s",
                          }}>{habit.label}</div>
                          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{habit.sublabel}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Temporary date-range habits */}
                {tempHabits
                  .filter(h => todayKey() >= h.startDate && todayKey() <= h.endDate)
                  .map(habit => {
                    const doneKey = `tempHabit_${habit.id}`;
                    const done = checkin[doneKey] || false;
                    const daysLeft = Math.round((new Date(habit.endDate + "T00:00:00") - new Date(todayKey() + "T00:00:00")) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={habit.id} style={{
                        background: done ? "#0d1a0d" : "#110d1a",
                        border: `1px solid ${done ? "#2a9d5c44" : "#a78bfa33"}`,
                        borderRadius: 8, padding: "12px 14px", transition: "all 0.2s",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <button onClick={() => {
                            const next = { ...checkin, [doneKey]: !done };
                            setCheckin(next);
                            save(next, history);
                          }} style={{
                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                            border: `2px solid ${done ? "#2a9d5c" : "#a78bfa"}`,
                            background: done ? "#2a9d5c" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#fff", cursor: "pointer", transition: "all 0.2s",
                          }}>
                            {done ? "✓" : ""}
                          </button>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: done ? "#888" : "#e8eaf0", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>
                              {habit.label}
                            </div>
                            <div style={{ display: "flex", gap: 10, marginTop: 3, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 10, color: "#a78bfa" }}>Temporary habit</span>
                              <span style={{ fontSize: 10, color: daysLeft <= 1 ? "#f59e0b" : "#888" }}>
                                {daysLeft === 0 ? "Last day!" : daysLeft === 1 ? "1 day left" : `${daysLeft}d left · ends ${new Date(habit.endDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => {
                            const updated = tempHabits.filter(h => h.id !== habit.id);
                            setTempHabits(updated);
                            save(checkin, history, updated);
                          }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
                        </div>
                      </div>
                    );
                  })}

                {/* Dynamic Delta Math packets */}
                {(checkin.deltaMathPackets || []).length === 0 && (
                  <div style={{
                    background: "#0f1117", border: "1px solid #f9731622",
                    borderRadius: 8, padding: "12px 14px",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      border: "2px solid #f9731644", background: "transparent",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "#888" }}>Work on Delta Math</div>
                      <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>Add a Delta Math assignment in Assignments List to track it here</div>
                    </div>
                  </div>
                )}

                {(checkin.deltaMathPackets || []).map(packet => {
                  const pct = packet.pct || 0;
                  const done = packet.done || false;
                  const today = todayKey();
                  const isOverdue = packet.dueDate && packet.dueDate < today && !done;
                  const daysLeft = packet.dueDate
                    ? Math.round((new Date(packet.dueDate + "T00:00:00") - new Date(today + "T00:00:00")) / (1000 * 60 * 60 * 24))
                    : null;

                  return (
                    <div key={packet.id} style={{
                      background: done ? "#0d1a0d" : isOverdue ? "#1a0a0a" : "#0f1117",
                      border: `1px solid ${done ? "#2a9d5c44" : isOverdue ? "#ef444444" : "#f9731633"}`,
                      borderRadius: 8, padding: "12px 14px", transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <button onClick={() => {
                          const updated = (checkin.deltaMathPackets || []).map(p =>
                            p.id === packet.id ? { ...p, done: !p.done, pct: !p.done ? 100 : p.pct } : p
                          );
                          const next = { ...checkin, deltaMathPackets: updated };
                          setCheckin(next);
                          save(next, history);
                        }} style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                          border: `2px solid ${done ? "#2a9d5c" : "#f97316"}`,
                          background: done ? "#2a9d5c" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, color: "#fff", cursor: "pointer", transition: "all 0.2s",
                        }}>
                          {done ? "✓" : ""}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 13, color: done ? "#888" : "#e8eaf0",
                            textDecoration: done ? "line-through" : "none",
                          }}>{packet.description}</div>
                          <div style={{ display: "flex", gap: 10, marginTop: 3, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: "#f97316" }}>Delta Math</span>
                            {packet.dateAssigned && (
                              <span style={{ fontSize: 11, color: "#888" }}>
                                Assigned {new Date(packet.dateAssigned + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            )}
                            {packet.dueDate && (
                              <span style={{ fontSize: 11, color: isOverdue ? "#ef4444" : daysLeft <= 2 ? "#f59e0b" : "#aaa" }}>
                                {isOverdue ? "⚠ Overdue" : daysLeft === 0 ? "Due today" : `Due ${new Date(packet.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${daysLeft}d left`}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* % input */}
                        {!done && (
                          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                            <input
                              type="number" min="0" max="100"
                              value={pct}
                              onChange={e => {
                                const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                const updated = (checkin.deltaMathPackets || []).map(p =>
                                  p.id === packet.id ? { ...p, pct: val, done: val === 100 } : p
                                );
                                const next = { ...checkin, deltaMathPackets: updated };
                                setCheckin(next);
                                save(next, history);
                              }}
                              style={{
                                width: 52, padding: "5px 8px", background: "#16181f",
                                border: "1px solid #f9731655", color: "#f97316",
                                borderRadius: 5, fontFamily: "'Courier New', monospace",
                                fontSize: 14, fontWeight: "bold", textAlign: "center",
                              }}
                            />
                            <span style={{ fontSize: 12, color: "#888" }}>%</span>
                          </div>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div style={{ marginTop: 10, paddingLeft: 32 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#888", marginBottom: 4 }}>
                          <span>Progress</span>
                          <span style={{ color: pct >= 100 ? "#2a9d5c" : "#f97316" }}>{pct}%</span>
                        </div>
                        <div style={{ background: "#2a2d3a", borderRadius: 4, height: 6, overflow: "hidden" }}>
                          <div style={{
                            width: `${pct}%`, height: "100%", borderRadius: 4,
                            background: pct >= 100 ? "#2a9d5c" : pct >= 66 ? "#f97316" : pct >= 33 ? "#f59e0b" : "#ef4444",
                            transition: "width 0.4s ease",
                          }} />
                        </div>
                        {pct >= 100 && (
                          <div style={{ fontSize: 10, color: "#2a9d5c", marginTop: 4 }}>✓ 100% — complete!</div>
                        )}
                      </div>

                      {/* Remove packet */}
                      <div style={{ marginTop: 8, paddingLeft: 32 }}>
                        <button onClick={() => {
                          const updated = (checkin.deltaMathPackets || []).filter(p => p.id !== packet.id);
                          const next = { ...checkin, deltaMathPackets: updated };
                          setCheckin(next);
                          save(next, history);
                        }} style={{
                          background: "none", border: "none", color: "#333",
                          cursor: "pointer", fontSize: 11, fontFamily: "'Courier New', monospace",
                          padding: 0,
                        }}>× remove</button>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Progress bar */}
            {totalCount > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 12, color: "#aaa", marginBottom: 8
                }}>
                  <span>ASSIGNMENT PROGRESS</span>
                  <span style={{ color: allDone ? "#2a9d5c" : "#ffd700" }}>
                    {doneCount}/{totalCount} complete ({progressPct}%)
                  </span>
                </div>
                <div style={{ background: "#2a2d3a", borderRadius: 4, height: 8, overflow: "hidden" }}>
                  <div style={{
                    width: `${progressPct}%`,
                    height: "100%",
                    background: allDone ? "#2a9d5c" : "linear-gradient(90deg, #f59e0b, #ffd700)",
                    transition: "width 0.5s ease",
                    borderRadius: 4,
                  }} />
                </div>
              </div>
            )}

            {/* Daily Platforms Check-In */}
            <div style={{
              background: "#16181f",
              border: "1px solid #2a2d3a",
              borderRadius: 10,
              padding: "20px",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", marginBottom: 14, textTransform: "uppercase" }}>
                Daily Platforms Check-In {allPlatformsChecked ? "✓" : ""}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {PLATFORMS.map(p => {
                  const checked = checkin.checkedPlatforms.includes(p);
                  return (
                    <button key={p} onClick={() => togglePlatform(p)} style={{
                      padding: "10px 18px",
                      borderRadius: 6,
                      border: `2px solid ${checked ? platformColors[p] : "#2a2d3a"}`,
                      background: checked ? `${platformColors[p]}22` : "#0f1117",
                      color: checked ? platformColors[p] : "#999",
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: checked ? "bold" : "normal",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      {checked ? "✓" : "○"} {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assignments List */}
            <div style={{
              background: "#16181f",
              border: "1px solid #2a2d3a",
              borderRadius: 10,
              padding: "20px",
              marginBottom: 20,
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 16, flexWrap: "wrap", gap: 10
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", textTransform: "uppercase" }}>
                  Assignments List
                </div>
                <button onClick={() => setShowAddForm(!showAddForm)} style={{
                  padding: "8px 16px",
                  background: showAddForm ? "#2a2d3a" : "#ffd700",
                  color: showAddForm ? "#aaa" : "#0f1117",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}>
                  {showAddForm ? "✕ CANCEL" : "+ ADD"}
                </button>
              </div>

              {/* Add form */}
              {showAddForm && (
                <div style={{
                  background: "#0f1117",
                  border: "1px solid #2a2d3a",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>SUBJECT</div>
                      <select value={newAssignment.subject}
                        onChange={e => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                        style={{
                          width: "100%", padding: "8px 10px", background: "#16181f",
                          border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5,
                          fontFamily: "'Courier New', monospace", fontSize: 12,
                        }}>
                        <optgroup label="── A DAY ──">
                          <option>Math (Algebra)</option>
                          <option>Science (Biology)</option>
                          <option>English (Literature)</option>
                          <option>Spanish</option>
                        </optgroup>
                        <optgroup label="── B DAY ──">
                          <option>World History</option>
                          <option>Health</option>
                          <option>Music Theory</option>
                          <option>Adv. Band</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>PLATFORM</div>
                      <select value={newAssignment.platform}
                        onChange={e => setNewAssignment({ ...newAssignment, platform: e.target.value })}
                        style={{
                          width: "100%", padding: "8px 10px", background: "#16181f",
                          border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5,
                          fontFamily: "'Courier New', monospace", fontSize: 12,
                        }}>
                        {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>DESCRIPTION</div>
                    <input
                      placeholder="e.g. Chapter 4 reading + questions"
                      value={newAssignment.description}
                      onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })}
                      onKeyDown={e => e.key === "Enter" && addAssignment()}
                      style={{
                        width: "100%", padding: "8px 10px", background: "#16181f",
                        border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5,
                        fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>DATE ASSIGNED *</div>
                        <input type="date"
                          value={newAssignment.dateAssigned}
                          onChange={e => setNewAssignment({ ...newAssignment, dateAssigned: e.target.value })}
                          style={{
                            width: "100%", padding: "8px 10px", background: "#16181f",
                            border: `1px solid ${!newAssignment.dateAssigned ? "#66666688" : "#2a2d3a"}`,
                            color: "#e8eaf0", borderRadius: 5,
                            fontFamily: "'Courier New', monospace", fontSize: 12, boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>DATE DUE *</div>
                        <input type="date"
                          value={newAssignment.dueDate}
                          onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                          style={{
                            width: "100%", padding: "8px 10px", background: "#16181f",
                            border: `1px solid ${!newAssignment.dueDate ? "#66666688" : "#2a2d3a"}`,
                            color: "#e8eaf0", borderRadius: 5,
                            fontFamily: "'Courier New', monospace", fontSize: 12, boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                    {newAssignment.platform === "Delta Math" && (
                      <div style={{
                        background: "#f9731611", border: "1px solid #f9731633",
                        borderRadius: 6, padding: "8px 12px", marginTop: 8,
                        fontSize: 11, color: "#f97316",
                      }}>
                        ⚡ Delta Math packet — will be tracked daily in Daily Habits until 100% complete
                      </div>
                    )}
                  </div>
                  <button onClick={addAssignment} style={{
                    padding: "10px 20px", background: (newAssignment.description.trim() && newAssignment.dateAssigned && newAssignment.dueDate) ? "#2a9d5c" : "#2a2d3a",
                    border: "none",
                    color: (newAssignment.description.trim() && newAssignment.dateAssigned && newAssignment.dueDate) ? "#fff" : "#888",
                    borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Courier New', monospace", fontWeight: "bold", fontSize: 13,
                  }}>
                    ADD ASSIGNMENT
                  </button>
                </div>
              )}

              {checkin.assignments.length === 0 ? (
                <div style={{ color: "#777", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
                  No assignments logged yet — add them as you check each platform.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[...checkin.assignments]
                    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0))
                    .map(a => {
                    const today = todayKey();
                    const isOverdue = !a.done && a.dueDate && a.dueDate < today;
                    const isDueSoon = !a.done && !isOverdue && a.dueDate && (() => {
                      const diff = Math.round((parseDate(a.dueDate) - parseDate(today)) / (1000*60*60*24));
                      return diff <= 2 && diff >= 0;
                    })();
                    const bgColor = a.done ? "#0a1a10" : isOverdue ? "#1a0505" : isDueSoon ? "#1a0900" : a.priority ? "#1a0f00" : "#0f1117";
                    const borderColor = a.done ? "#2a9d5c44" : isOverdue ? "#ef444466" : isDueSoon ? "#f9731688" : a.priority ? "#f9731666" : "#2a2d3a";
                    return (
                    <div key={a.id} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      background: bgColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 7,
                      transition: "all 0.2s",
                    }}>
                      <button onClick={() => toggleAssignment(a.id)} style={{
                        width: 22, height: 22, borderRadius: "50%",
                        border: `2px solid ${a.done ? "#2a9d5c" : "#888"}`,
                        background: a.done ? "#2a9d5c" : "transparent",
                        cursor: "pointer", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, color: "#fff", transition: "all 0.2s",
                      }}>
                        {a.done ? "✓" : ""}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {a.priority && <span style={{ fontSize: 12 }}>🔴</span>}
                          <div style={{
                            fontSize: 13,
                            color: a.done ? "#999" : "#e8eaf0",
                            textDecoration: a.done ? "line-through" : "none",
                          }}>
                            {a.description}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject], letterSpacing: 0.5 }}>{a.subject}</span>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${platformColors[a.platform]}22`, color: platformColors[a.platform], letterSpacing: 0.5 }}>{a.platform}</span>
                          {a.dueDate && (
                            <span style={{ fontSize: 10, color: "#aaa" }}>
                              Due {parseDate(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Overdue icon */}
                      {isOverdue && (
                        <div title="Overdue!" style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          background: "#ef4444", display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 12, fontWeight: "bold", color: "#fff",
                        }}>!</div>
                      )}
                      {/* Due soon icon */}
                      {isDueSoon && (
                        <div title="Due soon!" style={{
                          width: 0, height: 0, flexShrink: 0, position: "relative",
                          borderLeft: "11px solid transparent",
                          borderRight: "11px solid transparent",
                          borderBottom: "19px solid #f97316",
                        }}>
                          <span style={{
                            position: "absolute", top: 4, left: "-4px",
                            fontSize: 11, fontWeight: "bold", color: "#fff",
                          }}>!</span>
                        </div>
                      )}
                      {/* Priority flag */}
                      <button onClick={() => {
                        const updated = checkin.assignments.map(x => x.id === a.id ? { ...x, priority: !x.priority } : x);
                        const next = { ...checkin, assignments: updated };
                        setCheckin(next);
                        save(next, history);
                      }} title={a.priority ? "Remove priority" : "Mark as priority"} style={{
                        background: "none", border: "none",
                        color: a.priority ? "#f97316" : "#333",
                        cursor: "pointer", fontSize: 15, padding: "0 2px", flexShrink: 0,
                      }}>⚑</button>
                      <button onClick={() => removeAssignment(a.id)} style={{
                        background: "none", border: "none", color: "#777",
                        cursor: "pointer", fontSize: 16, padding: "0 4px", flexShrink: 0,
                      }}>×</button>
                    </div>
                  );})}
                </div>
              )}
            </div>

            {/* Test & Quiz Tracker */}
            <div style={{
              background: "#16181f", border: "1px solid #2a2d3a",
              borderRadius: 10, padding: "20px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", textTransform: "uppercase" }}>
                  🎯 Tests & Quizzes
                </div>
                <button onClick={() => setShowTestForm(!showTestForm)} style={{
                  padding: "8px 16px",
                  background: showTestForm ? "#2a2d3a" : "#ffd700",
                  color: showTestForm ? "#aaa" : "#0f1117",
                  border: "none", borderRadius: 6, cursor: "pointer",
                  fontSize: 12, fontFamily: "'Courier New', monospace",
                  fontWeight: "bold", letterSpacing: 1,
                }}>
                  {showTestForm ? "✕ CANCEL" : "+ ADD"}
                </button>
              </div>

              {/* Add test form */}
              {showTestForm && (
                <div style={{ background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>SUBJECT</div>
                      <select value={newTest.subject} onChange={e => setNewTest({ ...newTest, subject: e.target.value })}
                        style={{ width: "100%", padding: "8px 10px", background: "#16181f", border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 12 }}>
                        <optgroup label="── A DAY ──">
                          <option>Math (Algebra)</option>
                          <option>Science (Biology)</option>
                          <option>English (Literature)</option>
                          <option>Spanish</option>
                        </optgroup>
                        <optgroup label="── B DAY ──">
                          <option>World History</option>
                          <option>Health</option>
                          <option>Music Theory</option>
                          <option>Adv. Band</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>TYPE</div>
                      <select value={newTest.type} onChange={e => setNewTest({ ...newTest, type: e.target.value })}
                        style={{ width: "100%", padding: "8px 10px", background: "#16181f", border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 12 }}>
                        <option>Quiz</option>
                        <option>Test</option>
                        <option>Exam</option>
                        <option>Project</option>
                        <option>Presentation</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>DESCRIPTION *</div>
                    <input placeholder="e.g. Bio Chapter 14 Quiz"
                      value={newTest.description}
                      onChange={e => setNewTest({ ...newTest, description: e.target.value })}
                      style={{ width: "100%", padding: "8px 10px", background: "#16181f", border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: "#999", marginBottom: 5, letterSpacing: 1 }}>DATE *</div>
                    <input type="date" value={newTest.testDate}
                      onChange={e => setNewTest({ ...newTest, testDate: e.target.value })}
                      style={{ padding: "8px 10px", background: "#16181f", border: `1px solid ${!newTest.testDate ? "#66666688" : "#2a2d3a"}`, color: "#e8eaf0", borderRadius: 5, fontFamily: "'Courier New', monospace", fontSize: 12 }}
                    />
                  </div>
                  <button onClick={() => {
                    if (!newTest.description.trim() || !newTest.testDate) return;
                    const t = { id: Date.now(), ...newTest };
                    const updated = [...tests, t].sort((a, b) => a.testDate.localeCompare(b.testDate));
                    setTests(updated);
                    save(checkin, history, undefined, updated);
                    setNewTest({ subject: SUBJECTS[0], description: "", testDate: "", type: "Quiz" });
                    setShowTestForm(false);
                  }} style={{
                    padding: "10px 20px",
                    background: (newTest.description.trim() && newTest.testDate) ? "#ffd700" : "#2a2d3a",
                    color: (newTest.description.trim() && newTest.testDate) ? "#0f1117" : "#888",
                    border: "none", borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Courier New', monospace", fontWeight: "bold", fontSize: 13,
                  }}>ADD</button>
                </div>
              )}

              {/* Test list */}
              {tests.length === 0 ? (
                <div style={{ color: "#777", fontSize: 13, padding: "10px 0", textAlign: "center" }}>
                  No upcoming tests or quizzes logged.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {tests.map(t => {
                    const parts = t.testDate.split("-").map(Number);
                    const testDateObj = new Date(parts[0], parts[1]-1, parts[2]);
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    const daysLeft = Math.round((testDateObj - today) / (1000 * 60 * 60 * 24));
                    const isPast = daysLeft < 0;
                    const isToday = daysLeft === 0;
                    const isSoon = daysLeft > 0 && daysLeft <= 2;
                    const urgencyColor = isPast ? "#888" : isToday ? "#ef4444" : isSoon ? "#f59e0b" : "#e8eaf0";
                    const typeColors = { Quiz: "#06b6d4", Test: "#ef4444", Exam: "#f97316", Project: "#8b5cf6", Presentation: "#ec4899" };
                    return (
                      <div key={t.id} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                        background: isPast ? "#0a0a0a" : isToday ? "#1a0505" : isSoon ? "#1a1200" : "#0f1117",
                        border: `1px solid ${isPast ? "#2a2d3a33" : isToday ? "#ef444444" : isSoon ? "#f59e0b44" : "#2a2d3a"}`,
                        borderRadius: 7, opacity: isPast ? 0.5 : 1, transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 22, flexShrink: 0 }}>
                          {t.type === "Quiz" ? "📝" : t.type === "Test" ? "📋" : t.type === "Exam" ? "📚" : t.type === "Project" ? "🔨" : "🎤"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: urgencyColor }}>{t.description}</div>
                          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[t.subject]}22`, color: subjectColors[t.subject] }}>{t.subject}</span>
                            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${typeColors[t.type]}22`, color: typeColors[t.type] }}>{t.type}</span>
                            <span style={{ fontSize: 10, color: urgencyColor, fontWeight: isSoon || isToday ? "bold" : "normal" }}>
                              {isPast ? "Passed" : isToday ? "🔴 TODAY" : isSoon ? `⚠ ${daysLeft}d away` : `${testDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${daysLeft}d`}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => {
                          const updated = tests.filter(x => x.id !== t.id);
                          setTests(updated);
                          save(checkin, history, undefined, updated);
                        }} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", fontSize: 16, padding: "0 4px", flexShrink: 0 }}>×</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Don't Forget */}
            <div style={{
              background: "#16181f",
              border: "1px solid #2a2d3a",
              borderRadius: 10,
              padding: "20px",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", marginBottom: 12, textTransform: "uppercase" }}>
                Don't Forget
              </div>

              {/* Input row */}
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <textarea
                  placeholder="Anything to note? Missing worksheets, upcoming tests, teacher messages..."
                  value={checkin.notes}
                  onChange={e => {
                    const next = { ...checkin, notes: e.target.value };
                    setCheckin(next);
                    save(next, history);
                  }}
                  rows={2}
                  style={{
                    flex: 1, background: "#0f1117", border: "1px solid #2a2d3a",
                    color: "#e8eaf0", borderRadius: 6, padding: "10px 12px",
                    fontFamily: "'Courier New', monospace", fontSize: 13,
                    resize: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Reminder date + save */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 10, color: "#999", letterSpacing: 1 }}>REMIND ME ON (optional)</div>
                  <input type="date"
                    value={checkin.noteReminderDate || ""}
                    onChange={e => {
                      const next = { ...checkin, noteReminderDate: e.target.value };
                      setCheckin(next);
                      save(next, history);
                    }}
                    style={{
                      padding: "7px 10px", background: "#0f1117",
                      border: "1px solid #2a2d3a", color: "#e8eaf0", borderRadius: 5,
                      fontFamily: "'Courier New', monospace", fontSize: 12,
                    }}
                  />
                </div>
                <button onClick={() => {
                  if (!checkin.notes.trim()) return;
                  const newNote = {
                    id: Date.now(),
                    text: checkin.notes.trim(),
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    reminderDate: checkin.noteReminderDate || null,
                    done: false,
                  };
                  const next = { ...checkin, notes: "", noteReminderDate: "", savedNotes: [...(checkin.savedNotes || []), newNote] };
                  setCheckin(next);
                  save(next, history);
                }} style={{
                  padding: "10px 20px", marginTop: 18,
                  background: checkin.notes.trim() ? "#ffd700" : "#2a2d3a",
                  color: checkin.notes.trim() ? "#0f1117" : "#888",
                  border: "none", borderRadius: 6, cursor: checkin.notes.trim() ? "pointer" : "default",
                  fontFamily: "'Courier New', monospace", fontWeight: "bold", fontSize: 12,
                  letterSpacing: 1, whiteSpace: "nowrap",
                }}>
                  + SAVE NOTE
                </button>
              </div>

              {/* Flagged reminders for today */}
              {(() => {
                const today = todayKey();
                const flagged = (checkin.savedNotes || []).filter(n => n.reminderDate === today && !n.done);
                if (flagged.length === 0) return null;
                return (
                  <div style={{
                    background: "#1a1500", border: "1px solid #ffd70044",
                    borderRadius: 8, padding: "12px 14px", marginBottom: 14,
                  }}>
                    <div style={{ fontSize: 11, color: "#ffd700", letterSpacing: 1, marginBottom: 8 }}>⏰ FLAGGED FOR TODAY</div>
                    {flagged.map(note => (
                      <div key={note.id} style={{ fontSize: 13, color: "#ffd700", padding: "3px 0" }}>• {note.text}</div>
                    ))}
                  </div>
                );
              })()}

              {/* Saved notes list */}
              {(checkin.savedNotes || []).length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(checkin.savedNotes || []).map(note => (
                    <div key={note.id} style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: note.done ? "#0a1a10" : "#0f1117",
                      border: `1px solid ${note.done ? "#2a9d5c44" : "#2a2d3a"}`,
                      borderRadius: 6, padding: "10px 12px",
                      opacity: note.done ? 0.6 : 1,
                      transition: "all 0.2s",
                    }}>
                      {/* Complete toggle */}
                      <button onClick={() => {
                        const next = {
                          ...checkin,
                          savedNotes: (checkin.savedNotes || []).map(n => n.id === note.id ? { ...n, done: !n.done } : n)
                        };
                        setCheckin(next);
                        save(next, history);
                      }} style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                        border: `2px solid ${note.done ? "#2a9d5c" : "#888"}`,
                        background: note.done ? "#2a9d5c" : "transparent",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "#fff", transition: "all 0.2s",
                      }}>
                        {note.done ? "✓" : ""}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 13, color: note.done ? "#999" : "#e8eaf0",
                          textDecoration: note.done ? "line-through" : "none",
                        }}>{note.text}</div>
                        <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, color: "#888" }}>Saved at {note.time}</span>
                          {note.reminderDate && (
                            <span style={{
                              fontSize: 10,
                              color: note.reminderDate === todayKey() ? "#ffd700" : "#aaa",
                            }}>
                              ⏰ {note.reminderDate === todayKey() ? "Flagged today" : `Reminder: ${new Date(note.reminderDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <button onClick={() => {
                        const next = { ...checkin, savedNotes: (checkin.savedNotes || []).filter(n => n.id !== note.id) };
                        setCheckin(next);
                        save(next, history);
                      }} style={{
                        background: "none", border: "none", color: "#777",
                        cursor: "pointer", fontSize: 16, padding: "0 2px", flexShrink: 0,
                      }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Complete / Reset buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {!checkin.completed ? (
                <button onClick={completeCheckin} style={{
                  padding: "14px 28px",
                  background: allDone && allPlatformsChecked ? "#2a9d5c" : "#2a2d3a",
                  color: allDone && allPlatformsChecked ? "#fff" : "#999",
                  border: "none", borderRadius: 8, cursor: "pointer",
                  fontFamily: "'Courier New', monospace", fontWeight: "bold", fontSize: 14,
                  letterSpacing: 1,
                  transition: "background 0.3s",
                }}>
                  ✓ COMPLETE CHECK-IN
                </button>
              ) : (
                <div style={{
                  padding: "14px 24px", background: "#0a1a10",
                  border: "1px solid #2a9d5c", borderRadius: 8,
                  color: "#2a9d5c", fontSize: 13, fontWeight: "bold", letterSpacing: 1,
                }}>
                  ✓ TODAY'S CHECK-IN LOGGED
                </div>
              )}
              <button onClick={resetToday} style={{
                padding: "14px 20px", background: "none",
                border: "1px solid #2a2d3a", color: "#999",
                borderRadius: 8, cursor: "pointer",
                fontFamily: "'Courier New', monospace", fontSize: 12,
              }}>
                RESET TODAY
              </button>
            </div>
          </>
        )}

        {view === "pending" && <PendingView checkin={checkin} history={history} subjectColors={subjectColors} platformColors={platformColors} tomorrowType={tomorrowType} aSubjects={A_DAY_SUBJECTS} bSubjects={B_DAY_SUBJECTS} />}


        {view === "history" && (
          <div>
            {/* Win Wall */}
            {winDays > 0 && (
              <div style={{
                background: "#16181f", border: "1px solid #ffd70033",
                borderRadius: 10, padding: "18px 20px", marginBottom: 20,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#ffd700", marginBottom: 14, textTransform: "uppercase" }}>
                  🏆 Win Wall — Perfect Days
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[...history, checkin].filter(isPerfectDay).map((e, i) => (
                    <div key={i} style={{
                      background: "#ffd70011", border: "1px solid #ffd70033",
                      borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#ffd700",
                    }}>
                      ✓ {parseDate(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", marginBottom: 20, textTransform: "uppercase" }}>
              Past Check-Ins
            </div>
            {history.length === 0 ? (
              <div style={{ color: "#777", textAlign: "center", padding: 40 }}>
                No history yet. Complete today's check-in to start tracking!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {history.map((entry, i) => {
                  const done = entry.assignments.filter(a => a.done).length;
                  const total = entry.assignments.length;
                  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                  return (
                    <div key={i} style={{
                      background: "#16181f",
                      border: "1px solid #2a2d3a",
                      borderRadius: 10,
                      padding: "18px 20px",
                    }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8
                      }}>
                        <div style={{ fontWeight: "bold", color: "#e8eaf0" }}>
                          {new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", {
                            weekday: "long", month: "long", day: "numeric"
                          })}
                        </div>
                        <div style={{
                          fontSize: 12,
                          color: pct === 100 ? "#2a9d5c" : pct >= 50 ? "#f59e0b" : "#ef4444"
                        }}>
                          {done}/{total} assignments done ({pct}%)
                        </div>
                      </div>
                      {/* mini progress */}
                      <div style={{ background: "#2a2d3a", borderRadius: 4, height: 4, marginBottom: 12, overflow: "hidden" }}>
                        <div style={{
                          width: `${pct}%`, height: "100%", borderRadius: 4,
                          background: pct === 100 ? "#2a9d5c" : "#f59e0b",
                        }} />
                      </div>
                      {entry.assignments.map(a => (
                        <div key={a.id} style={{
                          display: "flex", gap: 8, alignItems: "center",
                          padding: "5px 0", borderBottom: "1px solid #1e2028",
                        }}>
                          <span style={{ color: a.done ? "#2a9d5c" : "#ef4444", fontSize: 12 }}>
                            {a.done ? "✓" : "✗"}
                          </span>
                          <span style={{
                            fontSize: 13,
                            color: a.done ? "#999" : "#aaa",
                            textDecoration: a.done ? "line-through" : "none",
                            flex: 1,
                          }}>{a.description}</span>
                          <span style={{ fontSize: 10, color: "#888" }}>{a.subject}</span>
                        </div>
                      ))}
                      {entry.notes && (
                        <div style={{ marginTop: 10, fontSize: 12, color: "#aaa", fontStyle: "italic" }}>
                          📝 {entry.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {view === "parent" && (() => {
          const allEntries = [checkin, ...history];
          const today = todayKey();

          // Subject performance — count done vs total across all entries
          const subjectStats = {};
          Object.keys(subjectColors).forEach(s => { subjectStats[s] = { done: 0, total: 0, overdue: 0 }; });
          allEntries.forEach(entry => {
            (entry.assignments || []).forEach(a => {
              if (!subjectStats[a.subject]) return;
              subjectStats[a.subject].total++;
              if (a.done) subjectStats[a.subject].done++;
              if (!a.done && a.dueDate && a.dueDate < today) subjectStats[a.subject].overdue++;
            });
          });

          // Pending + overdue
          const pending = [];
          allEntries.forEach(day => {
            (day.assignments || []).forEach(a => {
              if (!a.done) pending.push({ ...a, fromDate: day.date });
            });
          });
          const overdue = pending.filter(a => a.dueDate && a.dueDate < today);
          const dueSoon = pending.filter(a => {
            if (!a.dueDate || a.dueDate < today) return false;
            const diff = Math.round((parseDate(a.dueDate) - parseDate(today)) / (1000*60*60*24));
            return diff <= 2;
          });
          const upcomingTests = tests.filter(t => t.testDate >= today).slice(0, 5);

          return (
            <div>
              {/* Parent header */}
              <div style={{ background: "#16181f", border: "1px solid #2a2d3a", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", textTransform: "uppercase" }}>⚡ TL;DR Snapshot</div>
                <button onClick={() => {
                  const todayStr = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
                  const dayLabel = todayType ? `${todayType} Day` : "Weekend";
                  const overdueList = overdue.length > 0
                    ? overdue.map(a => `  ⚠ ${a.subject}: ${a.description} (due ${a.dueDate})`).join("\n")
                    : "  ✓ None";
                  const dueSoonList = dueSoon.length > 0
                    ? dueSoon.map(a => `  • ${a.subject}: ${a.description} (due ${a.dueDate})`).join("\n")
                    : "  ✓ None";
                  const testList = upcomingTests.length > 0
                    ? upcomingTests.map(t => {
                        const parts = t.testDate.split("-").map(Number);
                        const dt = new Date(parts[0], parts[1]-1, parts[2]);
                        const daysLeft = Math.round((dt - new Date()) / (1000*60*60*24));
                        return `  • ${t.subject} ${t.type}: ${t.description} (${daysLeft <= 0 ? "TODAY" : `${daysLeft}d away`})`;
                      }).join("\n")
                    : "  None logged";
                  const perfList = Object.entries(subjectStats)
                    .filter(([, s]) => s.total > 0)
                    .sort((a,b) => (a[1].done/a[1].total) - (b[1].done/b[1].total))
                    .map(([sub, s]) => {
                      const pct = Math.round((s.done/s.total)*100);
                      const flag = s.overdue > 0 ? ` ⚠ ${s.overdue} overdue` : "";
                      return `  ${sub}: ${pct}% (${s.done}/${s.total})${flag}`;
                    }).join("\n") || "  No data yet";

                  const body = `HOMEWORK HQ — DAILY SNAPSHOT
${todayStr} · ${dayLabel}

🔥 Streak: ${streak} day${streak !== 1 ? "s" : ""}
📊 This Week: ${weekGrade ? `${weekGrade.grade} (${weekGrade.pct}%)` : "No data"}
🏆 Perfect Days: ${winDays}

🚨 OVERDUE
${overdueList}

⏰ DUE WITHIN 48 HOURS
${dueSoonList}

🎯 UPCOMING TESTS & QUIZZES
${testList}

📈 SUBJECT PERFORMANCE
${perfList}
`;
                  const subject = `Homework HQ Update — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
                  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                }} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px",
                  background: "#ffd700",
                  color: "#0f1117",
                  border: "none", borderRadius: 6, cursor: "pointer",
                  fontSize: 12, fontFamily: "'Courier New', monospace",
                  fontWeight: "bold", letterSpacing: 1,
                }}>
                  ✉ EMAIL SNAPSHOT
                </button>
              </div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 16 }}>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {todayType ? `${todayType} Day` : "Weekend"}
                </div>
                {/* Key stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {[
                    { label: "Streak", value: streak, unit: "days", color: streak > 0 ? "#f97316" : "#777", emoji: "🔥" },
                    { label: "This Week", value: weekGrade ? `${weekGrade.grade}` : "—", unit: weekGrade ? `${weekGrade.pct}%` : "", color: weekGrade ? weekGrade.color : "#777", emoji: "📊" },
                    { label: "Overdue", value: overdue.length, unit: "items", color: overdue.length > 0 ? "#ef4444" : "#2a9d5c", emoji: "⚠️" },
                    { label: "Perfect Days", value: winDays, unit: "total", color: winDays > 0 ? "#ffd700" : "#777", emoji: "🏆" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: 18 }}>{s.emoji}</div>
                      <div style={{ fontSize: 22, fontWeight: "bold", color: s.color, marginTop: 4 }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: "#888", letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
                      {s.unit && <div style={{ fontSize: 10, color: "#777" }}>{s.unit}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Overdue items */}
              {overdue.length > 0 && (
                <div style={{ background: "#16181f", border: "1px solid #ef444433", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#ef4444", marginBottom: 12, textTransform: "uppercase" }}>🚨 Overdue — Needs Attention</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {overdue.map(a => (
                      <div key={`${a.fromDate}-${a.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#1a0505", border: "1px solid #ef444433", borderRadius: 6 }}>
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                        <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{a.description}</span>
                        <span style={{ fontSize: 10, color: "#ef4444" }}>Due {parseDate(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: "#fff", flexShrink: 0 }}>!</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Due soon */}
              {dueSoon.length > 0 && (
                <div style={{ background: "#16181f", border: "1px solid #f59e0b33", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#f59e0b", marginBottom: 12, textTransform: "uppercase" }}>⏰ Due Within 48 Hours</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {dueSoon.map(a => (
                      <div key={`${a.fromDate}-${a.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#1a0900", border: "1px solid #f9731655", borderRadius: 6 }}>
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[a.subject]}22`, color: subjectColors[a.subject] }}>{a.subject}</span>
                        <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{a.description}</span>
                        <span style={{ fontSize: 10, color: "#f59e0b" }}>Due {parseDate(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <div title="Due soon!" style={{ position: "relative", flexShrink: 0, width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderBottom: "19px solid #f97316" }}>
                          <span style={{ position: "absolute", top: 4, left: "-4px", fontSize: 11, fontWeight: "bold", color: "#fff" }}>!</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming tests */}
              {upcomingTests.length > 0 && (
                <div style={{ background: "#16181f", border: "1px solid #2a2d3a", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", marginBottom: 12, textTransform: "uppercase" }}>🎯 Upcoming Tests & Quizzes</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {upcomingTests.map(t => {
                      const parts = t.testDate.split("-").map(Number);
                      const dt = new Date(parts[0], parts[1]-1, parts[2]);
                      const daysLeft = Math.round((dt - parseDate(today)) / (1000*60*60*24));
                      return (
                        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#0f1117", borderRadius: 6 }}>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[t.subject]}22`, color: subjectColors[t.subject] }}>{t.subject}</span>
                          <span style={{ fontSize: 13, color: "#e8eaf0", flex: 1 }}>{t.description}</span>
                          <span style={{ fontSize: 10, color: daysLeft === 0 ? "#ef4444" : daysLeft <= 2 ? "#f59e0b" : "#aaa", fontWeight: daysLeft <= 2 ? "bold" : "normal" }}>
                            {daysLeft === 0 ? "TODAY" : `${daysLeft}d away`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subject performance */}
              <div style={{ background: "#16181f", border: "1px solid #2a2d3a", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", marginBottom: 16, textTransform: "uppercase" }}>📈 Subject Performance</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {Object.entries(subjectStats)
                    .filter(([, s]) => s.total > 0)
                    .sort((a, b) => {
                      const pctA = a[1].total === 0 ? 100 : a[1].done / a[1].total;
                      const pctB = b[1].total === 0 ? 100 : b[1].done / b[1].total;
                      return pctA - pctB; // worst first
                    })
                    .map(([subject, s]) => {
                      const pct = s.total === 0 ? 100 : Math.round((s.done / s.total) * 100);
                      const barColor = pct >= 85 ? "#2a9d5c" : pct >= 65 ? "#f59e0b" : "#ef4444";
                      return (
                        <div key={subject}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: `${subjectColors[subject]}22`, color: subjectColors[subject] }}>{subject}</span>
                              {s.overdue > 0 && <span style={{ fontSize: 10, color: "#ef4444" }}>⚠ {s.overdue} overdue</span>}
                            </div>
                            <span style={{ fontSize: 12, color: barColor, fontWeight: "bold" }}>{pct}% · {s.done}/{s.total}</span>
                          </div>
                          <div style={{ background: "#2a2d3a", borderRadius: 4, height: 6, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: 4, transition: "width 0.5s ease" }} />
                          </div>
                        </div>
                      );
                    })}
                  {Object.values(subjectStats).every(s => s.total === 0) && (
                    <div style={{ color: "#777", textAlign: "center", padding: 20, fontSize: 13 }}>No assignment data yet.</div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      <style>{`
        * { box-sizing: border-box; }
        input, select, textarea { outline: none; }
        input:focus, select:focus, textarea:focus {
          border-color: #ffd700 !important;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(120px) rotate(720deg); }
        }
        button:hover { opacity: 0.85; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #2a2d3a; border-radius: 3px; }
        ::-webkit-calendar-picker-indicator { filter: invert(0.7) brightness(1.5); cursor: pointer; }
        input[type="date"] { color-scheme: dark; }
      `}</style>
    </div>
  );
}

export default function App() {
  return <HomeworkTracker />;
}
