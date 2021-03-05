<template>
    <b-modal ref="my-modal" size="xl" hide-footer :title="form.id > 0 ? 'Edit Product' : 'Create Product'">
        <div class="d-block">
            <b-form @submit="onSubmit">
                <b-form-group label="Title:" label-for="input-name">
                    <b-form-input id="input-name" name="input-name"
                    v-model="form.name" type="text"
                    placeholder="Enter name"
                    v-validate="'required'"></b-form-input>
                    <div v-if="errors.has('input-name')"
                        class="alert alert-danger" role="alert">Name is required!</div>
                </b-form-group>
                <b-form-group label="Summary:" label-for="input-summary">
                    <b-form-textarea id="input-summary"
                    v-model="form.summary" name="input-summary"
                    v-validate="'required'" rows="3" max-rows="6"
                    placeholder="Enter summary"></b-form-textarea>
                    <div v-if="errors.has('input-summary')"
                        class="alert alert-danger" role="alert">Summary is required!</div>
                </b-form-group>
                <b-form-group label="Content:" label-for="input-content">
                    <b-form-textarea id="input-content"
                    v-model="form.content" name="input-content"
                    v-validate="'required'" rows="5" max-rows="10"
                    placeholder="Enter content"></b-form-textarea>
                    <div v-if="errors.has('input-content')"
                        class="alert alert-danger" role="alert">Content is required!</div>
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
                        <b-form-group label="Author:" label-for="input-author">
                            <b-form-select
                            id="input-author" name="input-author"
                            v-model="form.UserId" :options="authors"
                            v-validate="'required'" text-field="full_name" value-field="id"></b-form-select>
                            <div v-if="errors.has('input-author')"
                                class="alert alert-danger" role="alert">Author is required!</div>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <b-form-group
                            label="View count:" label-for="input-viewcount">
                            <b-form-input id="input-viewcount" name="input-viewcount"
                            v-model="form.view_count" type="number"
                            placeholder="Enter view count"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-sm">
                        <b-form-group
                            label="Like count:" label-for="input-likecount">
                            <b-form-input id="input-likecount" name="input-likecount"
                            v-model="form.like_count" type="number"
                            placeholder="Enter like count"></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <b-form-group label="Price:" label-for="input-price">
                            <b-form-input id="input-price" name="input-price"
                            v-model="form.price" type="number"
                            placeholder="Enter price"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-sm">
                        <b-form-group label="Stock:" label-for="input-stock">
                            <b-form-input id="input-stock" name="input-stock"
                            v-model="form.stock" type="number"
                            placeholder="Enter stock"></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                
                <b-form-group label="Thumbnail:" label-for="input-thumb">
                    <b-form-input id="input-thumb" name="input-thumb"
                    v-model="form.thumb" type="text"
                    placeholder="Enter thumbnail"></b-form-input>
                </b-form-group>
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
          name: '',
          summary: '',
          content: '',
          view_count: 0,
          status: '',
          like_count: 0,
          price: 0,
          stock: 0,
          thumb: '',
          photos: [],
          UserId: 0
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
        productDetail() {
            return this.$store.state.product.product_detail;
        },
        createdProduct() {
            return this.$store.state.product.created_product;
        },
        updatedProduct() {
            return this.$store.state.product.updated_product;
        },
        authors() {
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
                        await this.$store.dispatch('product/updateProduct', this.form);
                    else
                        await this.$store.dispatch('product/createProduct', this.form);
                        
                    this.msg_color = 'text-success';
                    if (is_existed > 0)
                        this.msg = `Product has been updated.`;
                    else
                        this.msg = `Product has been created.`;
                        
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
            this.$store.dispatch('user/list');
            this.form.id = id;
            if (id && id > 0) {
                this.isLoading = true;
                this.$store.dispatch('product/detail', id);
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
                name: data.name,
                content: data.content,
                summary: data.summary,
                status: data.status,
                view_count: data.view_count,
                like_count: data.like_count,
                price: data.price,
                stock: data.stock,
                thumb: data.thumb,
                photos,
                UserId: data.UserId
            }; 
        }
    },
    watch: {
        // whenever question changes, this function will run
        productDetail: function (newProduct) {
            this.setData(newProduct);
            this.isLoading = false;
        },
        
        createdProduct: function (newProduct) {
            this.isLoading = false;
            if (newProduct && newProduct.id)
                this.form.id = newProduct.id;
        }
    }
};
</script>
