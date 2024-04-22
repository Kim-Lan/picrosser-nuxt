export type Theme = 'light' | 'dark';

export const useSettings = defineStore('settings', () => {
  const theme = ref<Theme>('light');

  function toggleTheme() {
    if (theme.value === 'light') {
      theme.value = 'dark';
    } else {
      theme.value = 'light';
    }
  }

  return {
    theme,
    toggleTheme
  }
},
{
  persist: true,
})
