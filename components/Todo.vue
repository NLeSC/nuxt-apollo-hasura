<template>
  <v-text-field
    v-model="todo.title"
    outlined
    @keyup="updateTodo"
  ></v-text-field>
</template>
<script>
// import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import update_todos_by_pk from '~/apollo/update_todos_by_pk'

export default {
  name: 'Todo',
  props: {
    todo: { type: Object, default: () => ({}) },
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
