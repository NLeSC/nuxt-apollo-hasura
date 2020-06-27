<template>
  <v-row no-gutters align="center">
    <v-avatar size="26" class="mr-2">
      <img :src="todo.user.avatar_url" alt="" />
    </v-avatar>
    <v-text-field
      v-model="todo.title"
      outlined
      dense
      :readonly="userId !== todo.id"
      @keyup="updateTodo"
    ></v-text-field>
  </v-row>
</template>
<script>
import debounce from 'lodash.debounce'
import update_todos_by_pk from '~/apollo/todos/update_todos_by_pk'

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
