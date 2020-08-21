<template>
    <div class="box">
        <!--top serach-->
        <!--<b-form v-show="myToggle" @submit="onSubmit" @reset="onReset">-->
        <!--<b-container class="p-2">-->
        <!--<b-row :key="index" v-for="(item,index) in topSearch">-->
        <!--<b-col cols="12" md="6">-->
        <!--<b-form-group label-cols="4" label-cols-lg="2" :label="$t(item.label1)+' :'" >-->
        <!--<b-form-input type="text" v-model="searchModel.input1"></b-form-input>-->
        <!--</b-form-group>-->
        <!--</b-col>-->
        <!--<b-col cols="12" md="6">-->
        <!--<b-form-group label-cols="4" label-cols-lg="2" :label="$t(item.label2)+' :'" >-->
        <!--<b-form-input type="text" v-model="searchModel.input2"></b-form-input>-->
        <!--</b-form-group>-->
        <!--</b-col>-->
        <!--<b-col cols="12" md="6">-->
        <!--<b-form-group label-cols="4" label-cols-lg="2" :label="$t(item.label3)+' :'" >-->
        <!--<multiselect v-model="searchModel.input3" label="name" track-by="id" :options="topOption" :multiple="true" :taggable="true" ></multiselect>-->
        <!--</b-form-group>-->
        <!--</b-col>-->
        <!--<b-col cols="12" md="6">-->
        <!--<b-form-group label-cols="4" label-cols-lg="2" :label="$t(item.label4)+' :'" >-->
        <!--<b-form-input type="number" v-model="searchModel.input4"></b-form-input>-->
        <!--</b-form-group>-->
        <!--</b-col>-->
        <!--</b-row>-->
        <!--<b-row>-->
        <!--<b-col cols="12">-->
        <!--<b-button type="submit" variant="success" class="mr-2">{{$t('Search')}}</b-button>-->
        <!--<b-button type="reset" variant="secondary">{{$t('Reset')}}</b-button>-->
        <!--</b-col>-->
        <!--</b-row>-->
        <!--</b-container>-->
        <!--<hr class="m-0">-->
        <!--</b-form>-->

        <b-form v-show="myToggle" @submit="onSubmit" @reset="onReset">
            <b-container class="p-2">
                <b-row>
                    <b-col cols="12" md="6" :key="index" v-for="(item,index) in topSearch">
                        <b-form-group label-cols="4" label-cols-lg="2" :label="$t(item.label)">
                            <b-form-input
                                v-if="item.type==='text' || item.type==='emial' || item.type==='number' || item.type==='password'"
                                :type="item.type" v-model="formData[item.name]"></b-form-input>
                            <multiselect v-if="item.type==='select'"
                                         v-model="formData[item.name]"
                                         label="name"
                                         track-by="id"
                                         :options="topOption"
                                         :multiple="true"
                                         :taggable="true">
                            </multiselect>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-button type="submit" variant="success" class="mr-2">{{$t('Search')}}</b-button>
                        <b-button type="reset" variant="secondary">{{$t('Reset')}}</b-button>
                    </b-col>
                </b-row>
            </b-container>
            <hr class="m-0">
        </b-form>

        <!--top button-->
        <div class="top-btn mb-3 mt-3">
            <b-button :pressed.sync="myToggle" variant="outline-success" size="sm" class="mr-2"><i
                class="fa fa-search"></i> Advance Search
            </b-button>
            <b-button @click="addStudent" variant="outline-primary" size="sm" class="mr-2"><i class="fa fa-plus"></i>
                Add
            </b-button>
            <b-button variant="outline-danger" size="sm" class="mr-2"><i class="fa fa-minus"></i> Remove</b-button>
            <b-nav-form style="float:right">
                <b-form-input v-model="searchQueryStudentKey" @keydown="updateSearchQueryStudent"
                              :placeholder="$t('Search')"></b-form-input>
            </b-nav-form>
        </div>
        <!--form Data-->
        <ag-grid-vue class="ag-theme-alpine" :gridOptions="gridOptions"
                     :rowSelection="rowSelection" :columnDefs="columnDefs" :rowData="studentData"
                     @cellClicked="cellClicked"
                     :animateRows="true" :pagination="true"
                     :frameworkComponents="frameworkComponents"
                     :paginationPageSize="paginationPageSize">
        </ag-grid-vue>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import TranslationCellRenderer from '../../common/plugins/TranslationCellRenderer'   //翻译
    export default {
        name: "AgGridForm",
        props: {
            topSearch: {},
            topOption: {},
            searchModel: {},
            columnDefs: {},
            studentData: {},
            tabs: {},
        },
        components: {
            AgGridVue,
        },
        data() {
            return {
                gridOptions: {},
                rowSelection: null,
                frameworkComponents: {agColumnHeader: TranslationCellRenderer},
                gridApi: null,
                currentPageStudent: '',
                studentInfo: '',
                myToggle: false,
                searchQueryStudentKey: '',
                tabCounter: 0,
                formData: {}
            }
        },
        beforeMount() {
            this.rowSelection = "multiple";
        },
        computed: {
            paginationPageSize() {    //每页显示多少条数据
                if (this.gridApi) {
                    return this.gridApi.paginationGetPageSize();
                }
                else {
                    return 10;
                }
            },
            currentPage: {   //当前页数
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {   //点击页的时候，请求后台数据，返回相应数据
                    this.gridApi.paginationGoToPage(val - 1);
                    this.currentPageStudent = val;
                }
            },
        },
        methods: {
            addStudent() {   //Add student
                this.tabs.push({title: 'Add Student', i: this.tabCounter++, index: this.tabIndex});
            },
            cellClicked() {  //click row
                var selectRow = this.gridApi.getSelectedRows();
                this.studentInfo = selectRow[0];
                this.$emit('messageData', this.studentInfo);
                this.$emit('tabsData', this.tabs);
                var studentName = selectRow[0].name;
                this.tabs.push({title: studentName, i: this.tabCounter++, index: this.tabIndex});
            },
            // onSubmit(evt) {
            //     evt.preventDefault();
            //     alert(JSON.stringify(this.searchModel))
            // },
            // onReset(evt) {
            //     evt.preventDefault();
            //     this.searchModel.input1 = '';
            //     this.searchModel.input2 = '';
            //     this.searchModel.input3 = '';
            //     this.searchModel.input4 = '';
            // },
            generateFormData() {
                for (var i = 0; i < this.topSearch.length; i++) {
                    this.$set(this.formData, i.name, '');
                }
                // this.topSearch.forEach((obj) => {
                //     this.$set(this.formData, obj.name, '');
                // });
            },

            onSubmit(evt) {
                evt.preventDefault();
                console.log(this.formData);
            },
            onReset(evt) {
                evt.preventDefault();
                this.generateFormData()
            },
            updateSearchQueryStudent() {    //keyword search
                console.log(this.searchQueryStudentKey)
            }
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.generateFormData();
        }
    }
</script>

<style scoped>
    .ag-theme-alpine {
        height: 536px
    }
</style>
