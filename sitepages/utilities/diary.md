---
layout: utility
title: Diary
icon: 4dd
permalink: /diary/
description: "Write and save diary entries with rich formatting, tags, and colors!"
---

<div class="main-content" data-page-script="diary-utility">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>4dd Diary</h1>
      <p>Write and save diary entries with rich formatting, tags, and colors!</p>
    </header>
    <form id="diary-form" style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:1rem;">
      <input id="diary-title" class="glass-input" placeholder="Title" required />
      <input id="diary-tags" class="glass-input" placeholder="Tags (comma separated)" />
      <input id="diary-color" type="color" class="color-picker" style="width:48px;height:32px;align-self:flex-start;" value="#fef3c7" />
      <textarea id="diary-content" class="glass-input" style="min-height:120px;" placeholder="Write your entry..."></textarea>
      <button class="glass-button" type="submit">Save Entry</button>
    </form>
    <div id="diary-entries" style="width:100%;max-width:700px;margin-top:2rem;"></div>
  </div>
</div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
<script src="/assets/js/diary-utility.js"></script> 