<template>
  <v-container>
    <v-row>
      <v-col lg="4">
        <template>
          <v-card class="descContainer">
            <v-card-title>Participant {{ db_video.participant }}</v-card-title>
            <v-card-text>
              <div class="subtitle-1">study: {{ db_video.study }}</div>
              <div class="desc">
                <p>Session: {{ db_video.session }}</p>
                <p>Memory Type: {{ db_video.memory_type }}</p>
                <p>Memory Index: {{ db_video.memory_index }}</p>
              </div>
            </v-card-text>
            <v-card-actions class="bottom">
              <v-btn text color="teal accent-4" @click="reveal = true"> Show Features </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal">
                <v-card-text class="pb-0 featuresPanel">
                  <v-chip-group v-model="selected_features" column multiple>
                    <div v-for="(feature, index) in feature_names" :key="index">
                      <v-tooltip v-if="feature.description" bottom lazy>
                        <template #activator="{ on }">
                          <v-chip v-model="feature.active" :value="feature" filter outlined v-on="on">
                            {{ feature.label }}
                          </v-chip>
                        </template>
                        <span>{{ feature.description }}</span>
                      </v-tooltip>
                      <v-chip v-else v-model="feature.active" :value="feature" filter outlined v-on="on">
                        {{ feature.label }}
                      </v-chip>
                    </div>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions class="pt-0 justify-end">
                  <v-btn text color="teal accent-4" @click="reveal = false"> Close </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </template>
      </v-col>
      <v-col lg="8">
        <video-player :video-src="'videos/' + $route.query.video" />
      </v-col>
    </v-row>
    <v-row>
      <D3HeatMap :features="selected_features" style="transform: translateX(-50px)" />
    </v-row>
  </v-container>
</template>

<script>
import get_feature_names from '~/apollo/get_feature_names'
export default {
  name: 'Erd',

  data() {
    return {
      reveal: false,
      isPlaying: false,
      cursor: 0,
      feature_names: [],
      db_video: {}, // Todo
      defaultEnabledFeatures: [
        'success',
        'topic',
        'silence',
        'pitch',
        'intensity',
        'au01r',
        'au01c',
        'au04r',
        'au04c',
        'au09r',
        'au09c',
        'au10r',
        'au10c',
        'au12r',
        'au12c',
        'au14r',
        'au14c',
        'au15r',
        'au15c',
      ],
    }
  },
  computed: {
    selected_features: {
      get() {
        return this.feature_names.filter((filed) => filed.active)
      },
      set() {
        return this.feature_names.filter((filed) => filed.active)
      },
    },
  },
  apollo: {
    get_feature_names: {
      query: get_feature_names,
      result({ data, loading, networkStatus }) {
        if (data) {
          this.feature_names = data.get_feature_names.fields
            .map((field) => ({
              label: field.name,
              active: this.defaultEnabledFeatures.includes(field.name),
              description: field.description,
            }))
            .filter((filed) => {
              return filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp'
            })
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  methods: {
    play() {
      this.$refs.myvideo.play()
      this.isPlaying = true
    },
    stop() {
      this.$refs.myvideo.pause()
      this.isPlaying = false
    },
  },
}
</script>
<style>
.descContainer {
  height: 350px;
  overflow-y: scroll;
  position: relative;
}
.desc {
  height: 100%;
  max-height: 200px;
  overflow-y: scroll;
}
.bottom {
  position: absolute;
  bottom: 0;
}
.featuresPanel {
  height: 100%;
  max-height: 320px;
  overflow: scroll;
}
.v-messages {
  display: none;
}
.v-input--selection-controls {
  margin-top: 0 !important;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
