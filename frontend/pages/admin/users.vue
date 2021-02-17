<template>
  <div>
    <v-container>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-btn icon small @click="refreshUsersList">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          Users ({{ users_aggregate && users_aggregate.aggregate.count }})
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          flat
          hide-details
          label="Search"
          clearable
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-toolbar>

      <small> *List limited to 50 in the query</small>

      <v-list two-line avatar>
        <v-list-item
          v-for="user in users"
          :key="user.id"
          :class="{ admin: user.role === 'admin' }"
        >
          <v-list-item-avatar>
            <v-img
              :src="
                user.avatar_url ||
                `https://avatars.dicebear.com/api/bottts/${user.id}.svg`
              "
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.name }}
              <v-icon v-if="user.role === 'admin'" color="amber" class="ml-2">{{
                mdi - card - account - details - outline
              }}</v-icon>
            </v-list-item-title>
            <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="
                user.gender +
                ' | ' +
                user.locale +
                ' | ' +
                'since ' +
                $dateFns.formatDistanceToNow(Date.parse(user.created_at))
              "
            >
            </v-list-item-subtitle>
            <v-list-item-subtitle :text="'hol'" />
          </v-list-item-content>
          <v-list-item-action>
            <v-row no-gutters align="center">
              <v-select
                label="Outlined style"
                solo
                style="width: 130px"
                class="mr-4 mb-0"
                hide-details
                dense
                :items="['admin', 'user']"
                :value="user.role"
                @change="changeRole($event, user.id)"
              ></v-select>
              <v-btn
                :disabled="user.id === $auth.user.id"
                icon
                @click="deleteUser(user.id, user.email)"
              >
                <v-icon>mdi-delete-empty</v-icon>
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>
<script>
import users from '~/apollo/users/users'
import delete_user_by_pk from '~/apollo/users/delete_user_by_pk'
import update_user_role_by_pk from '~/apollo/users/update_user_role_by_pk'

export default {
  middleware: ['auth'],
  data() {
    return {
      usersListMore: [],
      debouncedSearch: '',
      timeout: null,
    }
  },
  computed: {
    searchText: {
      get() {
        return this.debouncedSearch
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.debouncedSearch = val
        }, 300)
      },
    },
  },
  apollo: {
    users_aggregate: {
      query: users,
    },
    users: {
      query: users,
      variables() {
        return {
          search: this.searchText ? `%${this.searchText}%` : null,
        }
      },
    },
  },
  methods: {
    refreshUsersList() {
      this.$apollo.queries.users.refetch()
    },
    changeRole(role, userId) {
      this.$apollo
        .mutate({
          mutation: update_user_role_by_pk,
          variables: {
            id: userId,
            role,
          },
        })
        .then(() => {
          // todo:
          //  this will make the call again.
          //  An improvement will be to use update cache from apollo client.
          // console.log('🎹')

          this.refreshUsersList()
        })
    },
    deleteUser(userId, email) {
      const confirmMessage = confirm(
        'Do you want to delete this user? \n' + email
      )
      if (confirmMessage === true) {
        this.$apollo
          .mutate({
            mutation: delete_user_by_pk,
            variables: { id: userId },
          })
          .then(() => {
            // todo:
            //  this will make the call again.
            //  An improvement will be to use update cache from apollo client.
            this.refreshUsersList()
          })
      }
    },
  },
}
</script>

<style scoped>
.v-list-item.admin {
  background-color: #fb8c0024;
}
.v-list-item:hover {
  background-color: #00000010;
}
</style>
