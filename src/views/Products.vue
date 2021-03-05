<template>
    <div>
        <header class="jumbotron">
            <h3>Products list</h3>
            <button class="btn btn-success btn-sm float-right" @click="createProduct">
                <span class="fa fa-plus"></span> Create</button>
        </header>
        <vuetable ref="vuetable"
            :api-url="`${API_URL}/admin/products`"
			:fields="columns" :css="css.table" :show-sort-icons="true"
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

        <product-form ref="product-form" />

        <b-modal v-model="showConfirmDelete" class="vld-parent" title="Please confirm" @ok="deleteProduct">
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
import ProductForm from '../components/ProductForm.vue';

export default {
  name: 'AdminProducts',
  components: {
      ProductForm
  },
  data() {
    return {
      API_URL: `${process.env.VUE_APP_API_URL}api`,
      content: '',
      showConfirmDelete: false,
      css: CssConfig,
      isLoading: false,
      currentPage: 1,
      msg: '',
      idToDelete: 0,
      notShowLoading: false,
      columns: [
        {
          name: "name",
          title: '<i class="fa text-info fa-shield-virus"></i> Name',
          sortField: "name"
        },
        {
          name: "summary",
          title: '<i class="fa text-warning fa-tag"></i> Summary',
          sortField: "summary",
          width: '40%'
        },
        {
          name: "like_count",
          title: '<i class="fa fa-thumbs-up text-primary"></i> Like',
          sortField: "like_count"
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
    createdProduct() {
        return this.$store.state.product.created_product;
    },
    updatedProduct() {
        return this.$store.state.product.updated_product;
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
        this.$refs['product-form'].show(rowData.id);
    },
    deleteRow(rowData) {
        this.idToDelete = rowData.id;
        this.showConfirmDelete = true;
    },
    createProduct() {
        this.$refs['product-form'].show();
    },
    deleteProduct(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.isLoading = true;
        // eslint-disable-next-line
        this.$store.dispatch('product/deleteProduct', this.idToDelete).then(res => {
            this.msg_color = 'text-success';
            this.msg = `Product [${this.idToDelete}] has been deleted.`;
                
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
    createdProduct: function (newProduct) {
        if (newProduct && newProduct.id) {
            this.notShowLoading = true;
            this.$refs.vuetable.reload();
        }
    },
    updatedProduct: function (newProduct) {
        if (newProduct && newProduct.id) {
            this.notShowLoading = true;
            this.$refs.vuetable.reload();
        }
    }
  }
};
</script>
