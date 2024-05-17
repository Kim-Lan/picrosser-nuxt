export type Theme = 'light' | 'dark';

export const useSettings = defineStore('settings', () => {
  const theme = ref<Theme>('light');
  const fillLine = ref(false);

  function toggleTheme() {
    if (theme.value === 'light') {
      theme.value = 'dark';
    } else {
      theme.value = 'light';
    }
  }

  return {
    theme,
    fillLine,
    toggleTheme
  }
},
{
  persist: true,
})
