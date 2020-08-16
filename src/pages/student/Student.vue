<template>

    <div id="content" class="app-content p-1 bg-white">
        <div>
            <b-tabs card content-class="pt-1" ref="theTab"   v-model="tabIndex">
                <b-tab title="Main"  active >
                    <template>
                        <div class="wrap">
                            <div class="container">
                                <!--top serach-->
                                <form01 :topSearch="topSearch" :topOption="topOption"></form01>
                                <ag-grid-vue class="ag-theme-alpine" :gridOptions="gridOptions"
                                             :rowSelection="rowSelection" :columnDefs="columnDefs"
                                             :rowData="studentData" @cellClicked="cellClicked"
                                             :animateRows="true" :pagination="true"
                                             :paginationPageSize="paginationPageSize">
                                </ag-grid-vue>
                            </div>
                        </div>
                    </template>
                </b-tab>
                <b-tab title="Data" v-for="tab in this.tabs" :key=tab.length  ref="'Tab' + tab.i"  active>
                    <template v-slot:title>
                        <strong>{{tab.title}}</strong> <a v-on:click="tabClose(tab.i)"><i class="fa fa-times-circle" ></i></a>
                    </template>
                    <formInputInfo :studentInfo="studentInfo"></formInputInfo>
                </b-tab>
            </b-tabs>
        </div>

    </div>

</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import Form01 from "../../layouts/components/form01"
    import FormInputInfo from "../../layouts/components/formInputInfo"
    export default {
        name: "Student",
        components: {
            AgGridVue,
            Form01,
            FormInputInfo
        },
        data() {
            return {
                tabs: [],
                tabCounter: 0,
                tabIndex:0,

                topSearch: '',
                topOption:[],
                gridOptions:{},
                rowSelection:null,
                gridApi:null,
                currentPageStudent:'',
                studentInfo:''
            }
        },
        beforeMount() {
            this.columnDefs = [];
            this.studentData = [];
            this.rowSelection = "multiple";
        },
        computed: {
            paginationPageSize() {    //每页显示多少条数据
                if(this.gridApi){return this.gridApi.paginationGetPageSize();}
                else {return 10;}
            },
            currentPage: {   //当前页数
                get() {
                    if(this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {   //点击页的时候，请求后台数据，返回相应数据
                    this.gridApi.paginationGoToPage(val - 1);
                    this.currentPageStudent = val;
                }
            },
        },
        methods:{
            cellClicked(){  //click row
                var selectRow = this.gridApi.getSelectedRows();
                this.studentInfo = selectRow[0];
                console.log(this.studentInfo);
                var studentName = selectRow[0].name;
                this.tabs.push( {title: studentName, i: this.tabCounter++, index: this.tabIndex});
            },
            tabClose:function(x){
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].i === x) {
                        this.tabs.splice(i, 1)
                    }
                }
            }
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.$axios.get("./studentlist.json").then(response => {
                this.topSearch = response.data.topSearch;
                this.studentData = response.data.studentData;
                this.columnDefs = response.data.columnDefs;
            });
            this.$axios.get("./standardOption.json").then(response => {
                this.topOption = response.data.topOption;
            });
        }

    }
</script>


<style scoped>
    .ag-theme-alpine{height: 500px}
</style>
