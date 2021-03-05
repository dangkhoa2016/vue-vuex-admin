<template>
    <b-modal ref="my-modal" size="xl" hide-footer :title="form.id > 0 ? 'Edit Contact' : 'Create Contact'">
        <div class="d-block">
            <b-form @submit="onSubmit">
                <b-form-group label="Full name:" label-for="input-fullname">
                    <b-form-input id="input-fullname" name="input-fullname"
                    v-model="form.full_name" type="text"
                    placeholder="Enter full name"
                    v-validate="'required'"></b-form-input>
                    <div v-if="errors.has('input-fullname')"
                        class="alert alert-danger" role="alert">Full name is required!</div>
                </b-form-group>
                <b-form-group label="Summary:" label-for="input-summary">
                    <b-form-textarea id="input-summary"
                    v-model="form.summary" name="input-summary"
                    v-validate="'required'" rows="3" max-rows="6"
                    placeholder="Enter summary"></b-form-textarea>
                    <div v-if="errors.has('input-summary')"
                        class="alert alert-danger" role="alert">Summary is required!</div>
                </b-form-group>
                
                <div class="row">
                    <div class="col-sm">
                        <b-form-group label="Status:" label-for="input-status">
                            <b-form-select
                            id="input-status" name="input-status"
                            v-model="form.status" :options="statuses"
                            v-validate="'required'"></b-form-select>
                            <div v-if="errors.has('input-status')"
                                class="alert alert-danger" role="alert">Status is required!</div>
                        </b-form-group>
                    </div>
                    <div class="col-sm">
                        <b-form-group label="Processor:" label-for="input-processor">
                            <b-form-select
                            id="input-processor" name="input-processor"
                            v-model="form.processorId" :options="processors"
                            v-validate="'required'" text-field="full_name" value-field="id"></b-form-select>
                            <div v-if="errors.has('input-processor')"
                                class="alert alert-danger" role="alert">Processor is required!</div>
                        </b-form-group>
                    </div>
                </div>

                <b-form-group label="Photos:" label-for="input-photos">
                    <b-input-group :class="index === 0 ? '' : 'mt-2'" v-for="(photo, index) in form.photos" :key="index">
                        <b-form-input v-model="photo.src" placeholder="Enter photo"></b-form-input>
                        <b-input-group-append>
                            <b-button :variant="index === 0 ? 'outline-success' : 'outline-danger'" @click="togglePhoto(index)">{{index === 0 ? 'Add' : 'Remove'}}</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>

            </b-form>
        </div>

        <loading :active.sync="isLoading" 
            :can-cancel="false" :is-full-page="false" />
        
        <div class="text-center" :class="msg_color" v-if="msg">
            {{msg}}
        </div>
        <div class="text-right">
            <b-button class="mt-3" variant="outline-danger" @click="onSubmit">Save</b-button>
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
          full_name: '',
          summary: '',
          status: '',
          processorId: 0,
          photos: []
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
        contactDetail() {
            return this.$store.state.contact.contact_detail;
        },
        createdContact() {
            return this.$store.state.contact.created_contact;
        },
        updatedContact() {
            return this.$store.state.contact.updated_contact;
        },
        processors() {
            return this.$store.state.user.list;
        }
    },
    mounted() {
    },
    methods: {
        togglePhoto(index) {
            if (index)
                this.form.photos.splice(index, 1);
            else
                this.form.photos.push({src: ''});
        },
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
                        await this.$store.dispatch('contact/updateContact', this.form);
                    else
                        await this.$store.dispatch('contact/createContact', this.form);
                        
                    this.msg_color = 'text-success';
                    if (is_existed > 0)
                        this.msg = `Contact has been updated.`;
                    else
                        this.msg = `Contact has been created.`;
                        
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
            this.form.id = id;
            this.$store.dispatch('user/list');

            if (id && id > 0) {
                this.isLoading = true;
                this.$store.dispatch('contact/detail', id);
            }

            this.$refs['my-modal'].show();
        },
        setData(data) {
            if (!data)
                data = {};
            var photos = data.photos ? (typeof data.photos === 'string' ? JSON.parse(data.photos) : data.photos) : [];
            if (photos.length === 0)
                photos.push({src: ''});
            photos = photos.map(photo => {
                return typeof photo === 'string' ? {src: photo} : photo
            });

            this.form = {
                id: this.form.id,
                full_name: data.full_name,
                summary: data.summary,
                status: data.status,
                processorId: data.processorId,
                photos
            }; 
        }
    },
    watch: {
        // whenever question changes, this function will run
        contactDetail: function (newContact) {
            this.setData(newContact);
            this.isLoading = false;
        },
        
        createdContact: function (newContact) {
            this.isLoading = false;
            if (newContact && newContact.id)
                this.form.id = newContact.id;
        }
    }
};
</script>
