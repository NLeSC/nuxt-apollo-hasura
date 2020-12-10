<!--
  Access to native file system selector with Vue.
  @author J.Gonzalez @ctwhome
-->
<template>
  <div>
    <h2>Access to the native file system API</h2>
    <p>
      The File System Access API allows web apps to read or save changes
      directly to files and folders on the user's device.
      <a href="https://web.dev/file-system-access/" target="_blank">
        Read the blog
      </a>
    </p>
    <p>
      This component stores the binary object into indexDB to have access to the
      file system when reloading. The user needs to grand access once again.
    </p>
    <v-card class="pa-4" outlined>
      <div class="d-flex">
        <v-btn
          depressed
          :color="isTreeEmpty ? 'default' : 'primary'"
          :loading="loadingFiles"
          @click="open"
        >
          Open directory
        </v-btn>
        <div v-if="isTreeEmpty" class="d-flex">
          <template>
            <v-row no-gutters justify="center" class="mx-6">
              <v-dialog v-model="dialog" scrollable max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-hover>
                    <div v-bind="attrs" class="mt-1" v-on="on">
                      <v-icon color="blue lighten-3">{{ mdiFolder }}</v-icon>
                      {{ numberFiles.directories }}
                      <v-icon color="blue lighten-3"
                        >{{ mdiFileDocumentOutline }}
                      </v-icon>
                      {{ numberFiles.files }}
                    </div>
                  </v-hover>
                </template>
                <v-card>
                  <v-card-title>Opened files and directories</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div
                      v-for="(item, key) in tree"
                      :key="key"
                      class="item"
                      @click="fileClicked(item)"
                    >
                      {{ key }}
                      <v-icon color="blue lighten-3">
                        {{
                          item.handle.kind === 'file'
                            ? mdiFileDocumentOutline
                            : mdiFolder
                        }}
                      </v-icon>
                      {{ item.name }}
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>

          <v-btn icon @click="cleanDB">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mdiClose, mdiFileDocumentOutline, mdiFolder } from '@mdi/js'
import { deleteDB, openDB } from 'idb'

export default {
  name: 'OpenFiles',
  data() {
    return {
      dialog: false,
      numberFiles: { rootName: '', directories: 0, files: 0 },
      loadingFiles: false,
      db: null,
      arrayTree: [],
      tree: {},
      directoryHandle: null,
      mdiFolder,
      mdiFileDocumentOutline,
      mdiClose,
    }
  },
  computed: {
    isTreeEmpty() {
      return Object.keys(this.tree).length !== 0
    },
  },
  async mounted() {
    // Create DB in indexDB
    this.db = await openDB('db', 1, {
      upgrade(db) {
        db.createObjectStore('store')
      },
    })
    const directoryHandle = await this.db.get('store', 'directory')
    console.log('🔌 directoryHandle', directoryHandle)
    /* Timeout to avoid user activation error. */
    setTimeout(async () => {
      if (directoryHandle) {
        await directoryHandle.requestPermission()
        await this.recursive(directoryHandle)
        console.log('🌲 tree:', this.tree)
      }
    }, 100)
  },
  // destroyed() {
  // close indexDb
  // this.db.close()
  // },
  methods: {
    async cleanDB() {
      // this.db.close()
      this.tree = {}
      await deleteDB('db')
    },
    async fileClicked(fileHandle) {
      try {
        if (fileHandle.handle.kind === 'file') {
          const file = await fileHandle.handle.getFile()
          console.log('🎹', file)
          let content = await file.text()
          if (file.type === 'application/json') {
            content = JSON.parse(content)
          }
          console.log('🎹', content)
          // console.log('🎹 file', file)
        }
      } catch (e) {}
    },
    async open() {
      try {
        const directoryHandle = await window.showDirectoryPicker()
        await this.openDirectory(directoryHandle)
      } catch (e) {
        this.loadingFiles = false
        console.error(e)
      }
    },
    async openDirectory(directoryHandle) {
      this.loadingFiles = true
      this.tree = {}
      this.numberFiles = { rootName: '', directories: 0, files: 0 }
      this.db.put('store', directoryHandle, 'directory')
      await this.recursive(directoryHandle)
      this.loadingFiles = false
    },
    /**
     * Read recursively all files and subdirectories
     */
    async recursive(directoryHandle, path = '/') {
      try {
        for await (const [name, handle] of directoryHandle) {
          if (handle.kind === 'directory') {
            this.numberFiles.directories++
            // if item is a directory enter to the folder
            await this.recursive(handle, path + name + '/')
          } else {
            this.numberFiles.files++
          }
          // Make vue reactive when changing the object ==> this.tree[path + name] = { name, handle }
          this.$set(this.tree, path + name, { name, handle })
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style scoped>
.item {
  padding: 4px;
}

.item:hover {
  background-color: #eee;
}
</style>
