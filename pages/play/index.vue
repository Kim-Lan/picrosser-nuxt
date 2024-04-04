<script setup>
const puzzle = usePuzzle();

navigateTo(`/play/${puzzle.height}x${puzzle.width}`);
</script>
