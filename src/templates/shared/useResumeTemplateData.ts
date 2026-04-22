import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { MetaIconKey } from './metaIcons'
import { toHref } from './metaIcons'

export function useResumeTemplateData() {
  const store = useResumeStore()

  const hasBasicInfo = computed(() => {
    const b = store.basicInfo
    return Boolean(b.name || b.phone || b.email || b.jobTitle || b.wechat || b.currentCity || b.website || b.github || b.blog)
  })

  const hasAnyContent = computed(
    () =>
      hasBasicInfo.value ||
      store.educationList.some((e) => e.school) ||
      Boolean(store.skills) ||
      store.workList.some((w) => w.company) ||
      store.projectList.some((p) => p.name) ||
      store.awardList.some((a) => a.name) ||
      Boolean(store.selfIntro)
  )

  const lineOneMeta = computed(() => {
    const items = [
      { key: 'phone', icon: 'phone' as MetaIconKey, text: store.basicInfo.phone },
      { key: 'mail', icon: 'mail' as MetaIconKey, text: store.basicInfo.email },
      { key: 'user', icon: 'user' as MetaIconKey, text: store.basicInfo.age },
      { key: 'gender', icon: 'gender' as MetaIconKey, text: store.basicInfo.gender },
      { key: 'workYears', icon: 'workYears' as MetaIconKey, text: store.basicInfo.workYears },
    ]
    return items.filter((item) => {
      const fieldKey = item.key === 'mail' ? 'email' : item.key === 'user' ? 'age' : item.key
      return store.basicInfoFieldVisibility[fieldKey as keyof typeof store.basicInfoFieldVisibility] && item.text
    })
  })

  const lineTwoMeta = computed(() => {
    const items = [
      { key: 'status', icon: 'status' as MetaIconKey, text: store.basicInfo.currentStatus },
      { key: 'job', icon: 'job' as MetaIconKey, text: store.basicInfo.jobTitle },
      { key: 'location', icon: 'location' as MetaIconKey, text: store.basicInfo.expectedLocation },
      { key: 'salary', icon: 'salary' as MetaIconKey, text: store.basicInfo.expectedSalary },
      { key: 'education', icon: 'education' as MetaIconKey, text: store.basicInfo.educationLevel },
    ]
    return items.filter((item) => {
      const fieldKey = item.key === 'status' ? 'currentStatus' : item.key === 'job' ? 'jobTitle' : item.key === 'location' ? 'expectedLocation' : item.key === 'salary' ? 'expectedSalary' : item.key === 'education' ? 'educationLevel' : item.key
      return store.basicInfoFieldVisibility[fieldKey as keyof typeof store.basicInfoFieldVisibility] && item.text
    })
  })

  const simpleContactMeta = computed(() => {
    const items = [
      { key: 'phone', icon: 'phone' as MetaIconKey, text: store.basicInfo.phone },
      { key: 'mail', icon: 'mail' as MetaIconKey, text: store.basicInfo.email },
    ]
    return items.filter((item) => {
      const fieldKey = item.key === 'mail' ? 'email' : item.key
      return store.basicInfoFieldVisibility[fieldKey as keyof typeof store.basicInfoFieldVisibility] && item.text
    })
  })

  const lineThreeMeta = computed(() => {
    const items = [
      { key: 'wechat', icon: 'wechat' as MetaIconKey, text: store.basicInfo.wechat || '', isLink: false },
      { key: 'currentCity', icon: 'currentCity' as MetaIconKey, text: store.basicInfo.currentCity || '', isLink: false },
      { key: 'website', icon: 'website' as MetaIconKey, text: store.basicInfo.website || '', isLink: true },
      { key: 'github', icon: 'github' as MetaIconKey, text: store.basicInfo.github || '', isLink: true },
      { key: 'blog', icon: 'blog' as MetaIconKey, text: store.basicInfo.blog || '', isLink: true },
    ]

    return items
      .filter((item) => store.basicInfoFieldVisibility[item.key as keyof typeof store.basicInfoFieldVisibility] && item.text.trim())
      .map((item) => ({
        ...item,
        href: item.isLink ? toHref(item.text) : '',
      }))
  })

  const moduleOrderMap = computed(() => {
    const map: Record<string, number> = {}
    let order = 1
    store.modules.forEach((mod) => {
      if (mod.key === 'basicInfo') return
      map[mod.key] = order
      order += 1
    })
    return map
  })

  function moduleOrderStyle(key: string): { order: number } {
    return { order: moduleOrderMap.value[key] ?? 99 }
  }

  function isFieldVisible(key: keyof typeof store.basicInfoFieldVisibility): boolean {
    return store.basicInfoFieldVisibility[key]
  }

  const displayName = computed(() => {
    if (!isFieldVisible('name')) return ''
    return store.basicInfo.name
  })

  const displayAvatar = computed(() => {
    if (!isFieldVisible('avatar')) return ''
    return store.basicInfo.avatar
  })

  return {
    store,
    hasAnyContent,
    lineOneMeta,
    lineTwoMeta,
    simpleContactMeta,
    lineThreeMeta,
    moduleOrderStyle,
    isFieldVisible,
    displayName,
    displayAvatar,
  }
}
