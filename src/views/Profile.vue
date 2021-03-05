<template>
    <div>
        <header class="jumbotron">
            <h3>
                <strong>{{currentUser ? currentUser.user_name : 'Loading...'}}</strong> Profile
            </h3>
        </header>
        
        <div v-if="currentUser">
            <p>
                <strong>Token:</strong>
                {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
            </p>
            <p>
                <strong>Id:</strong>
                {{currentUser.id}}
            </p>
            <p>
                <strong>Email:</strong>
                {{currentUser.user.email}}
            </p>
            <strong>Authorities:</strong>
            <ul>
                <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import TokenHelper from '../helpers/token.helper';
export default {
  name: 'Profile',
  data() {
    return {
        currentUser: null
    }
  },
  mounted() {
    this.$store.dispatch('loading/show');

    UserService.getUserProfile().then(
      response => {
        this.currentUser = { ...TokenHelper.getCacheUser(), ...response.data };
        this.$store.dispatch('loading/hide');
      }, error => {
        this.currentUser = null;
        this.$store.dispatch('loading/hide');
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    );
  }
};
</script>