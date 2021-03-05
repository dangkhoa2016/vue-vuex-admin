<template>
    <header class="jumbotron">
        <h3>404</h3>

        <p>{{content}}</p>
    </header>
</template>

<script>
export default {
  name: 'PathNotFound',
  data () {
      return {
          content: 'The path you acess does not exists.'
      }
  },
  methods: {
  },
  mounted() {
  },
};
</script>
