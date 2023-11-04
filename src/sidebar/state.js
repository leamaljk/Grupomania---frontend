import { ref, computed } from 'vue'
//sidebar status
//define reactive variable which we can toggle on and of
export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)
//computed property that is turning px width value for the widht of the sidebar
export const SIDEBAR_WIDTH = 20
export const SIDEBAR_WIDTH_COLLAPSED = 10
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}%`
)