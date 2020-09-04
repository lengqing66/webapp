<template>
    <div id="content" class="app-content">
        <b-row>
            <b-col cols="12">
                <b-form-group label-cols="4" label-cols-lg="3" :label="$t('ASelect.name') +':'">
                    <input type="hidden" v-model="hiddenData" id="hidden2">
                    <b-form-input v-b-modal.ASelect v-model="selectData" id="myModal"/>
                </b-form-group>

                <b-modal ref="ASelect" id="ASelect" size="lg" :title="$t('ASelect.select')" hide-footer>
                    <template>
                        <div style="width:750px">
                            <div style="height:50px">
                                <div style="float: left;margin-top:10px;margin-left:20px">
                                    <b-breadcrumb>
                                        <b-breadcrumb-item v-for="item of items" :key="item.key"
                                                           @click="click(item.key,item.floor)">
                                            {{item.name}}
                                        </b-breadcrumb-item>
                                    </b-breadcrumb>
                                </div>
                                <div style="float: right;margin-top:7px;margin-right:20px">
                                    <b-nav-form>
                                        <b-form-input v-model="searchData" @keydown="onSearch()"></b-form-input>
                                    </b-nav-form>
                                </div>
                            </div>
                            <div>
                                <b-form @submit="submit">
                                    <ag-grid-vue style="height: 517px;margin-top:20px;"
                                                 @grid-ready="onGridReady"
                                                 class="ag-theme-alpine" :gridOptions="gridOptions"
                                                 :columnDefs="ContactsDefs"
                                                 :rowData="CurrentData" @cellClicked="cellClicked($event)"
                                                 :defaultColDef="defaultColDef" :animateRows="true"
                                                 :frameworkComponents="frameworkComponents" :rowSelection="rowSelection"
                                                 :pagination="true" :suppressPaginationPanel="true"
                                                 :paginationPageSize="paginationPageSize">
                                    </ag-grid-vue>
                                    <div class="mt-3" style="position: relative;">
                                        <div class="d-md-flex align-items-center setPagSize">
                                            <span class="ml-2 mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ CurrentData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : CurrentData.length }} of {{CurrentData.length}} </span>
                                            <b-dropdown size="sm" class="drown-page-size">
                                                <b-dropdown-item @click="gridApi.paginationSetPageSize(5)">
                                                    <span>5</span>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                                                    <span>10</span>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                                    <span>20</span>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                                    <span>50</span>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                                    <span>100</span>
                                                </b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                        <b-pagination class="mb-0" align="center" v-model="currentPage"
                                                      :total-rows="totalPages"
                                                      :per-page="paginationPageSize"></b-pagination>
                                    </div>

                                    <b-row class="p-2" style="height: 50px;">
                                        <b-col cols="12" class="text-center">
                                            <b-button type="submit" variant="success" class="mr-2">{{$t('Select')}}
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </div>
                        </div>
                    </template>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import TranslationCellRenderer from '../../common/plugins/TranslationCellRenderer'

    export default {
        name: "ASelect",
        components: {
            AgGridVue,
        },
        data() {
            return {
                selectData: '',//选择结果
                InterimData: [],//临时选择结果
                hiddenData: [],//选择结果的id
                items: [],//全部导航
                searchData: '',//搜索结果
                ContactsDefs: [],//表头
                ContactsData: [],//全部数据
                CurrentData: [],//当前数据
                rowSelection: 'single',//单选
                floor: '1',//层数

                gridOptions: {},
                gridApi: null,
                currentPageStudent: '',
                frameworkComponents: {agColumnHeader: TranslationCellRenderer},
                defaultColDef: {
                    editable: true,//单元表格是否可编辑
                    enableRowGroup: true,
                    enablePivot: true,
                    enableValue: true,
                    sortable: true, //开启排序
                   resizable: true,//是否可以调整列大小，就是拖动改变列大小
                   filter: true  //开启刷选
                },
            }
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
            totalPages() {   //总页数
                if (this.gridApi) {
                    let paginationGetTotalPages = this.CurrentData.length;
                    return paginationGetTotalPages;
                }
                else return 0;
            },
            currentPage: {   //当前页数
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
                    else return 1;
                },
                set(val) {   //点击页的时候，请求后台数据，返回相应数据
                    this.gridApi.paginationGoToPage(val - 1);
                    this.currentPageStudent = val;
                }
            },
        },
        methods: {
            //点击表格
            cellClicked(e) {
                this.InterimData.length = this.floor - 1;
                this.hiddenData.length = this.floor - 1;
                if (e.data.child) {
                    this.floor++;
                    this.items.push({key: e.data.id, floor: this.floor, name: e.data.name});
                    this.InterimData.push(e.data.name);
                    this.hiddenData.push(e.data.id);
                    this.CurrentData = e.data.child;
                } else {
                    this.InterimData.push(e.data.name);
                    this.hiddenData.push(e.data.id);
                }
            },
            //提交
            submit(evt) {
                evt.preventDefault();
                this.selectData = '';
                for (let i = 0; i < this.InterimData.length; i++) {
                    if (i === this.InterimData.length - 1) {
                        this.selectData = this.selectData + this.InterimData[i];
                    }
                    else {
                        this.selectData = this.selectData + this.InterimData[i] + '/';
                    }
                }
                console.log(this.hiddenData);
                this.$refs['ASelect'].hide();
            },
            // //查找
            onSearch(e) {
                var evt = window.event || e;
                if (evt.keyCode == 13) {
                    console.log(e);
                    e.preventDefault();
                }
            },
            //点击导航
            click(key, floor) {
                if (floor === '1') {
                    this.CurrentData = this.ContactsData;
                    this.items.length = floor;
                    this.floor = floor;
                } else if (this.floor === floor) {
                } else {
                    let result = [];
                    result = this.ContactsData.filter(item => {
                        return item.id === key;
                    })
                    if (result !== []) {
                        this.CurrentData = result[0].child;
                        this.items.length = floor;
                        this.floor = floor;
                    }
                }
            },
            onPageSizeChanged(newPageSize) {
                var value = document.getElementById('page-size').value;
                this.gridApi.paginationSetPageSize(Number(value));
            },
            onGridReady(){
                this.gridApi = this.gridOptions.api;
            }
        },
        mounted() {
            let loader = this.$loading.show({});
            this.$axios.get("./selectlist.json").then(response => {
                this.ContactsDefs = response.data.ContactsDefs;
                this.ContactsData = response.data.ContactsData;
                this.CurrentData = this.ContactsData;
                loader.hide();
            });
            this.items.push({key: '0', floor: this.floor, name: 'home'});
        },
    }
</script>

<style scoped>

</style>
