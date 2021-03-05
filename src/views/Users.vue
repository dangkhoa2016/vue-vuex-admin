<template>
    <div>
        <header class="jumbotron">
            <h3>Users list</h3>
            <button class="btn btn-success btn-sm float-right" @click="createUser">
                <span class="fa fa-plus"></span> Create</button>
        </header>
        <vuetable ref="vuetable"
            :api-url="`${API_URL}/admin/users`"
			:fields="columns"
			:css="css.table" :show-sort-icons="true"
			:per-page="3" pagination-path=""
            :http-options="httpOptions"
			@vuetable:pagination-data="onPaginationData"
            @vuetable:loading="onLoading" @vuetable:loaded="onLoaded">
            <div class="custom-actions" slot="actions" slot-scope="props">
                <div class="table-button-container">
                    <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
                        <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
                    <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                        <span class="glyphicon glyphicon-trash"></span> Delete</button>
                </div>
            </div>
            <div slot="date-slot" slot-scope="props">
                <span v-html="$func.ext_RenderDate(props.rowData.createdAt)"></span>
                <div v-if="props.rowData.updatedAt">
                    <span class="badge badge-primary">
                        <i class="fa fa-cogs"></i> Updated at: <span class="ml-1" v-html="$func.ext_RenderDate(props.rowData.updatedAt)"></span>
                    </span>
                </div>
            </div>
        </vuetable>
		<div style="margin-top:10px">
			<vuetable-pagination ref="pagination" :css="css.pagination"
				class="pull-right" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
		</div>

        <user-form ref="user-form" />

        <b-modal v-model="showConfirmDelete" class="vld-parent" title="Please confirm" @ok="deleteUser">
            <div v-if="msg" class="text-center" :class="msg_color">{{msg}}</div>
            <p v-else class="my-4">Are you sure to delete ?</p>

            <loading :active.sync="isLoading" 
            :can-cancel="false" :is-full-page="false" />
        </b-modal>
    </div>
</template>

<script>
import CssConfig from "../VuetableBootstrap4Config.js";
import authHeader from '../services/auth-header';
import UserForm from '../components/UserForm.vue';

export default {
  name: 'AdminUsers',
  components: {
      UserForm
  },
  data() {
    return {
      API_URL: `${process.env.VUE_APP_API_URL}api`,
      showConfirmDelete: false,
      css: CssConfig,
      isLoading: false,
      currentPage: 1,
      msg: '',
      idToDelete: 0,
      notShowLoading: false,
      columns: [
        {
          name: "user_name",
          title: '<i class="fa text-info fa-user"></i> User Name',
          sortField: "user_name"
        },
        {
          name: "full_name",
          title: '<i class="fa text-warning fa-tag"></i> Full Name',
          sortField: "full_name"
        },
        {
          name: "email",
          title: '<i class="fa fa-envelope"></i> Email',
          sortField: "email"
        },
        {
          name: "date-slot",
          title: '<i class="fa fa-calendar"></i> Date',
          sortField: "updatedAt"
        },
        'actions'
      ],
      httpOptions: { headers: authHeader() }
    };
  },
  computed: {
    createdUser() {
        return this.$store.state.user.created_user;
    },
    updatedUser() {
        return this.$store.state.article.updated_user;
    }
  },
  destroyed() {
    this.$store.dispatch('loading/hide');
  },
  methods: {
    onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
        this.$refs.vuetable.changePage(page);
    },
    onLoading() {
        if (this.notShowLoading === false)
            this.$store.dispatch('loading/show');
    },
    onLoaded() {
        this.notShowLoading = false;
        this.$store.dispatch('loading/hide');
    },
    editRow(rowData) {
        //console.log(rowData);
        this.$refs['user-form'].show(rowData.id);
    },
    deleteRow(rowData) {
        this.idToDelete = rowData.id;
        this.showConfirmDelete = true;
    },
    createUser() {
        this.$refs['user-form'].show();
    },
    deleteUser(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.isLoading = true;
        // eslint-disable-next-line
        this.$store.dispatch('user/deleteUser', this.idToDelete).then(res => {
            this.msg_color = 'text-success';
            this.msg = `User [${this.idToDelete}] has been deleted.`;
                
            this.isLoading = false;

            this.notShowLoading = true;
            this.$refs.vuetable.reload();

            setTimeout(() => {
                this.closeModal();
            }, 4000);
        }).catch(error => {
            this.msg_color = 'text-danger';
            this.msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.isLoading = false;
        });
    },
    closeModal() {
        this.msg = '';
        this.idToDelete = 0;
        this.showConfirmDelete = false;
    }
  },
  watch: {
    // whenever question changes, this function will run
    createdUser: function (newUser) {
        if (newUser && newUser.id) {
            this.notShowLoading = true;
            this.$refs.vuetable.reload();
        }
    },
    updatedUser: function (newUser) {
        if (newUser && newUser.id) {
            this.notShowLoading = true;
            this.$refs.vuetable.reload();
        }
    }
  }
};
</script>
