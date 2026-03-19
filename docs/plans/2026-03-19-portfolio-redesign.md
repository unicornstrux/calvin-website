# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild calvin-website as a "Portfolio First" single-page portfolio that impresses recruiters and clients — work leads, person follows.

**Architecture:** Single `index.html` with a new `css/custom.css` that overrides the template's `style.css`. Existing dependencies (Bootstrap, WOW.js, Font Awesome, Isotope, Animate.css) are kept. Magnific Popup is replaced by a vanilla JS slide-in panel. New JS for the panel lives in `js/portfolio.js`. Nav scroll behavior updated in existing `js/main.js`.

**Tech Stack:** HTML5, CSS Grid, Inter (Google Fonts), vanilla JS, Bootstrap 3 (grid kept for non-portfolio sections), WOW.js (scroll animations), Isotope (portfolio filtering).

---

## Task 1: Setup — Google Fonts, custom.css, CSS variables

**Files:**
- Modify: `index.html` (head section, after line 18)
- Create: `css/custom.css`

**Step 1: Add Google Fonts and custom.css link to `<head>` in `index.html`**

After `<link rel="stylesheet" href="css/style.css"/>`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/custom.css"/>
```

**Step 2: Create `css/custom.css` with CSS variables and base overrides**

```css
/* ===========================
   CSS Custom Properties
=========================== */
:root {
  --bg: #F5F5F3;
  --text: #111111;
  --text-muted: #666666;
  --accent: #1A6BFF;
  --overlay: rgba(17, 17, 17, 0.72);
  --white: #ffffff;
  --dark: #111111;
  --radius: 4px;
  --transition: 0.3s ease;
}

/* Base overrides */
html, body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
}

p {
  font-family: 'Inter', sans-serif;
  color: var(--text-muted);
}
```

**Step 3: Open `index.html` in browser, verify Inter font loads (DevTools > Network > Fonts tab)**

**Step 4: Commit**
```bash
git add index.html css/custom.css
git commit -m "feat: add Inter font and custom.css with CSS variables"
```

---

## Task 2: Navigation redesign

**Files:**
- Modify: `index.html` (header section, lines 42–58)
- Modify: `css/custom.css` (add nav styles)
- Modify: `css/style.css` (update `.header-section.sticky` to white background)

**Step 1: Replace `<header>` block in `index.html`**

Replace the entire header element with:
```html
<header class="header-section" id="main-nav">
  <div class="logo">
    <h3>CSP</h3>
  </div>
  <div class="responsive"><i class="fa fa-bars"></i></div>
  <ul class="menu-list">
    <li><a href="#portfolio">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#resume">Experience</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="resume.pdf" target="_blank" class="nav-resume-link">Resume ↓</a></li>
  </ul>
</header>
```

**Step 2: Update `.header-section.sticky` in `css/style.css` (line 300–304)**

Change:
```css
.header-section.sticky {
  position: fixed;
  background: #000;
  padding: 10px 30px;
}
```
To:
```css
.header-section.sticky {
  position: fixed;
  background: #ffffff;
  padding: 10px 30px;
}
```

**Step 3: Add nav styles to `css/custom.css`**

```css
/* ===========================
   Navigation
=========================== */
.header-section {
  background: transparent;
  transition: background var(--transition), box-shadow var(--transition);
}

.header-section.sticky {
  box-shadow: 0 1px 0 rgba(0,0,0,0.08);
}

.header-section.sticky .logo h3 {
  color: var(--text);
}

.header-section.sticky .menu-list li a {
  color: var(--text);
}

.header-section.sticky .menu-list li a:after {
  background: var(--accent);
}

.header-section.sticky .menu-list .current a:after {
  background: var(--accent);
}

.nav-resume-link {
  border: 1px solid currentColor;
  border-radius: 20px;
  padding: 6px 16px !important;
  font-size: 11px !important;
  opacity: 0.85;
  transition: opacity var(--transition);
}

.nav-resume-link:hover {
  opacity: 1;
}
```

**Step 4: Verify in browser — nav is transparent over page top, turns white with border on scroll. "Resume ↓" link is pill-shaped.**

**Step 5: Commit**
```bash
git add index.html css/custom.css css/style.css
git commit -m "feat: nav redesign — transparent on load, white sticky on scroll, resume download link"
```

---

## Task 3: Remove hero intro section

The "Portfolio First" design has no hero — the grid is the first thing visitors see.

**Files:**
- Modify: `index.html` (lines 62–73)

**Step 1: Comment out the intro section**

Wrap lines 62–73 in an HTML comment:
```html
<!-- REMOVED: Intro section — Portfolio First design leads with grid
<section class="intro-section fix" id="home">
  ...
</section>
-->
```

**Step 2: Verify in browser — page now opens directly on portfolio grid**

**Step 3: Commit**
```bash
git add index.html
git commit -m "feat: remove hero section — portfolio grid now leads page"
```

---

## Task 4: Portfolio grid — CSS Grid layout and card structure

**Files:**
- Modify: `index.html` (portfolio section, lines 78–266)
- Modify: `css/custom.css` (add grid and card styles)
- Modify: `js/main.js` (update isotope init to new selectors)

**Step 1: Replace the entire portfolio section HTML**

```html
<!-- ==== Portfolio Section Start ==== -->
<section class="portfolio-section fix" id="portfolio">
  <div class="portfolio-header">
    <div class="portfolio-filter-wrap">
      <button class="pf-btn active" data-filter="*">All</button>
      <button class="pf-btn" data-filter=".eng">Engineering</button>
      <button class="pf-btn" data-filter=".indi">Hobbies</button>
    </div>
  </div>

  <div class="portfolio-grid isotope_items">

    <div class="grid-item eng"
         data-title="Thermodenduder"
         data-context="Instrument R&amp;D — Brechtel"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="SolidWorks,Sheet Metal,Thermal Design">
      <div class="card-image" style="background-image: url('img/works/td.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Thermodenduder</h3>
          <p class="card-desc">Instrument R&amp;D — Brechtel</p>
          <span class="card-tag">Engineering</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item eng"
         data-title="Strength vs Temperature in Concrete"
         data-context="Heat Transfer Research"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="MATLAB,FEA,Thermal Modeling">
      <div class="card-image" style="background-image: url('img/works/concrete.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Strength vs Temperature in Concrete</h3>
          <p class="card-desc">Heat Transfer Research</p>
          <span class="card-tag">Engineering</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item eng"
         data-title="NASA Microgravity — Solid State Latch"
         data-context="NASA Reduced Gravity Program — Boston University"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="SolidWorks,Fabrication,Composites">
      <div class="card-image" style="background-image: url('img/works/latch.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">NASA Microgravity</h3>
          <p class="card-desc">Solid State Latch — Boston University</p>
          <span class="card-tag">Engineering</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item indi"
         data-title="Wood Design"
         data-context="Personal Project"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="Woodworking,Design,Fabrication">
      <div class="card-image" style="background-image: url('img/works/wood.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Wood Design</h3>
          <p class="card-desc">Personal Project</p>
          <span class="card-tag">Hobby</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item indi"
         data-title="Rocket Press Coffee Maker"
         data-context="Personal Project"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="Machining,Metal Fabrication,Design">
      <div class="card-image" style="background-image: url('img/works/rocket.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Rocket Press Coffee Maker</h3>
          <p class="card-desc">Personal Project</p>
          <span class="card-tag">Hobby</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item eng"
         data-title="Advanced Forward Osmosis Membrane"
         data-context="Water Treatment R&amp;D — Porifera"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="SolidWorks,Fluid Systems,Prototyping">
      <div class="card-image" style="background-image: url('img/works/skids.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Advanced Forward Osmosis Membrane</h3>
          <p class="card-desc">Water Treatment R&amp;D — Porifera</p>
          <span class="card-tag">Engineering</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item indi"
         data-title="Stand Up Paddleboard"
         data-context="Personal Project — Wood and Composites"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="Composites,Woodworking,Design">
      <div class="card-image" style="background-image: url('img/works/sup.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Stand Up Paddleboard</h3>
          <p class="card-desc">Wood and Composites</p>
          <span class="card-tag">Hobby</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="grid-item eng"
         data-title="Small Satellite Development"
         data-context="Boston University"
         data-problem="[Add: 1-sentence problem description]"
         data-built="[Add: 2-3 sentences describing what was built and how]"
         data-tools="SolidWorks,Systems Engineering,Composites">
      <div class="card-image" style="background-image: url('img/works/busat.jpg')"></div>
      <div class="card-gradient"></div>
      <div class="card-overlay">
        <div class="card-overlay-content">
          <h3 class="card-title">Small Satellite Development</h3>
          <p class="card-desc">Boston University</p>
          <span class="card-tag">Engineering</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>

  </div>
</section>
<!-- ==== Portfolio Section End ==== -->
```

**Step 2: Add grid and card CSS to `css/custom.css`**

```css
/* ===========================
   Portfolio Section
=========================== */
.portfolio-section {
  background: var(--bg);
  padding-top: 70px; /* space for fixed nav */
}

.portfolio-header {
  padding: 24px 0 20px;
  text-align: center;
}

/* Filter pill buttons */
.portfolio-filter-wrap {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pf-btn {
  border: 1px solid rgba(17,17,17,0.2);
  background: transparent;
  color: var(--text-muted);
  padding: 6px 20px;
  border-radius: 24px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all var(--transition);
  letter-spacing: 0.02em;
}

.pf-btn:hover {
  border-color: var(--text);
  color: var(--text);
}

.pf-btn.active {
  background: var(--text);
  border-color: var(--text);
  color: var(--white);
}

/* CSS Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 380px;
  gap: 0;
}

/* Card */
.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.grid-item:hover .card-image {
  transform: scale(1.04);
}

/* Permanent bottom gradient — title always readable */
.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%);
  z-index: 1;
}

/* Hover overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: var(--overlay);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.grid-item:hover .card-overlay {
  opacity: 1;
}

.card-overlay-content {
  text-align: center;
  padding: 24px;
  color: var(--white);
}

.card-title {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-desc {
  display: block;
  font-size: 14px;
  color: rgba(255,255,255,0.75);
  margin-bottom: 16px;
}

.card-tag {
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.4);
  color: rgba(255,255,255,0.85);
  font-size: 11px;
  padding: 3px 12px;
  border-radius: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.card-arrow {
  display: block;
  font-size: 24px;
  color: var(--white);
  margin-top: 8px;
}
```

**Step 3: Update isotope init in `js/main.js`**

Replace the isotope block inside `$(window).on('load', ...)`:

Old:
```js
var $container = $('.isotope_items');
$container.isotope();

$('.portfolio-filter li').on("click", function(){
  $(".portfolio-filter li").removeClass("active");
  $(this).addClass("active");
  var selector = $(this).attr('data-filter');
  $(".isotope_items").isotope({
    filter: selector,
    animationOptions: { duration: 750, easing: 'linear', queue: false }
  });
  return false;
});
```

New:
```js
var $container = $('.portfolio-grid');
$container.isotope({ itemSelector: '.grid-item', layoutMode: 'fitRows' });

$('.pf-btn').on('click', function() {
  $('.pf-btn').removeClass('active');
  $(this).addClass('active');
  var selector = $(this).data('filter');
  $container.isotope({ filter: selector });
});
```

**Step 4: Verify in browser — 3-column grid, cards fill viewport, hover shows overlay with title/desc/tag/arrow, filter pills work**

**Step 5: Commit**
```bash
git add index.html css/custom.css js/main.js
git commit -m "feat: portfolio CSS Grid with card hover overlays and pill filter buttons"
```

---

## Task 5: Slide-in project panel

**Files:**
- Modify: `index.html` (add panel HTML before `</body>`)
- Modify: `css/custom.css` (add panel styles)
- Create: `js/portfolio.js` (panel open/close logic)
- Modify: `index.html` (add `<script src="js/portfolio.js">` before `</body>`)

**Step 1: Add slide-in panel HTML to `index.html` before `</body>`**

```html
<!-- Slide-in Project Panel -->
<div id="project-panel" class="project-panel">
  <button class="panel-close" id="panel-close" aria-label="Close panel">×</button>
  <div class="panel-inner">
    <div class="panel-image-wrap">
      <img id="panel-image" src="" alt="" class="panel-image">
    </div>
    <div class="panel-content">
      <h2 id="panel-title" class="panel-title"></h2>
      <p id="panel-context" class="panel-context"></p>
      <div class="panel-section">
        <h4 class="panel-label">Problem</h4>
        <p id="panel-problem" class="panel-text"></p>
      </div>
      <div class="panel-section">
        <h4 class="panel-label">What I Built</h4>
        <p id="panel-built" class="panel-text"></p>
      </div>
      <div class="panel-section">
        <h4 class="panel-label">Skills &amp; Tools</h4>
        <div id="panel-tools" class="panel-tools"></div>
      </div>
    </div>
  </div>
</div>
<div id="panel-scrim" class="panel-scrim"></div>
```

**Step 2: Add panel CSS to `css/custom.css`**

```css
/* ===========================
   Slide-in Project Panel
=========================== */
.project-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  max-width: 100vw;
  height: 100vh;
  background: var(--white);
  z-index: 9000;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: -4px 0 30px rgba(0,0,0,0.12);
}

.project-panel.open {
  transform: translateX(0);
}

.panel-scrim {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 8999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.panel-scrim.open {
  opacity: 1;
  pointer-events: all;
}

.panel-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text);
  line-height: 1;
  z-index: 10;
  padding: 4px 8px;
  transition: opacity var(--transition);
}

.panel-close:hover {
  opacity: 0.6;
}

.panel-image-wrap {
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panel-content {
  padding: 32px 32px 48px;
}

.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  line-height: 1.3;
}

.panel-context {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: 28px;
  font-weight: 500;
}

.panel-section {
  margin-bottom: 24px;
}

.panel-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.panel-text {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text);
  margin: 0;
}

.panel-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag {
  display: inline-block;
  background: #F0F0EE;
  color: var(--text);
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
}
```

**Step 3: Create `js/portfolio.js`**

```js
'use strict';

(function() {
  var panel = document.getElementById('project-panel');
  var scrim = document.getElementById('panel-scrim');
  var closeBtn = document.getElementById('panel-close');

  function openPanel(item) {
    document.getElementById('panel-title').textContent = item.dataset.title || '';
    document.getElementById('panel-context').textContent = item.dataset.context || '';
    document.getElementById('panel-problem').textContent = item.dataset.problem || '';
    document.getElementById('panel-built').textContent = item.dataset.built || '';

    var toolsEl = document.getElementById('panel-tools');
    toolsEl.innerHTML = '';
    var tools = (item.dataset.tools || '').split(',');
    tools.forEach(function(tool) {
      var tag = document.createElement('span');
      tag.className = 'tool-tag';
      tag.textContent = tool.trim();
      toolsEl.appendChild(tag);
    });

    // Extract image URL from card-image background-image style
    var cardImg = item.querySelector('.card-image');
    var bgUrl = cardImg.style.backgroundImage.replace(/url\(['"]?([^'"]+)['"]?\)/i, '$1');
    document.getElementById('panel-image').src = bgUrl;
    document.getElementById('panel-image').alt = item.dataset.title || '';

    panel.classList.add('open');
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.classList.remove('open');
    scrim.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open on card click
  document.querySelectorAll('.grid-item').forEach(function(item) {
    item.addEventListener('click', function() {
      openPanel(this);
    });
  });

  // Close on button or scrim click
  closeBtn.addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePanel();
  });
})();
```

**Step 4: Add script tag in `index.html` before `</body>`**

```html
<script src="js/portfolio.js"></script>
```

**Step 5: Verify in browser — clicking a card slides panel in from right, scrim darkens background, × button and Escape key close the panel, image and data-attributes populate correctly**

**Step 6: Commit**
```bash
git add index.html css/custom.css js/portfolio.js
git commit -m "feat: slide-in project panel with image, problem, built description, and tool tags"
```

---

## Task 6: About section redesign

**Files:**
- Modify: `index.html` (about section + skill section, lines 272–334)
- Modify: `css/custom.css` (add about styles)

**Step 1: Replace the about section AND skill section HTML (both sections, lines 272–334)**

```html
<!-- ==== About Section Start ==== -->
<section class="about-section-new fix" id="about">
  <div class="container pt100 pb100">
    <div class="row">
      <div class="col-md-5 about-img-col">
        <img src="img/profile_nasa.jpg" alt="Calvin Patmont" class="about-photo">
      </div>
      <div class="col-md-7 about-text-col">
        <p class="about-bio">Mechanical Engineer specializing in production management, equipment design, and process optimization. Led manufacturing commissioning and scale-up initiatives in the sustainability, battery technology, and aerospace sectors. Combines advanced technical expertise (CAD, FEA, programming) with hands-on fabrication experience and cross-functional project management.</p>

        <div class="stat-row">
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6</span>
            <span class="stat-label">Industries</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6</span>
            <span class="stat-label">Companies</span>
          </div>
        </div>

        <div class="skills-section">
          <div class="skill-group">
            <span class="skill-group-label">CAD &amp; Design</span>
            <div class="skill-tags">
              <span class="skill-tag">SolidWorks</span>
              <span class="skill-tag">CATIA</span>
              <span class="skill-tag">AutoCAD</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Analysis</span>
            <div class="skill-tags">
              <span class="skill-tag">FEA</span>
              <span class="skill-tag">CFD</span>
              <span class="skill-tag">Thermal Modeling</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Fabrication</span>
            <div class="skill-tags">
              <span class="skill-tag">Machining</span>
              <span class="skill-tag">Composites</span>
              <span class="skill-tag">Welding</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Software</span>
            <div class="skill-tags">
              <span class="skill-tag">Python</span>
              <span class="skill-tag">MATLAB</span>
              <span class="skill-tag">LabVIEW</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Management</span>
            <div class="skill-tags">
              <span class="skill-tag">Production Scale-up</span>
              <span class="skill-tag">Construction PM</span>
              <span class="skill-tag">Cross-functional Teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ==== About Section End ==== -->
```

**Step 2: Add about styles to `css/custom.css`**

```css
/* ===========================
   About Section
=========================== */
.about-section-new {
  background: var(--white);
}

.about-photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--radius);
}

.about-bio {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text);
  margin-bottom: 36px;
}

/* Stat callouts */
.stat-row {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Skill tag cloud */
.skills-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-group {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.skill-group-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  min-width: 100px;
  padding-top: 5px;
  flex-shrink: 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  display: inline-block;
  background: #F0F0EE;
  color: var(--text);
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 16px;
}
```

**Step 3: Verify in browser — square photo left, bio + stat callouts + skill tag cloud right. Stat numbers are large and bold.**

**Step 4: Commit**
```bash
git add index.html css/custom.css
git commit -m "feat: about section — square photo, stat callouts, skill tag cloud replaces progress bars"
```

---

## Task 7: Experience timeline redesign

**Files:**
- Modify: `index.html` (resume section, lines 372–461)
- Modify: `css/custom.css` (add timeline styles)

**Step 1: Replace resume section HTML**

```html
<!-- ==== Resume Section Start ==== -->
<section class="resume-section-new fix" id="resume">
  <div class="container pt100 pb100">
    <div class="stitle mb70">
      <h2>Experience</h2>
    </div>
    <div class="timeline">

      <div class="tl-item tl-left wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-content">
          <div class="tl-company">Havelock Wool</div>
          <div class="tl-role">Head of Production and Engineering</div>
          <div class="tl-dates">July 2023 – Present</div>
          <p class="tl-impact">Scaled production capacity from prototype to commercial manufacturing of sustainable building insulation.</p>
          <span class="tl-tag">Sustainability</span>
        </div>
        <div class="tl-node"></div>
      </div>

      <div class="tl-item tl-right wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-node"></div>
        <div class="tl-content">
          <div class="tl-company">LTA Research</div>
          <div class="tl-role">Mechanical Design Engineer</div>
          <div class="tl-dates">Sep 2021 – July 2023</div>
          <p class="tl-impact">Designed structural and mechanical systems for a next-generation airship.</p>
          <span class="tl-tag">Aerospace</span>
        </div>
      </div>

      <div class="tl-item tl-left wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-content">
          <div class="tl-company">Redwood Materials</div>
          <div class="tl-role">Manufacturing Engineer</div>
          <div class="tl-dates">Aug 2020 – Aug 2021</div>
          <p class="tl-impact">Commissioned battery recycling equipment for a greenfield manufacturing facility.</p>
          <span class="tl-tag">Battery Tech</span>
        </div>
        <div class="tl-node"></div>
      </div>

      <div class="tl-item tl-right wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-node"></div>
        <div class="tl-content">
          <div class="tl-company">Sila Nanotechnologies</div>
          <div class="tl-role">Facility Engineer / Construction PM</div>
          <div class="tl-dates">June 2018 – July 2020</div>
          <p class="tl-impact">Managed facility build-out and equipment commissioning for battery R&amp;D and manufacturing.</p>
          <span class="tl-tag">Battery Tech</span>
        </div>
      </div>

      <div class="tl-item tl-left wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-content">
          <div class="tl-company">Brechtel</div>
          <div class="tl-role">Mechanical Design Engineer</div>
          <div class="tl-dates">Jan 2017 – May 2018</div>
          <p class="tl-impact">Designed precision aerosol instrumentation for NASA and NOAA research programs.</p>
          <span class="tl-tag">Research Instruments</span>
        </div>
        <div class="tl-node"></div>
      </div>

      <div class="tl-item tl-right wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-node"></div>
        <div class="tl-content">
          <div class="tl-company">Porifera</div>
          <div class="tl-role">Mechanical Engineer</div>
          <div class="tl-dates">July 2015 – Dec 2016</div>
          <p class="tl-impact">Built and iterated membrane filtration systems from R&amp;D through pilot production.</p>
          <span class="tl-tag">Water Tech</span>
        </div>
      </div>

      <!-- Education divider -->
      <div class="tl-divider">
        <span>Education</span>
      </div>

      <div class="tl-item tl-left tl-edu wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-content">
          <div class="tl-company">Boston University</div>
          <div class="tl-role">MS in Mechanical Engineering</div>
          <div class="tl-dates">Graduated 2015</div>
          <p class="tl-impact">Graduate Researcher at Center for Space Physics.</p>
          <span class="tl-tag">Engineering</span>
        </div>
        <div class="tl-node"></div>
      </div>

      <div class="tl-item tl-right tl-edu wow fadeInUp" data-wow-delay="0.1s">
        <div class="tl-node"></div>
        <div class="tl-content">
          <div class="tl-company">Cal Poly San Luis Obispo</div>
          <div class="tl-role">BS in Construction Management</div>
          <div class="tl-dates">Graduated 2007</div>
          <span class="tl-tag">Construction</span>
        </div>
      </div>

    </div>
  </div>
</section>
<!-- ==== Resume Section End ==== -->
```

**Step 2: Add timeline CSS to `css/custom.css`**

```css
/* ===========================
   Experience Timeline
=========================== */
.resume-section-new {
  background: var(--bg);
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Center spine */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
  transform: translateX(-50%);
}

.tl-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 60px;
  position: relative;
}

/* Left: content left, node right */
.tl-left {
  padding-right: calc(50% + 40px);
}

.tl-left .tl-content {
  text-align: right;
}

.tl-left .tl-node {
  position: absolute;
  right: calc(50% - 7px);
  top: 6px;
}

/* Right: node left, content right */
.tl-right {
  padding-left: calc(50% + 40px);
}

.tl-right .tl-node {
  position: absolute;
  left: calc(50% - 7px);
  top: 6px;
}

/* Node circle */
.tl-node {
  width: 14px;
  height: 14px;
  background: var(--accent);
  border-radius: 50%;
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 2px var(--accent);
  flex-shrink: 0;
  z-index: 1;
}

.tl-company {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.tl-role {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.tl-dates {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.tl-impact {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.tl-tag {
  display: inline-block;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(26, 107, 255, 0.08);
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* Education divider */
.tl-divider {
  text-align: center;
  margin: 20px 0 50px;
  position: relative;
  z-index: 2;
}

.tl-divider span {
  background: var(--bg);
  padding: 4px 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 20px;
}

.tl-edu .tl-company {
  font-size: 18px;
}
```

**Step 3: Verify in browser — alternating left/right entries, blue spine down the center, nodes on spine, education section separated by divider chip**

**Step 4: Commit**
```bash
git add index.html css/custom.css
git commit -m "feat: alternating timeline with blue spine, impact statements, and industry tag chips"
```

---

## Task 8: Contact section redesign

**Files:**
- Modify: `index.html` (contact + footer sections, lines 540–602)
- Modify: `css/custom.css` (add contact styles)

**Step 1: Replace contact and footer HTML**

```html
<!-- ==== Contact Section Start ==== -->
<section class="contact-section-new fix" id="contact">
  <div class="contact-inner">
    <h2 class="contact-heading">Let's build something.</h2>
    <a href="mailto:calvin@patmont.com" class="contact-email">calvin@patmont.com</a>
    <div class="contact-icons">
      <a href="https://www.linkedin.com/in/[CALVIN-LINKEDIN-HANDLE]" target="_blank" rel="noopener" class="contact-icon-link" aria-label="LinkedIn">
        <i class="fa fa-linkedin"></i>
      </a>
      <!-- Uncomment if GitHub is active:
      <a href="https://github.com/[CALVIN-GITHUB-HANDLE]" target="_blank" rel="noopener" class="contact-icon-link" aria-label="GitHub">
        <i class="fa fa-github"></i>
      </a>
      -->
    </div>
  </div>
</section>
<!-- ==== Contact Section End ==== -->

<!-- ==== Footer Section Start ==== -->
<footer class="footer-section-new fix">
  <p>Calvin Patmont · Built by hand.</p>
</footer>
<!-- ==== Footer Section End ==== -->
```

**IMPORTANT:** Replace `[CALVIN-LINKEDIN-HANDLE]` with Calvin's actual LinkedIn URL slug before going live.

**Step 2: Add contact and footer styles to `css/custom.css`**

```css
/* ===========================
   Contact Section
=========================== */
.contact-section-new {
  background: var(--dark);
  padding: 120px 20px;
  text-align: center;
}

.contact-inner {
  max-width: 600px;
  margin: 0 auto;
}

.contact-heading {
  font-size: 52px;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 24px;
  line-height: 1.15;
}

.contact-email {
  display: block;
  font-size: 20px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  margin-bottom: 40px;
  transition: color var(--transition);
}

.contact-email:hover {
  color: var(--white);
}

.contact-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.contact-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 50%;
  color: rgba(255,255,255,0.7);
  font-size: 18px;
  text-decoration: none;
  transition: all var(--transition);
}

.contact-icon-link:hover {
  border-color: var(--white);
  color: var(--white);
}

/* Footer */
.footer-section-new {
  background: var(--dark);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 24px 20px;
  text-align: center;
}

.footer-section-new p {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
  margin: 0;
}
```

**Step 3: Verify in browser — full-width dark section, large heading, email link, LinkedIn icon circle. Footer is minimal.**

**Step 4: Commit**
```bash
git add index.html css/custom.css
git commit -m "feat: dark contact section with 'Let's build something' headline and social icons"
```

---

## Task 9: Responsive styles

**Files:**
- Modify: `css/custom.css` (add responsive breakpoints at bottom of file)

**Step 1: Add responsive breakpoints to bottom of `css/custom.css`**

```css
/* ===========================
   Responsive
=========================== */

/* Tablet: 2-column grid, linear timeline */
@media (max-width: 991px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Collapse timeline to single left-aligned column */
  .timeline::before {
    left: 20px;
  }

  .tl-left,
  .tl-right {
    padding-left: 60px;
    padding-right: 0;
  }

  .tl-left .tl-content,
  .tl-right .tl-content {
    text-align: left;
  }

  .tl-left .tl-node,
  .tl-right .tl-node {
    position: absolute;
    left: 13px;
    right: auto;
    top: 6px;
  }

  .contact-heading {
    font-size: 36px;
  }
}

/* Mobile: 1-column grid */
@media (max-width: 767px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 280px;
  }

  .portfolio-header {
    padding: 16px 16px 12px;
  }

  .about-img-col {
    margin-bottom: 32px;
  }

  .about-photo {
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }

  .stat-row {
    gap: 24px;
  }

  .stat-number {
    font-size: 28px;
  }

  .skill-group {
    flex-direction: column;
    gap: 8px;
  }

  .skill-group-label {
    min-width: auto;
  }

  .project-panel {
    width: 100vw;
  }

  .contact-heading {
    font-size: 28px;
  }
}
```

**Step 2: Verify on mobile viewport (Chrome DevTools > Toggle Device — 375px width)**
- Grid shows 1 column
- About section stacks photo on top
- Timeline is single left-aligned column
- Contact heading readable
- Slide-in panel fills full screen

**Step 3: Commit**
```bash
git add css/custom.css
git commit -m "feat: responsive breakpoints — tablet 2-col grid, mobile 1-col, stacked timeline"
```

---

## Task 10: Cleanup and push

**Files:**
- Modify: `js/main.js` — remove dead code
- Modify: `index.html` — remove large commented-out sections

**Step 1: Remove dead JS blocks from `js/main.js`**

Remove these blocks entirely (they reference removed features):
- `$('.default-popup').magnificPopup(...)` — replaced by slide-in panel
- `$('.progress-bar-style').each(...)` — progress bars removed
- `$('#video-bg').YTPlayer(...)` — never used
- `$('#review-carousel').owlCarousel(...)` — section removed
- `$('#contact-form').on('submit', ...)` — form removed

**Step 2: Remove large commented-out HTML blocks from `index.html`**

Remove the following commented-out sections to reduce file size:
- Service section (lines ~338–368)
- Review section (lines ~467–496)
- Blog section (lines ~500–536)
- Old contact form markup inside contact section

**Step 3: Full browser walkthrough checklist**
- [ ] Nav transparent on load, white on scroll, "Resume ↓" pill visible
- [ ] Portfolio grid: 3 columns, cards fill viewport, hover overlay works
- [ ] Filter pills filter cards correctly
- [ ] Click card → panel slides in from right with image and data
- [ ] Panel closes on ×, scrim click, and Escape key
- [ ] About: photo + bio + stats + skill tags render correctly
- [ ] Timeline: alternating left/right with blue spine and nodes
- [ ] Contact: dark section with heading, email, LinkedIn icon
- [ ] Mobile (375px): 1-column grid, stacked about, linear timeline

**Step 4: Final commit and push**
```bash
git add index.html js/main.js
git commit -m "chore: remove dead JS and unused commented-out HTML sections"
git push
```

---

## Open Items (Calvin to complete before going live)

- [ ] Write `data-problem` and `data-built` text for each of the 8 project cards
- [ ] Verify `data-tools` per card matches actual tools used
- [ ] Confirm stat callouts (`10+`, `6 industries`, `6 companies`) are accurate
- [ ] Provide actual LinkedIn profile URL — replace `[CALVIN-LINKEDIN-HANDLE]` in contact section
- [ ] Decide whether to add GitHub link (uncomment block in contact section)
- [ ] Add `resume.pdf` to repo root for the nav "Resume ↓" download link
- [ ] Review and edit impact statements in the timeline if any need adjustment
