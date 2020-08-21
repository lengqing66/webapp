<template>
    <div class="box">

        <!--top search-->
        <b-card v-show="myToggle" class="mt-3">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-container class="p-2">
                    <b-row>
                        <b-col cols="12" md="6" :key="index" v-for="(item,index) in topSearch">
                            <b-form-group label-cols="4" label-cols-lg="3" :label="item.label+':'">

                                <b-form-input
                                    v-if="item.type==='text' || item.type==='emial' || item.type==='number' || item.type==='password'"
                                    :type="item.type" v-model="formData[item.name]"></b-form-input>

                                <div v-if="item.type==='date'" class="d-flex align-items-center">
                                    <b-form-datepicker
                                        v-model="formData[item.name]"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="en-US">
                                    </b-form-datepicker>
                                    <span>to</span>
                                    <b-form-datepicker
                                        v-model="formData[item.name2]"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="en-US">
                                    </b-form-datepicker>
                                </div>

                                <b-form-select
                                    v-if="item.type==='select'"
                                    v-model="formData[item.name]"
                                    :options="topOption"
                                    placeholder="Please select">
                                </b-form-select>

                                <multiselect v-if="item.type==='multiselect'"
                                             v-model="formData[item.name]"
                                             label="text"
                                             track-by="value"
                                             :options="topOption"
                                             :multiple="true"
                                             :taggable="true" placeholder="Multiple select">
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
            </b-form>
        </b-card>
        <b-card class="mt-3">
            <!--top button-->
            <div class="top-btn mb-3 p-1">
                <b-button :pressed.sync="myToggle" variant="outline-success" size="sm" class="mr-2"><i
                    class="fa fa-search"></i> Advance Search
                </b-button>
                <b-button v-b-modal.modalAddStud variant="outline-primary" size="sm" class="mr-2"><i
                    class="fa fa-plus"></i> Add
                </b-button>
                <!--add student-->
                <b-modal ref="modalAddStud" id="modalAddStud" title="Add Student" hide-footer>
                    <b-form @submit="onAddStudent" @reset="onResetAddForm">
                        <b-row>
                            <b-col cols="12" :key="index" v-for="(item,index) in addStudentEmpty">
                                <b-form-group label-cols="4" label-cols-lg="3" :label="$t(item.label)+' :'">

                                    <b-form-input v-model="formAddStudent[item.label]"
                                                  v-if="item.type==='text' || item.type==='email' || item.type==='number' || item.type==='password'"
                                                  :type="item.type"></b-form-input>

                                    <b-form-radio-group v-model="formAddStudent[item.label]" v-if="item.type==='radio'"
                                                        name="radio-sub-component">
                                        <b-form-radio value="male">Male</b-form-radio>
                                        <b-form-radio value="female">Female</b-form-radio>
                                    </b-form-radio-group>

                                    <b-form-datepicker v-model="formAddStudent[item.label]"
                                                       :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                       v-if="item.type==='date'" locale="en"></b-form-datepicker>

                                    <b-form-select
                                        v-model="formAddStudent[item.label]"
                                        v-if="item.type==='select'"
                                        :options="topOption" placeholder="Please select">
                                    </b-form-select>

                                    <multiselect
                                        v-model="formAddStudent[item.label]"
                                        v-if="item.type==='multiselect'"
                                        label="text"
                                        track-by="value"
                                        :options="topOption"
                                        :multiple="true"
                                        :taggable="true" placeholder="Multiple select">
                                    </multiselect>

                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="p-2">
                            <b-col cols="12" class="text-center">
                                <b-button type="submit" variant="success" class="mr-2">{{$t('Save')}}</b-button>
                                <b-button type="reset" variant="secondary">{{$t('Reset')}}</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-modal>
                <!--add end-->
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
        </b-card>
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
            addStudentEmpty: {}
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
                formData: {}, //存储搜索输入的值
                formAddStudent: {}  //存储添加学生的值
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
            onAddStudent(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.formAddStudent));
                this.$refs['modalAddStud'].hide()
            },
            onResetAddForm(evt) {
                evt.preventDefault();
                this.formAddStudent = {};
            },
            generateFormData() {
                for (var i = 0; i < this.topSearch.length; i++) {
                    this.$set(this.formData, i.name, '');
                }
            },
            onSubmit(evt) {
                evt.preventDefault();
                console.log(this.formData);
            },
            onReset(evt) {
                evt.preventDefault();
                this.formData = {}
                // this.generateFormData()
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
