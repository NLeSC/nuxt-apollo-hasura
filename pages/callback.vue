<template>
  <div class="d-flex align-center flex-column">
    <img src="~/static/loading.svg" alt="Loading..." width="80px" />
    Logging in...
    <pre>
      {{ this.$auth.user }}
    </pre>
  </div>
</template>
<script>
export default {
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    )
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
}
</script>
