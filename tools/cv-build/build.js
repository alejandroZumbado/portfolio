/*
CV builder: reads one JSON data file per (language, domain-variant) CV and
renders it into a printable HTML file + a plain Markdown file, using ONE
shared HTML shell (template.html) and ONE shared stylesheet (cv.css).
Run: node build.js  (from this folder)
*/
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const OUT_ROOT = path.join(__dirname, "..", "..", "CV");
const MIRROR_ROOT = path.join(__dirname, "..", "..", "portfolio", "public", "cv");
const SHELL = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const CSS_INLINE = fs.readFileSync(path.join(__dirname, "cv.css"), "utf8");
const PHOTO_PATH = path.join(__dirname, "..", "..", "CV", "assets", "foto-perfil.jpg");
const PHOTO_DATA_URI = "data:image/jpeg;base64," + fs.readFileSync(PHOTO_PATH).toString("base64");

function esc(s) {
  return String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function renderContactRow(d) {
  const parts = [d.location, d.phone, d.email, d.github, d.linkedin].filter(Boolean);
  return parts.map(esc).join(" &nbsp;|&nbsp; ");
}

function renderSkills(skills) {
  return `<div class="skills-grid">` +
    Object.entries(skills).map(([group, items]) => `
      <div class="skill-group">
        <b>${esc(group)}</b>
        <div class="chip-row">${items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div>
      </div>`).join("") +
    `</div>`;
}

function renderEntries(entries) {
  return entries.map((e) => `
    <div class="entry">
      <div class="entry-head">
        <span class="role-co">${esc(e.role)}${e.company ? " — " + esc(e.company) : ""}</span>
        <span class="dates">${esc(e.dates)}</span>
      </div>
      ${e.sub ? `<div class="sub">${esc(e.sub)}</div>` : ""}
      <ul class="bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderEducation(edu) {
  return edu.map((e) => `
    <div class="entry">
      <div class="entry-head">
        <span class="role-co">${esc(e.degree)}</span>
        <span class="dates">${esc(e.date)}</span>
      </div>
      <div class="sub">${esc(e.place)}</div>
    </div>`).join("");
}

function renderHtml(d) {
  let html = SHELL;
  html = html.replace(/{{CSS}}/g, CSS_INLINE);
  html = html.replace(/{{LANG}}/g, d.lang === "es" ? "es" : "en");
  html = html.replace(/{{TITLE}}/g, esc(`${d.name} — ${d.title}`));
  html = html.replace(/{{PHOTO}}/g, PHOTO_DATA_URI);
  html = html.replace(/{{NAME}}/g, esc(d.name));
  html = html.replace(/{{ROLE}}/g, esc(d.title));
  html = html.replace(/{{CONTACT_ROW}}/g, renderContactRow(d));
  html = html.replace(/{{LABEL_SUMMARY}}/g, esc(d.labels.summary));
  html = html.replace(/{{SUMMARY}}/g, esc(d.summary));
  html = html.replace(/{{LABEL_SKILLS}}/g, esc(d.labels.skills));
  html = html.replace(/{{SKILLS}}/g, renderSkills(d.skills));
  html = html.replace(/{{LABEL_EXPERIENCE}}/g, esc(d.labels.experience));
  html = html.replace(/{{EXPERIENCE}}/g, renderEntries(d.experience));
  html = html.replace(/{{LABEL_PROJECTS}}/g, esc(d.labels.projects));
  html = html.replace(/{{PROJECTS}}/g, renderEntries(d.projects));
  html = html.replace(/{{LABEL_EDUCATION}}/g, esc(d.labels.education));
  html = html.replace(/{{EDUCATION}}/g, renderEducation(d.education));
  html = html.replace(/{{LABEL_LANGUAGES}}/g, esc(d.labels.languages));
  html = html.replace(/{{LANGUAGES}}/g, d.languages.map((l) => `<span class="chip">${esc(l.name)} — ${esc(l.level)}</span>`).join(" "));
  return html;
}

function renderMd(d) {
  const lines = [];
  lines.push(`# ${d.name}`);
  lines.push(`### ${d.title}`);
  lines.push("");
  lines.push([d.location, d.phone, d.email, d.github, d.linkedin].filter(Boolean).join(" | "));
  lines.push("");
  lines.push(`## ${d.labels.summary}`);
  lines.push(d.summary);
  lines.push("");
  lines.push(`## ${d.labels.skills}`);
  for (const [group, items] of Object.entries(d.skills)) {
    lines.push(`- **${group}:** ${items.join(", ")}`);
  }
  lines.push("");
  lines.push(`## ${d.labels.experience}`);
  for (const e of d.experience) {
    lines.push(`**${e.role}${e.company ? " — " + e.company : ""}** _(${e.dates})_`);
    if (e.sub) lines.push(`_${e.sub}_`);
    for (const b of e.bullets) lines.push(`- ${b}`);
    lines.push("");
  }
  lines.push(`## ${d.labels.projects}`);
  for (const e of d.projects) {
    lines.push(`**${e.role}${e.company ? " — " + e.company : ""}** _(${e.dates})_`);
    if (e.sub) lines.push(`_${e.sub}_`);
    for (const b of e.bullets) lines.push(`- ${b}`);
    lines.push("");
  }
  lines.push(`## ${d.labels.education}`);
  for (const e of d.education) lines.push(`- **${e.degree}** — ${e.place} (${e.date})`);
  lines.push("");
  lines.push(`## ${d.labels.languages}`);
  lines.push(d.languages.map((l) => `${l.name} (${l.level})`).join(", "));
  return lines.join("\n") + "\n";
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const d = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
    const langFolder = d.lang === "es" ? "ES" : "EN";
    const outDir = path.join(OUT_ROOT, langFolder, d.variantFolder);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, d.fileBase + ".html"), renderHtml(d), "utf8");
    fs.writeFileSync(path.join(outDir, d.fileBase + ".md"), renderMd(d), "utf8");
    console.log("Built:", langFolder, d.variantFolder, d.fileBase);
  }
  // Self-contained CV HTML files (inline CSS + base64 photo) can be safely
  // mirrored into portfolio/public/cv/ so Astro serves them at /cv/... when the
  // "portfolio" folder is deployed as its own site root.
  copyDirRecursive(path.join(OUT_ROOT, "ES"), path.join(MIRROR_ROOT, "ES"));
  copyDirRecursive(path.join(OUT_ROOT, "EN"), path.join(MIRROR_ROOT, "EN"));
  console.log("Mirrored CVs into portfolio/public/cv/");
}

main();
