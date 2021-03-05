<template>
    <b-modal ref="my-modal" size="xl" hide-footer :title="form.id > 0 ? 'Edit User' : 'Create User'">
        <div class="d-block">
            <b-form @submit="onSubmit">
                <b-form-group label="Email address:" label-for="input-email">
                    <b-form-input id="input-email" name="input-email"
                    v-model="form.email" type="email"
                    placeholder="Enter email"
                    v-validate="'required|email'"></b-form-input>
                    <div v-if="errors.has('input-email')"
                        class="alert alert-danger" role="alert">Email is invalid or blank!</div>
                </b-form-group>
                <b-form-group label="Full name:" label-for="input-fullname">
                    <b-form-input id="input-fullname"
                    v-model="form.full_name" type="text"
                    placeholder="Enter full name"></b-form-input>
                </b-form-group>
                <div class="row">
                    <div class="col-sm">
                        <b-form-group label="User name:" label-for="input-username">
                            <b-form-input id="input-username" name="input-username"
                            v-model="form.user_name" type="text"
                            placeholder="Enter user name"
                            v-validate="'required'"></b-form-input>
                            <div v-if="errors.has('input-username')"
                                class="alert alert-danger" role="alert">User name is required!</div>
                        </b-form-group>
                    </div>
                    <div class="col-sm">
                        <b-form-group label="Password:" label-for="input-password">
                            <b-form-input id="input-password" name="input-password"
                            v-model="form.password" type="password"
                            placeholder="Enter password"
                            v-validate="form.id && form.id > 0 ? '' : 'required'"></b-form-input>
                            <div v-if="errors.has('input-password')"
                                class="alert alert-danger" role="alert">Password is required!</div>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <b-form-group label="Status:" label-for="input-status">
                            <b-form-select
                            id="input-status" name="input-status"
                            v-model="form.status" :options="statuses"
                            v-validate="'required'"
                            ></b-form-select>
                            <div v-if="errors.has('input-status')"
                                class="alert alert-danger" role="alert">Status is required!</div>
                        </b-form-group>
                    </div>
                    <div class="col-sm">
                        <b-form-group label="Roles:" v-slot="{ ariaDescribedby }">
                            <b-form-checkbox-group
                                id="user_roles"
                                v-model="form.roles"
                                :options="roleList" text-field="role" value-field="id"
                                :aria-describedby="ariaDescribedby"
                                name="user_roles" stacked></b-form-checkbox-group>
                        </b-form-group>
                    </div>
                </div>
            </b-form>
        </div>

        <loading :active.sync="isLoading" 
            :can-cancel="false" :is-full-page="false" />
        
        <div class="text-center" :class="msg_color" v-if="msg">
            {{msg}}
        </div>
        <div class="text-right">
            <b-button class="mt-3" variant="outline-danger" :disabled="!enableButton" @click="onSubmit">Save</b-button>
            <b-button class="mt-3 ml-3" variant="outline-secondary" @click="closeModal">Close</b-button>
        </div>
    </b-modal>
</template>

<script>
export default {
  data() {
      return {
        msg: '',
        msg_color: '',
        form: {
          id: 0,
          email: '',
          full_name: '',
          user_name: '',
          password: '',
          status: '',
          roles: []
        },
        isLoading: false,
        statuses: [
            { text: 'Select status', value: null },
            { text: 'Active', value: 'active' },
            { text: 'Locked', value: 'locked' },
            { text: 'Pending', value: 'pending' }
        ]
      }
    },
    computed: {
        userDetail() {
            return this.$store.state.user.user_detail;
        },
        roleList() {
            return this.$store.state.role.list;
        },
        createdUser() {
            return this.$store.state.user.created_user;
        },
        updatedUser() {
            return this.$store.state.user.updated_user;
        },
        enableButton() {
            return this.roleList && this.roleList.length > 0;
        }
    },
    mounted() {
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            this.isLoading = true;
            this.$validator.validateAll().then(async (isValid) => {
                if (!isValid) {
                    this.isLoading = false;
                    return;
                }
                
                try {
                    var is_existed = this.form.id > 0;
                    if (is_existed > 0)
                        await this.$store.dispatch('user/updateUser', this.form);
                    else
                        await this.$store.dispatch('user/createUser', this.form);
                        
                    this.msg_color = 'text-success';
                    if (is_existed > 0)
                        this.msg = `User [${this.updatedUser.user_name}] has been updated.`;
                    else
                        this.msg = `User [${this.createdUser.user_name}] has been created.`;
                        
                    this.isLoading = false;
                } catch (err) {
                    this.msg_color = 'text-danger';
                    this.msg = this.handleError(err);
                    this.isLoading = false;
                }

            });
        },
        handleError(error) {
            return (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
        },
        closeModal() {
            this.$refs['my-modal'].hide();
        },
        show(id) {
            this.msg = '';
            this.setData(null);
            this.$store.dispatch('role/list');
            this.form.id = id;
            if (id && id > 0) {
                this.isLoading = true;
                this.$store.dispatch('user/detail', id);
            }

            this.$refs['my-modal'].show();
        },
        setData(data) {
            if (!data)
                data = {};

            this.form = {
                id: this.form.id,
                email: data.email,
                full_name: data.full_name,
                user_name: data.user_name,
                status: data.status,
                roles: (data.roles || []).map(r=>r.id)
            }; 
        }
    },
    watch: {
        // whenever question changes, this function will run
        userDetail: function (newUser) {
            this.setData(newUser);
            this.isLoading = false;
        },
        
        createdUser: function () {
            this.isLoading = false;
        }
    }
};
</script>
