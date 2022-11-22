export default defineEventHandler((event) => {
  const { width, height } = getQuery(event);
  return {
    width,
    height
  }
})
