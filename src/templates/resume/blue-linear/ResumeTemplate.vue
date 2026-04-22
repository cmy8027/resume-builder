<script setup lang="ts">
import { iconPaths, iconViewBox, isFilledIcon } from '../../shared/metaIcons'
import { useResumeTemplateData } from '../../shared/useResumeTemplateData'

const { store, hasAnyContent, lineOneMeta, lineTwoMeta, lineThreeMeta, moduleOrderStyle } = useResumeTemplateData()
</script>

<template>
  <div class="resume-template-blue-linear">
    <header v-if="store.isModuleVisible('basicInfo')" class="resume-header">
      <div class="header-main">
        <h1 class="name">{{ store.basicInfo.name || '蓝色线性模板' }}</h1>

        <div class="contact-line">
          <span v-for="item in lineOneMeta" :key="item.key" class="meta-item">
            <svg
              class="meta-icon-svg"
              :class="{ 'meta-icon-fill': isFilledIcon(item.icon) }"
              :viewBox="iconViewBox[item.icon]"
              aria-hidden="true"
            >
              <path v-for="(d, idx) in iconPaths[item.icon]" :key="`${item.key}-${idx}`" :d="d" />
            </svg>
            {{ item.text }}
          </span>
        </div>

        <div class="contact-line">
          <span v-for="item in lineTwoMeta" :key="item.key" class="meta-item">
            <svg
              class="meta-icon-svg"
              :class="{ 'meta-icon-fill': isFilledIcon(item.icon) }"
              :viewBox="iconViewBox[item.icon]"
              aria-hidden="true"
            >
              <path v-for="(d, idx) in iconPaths[item.icon]" :key="`${item.key}-${idx}`" :d="d" />
            </svg>
            {{ item.text }}
          </span>
        </div>

        <div v-if="lineThreeMeta.length" class="contact-line">
          <span v-for="item in lineThreeMeta" :key="item.key" class="meta-item">
            <svg
              class="meta-icon-svg"
              :class="{ 'meta-icon-fill': isFilledIcon(item.icon) }"
              :viewBox="iconViewBox[item.icon]"
              aria-hidden="true"
            >
              <path v-for="(d, idx) in iconPaths[item.icon]" :key="`${item.key}-${idx}`" :d="d" />
            </svg>
            <a v-if="item.isLink" class="meta-link" :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.text }}</a>
            <span v-else>{{ item.text }}</span>
          </span>
        </div>
      </div>

      <div v-if="store.basicInfo.avatar" class="avatar-wrap">
        <img :src="store.basicInfo.avatar" alt="头像" />
      </div>
    </header>

    <section
      v-if="store.isModuleVisible('education') && store.educationList.some((e) => e.school)"
      class="resume-section"
      :style="moduleOrderStyle('education')"
    >
      <h2 class="section-title">教育经历</h2>
      <article v-for="edu in store.educationList" :key="edu.id" class="entry" v-show="edu.school">
        <div class="entry-head">
          <p class="entry-main">
            <strong>{{ edu.school }}</strong>
            <span v-if="edu.major || edu.degree" class="entry-inline-parts">
              <span v-if="edu.major">{{ edu.major }}</span>
              <span v-if="edu.major && edu.degree" class="dot-sep">·</span>
              <span v-if="edu.degree">{{ edu.degree }}</span>
            </span>
          </p>
          <span class="entry-date">{{ edu.startDate }} ~ {{ edu.endDate || '至今' }}</span>
        </div>
        <p class="entry-meta entry-meta-row">
          <span v-if="edu.type">{{ edu.type }}</span>
          <span v-if="edu.college">{{ edu.college }}</span>
          <span v-if="edu.location">{{ edu.location }}</span>
        </p>
        <div v-if="edu.description" class="entry-rich" v-html="edu.description"></div>
      </article>
    </section>

    <section v-if="store.isModuleVisible('skills') && store.skills" class="resume-section" :style="moduleOrderStyle('skills')">
      <h2 class="section-title">专业技能</h2>
      <div class="entry-rich" v-html="store.skills"></div>
    </section>

    <section
      v-if="store.isModuleVisible('workExperience') && store.workList.some((w) => w.company)"
      class="resume-section"
      :style="moduleOrderStyle('workExperience')"
    >
      <h2 class="section-title">工作经历</h2>
      <article v-for="work in store.workList" :key="work.id" class="entry work-entry" v-show="work.company">
        <div class="entry-head">
          <p class="entry-main entry-main-wrap">
            <strong class="work-company">{{ work.company }}</strong>
            <span v-if="work.department" class="work-dept">{{ work.department }}</span>
            <span v-if="work.department && work.position" class="dot-sep">·</span>
            <span v-if="work.position" class="work-position">{{ work.position }}</span>
            <span v-if="(work.department || work.position) && work.location" class="dot-sep">·</span>
            <span v-if="work.location" class="work-location">{{ work.location }}</span>
          </p>
          <span class="entry-date">{{ work.startDate }} ~ {{ work.endDate || '至今' }}</span>
        </div>
        <div v-if="work.description" class="entry-rich" v-html="work.description"></div>
      </article>
    </section>

    <section
      v-if="store.isModuleVisible('projectExperience') && store.projectList.some((p) => p.name)"
      class="resume-section"
      :style="moduleOrderStyle('projectExperience')"
    >
      <h2 class="section-title">项目经历</h2>
      <article v-for="project in store.projectList" :key="project.id" class="entry project-entry" v-show="project.name">
        <div class="entry-head">
          <p class="entry-main">
            <strong class="project-name">{{ project.name }}</strong>
            <span v-if="project.role" class="project-role">{{ project.role }}</span>
          </p>
          <span class="entry-date">{{ project.startDate }} ~ {{ project.endDate || '至今' }}</span>
        </div>
        <p v-if="project.link" class="entry-link-row">
          <svg class="link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <a class="entry-link" :href="project.link" target="_blank" rel="noopener noreferrer">{{ project.link }}</a>
        </p>
        <div v-if="project.introduction" class="project-block">
          <p class="project-block-title">
            <svg class="block-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            项目介绍
          </p>
          <div class="entry-rich" v-html="project.introduction"></div>
        </div>
        <div v-if="project.mainWork" class="project-block">
          <p class="project-block-title">
            <svg class="block-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            主要工作
          </p>
          <div class="entry-rich" v-html="project.mainWork"></div>
        </div>
      </article>
    </section>

    <section
      v-if="store.isModuleVisible('awards') && store.awardList.some((a) => a.name)"
      class="resume-section"
      :style="moduleOrderStyle('awards')"
    >
      <h2 class="section-title">荣誉奖项</h2>
      <article v-for="award in store.awardList" :key="award.id" class="entry" v-show="award.name">
        <div class="entry-head">
          <p class="entry-main"><strong>{{ award.name }}</strong></p>
          <span class="entry-date">{{ award.date }}</span>
        </div>
        <div v-if="award.description" class="entry-rich" v-html="award.description"></div>
      </article>
    </section>

    <section
      v-if="store.isModuleVisible('selfIntro') && store.selfIntro"
      class="resume-section"
      :style="moduleOrderStyle('selfIntro')"
    >
      <h2 class="section-title">个人简介</h2>
      <div class="entry-rich" v-html="store.selfIntro"></div>
    </section>

    <div v-if="!hasAnyContent" class="empty">
      <p>在左侧填写信息，这里实时预览</p>
    </div>
  </div>
</template>

<style scoped>
.resume-template-blue-linear {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding: 24px 24px 14px;
  color: #000;
  display: flex;
  flex-direction: column;
}

.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 8px;
  order: 0;
}

.header-main {
  flex: 1;
  text-align: center;
  padding-top: 2px;
}

.name {
  font-size: 26px;
  line-height: 1.1;
  color: #1f2937;
  margin-bottom: 8px;
}

.contact-line {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 14px;
  row-gap: 5px;
  color: #1f2937;
  font-size: 14px;
  line-height: 1.35;
  margin-bottom: 2px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  line-height: 1.25;
}

.meta-link {
  color: #2563eb;
  text-decoration: none;
}

.meta-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.meta-icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #3b65f6;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.meta-icon-fill {
  fill: #3b65f6;
  stroke: none;
}

.avatar-wrap {
  width: 96px;
  height: 120px;
  border-radius: 0;
  overflow: hidden;
  border: none;
  flex-shrink: 0;
}

.avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resume-section {
  margin-bottom: 6px;
}

.resume-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  height: auto;
  line-height: 1.2;
  margin-bottom: 6px;
  padding: 0 0 5px;
  font-size: 20px;
  font-weight: 700;
  color: #3b65f6;
  background: transparent;
  border-bottom: 1px solid #3b65f6;
}

.entry {
  margin-bottom: 10px;
  padding: 10px 12px;
  border: 1px solid #e0e7ff;
  border-radius: 6px;
  background: white;
  box-shadow: 0 1px 2px rgba(59, 101, 246, 0.08);
  transition: all 0.2s ease;
}

.entry:last-child {
  margin-bottom: 0;
}

.entry:hover {
  border-color: #c7d2fe;
  box-shadow: 0 2px 6px rgba(59, 101, 246, 0.12);
}

/* Work Entry Styles */
.work-entry {
  border-left: 3px solid #3b65f6;
  background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
}

.work-company {
  color: #1e3a8a !important;
  font-size: 17px !important;
  font-weight: 700 !important;
}

.work-dept {
  color: #475569 !important;
  font-weight: 500 !important;
  background: #dbeafe;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 13px !important;
}

.work-position {
  color: #334155 !important;
  font-weight: 600 !important;
  background: #e0f2fe;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 13px !important;
}

.work-location {
  color: #64748b !important;
  font-size: 13px !important;
}

/* Project Entry Styles */
.project-entry {
  border-left: 3px solid #6366f1;
  background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%);
}

.project-name {
  color: #4338ca !important;
  font-size: 17px !important;
  font-weight: 700 !important;
}

.project-role {
  color: #5b21b6 !important;
  font-weight: 600 !important;
  background: #e9d5ff;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 13px !important;
  border: 1px solid #d8b4fe;
}

.project-block-title {
  margin-top: 6px;
  margin-bottom: 3px;
  padding: 4px 8px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f1f5f9;
  border-radius: 4px;
  border-left: 2px solid #3b65f6;
}

.block-icon {
  color: #3b65f6;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
}

.project-block {
  margin-top: 6px;
}

.entry-link-row {
  margin-top: 5px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background: #eff6ff;
  border-radius: 4px;
  border-left: 2px solid #3b65f6;
}

.link-icon {
  color: #3b65f6;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
}

.entry-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #e0e7ff;
}

.entry-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  color: #000;
  font-size: 16px;
}

.entry-main-wrap {
  flex-wrap: wrap;
  gap: 4px;
  row-gap: 4px;
}

.entry-main strong {
  font-size: 17px;
  color: #111827;
}

.entry-main span {
  font-size: 14px;
  color: #7b8798;
}

.entry-inline-parts {
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
}

.dot-sep {
  color: #7b8798;
  margin: 0 1px;
}

.entry-date {
  color: #475569;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 600;
  padding: 2px 8px;
  background: #f8fafc;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.entry-meta {
  margin-top: 1px;
  color: #7b8798;
  font-size: 14px;
}

.entry-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.project-block-title {
  margin-top: 6px;
  margin-bottom: 2px;
  color: #000;
  font-size: 14px;
  font-weight: 700;
}

.entry-link-row {
  margin-top: 2px;
  margin-bottom: 2px;
}

.entry-link {
  color: #3b65f6;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.entry-link:hover {
  color: #2952e8;
  text-decoration: underline;
}

.entry-rich {
  margin-top: 4px;
  color: #334155;
  font-size: 12px;
  line-height: 1.7;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #a08c7b;
  font-size: 12px;
  order: 999;
}

:deep(.entry-rich ul) {
  margin: 0;
  padding: 0;
  list-style: none;
}

:deep(.entry-rich ul li) {
  position: relative;
  margin: 2px 0;
  padding-left: 16px;
}

:deep(.entry-rich ul li::marker) {
  content: '';
}

:deep(.entry-rich ul li::before) {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.95em;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

:deep(.entry-rich ol) {
  margin: 0;
  padding-left: 1.25em;
  list-style: decimal;
  list-style-position: outside;
}

:deep(.entry-rich ol li) {
  margin: 2px 0;
  padding-left: 0.1em;
}

:deep(.entry-rich ol li::marker) {
  color: #000;
  font-size: 1em;
  font-weight: inherit;
}

:deep(.entry-rich li > p) {
  margin: 0;
}

:deep(.entry-rich p) {
  margin: 2px 0;
}
</style>
