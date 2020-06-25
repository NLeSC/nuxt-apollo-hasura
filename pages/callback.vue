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
// todo this doesnt' enter
export default {
  beforeRouteLeave(to, from, next) {
    console.log('🎹 STOP HERE AT HE CALLBACK')
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  },
}
</script>
