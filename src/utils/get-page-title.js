import defaultSettings from '@/settings'

const title = defaultSettings.title || '项目名称'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
