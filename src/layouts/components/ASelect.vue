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
                                        <b-breadcrumb-item v-for="item of items2" :key="item.key"
                                                           @click="click(item.key)">
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
                                    <ag-grid-vue v-if="count==='1'" style="height: 600px;margin-top:20px;"
                                                 class="ag-theme-alpine"
                                                 :columnDefs="ContactsDefs"
                                                 :rowData="ContactsData" @cellClicked="cellClicked($event)"
                                                 :rowSelection="rowSelection">
                                    </ag-grid-vue>
                                    <ag-grid-vue v-else-if="count==='2'" style="height: 550px;margin-top:20px;"
                                                 class="ag-theme-alpine"
                                                 :columnDefs="ContactsDefs"
                                                 :rowData="ContactsData3" @cellClicked="cellClicked2($event)"
                                                 :rowSelection="rowSelection">
                                    </ag-grid-vue>
                                    <b-row v-if="count==='2'" class="p-2" style="height: 50px;">
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

    export default {
        name: "ASelect",
        components: {
            AgGridVue
        },
        data() {
            return {
                selectData: '',//选择结果
                InterimData: '',//临时选择结果
                hiddenData: [],//选择结果的id
                //全部导航
                items: [
                    {
                        key: '1',
                        name: 'home'
                    },
                    {
                        key: '2',
                        name: 'home2',
                        disabled: true,
                    },
                ],
                items2: [],//当前导航
                searchData: '',//搜索结果
                count: '',//计数
                ContactsDefs: [],//表头
                ContactsData: [],//一级数据
                ContactsData2: [],//二级数据
                ContactsData3: [],//筛选后的二级数据
                gridApi:null,
                currentPageSelect:'',
                rowSelection: 'single',
            }
        },
        computed: {
            paginationPageSize() {    //每页显示多少条数据
                if(this.gridApi){return this.gridApi.paginationGetPageSize();}
                else {return 10;}
            },
            totalPages() {   //总页数
                if(this.gridApi)
                {
                    let paginationGetTotalPages = this.studentData.length;
                    return paginationGetTotalPages
                }
                else return 0
            },
            currentPage: {   //当前页数
                get() {
                    if(this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
                    else return 1
                },
                set(val) {   //点击页的时候，请求后台数据，返回相应数据
                    this.gridApi.paginationGoToPage(val - 1);
                    this.currentPageSelect = val;
                }
            },
        },
        methods: {
            //第一次选择
            cellClicked(e) {
                for (let i = 0; i < this.ContactsData2.length; i++) {
                    if (e.data.number === this.ContactsData2[i].number) {
                        this.ContactsData3.push(this.ContactsData2[i]);
                    }
                }
                this.items2.push(this.items[1]);
                this.hiddenData.length = 0;
                this.hiddenData.push(e.data.id);
                this.items2[1].name = e.data.name;
                this.count = '2';
            },
            //第二次选择
            cellClicked2(e) {
                this.InterimData = this.items2[1].name + '/' + e.data.name;
                this.hiddenData.splice(1, 1);
                this.hiddenData.push(e.data.id);
                alert(this.InterimData);
            },
            //提交
            submit(evt) {
                evt.preventDefault();
                this.selectData = this.InterimData;
                console.log(this.hiddenData);
                this.$refs['ASelect'].hide();
            },
            //查找
            onSearch(e) {
                var evt = window.event || e;
                if (evt.keyCode == 13) {
                    console.log(e);
                    e.preventDefault();
                }
            },
            //点击导航
            click(a) {
                this.ContactsData3 = [];
                this.items2 = [];
                this.items2.push(this.items[0]);
                this.count = '1';
            },

            // onGridReady (params) {
            //     console.log("111");
            //     console.log(params);
            //     // 获取gridApi
            //     this.gridApi = params.api;
            //     this.columnApi = params.columnApi;
            //     // 调整表格列宽大小自适应
            //     this.gridApi.sizeColumnsToFit();
            // }

        },
        mounted() {
            let loader = this.$loading.show({});
            this.$axios.get("./selectlist.json").then(response => {
                this.ContactsDefs = response.data.ContactsDefs;
                this.ContactsData = response.data.ContactsData;
                this.ContactsData2 = response.data.ContactsData2;
                loader.hide();
            });
            this.items2.push(this.items[0]);
            this.count = '1';
        },
    }
</script>

<style scoped>

</style>
