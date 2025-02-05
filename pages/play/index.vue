<script setup>
const puzzle = usePuzzle();

navigateTo(`/play/${puzzle.height}x${puzzle.width}`, { replace: true });
</script>

<template>
  <div>
    
  </div>
</template>
