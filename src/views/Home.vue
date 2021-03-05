<template>
    <header class="jumbotron">
        <h3>Dashboard</h3>

        <p>{{content}}</p>
    </header>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  destroyed() {
    this.$store.dispatch('loading/hide');
  },
  mounted() {
    this.$store.dispatch('loading/show');

    UserService.getModeratorBoard().then(
      response => {
        this.content = response.data;
        this.$store.dispatch('loading/hide');
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        this.$store.dispatch('loading/hide');
        if (error.response && error.response.status === 300) {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
      }
    );
  }
};
</script>
