<template>
  <div>
    <blockquote class="blockquote">
      "First, solve the problem. Then, write the code."
      <h4>Your API token is: {{ $route.query.apiKey }}</h4>

      <h4>Mode: {{ $route.query.mode }}</h4>
      <h4>Lang: {{ $route.query.lang }}</h4>
      <footer>
        <small>
          <em>&mdash;John Johnson</em>
        </small>
      </footer>
    </blockquote>
    <h3>Login to see this page.</h3>
  </div>
</template>

<script>
export default {
  name: 'Secret',
  middleware: 'auth',
}
</script>

<style scoped></style>
