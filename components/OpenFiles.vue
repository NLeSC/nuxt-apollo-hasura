<!--
  Access to native file system selector with Vue.
  @author J.Gonzalez @ctwhome
-->
<template>
  <div>
    <v-card class="pa-4" outlined>
      <v-card-title class="headline">Add videos</v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-btn depressed color="default" :disabled="loadingFiles" @click="open">
            <v-icon left>{{ mdiFileVideoOutline }}</v-icon>
            Open single video
          </v-btn>
          <v-btn depressed color="primary" :disabled="loadingFiles" class="ml-3" @click="openDirectory">
            <v-icon left>{{ mdiFolder }}</v-icon>
            Open folder
          </v-btn>

          <v-spacer class="flex-grow-1" />
          <v-btn v-if="videos.length > 0" text @click="cleanDB"> Close all </v-btn>
        </div>
        <div v-if="loadingFiles" class="mt-4">
          <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
          Loading video (calculating hash)
        </div>
      </v-card-text>
    </v-card>

    <v-card v-if="localVideos.length > 0" class="pa-4 mt-6" outlined>
      <v-card-title class="headline"
        >Videos ({{ localVideos.length }})
        <v-btn v-if="showRequest" color="warning" depressed class="ml-6" @click="requestPermissions">
          <v-icon left> {{ mdiFileCheckOutline }}</v-icon>
          Allow local video access</v-btn
        >
      </v-card-title>
      <v-card-text>
        <div v-if="showRequest">
          <div v-for="index in new Array(localVideos.length)" :key="index">
            <v-row>
              <v-col cols="3">
                <v-skeleton-loader max-height="120" type="image"></v-skeleton-loader>
              </v-col>
              <v-col cols="8">
                <v-skeleton-loader max-height="120" type="text@3, button"></v-skeleton-loader>
              </v-col>
            </v-row>
          </div>
        </div>
        <div v-for="(video, index) in videos" :key="index">
          <video-list-item :video="video" @removeVideo="removeVideo(video.id)" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiClose, mdiFileDocumentOutline, mdiFolder, mdiFileCheckOutline, mdiFileVideoOutline } from '@mdi/js'
import { deleteDB, openDB } from 'idb'
import { sha256 } from 'js-sha256'
import { nanoid } from 'nanoid'

export default {
  name: 'OpenFiles',
  data() {
    return {
      loading: false,
      showRequest: false,
      videos: [],
      localVideos: [],
      loadingFiles: false,
      db: null,
      directoryHandle: null,
      mdiFolder,
      mdiFileDocumentOutline,
      mdiClose,
      mdiFileCheckOutline,
      mdiFileVideoOutline,
    }
  },
  async mounted() {
    // Create DB in indexDB
    this.db = await openDB('db', 1, {
      upgrade(db) {
        db.createObjectStore('store')
      },
    })
    // Retrieve video from local indexDB and request permission if necessary
    this.localVideos = (await this.db.getAll('store')) || []
    this.requestPermissions()
  },

  methods: {
    /**
     * Open Video File
     */
    async open() {
      try {
        // Open file Dialog
        const [fileHandle] = await window.showOpenFilePicker({
          multiple: false,
          types: [
            {
              description: 'Video files',
              accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mpg'] },
            },
          ],
        })
        this.loadingFiles = true

        // Get url
        const src = URL.createObjectURL(await fileHandle.getFile())
        const hash = await this.calculateSha256(src)
        const id = nanoid()
        const video = { id, fileHandle, src, hash, name: fileHandle.name }

        // Store file handle in indexDB (database, value, key)
        this.db.put('store', video, id)
        this.videos.push(video)
        this.localVideos = (await this.db.getAll('store')) || []
        this.loadingFiles = false
        // await this.openDirectory(fileHandle)
      } catch (e) {
        this.loadingFiles = false
        console.log('error', e)
      }
      this.loading = false
    },
    async openDirectory() {
      try {
        const directoryHandle = await window.showDirectoryPicker()
        this.loadingFiles = true
        await this.loadFolder(directoryHandle, true)
        this.localVideos = (await this.db.getAll('store')) || []
        this.loadingFiles = false
      } catch (e) {
        this.loadingFiles = false
        console.error(e)
      }
    },

    async removeVideo(id) {
      this.videos.splice(
        this.videos.findIndex((video) => video.id === id),
        1
      )
      this.db.delete('store', id)
      this.localVideos = (await this.db.getAll('store')) || []
    },

    async getLocalUrl(fileHandle) {
      return URL.createObjectURL(await fileHandle.getFile())
    },

    async loadFolder(directoryHandle) {
      for await (const [name, handle] of directoryHandle) {
        if (/\w+.(mp4|avi|wmv|flv|3gp|mov|mpg)/.test(name)) {
          const id = nanoid()
          const src = await this.getLocalUrl(handle)
          const hash = await this.calculateSha256(src)
          const video = { id, fileHandle: handle, src, hash, name }
          this.db.put('store', video, id)
          this.videos.push(video)
          this.localVideos = (await this.db.getAll('store')) || []
        }
      }
    },

    async calculateSha256(blobUrl) {
      const blob = await fetch(blobUrl).then((r) => r.blob())
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(sha256(reader.result))
        }
        const sizeMB = 1 // Size in MB
        reader.readAsArrayBuffer(blob.slice(0, sizeMB * 1024 * 1024))
      })
    },

    async cleanDB() {
      this.localVideos = []
      this.videos = []
      await deleteDB('db')
    },

    /**
     * Verify if the user granted permissions
     */
    async requestPermissions() {
      try {
        for await (const video of this.localVideos) {
          if (video?.fileHandle?.kind === 'file') {
            await this.verifyPermission(video.fileHandle)
            const src = await this.getLocalUrl(video.fileHandle)
            this.videos.push({ ...video, src })
            this.showRequest = false
          }
        }
        this.showRequest = this.localVideos.length && !this.videos.length
      } catch (e) {
        this.showRequest = this.localVideos.length && !this.videos.length
        console.log('🚨', e)
      }
    },
    async verifyPermission(fileHandle, readWrite) {
      const options = {}
      if (readWrite) {
        options.mode = 'readwrite'
      }
      // Check if permission was already granted. If so, return true.
      if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true
      }
      // Request permission. If the user grants permission, return true.
      if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true
      }
      // The user didn't grant permission, so return false.
      return false
    },
  },
}
</script>
