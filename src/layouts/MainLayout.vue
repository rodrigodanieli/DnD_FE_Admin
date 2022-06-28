<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title @click="toggleMenu('')">
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above :mini="mini" @mouseover="mini = false" @mouseout="mini = true"
      :width="200" :breakpoint="500" bordered class="bg-deep-purple-1" overlay>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in active_routes" :key="index">
            <q-item clickable @click="toggleMenu(menuItem.path)" :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.meta.icon" :style="{ color: 'gray-4' }" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.meta.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.meta.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

const menuList = [
  {
    icon: 'public',
    label: 'RPGs',
    separator: true,
    link: 'rpgs'
  }
]
export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      menuList,
      mini: ref(true),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed:
  {
    active_routes() {
      const r = this.$router.options.routes.filter(el => el.path == '/')[0]
      return r.children.filter(el => el.meta ? el.meta.menu == true : false)
    }
  },
  methods: {
    toggleMenu(link) {
      this.$router.push(link)
    }
  }
}
</script>
