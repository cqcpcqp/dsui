<script>
import Doc from '@/components/component/component.vue';
import Headless from '@/components/headless/headless.vue';
import Guide from '@/components/guide/guide.vue';

export default {
  components: { Doc, Headless, Guide },
  data() {
    return {
      selectedMenu: 'component',
    };
  },
};
</script>

<template>
  <ds-flex :direction="'column'">
    <ds-flex class="head" :justify="'space-between'" :align="'center'">
      <ds-flex :align="'center'" :gap="'20px'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="16"
          height="16"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,185.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M782 1595 c-67 -19 -84 -28 -134 -73 -59 -53 -80 -101 -77 -178 1 -36 -2 -69 -7 -74 -6 -6 -46 -23 -89 -39 l-80 -30 70 -1 69 0 -49 -51 -50 -51 60 27 c33 14 77 37 97 50 l38 25 64 -21 c36 -12 67 -27 70 -34 2 -7 -23 -57 -56 -112 -33 -54 -74 -132 -91 -173 -27 -65 -31 -87 -31 -170 0 -114 19 -164 90 -240 88 -95 194 -138 354 -147 118 -6 206 10 288 50 26 13 75 27 108 30 179 18 293 118 294 258 0 92 -43 107 -103 34 -34 -40 -42 -45 -80 -45 -55 0 -61 6 -76 65 -38 154 -183 246 -362 231 l-79 -6 45 66 c91 133 126 224 126 330 0 43 -6 87 -16 110 -22 55 -99 129 -159 155 -65 28 -164 34 -234 14z m226 -59 c54 -28 94 -69 118 -121 42 -89 27 -190 -49 -322 -42 -76 -56 -84 -95 -57 -25 17 -52 13 -52 -9 0 -7 16 -22 35 -33 l35 -20 -35 -52 c-20 -29 -38 -52 -41 -52 -2 0 -21 7 -41 15 -33 14 -37 14 -49 -2 -12 -16 -8 -20 31 -38 39 -18 43 -22 33 -40 -6 -10 -14 -33 -17 -50 -6 -26 -13 -31 -49 -39 -30 -7 -42 -15 -42 -28 0 -15 8 -18 43 -18 38 0 44 -3 62 -37 29 -53 75 -77 149 -77 98 1 147 36 149 110 2 67 -70 99 -120 52 -29 -27 -29 -65 -1 -95 l21 -23 -49 0 c-106 0 -153 89 -103 196 31 65 55 77 161 82 109 5 165 -9 227 -59 64 -50 95 -119 96 -215 0 -62 -4 -77 -30 -120 -56 -91 -172 -139 -330 -138 -149 1 -265 43 -345 123 -71 72 -85 109 -85 226 0 95 2 104 37 177 20 43 50 97 66 120 43 63 72 124 72 152 0 28 -42 66 -74 66 -32 0 -84 36 -106 72 -50 82 1 192 113 250 75 38 196 40 265 4z m657 -971 c-34 -71 -139 -135 -222 -135 l-23 0 21 40 c12 22 23 57 26 79 l5 39 57 -1 c67 -2 101 16 128 66 l18 32 3 -42 c2 -25 -4 -57 -13 -78z"
            />
            <path
              d="M859 1448 c-25 -20 -30 -46 -13 -63 21 -21 38 -19 71 9 23 20 26 28 17 43 -14 22 -54 28 -75 11z"
            />
          </g>
        </svg>
        <span
          :class="{ active: selectedMenu === 'guide' }"
          class="menu"
          @click="selectedMenu = 'guide'"
          >Guide</span
        >
        <span
          :class="{ active: selectedMenu === 'component' }"
          class="menu"
          @click="selectedMenu = 'component'"
          >Component</span
        >
        <span
          :class="{ active: selectedMenu === 'headless' }"
          class="menu"
          @click="selectedMenu = 'headless'"
          >Headless</span
        >
      </ds-flex>
      <span>Github</span>
    </ds-flex>

    <guide v-show="selectedMenu === 'guide'"></guide>
    <doc v-show="selectedMenu === 'component'"></doc>
    <headless v-show="selectedMenu === 'headless'"></headless>
  </ds-flex>
</template>

<style scoped>
.head {
  border-bottom: 1px solid black;
  padding: 0 12px;
}
.menu {
  cursor: pointer;
}
.menu.active {
  color: blue;
}
.menu:hover {
  color: blue;
  opacity: 0.5;
}
</style>
