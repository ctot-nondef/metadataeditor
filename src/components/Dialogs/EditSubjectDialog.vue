<template lang="html">
  <!-- store deletion -->
  <v-dialog fullscreen transition="dialog-bottom-transition" v-model="$store.state.dialogs[name].status">
    <v-card>
      <v-card-text color="primary">
        <formfromschemaedit v-if="$store.state.dialogs[name].status" v-model="data" uniqueName="edit">
        </formfromschemaedit>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

import formfromschemaedit from '../FormFromSchema_edit';
import HELPERS from '../../helpers';

export default {
  data() {
    return {
      name: 'editsubjectdialog',
      data: {},
      type: {},
    };
  },
  components: {
    formfromschemaedit,
  },
  mounted() {
  },
  props: {
    dialog: {
      default: false,
    },
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('dialogs', [
      'closeDialog',
    ]),
  },
  computed: {
    query() {
      return this.$store.state.dialogs[this.name].query;
    },
    status() {
      return this.$store.state.dialogs[this.name].status;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
