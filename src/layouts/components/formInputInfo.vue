<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="box">

        <b-card title="Info" class="info" v-if="caseInfo">
            <b-container class="mt-3">
                <b-form @submit="infoSave">
                    <b-row >
                        <b-col cols="12" md="6" :key="index" v-for="(item,index) in caseInfo">
                            <b-form-group label-cols="4" label-cols-lg="3" :label="item.label+':'" >
                                <b-form-input
                                    :@change="changeFunc(item.value, index)"
                                    :disabled="item.disabled"
                                    v-if="item.type==='text' || item.type==='emial' || item.type==='number' || item.type==='password'"
                                    :type="item.type" v-model="item.value">
                                </b-form-input>
                                <div v-if="item.type==='date'" class="d-md-flex align-items-center">
                                    <b-form-datepicker
                                        :@context="changeFunc(item.value, index)"
                                        v-model="item.value" :disabled="item.disabled"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="en-US">
                                    </b-form-datepicker>
                                    <!--<span>to</span>-->
                                    <!--<b-form-datepicker-->
                                    <!--v-model="item.value"-->
                                    <!--:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"-->
                                    <!--locale="en-US">-->
                                    <!--</b-form-datepicker>-->
                                </div>
                                <b-form-select
                                    v-if="item.type==='select'" :disabled="item.disabled"
                                    v-model="item.value"
                                    :options="topOption"
                                    placeholder="Please select">
                                </b-form-select>
                                <!--<ASelect v-if="item.type==='select'" :disabled="item.disabled"-->
                                              <!--v-model="item.value"-->
                                              <!--:options="topOption"-->
                                              <!--placeholder="Please select"></ASelect>-->
                                <multiselect v-if="item.type==='multiselect'" :disabled="item.disabled"
                                             v-model="item.value"
                                             label="text"
                                             track-by="value"
                                             :options="topOption"
                                             :multiple="true"
                                             :taggable="true" placeholder="Multiple select" >
                                </multiselect>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hiddenChange ref="myHiddenChange" :defaultData="caseInfo"></hiddenChange>
                    <b-row>
                        <b-col cols="12" class="text-center mt-2">
                            <b-button type="submit" variant="success" class="mr-2">{{$t('Save')}}</b-button>
                            <!--<b-button type="reset" variant="secondary">{{$t('Cancel')}}</b-button>-->
                        </b-col>
                    </b-row>
                </b-form>


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
    import hiddenChange from './hiddenChange';
    import ASelect from "./ASelect";
    export default {
        components: {
            ASelect,
            hiddenChange
        },
        name: "formInputInfo",
        props:{
            studentInfo:{},
            caseInfo:{},
            topOption:{},
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
        computed: {},
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
            if (this.RCAction){this.totalRows = this.RCAction.length;}
        },
        methods: {
            infoSave(){
                // alert("success")
                console.log("保存成功" + this.$refs.myHiddenChange.hidden_testTest);
            },
            changeFunc(item, index) {
                this.$refs.myHiddenChange.watchVal(item,index);
                // if (this.$refs.myHiddenChange.defaultData0[index].value !== item) {
                //     this.$refs.myHiddenChange.watchVal(
                //         this.$refs.myHiddenChange.defaultData0[index].value,
                //         item, this.$refs.myHiddenChange.defaultData0[index].label);
                // }
            },
            info(item, index, button) {
                this.infoModal.title = `Row index: ${index}`
                this.infoModal.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = '';
            },
            deleteRow(item){
                alert(item)
            },

        }
    }
</script>

<style >
    .job table th, .job table td{white-space: nowrap}
</style>
