const KEY = "taskboard.tasks.v1";
let tasks = [], filter = "all", query = "", catFilter = "all", editingId = null, dragId = null, lastAdded = null;
const $ = id => document.getElementById(id);

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}
function saveToLocalStorage() {
  try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch (e) {}
}

const esc = s => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" });
const CATS = ["Work", "Personal", "Study"];

function dueInfo(t) {
  if (!t.due) return "";
  const diff = Math.round((Date.parse(t.due) - Date.parse(today())) / 864e5);
  if (diff === 0) return '<span>Due today</span>';
  if (diff === 1) return '<span>Due tomorrow</span>';
  if (diff < 0 && !t.done) return '<span class="late">Overdue, ' + fmt(t.due) + '</span>';
  return '<span>Due ' + fmt(t.due) + '</span>';
}

function visible() {
  return tasks.filter(t =>
    (filter === "all" || (filter === "active" ? !t.done : t.done)) &&
    (catFilter === "all" || t.category === catFilter) &&
    t.text.toLowerCase().includes(query));
}

function updateCounts() {
  const active = tasks.filter(t => !t.done).length;
  $("left").textContent = active;
  $("leftLabel").textContent = active === 1 ? "task to do" : "tasks to do";
  $("nAll").textContent = tasks.length;
  $("nActive").textContent = active;
  $("nDone").textContent = tasks.length - active;
  $("clear").disabled = tasks.length === active;
}

function rowHTML(t) {
  const c = t.category.toLowerCase();
  if (t.id === editingId) {
    return '<li class="task" data-id="' + t.id + '" style="--c:var(--' + c + ')"><div class="editrow">' +
      '<input class="field" type="text" value="' + esc(t.text) + '" maxlength="200" aria-label="Task text">' +
      '<select class="field" aria-label="Category">' + CATS.map(x => '<option' + (x === t.category ? " selected" : "") + '>' + x + '</option>').join("") + '</select>' +
      '<input class="field" type="date" value="' + (t.due || "") + '" aria-label="Due date">' +
      '<button class="primary save" type="button">Save changes</button>' +
      '<button class="ghost cancel" type="button">Cancel</button></div></li>';
  }
  return '<li class="task' + (t.done ? " done" : "") + (t.id === lastAdded ? " enter" : "") + '" data-id="' + t.id + '" draggable="true" style="--c:var(--' + c + ')">' +
    '<button class="chk" type="button" aria-pressed="' + t.done + '" aria-label="Mark task complete"><svg viewBox="0 0 16 16"><path pathLength="1" d="M3 8.5l3.2 3.2L13 4.8"/></svg></button>' +
    '<div class="body"><span class="txt">' + esc(t.text) + '</span><div class="meta"><span class="tag">' + t.category + '</span>' + dueInfo(t) + '</div></div>' +
    '<button class="icon edit" type="button" aria-label="Edit task">✎</button>' +
    '<button class="icon del" type="button" aria-label="Delete task">✕</button></li>';
}

function render() {
  updateCounts();
  const list = visible();
  const msg = tasks.length === 0 ? "Nothing here yet. Add your first task above."
    : query || catFilter !== "all" ? "No tasks match your search."
    : filter === "active" ? "You’re all caught up."
    : "Completed tasks will show up here.";
  $("list").innerHTML = list.length ? list.map(rowHTML).join("") : '<li class="empty">' + msg + '</li>';
  lastAdded = null;
}

function setTasks(next) { tasks = next; saveToLocalStorage(); render(); }

$("addForm").addEventListener("submit", e => {
  e.preventDefault();
  const text = $("text").value.trim();
  if (!text) { $("text").focus(); return; }
  const t = { id: uid(), text, category: $("cat").value, due: $("due").value, done: false };
  lastAdded = t.id;
  $("text").value = ""; $("due").value = "";
  if (filter === "completed") setFilter("all");
  setTasks([t, ...tasks]);
  $("text").focus();
});

function setFilter(f) {
  filter = f;
  document.querySelectorAll("#seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === f));
  render();
}
$("seg").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setFilter(b.dataset.f); });
$("catFilter").addEventListener("change", e => { catFilter = e.target.value; render(); });
$("q").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
$("clear").addEventListener("click", () => setTasks(tasks.filter(t => !t.done)));

function saveEdit(li) {
  const [text, cat, due] = li.querySelectorAll("input, select");
  const v = text.value.trim();
  if (!v) { text.focus(); return; }
  editingId = null;
  setTasks(tasks.map(t => t.id === li.dataset.id ? { ...t, text: v, category: cat.value, due: due.value } : t));
}

$("list").addEventListener("click", e => {
  const li = e.target.closest(".task");
  if (!li) return;
  const id = li.dataset.id;
  if (e.target.closest(".chk")) {
    const t = tasks.find(x => x.id === id);
    t.done = !t.done;
    saveToLocalStorage();
    li.classList.toggle("done", t.done);
    e.target.closest(".chk").setAttribute("aria-pressed", t.done);
    updateCounts();
    if (filter !== "all") setTimeout(render, 550);
  } else if (e.target.closest(".edit")) {
    editingId = id; render();
    $("list").querySelector(".editrow input").focus();
  } else if (e.target.closest(".del")) {
    li.classList.add("removing");
    setTimeout(() => setTasks(tasks.filter(t => t.id !== id)), 250);
  } else if (e.target.closest(".save")) {
    saveEdit(li);
  } else if (e.target.closest(".cancel")) {
    editingId = null; render();
  }
});
$("list").addEventListener("keydown", e => {
  const li = e.target.closest(".task");
  if (!li || !li.querySelector(".editrow")) return;
  if (e.key === "Enter") { e.preventDefault(); saveEdit(li); }
  if (e.key === "Escape") { editingId = null; render(); }
});

/* Drag and drop reordering */
function clearOver() { document.querySelectorAll(".over-top,.over-bottom").forEach(el => el.classList.remove("over-top", "over-bottom")); }
$("list").addEventListener("dragstart", e => {
  const li = e.target.closest(".task");
  if (!li) return;
  dragId = li.dataset.id;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", dragId);
  setTimeout(() => li.classList.add("dragging"), 0);
});
$("list").addEventListener("dragover", e => {
  const li = e.target.closest(".task");
  if (!dragId || !li || li.dataset.id === dragId) return;
  e.preventDefault();
  clearOver();
  const r = li.getBoundingClientRect();
  li.classList.add(e.clientY > r.top + r.height / 2 ? "over-bottom" : "over-top");
});
$("list").addEventListener("drop", e => {
  const li = e.target.closest(".task");
  if (!dragId || !li || li.dataset.id === dragId) return;
  e.preventDefault();
  const r = li.getBoundingClientRect();
  const after = e.clientY > r.top + r.height / 2;
  const next = tasks.slice();
  const [item] = next.splice(next.findIndex(t => t.id === dragId), 1);
  let to = next.findIndex(t => t.id === li.dataset.id);
  if (after) to++;
  next.splice(to, 0, item);
  setTasks(next);
});
$("list").addEventListener("dragend", () => { dragId = null; clearOver(); document.querySelectorAll(".dragging").forEach(el => el.classList.remove("dragging")); });

/* Start up */
$("date").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
const stored = loadFromLocalStorage();
if (stored === null) {
  tasks = [
    { id: uid(), text: "Finish the portfolio README", category: "Work", due: today(), done: false },
    { id: uid(), text: "Revise JavaScript array methods", category: "Study", due: "", done: false },
    { id: uid(), text: "Call grandma", category: "Personal", due: "", done: true }
  ];
  saveToLocalStorage();
} else tasks = stored;
render();
