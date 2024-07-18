<template>
  <router-view />
</template>

<script>
export default {
name: 'App'
}
</script>

<style>
#app {
min-height: 100vh;
min-width: 100vw;
display: block !important; /* Asegurarse de no usar grid */
}
</style>