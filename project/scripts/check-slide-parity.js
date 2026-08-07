#!/usr/bin/env node
// Checks that each topic's Overview page and its Slides companion agree on
// which sections exist and how many items each one lists (.roster-row,
// <li> count). Doesn't check wording — Slides is allowed to condense
// prose — only that neither page silently drops or gains whole items.
//
// Run: node project/scripts/check-slide-parity.js
//
// Background: caught after Topic 3's roster tables were expanded during
// review but the Slides deck wasn't updated to match — see
// project/REQUIREMENTS.md, "Fixed bug — infinite-scroll roster..." entry.

const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', '..', 'docs');

function findOverviewFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'slides') {
      results.push(...findOverviewFiles(path.join(dir, entry.name)));
    } else if (entry.isFile() && /^\d{2}-.*\.html$/.test(entry.name)) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

function extractSections(html, sectionRegex) {
  const sections = {};
  const matches = [...html.matchAll(sectionRegex)];
  for (let i = 0; i < matches.length; i++) {
    // Slides decks may split one section across continuation slides
    // (e.g. "s2", "s2b", "s2c" — see ADR 0014). Fold those into the base
    // id so a legitimate split doesn't read as a content mismatch.
    const id = matches[i][1].replace(/^(s\d+)[a-z]$/, '$1');
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : html.indexOf('</article>', start);
    const body = html.slice(start, end === -1 ? undefined : end);
    if (!sections[id]) sections[id] = { rosterRows: 0, listItems: 0, tableRows: 0 };
    sections[id].rosterRows += (body.match(/roster-row/g) || []).length;
    sections[id].listItems += (body.match(/<li>/g) || []).length;
    sections[id].tableRows += (body.match(/<tr data-type=/g) || []).length;
  }
  return sections;
}

function checkPair(overviewPath, slidesPath) {
  const overviewHtml = fs.readFileSync(overviewPath, 'utf8');
  const slidesHtml = fs.readFileSync(slidesPath, 'utf8');

  const overviewSections = extractSections(overviewHtml, /<section class="block reveal" id="(s\d+)">/g);
  const slidesSections = extractSections(slidesHtml, /<section class="slide" data-slide="(s\d+)">/g);

  const allIds = new Set([...Object.keys(overviewSections), ...Object.keys(slidesSections)]);
  const issues = [];

  for (const id of allIds) {
    const ov = overviewSections[id];
    const sl = slidesSections[id];
    if (!ov) { issues.push(`  ${id}: exists in Slides but not Overview`); continue; }
    if (!sl) { issues.push(`  ${id}: exists in Overview but not Slides`); continue; }
    if (ov.rosterRows !== sl.rosterRows) {
      issues.push(`  ${id}: roster-row count differs — Overview ${ov.rosterRows}, Slides ${sl.rosterRows}`);
    }
    if (ov.tableRows !== sl.tableRows) {
      issues.push(`  ${id}: table row count differs — Overview ${ov.tableRows}, Slides ${sl.tableRows}`);
    }
    if (ov.rosterRows === 0 && ov.tableRows === 0 && ov.listItems !== sl.listItems) {
      issues.push(`  ${id}: <li> count differs — Overview ${ov.listItems}, Slides ${sl.listItems}`);
    }
  }
  return issues;
}

function main() {
  const overviewFiles = findOverviewFiles(DOCS);
  let anyIssues = false;

  for (const overviewPath of overviewFiles) {
    const dir = path.dirname(overviewPath);
    const base = path.basename(overviewPath, '.html');
    const slidesPath = path.join(dir, 'slides', `${base}-slides.html`);
    if (!fs.existsSync(slidesPath)) continue; // no slides companion yet — not an error

    const issues = checkPair(overviewPath, slidesPath);
    if (issues.length > 0) {
      anyIssues = true;
      console.log(`\n${path.relative(process.cwd(), overviewPath)}`);
      issues.forEach((line) => console.log(line));
    }
  }

  if (!anyIssues) {
    console.log('No parity issues found — every Overview/Slides pair with a companion matches on section IDs and item counts.');
  }
  process.exit(anyIssues ? 1 : 0);
}

main();
