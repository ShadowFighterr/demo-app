const NOTES_KEY = 'startup_demo_notes'

export function loadNotes(){
  try {
    const raw = localStorage.getItem(NOTES_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch { return [] }
}

export function saveNotes(notes){
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}
