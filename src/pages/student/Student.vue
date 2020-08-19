<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="content" class="app-content p-1 bg-white">
        <div>
            <b-tabs card content-class="pt-1" ref="theTab"   v-model="tabIndex">
                <b-tab title="Main"  active >
                    <template>

                        <AgGridForm01 :topSearch="topSearch"
                                      :topOption="topOption"
                                      :searchModel="searchModel"
                                      :tabs="tabs"
                                      :tabCounter="tabCounter"
                                      @messageData="getData"
                                      :columnDefs="columnDefs"
                                      :studentData="studentData">
                        </AgGridForm01>

                    </template>
                </b-tab>
                <b-tab title="Data" v-for="tab in this.tabs" :key=tab.length  ref="'Tab' + tab.i"  active>
                    <template v-slot:title>
                        <strong>{{tab.title}}</strong> <a v-on:click="tabClose(tab.i)"><i class="fa fa-times-circle" ></i></a>
                    </template>
                    <template>
                        <formInputInfo :studentInfo="studentInfo"></formInputInfo>
                    </template>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import AgGridForm01 from "../../layouts/components/AgGridForm"
    import FormInputInfo from "../../layouts/components/formInputInfo"
    export default {
        name: "Student",
        components: {
            FormInputInfo,
            AgGridForm01
        },
        data() {
            return {
                tabs: [],
                tabCounter: 0,
                tabIndex:0,

                topSearch: '',
                topOption:[],
                searchModel:{},
                gridOptions:{},
                rowSelection:null,
                gridApi:null,
                currentPageStudent:'',
                studentInfo:'',
            }
        },
        beforeMount() {
            this.columnDefs = [];
            this.studentData = [];
            this.rowSelection = "multiple";
        },
        methods:{
            getData(val){  //点击单元格获取值
                this.studentInfo = val;
            },
            tabClose:function(x){
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].i === x) {
                        this.tabs.splice(i, 1)
                    }
                }
            },

        },
        mounted() {
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
</style>
