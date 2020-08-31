<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="box">

        <b-card title="Info" class="info">
            <!--<b-container>-->
                <!--<b-row class="border border-bottom-0 border-right-0">-->
                    <!--<b-col cols="12"  md="6" class="border-bottom border-right" v-for="(value,name) in studentInfo" :key="name">-->
                        <!--<b-row>-->
                            <!--<b-col cols="6" md="3" class="border-right"><label class="col-form-label">{{name}} :</label></b-col>-->
                            <!--<b-col cols="6" md="9"><p class="col-form-label">{{value}}</p></b-col>-->
                        <!--</b-row>-->
                    <!--</b-col>-->
                <!--</b-row>-->
            <!--</b-container>-->
            <b-container class="mt-3">
                <b-row class="border border-bottom-0 border-right-0">
                    <b-col cols="12"  md="6" class="border-bottom border-right" v-for="(item,name) in studentInfo" :key="name">
                        <b-row v-if="name==='name'">
                            <b-col cols="6" md="3" class="border-right"><label class="col-form-label">{{name.slice(0,1).toUpperCase() +name.slice(1).toLowerCase()}} :</label></b-col>
                            <b-col cols="6" md="9">
                                <b-button style="background-color: transparent;border: 0;outline: none;padding-left: 0" :pressed.sync="myToggle" class="col-form-label">{{item}}</b-button>
                                <b-form-input v-show="myToggle" class="col-form-label" v-model="studentInfo.name"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row v-else>
                            <b-col cols="6" md="3" class="border-right"><label class="col-form-label">{{name.slice(0,1).toUpperCase() +name.slice(1).toLowerCase()}} :</label></b-col>
                            <b-col cols="6" md="9"><p class="col-form-label">{{item}}</p></b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row v-if="myToggle"><b-col cols="12" class="text-md-right text-center">
                    <b-button variant="success" class="mr-2">Save</b-button>
                    <b-button @click="myToggle=false">cancel</b-button>
                </b-col></b-row>
            </b-container>
        </b-card>

        <b-card title="Job" class="job" v-if="fieldsJob">
            <b-container>
                <b-row >
                    <b-col cols="12">
                        <b-table
                            responsive sort-icon-left no-border-collapse
                            :items="jobData"
                            :fields="fieldsJob" sticky-header="true">
                            <template v-slot:cell(actions)="row">
                                <b-button variant="outline-danger" size="sm" @click="deleteRow(row.item.jobId)">
                                    <i class="fa fa-times"></i>
                                </b-button>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card title="Table" v-if="filesRC">
            <b-container>
                <b-table

                    multi
                    ref="selectableTable"
                    selectable

                    head-variant="light"
                    show-empty sort-icon-left
                    small responsive
                    stacked="md"
                    :items="RCAction"
                    :fields="filesRC"
                    :current-page="currentPage"
                    :per-page="perPage">
                    <template v-slot:cell(actions)="row">
                        <b-button variant="outline-primary" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                            <i class="fa fa-info"></i>
                        </b-button>
                        <b-button variant="outline-success" size="sm" @click="row.toggleDetails" class="mr-1">
                            <i class="fa fa-edit"></i>
                        </b-button>
                        <b-button variant="outline-danger" size="sm" @click="deleteRow(row.item.id)">
                            <i class="fa fa-times"></i>
                        </b-button>
                    </template>
                    <template v-slot:row-details="row">
                        <b-card>
                            <ul>
                                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                            </ul>
                        </b-card>
                    </template>
                </b-table>
                <!--page-->
                <b-row>
                    <b-col sm="4" md="4" class="my-1 d-flex align-items-center">
                        <span class="mr-2 text-nowrap">{{ currentPage * perPage - (perPage - 1) }} - {{ RCAction.length - currentPage * perPage > 0 ? currentPage * perPage : RCAction.length }} of {{RCAction.length}} </span>
                        <b-form-select style="width: 100px"
                            v-model="perPage"
                            id="perPageSelect"
                            size="sm"
                            :options="pageOptions"
                        ></b-form-select>
                        <!--<b-form-group-->
                            <!--label="Per page"-->
                            <!--label-cols="3"-->
                            <!--label-size="sm"-->
                            <!--label-for="perPageSelect"-->
                            <!--class="mb-0">-->
                            <!---->
                        <!--</b-form-group>-->
                    </b-col>
                    <b-col sm="7" md="7" class="my-1 mx-md-4">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            class="my-0"
                        ></b-pagination>
                    </b-col>
                </b-row>
                <!-- Info modal -->
                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                    <pre>{{ infoModal.content }}</pre>
                </b-modal>
            </b-container>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "formInputInfo",
        props:{
            studentInfo:{},
            fieldsJob:{},
            jobData:{},
            filesRC:{},
            RCAction:{}
        },
        data(){
          return{
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15],
              sortBy: '',
              sortDesc: false,
              sortDirection: 'asc',
              filter: null,
              filterOn: [],
              infoModal: {
                  id: 'info-modal',
                  title: '',
                  content: ''
              },
              myToggle:false

          }
        },
        computed: {
            // sortOptions() {
            //     // Create an options list from our fields
            //     return this.fields
            //         .filter(f => f.sortable)
            //         .map(f => {
            //             return { text: f.label, value: f.key }
            //         })
            // },
        },
        watch:{
            currentPage: {
                handler: function(value) {
                    console.log(value);
                }
                // set(val) {   //点击页的时候，请求后台数据，返回相应数据
                //     this.currentPage = val;
                //     this.$axios({
                //       method: 'post',
                //       url:this.GLOBAL.rootPath + '/student/getStudentList',
                //       data:{currentPage:this.currentPage}
                //       //data:{studentName:this.studentName,studentNo:this.studentNo,centerIds:this.centerIds,telephone:this.telephone,centerStatus:this.centerStatus,email:this.email,limit:this.paginationPageSize,start:this.paginationPageSize*(val-1),keyword:this.searchQueryStudentKey}
                //     })
                //       .then(res => {
                //         this.studentData = res.data.data
                //       })
                //       .catch(error => {
                //         console.log(error);
                //       });
                // }
            }
        },
        mounted() {
            if (this.RCAction){
                this.totalRows = this.RCAction.length;
            }
        },
        methods: {
            info(item, index, button) {
                this.infoModal.title = `Row index: ${index}`
                this.infoModal.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = '';
            },
            // onFiltered(filteredItems) {
            //     // Trigger pagination to update the number of buttons/pages due to filtering
            //     this.totalRows = filteredItems.length
            //     this.currentPage = 1
            // },
            deleteRow(item){
                alert(item)
            }
        }
    }
</script>

<style >
    .job table th, .job table td{white-space: nowrap}
</style>
