<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="content" class="app-content">
        <div>
            <b-tabs card content-class="" ref="theTab" v-model="tabIndex">
                <b-tab title="Main"  active >
                    <template>
                        <!--content-->
                        <AgGridForm01 :topSearch="topSearch"
                                      :topOption="topOption"
                                      :searchModel="searchModel"
                                      :tabs="tabs"
                                      :tabCounter="tabCounter"
                                      @messageData="getData"
                                      @tabIndex="tabIndexData"
                                      :columnDefs="columnDefs"
                                      :addStudentEmpty="addStudentEmpty"
                                      :studentData="studentData">
                        </AgGridForm01>
                    </template>
                </b-tab>
                <b-tab @click="tabTranslateId(tab.id)" title="Data" v-for="tab in this.tabs" :key=tab.length  ref="'Tab' + tab.i"  active>
                    <template v-slot:title>
                        <strong>{{tab.title}}</strong> <a v-on:click="tabClose(tab.i)"><i class="fa fa-times-circle" ></i></a>
                    </template>
                    <template>
                        <!--content-->
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
                searchModel: {},
                gridOptions:{},
                rowSelection:null,
                gridApi:null,
                currentPageStudent:'',
                studentInfo: '',
                addStudentEmpty: ''
            }
        },
        beforeMount() {
            this.columnDefs = [];
            this.studentData = [];
            this.rowSelection = "multiple";
        },
        methods:{
            getData(val) {  //点击单元格获取值
                this.studentInfo = val;
            },
            tabIndexData(val) {  //获取下标的值
                this.tabIndex = val;
            },
            tabClose:function(x){
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].i === x) {
                        this.tabs.splice(i, 1)
                    }
                }
            },
            tabTranslateId(id){
                console.log(id);
            }
        },
        mounted() {
            let loader = this.$loading.show({});
            this.$axios.get("./studentlist.json").then(response => {
                this.topSearch = response.data.topSearch;
                this.studentData = response.data.studentData;
                this.columnDefs = response.data.columnDefs;
                this.addStudentEmpty = response.data.addStudentEmpty;
                loader.hide();
            });
            this.$axios.get("./standardOption.json").then(response => {
                this.topOption = response.data.topOption;
                loader.hide();
            });
        }

    }
</script>

