<template>
  <div>
    <v-text-field
      outlined
      dense
      v-model="todo.title"
      :readonly="userId !== todo.id"
      @keyup="updateTodo"
    ></v-text-field>
  </div>
</template>
<script>
// import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import update_todos_by_pk from '~/apollo/update_todos_by_pk'

export default {
  name: 'Todo',
  props: {
    todo: { type: Object, default: () => ({}) },
    userId: { type: Number, default: null },
  },

  methods: {
    updateTodo: debounce(function () {
      this.$apollo.mutate({
        mutation: update_todos_by_pk,
        variables: {
          id: this.todo.id,
          title: this.todo.title,
        },
      })
    }, 1000),
  },
}
</script>
<style>
.v-text-field__details {
  display: none;
}
</style>
