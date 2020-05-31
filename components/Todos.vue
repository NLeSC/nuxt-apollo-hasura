<template>
  <v-card class="mt-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ sub }}
      <h4>Num 'todos' subscription: {{ todosCount }}</h4>

      <v-form v-if="!isPublic" @submit.prevent="addTodo">
        <v-text-field
          v-model="newTodo"
          label="Add todo (Optimistic UI)"
          required
        ></v-text-field>
      </v-form>

      <v-list dense>
        <v-list-item v-for="todo in todos" :key="todo.id">
          <v-list-item-content>
            <Todo :todo="todo" />
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              v-if="sub === todo.user_id"
              icon
              @click="deleteTodo(todo.id)"
            >
              <v-icon color="grey lighten-1">{{ mdiClose }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mdiClose } from '@mdi/js'
import delete_todos_by_pk from '~/apollo/delete_todos_by_pk'
import todos from '~/apollo/todos'
import insert_todos from '~/apollo/insert_todos'
import todos_aggregate_subscription from '~/apollo/todos_aggregate_subscription'
import Todo from '~/components/Todo'

export default {
  name: 'Todos',
  components: { Todo },
  props: {
    title: { type: String, default: 'Todos title' },
    type: { type: String, default: 'public' },
  },
  data: () => ({
    mdiClose,
    newTodo: '',
    todosCount: 0,
  }),
  computed: {
    sub() {
      return this.$auth?.user?.sub
    },
    isPublic() {
      return this.type === 'public'
    },
  },
  apollo: {
    todos: {
      // graphql query
      query: todos,
      variables() {
        return {
          isPublic: this.isPublic,
          userId: this.isPublic ? null : this.$auth.user.sub,
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },

    // Subscriptions
    $subscribe: {
      // When a tag is added
      todosCount: {
        query: todos_aggregate_subscription,
        result({ data }) {
          this.todosCount = data?.todos_aggregate?.aggregate?.count
        },
      },
    },
  },
  methods: {
    addTodo() {
      // insert new item into db
      const title = this.newTodo
      this.$apollo.mutate({
        mutation: insert_todos,
        variables: {
          todo: title,
          isPublic: this.isPublic,
          userId: this.$auth?.user?.sub,
        },
        update: (cache, { data: { insert_todos } }) => {
          // Read the data from our cache for this query.
          try {
            // readQuery will never make a request to your GraphQL server
            const data = cache.readQuery({
              query: todos,
              variables: {
                isPublic: this.isPublic,
                userId: this.isPublic ? null : this.$auth.user.sub,
              },
            })
            const insertedTodo = insert_todos.returning
            data.todos.splice(0, 0, insertedTodo[0])
            cache.writeQuery({
              query: todos,
              variables: {
                isPublic: this.isPublic,
                userId: this.isPublic ? null : this.$auth.user.sub,
              },
              data,
            })
            this.newTodo = ''
          } catch (e) {
            console.error(e)
          }
        },
      })
    },

    deleteTodo(id) {
      this.$apollo.mutate({
        mutation: delete_todos_by_pk,
        variables: {
          id,
        },
        update: (store, { data, data: { delete_todos } }) => {
          if (delete_todos.affected_rows) {
            const data = store.readQuery({
              query: todos,
              variables: {
                isPublic: this.isPublic,
                userId: this.isPublic ? null : this.$auth.user.sub,
              },
            })
            data.todos = data.todos.filter((t) => {
              return t.id !== id
            })
            store.writeQuery({
              query: todos,
              variables: {
                isPublic: this.isPublic,
                userId: this.type === 'public' ? null : this.$auth.user.sub,
              },
              data,
            })
          }
        },
      })
    },
  },
}
</script>
