<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>Vue</a>
      <div class="navbar-nav mr-auto" v-if="currentUser">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin || isUserManager">
          <router-link to="/users" class="nav-link">Users</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin || isArticleManager">
          <router-link to="/articles" class="nav-link">Articles</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin || isContactManager">
          <router-link to="/contacts" class="nav-link">Contacts</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin || isProductManager">
          <router-link to="/products" class="nav-link">Products</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.user_name }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container-fluid vld-parent">
      <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="false"></loading>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    isLoading: {
        // getter
        get: function () {
            return this.$store.state.loading.status
        },
        // setter
        set: function (newValue) {
            if (newValue)
                this.$store.dispatch('loading/show');
            else
                this.$store.dispatch('loading/hide');
        }
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
        return this.currentUser.roles.some(role => {
            return role.role === 'ADMIN'
        });
    },
    isUserManager() {
        return this.currentUser.roles.some(role => {
            return role.role === 'USER'
        });
    },
    isProductManager() {
        return this.currentUser.roles.some(role => {
            return role.role === 'PRODUCT'
        });
    },
    isContactManager() {
        return this.currentUser.roles.some(role => {
            return role.role === 'CONTACT'
        });
    },
    isArticleManager() {
        return this.currentUser.roles.some(role => {
            return role.role === 'ARTICLE'
        });
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    onCancel(e) {
        console.log('onCancel', e)
    }
  }
};
</script>
