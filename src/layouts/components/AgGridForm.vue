<template >
    <div class="box">
        <!--top search-->
        <b-card title="Search" v-show="myToggle">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-container>
                    <b-row >
                        <b-col cols="12" md="6" :key="index" v-for="(item,index) in topSearch">
                            <b-form-group label-cols="4" label-cols-lg="3" :label="item.label+':'" >

                                <b-form-input v-if="item.type==='text' || item.type==='emial' || item.type==='number' || item.type==='password'" :type="item.type" v-model="formData[item.name]"></b-form-input>

                                <div v-if="item.type==='date'" class="d-flex align-items-center">
                                    <b-form-datepicker
                                        v-model="formData[item.name]"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="en-US">
                                    </b-form-datepicker><span>to</span>
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
                                             :taggable="true" placeholder="Multiple select" >
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
        <b-card title="Case">
            <!--top button-->
            <div class="top-btn mb-3 p-1">
                <b-button  v-b-modal.modalAddStud variant="outline-primary" size="sm" class="mr-2"><i class="fa fa-plus"></i> Add</b-button>
                <!--add student-->
                <b-modal ref="modalAddStud" id="modalAddStud" size="lg" title="Add Student" hide-footer>
                    <b-form @submit="onAddStudent" @reset="onResetAddForm">
                        <b-row>
                            <b-col cols="12" :key="index" v-for="(item,index) in addStudentEmpty">
                                <b-form-group label-cols="4" label-cols-lg="3" :label="$t(item.label)+' :'" >

                                    <b-form-input v-model="formAddStudent[item.label]" v-if="item.type==='text' || item.type==='email' || item.type==='number' || item.type==='password'" :type="item.type" ></b-form-input>

                                    <b-form-radio-group v-model="formAddStudent[item.label]" v-if="item.type==='radio'"   name="radio-sub-component">
                                        <b-form-radio value="male">Male</b-form-radio>
                                        <b-form-radio value="female">Female</b-form-radio>
                                    </b-form-radio-group>

                                    <b-form-datepicker v-model="formAddStudent[item.label]" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-if="item.type==='date'" locale="en"></b-form-datepicker>

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
                                        :taggable="true" placeholder="Multiple select" >
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
                <!--remove end-->
                <b-button v-b-modal.modalRemoveStud :disabled="showhideRemove" variant="outline-danger" size="sm" class="mr-2"><i class="fa fa-minus"></i> Remove</b-button>
                <b-modal ref="modalRemoveStud" id="modalRemoveStud" title="Remove Student" hide-footer>
                    <b-row>
                        <b-col cols="12">
                            <p>Are you sure delete ?</p>
                        </b-col>
                        <b-col cols="12" class="text-center">
                            <b-button @click="handleDelete" variant="success" class="mr-2">Delete</b-button>
                            <b-button @click="$refs['modalRemoveStud'].hide()" variant="danger">Cancel</b-button>
                        </b-col>
                    </b-row>
                </b-modal>
                <!--import-->
                <input type="file" id="importExcelDataFile" class="d-none" ref="uploadFileInput" @change="importTable" accept="file/*">
                <b-button variant="outline-info" size="sm" class="mr-2"  @click="$refs.uploadFileInput.click()"><i class="fa fa-upload"></i> {{$t('Import')}}</b-button>
                <!--点击复选框显示选择全部页面还是当前页面radio--进行删除-->
                <ul class="check-all-currentPage" v-if="radioAllCurrent" @change="clickRadio" :style="currentAndAll"
                    style="position: absolute;left: 50%;transform: translateX(-50%);top: 3%;list-style: none">
                    <li class="mr-3">
                        <b-form-radio name="currentAll" value="Current" v-model="radios1">{{$t('Select current records')}} (<span id="currentRecordNumber"></span>) </b-form-radio>
                    </li>
                    <li>
                        <b-form-radio name="currentAll" value="All" v-model="radios1">{{$t('Select all records')}} (<span id="allRecordNumber"></span>)</b-form-radio>
                    </li>
                </ul>
                <b-button :pressed.sync="myToggle" variant="outline-success" size="sm" class="mr-2"><i class="fa fa-search"></i> Advance Search</b-button>
                <b-nav-form style="float:right">
                    <b-form-input v-model="searchQueryStudentKey" @keydown="updateSearchQueryStudent"  :placeholder="$t('Search')"></b-form-input>
                </b-nav-form>
            </div>
            <!--form Data-->
            <ag-grid-vue class="ag-theme-alpine" :gridOptions="gridOptions"
                         :rowSelection="rowSelection" :columnDefs="columnDefs" :rowData="studentData"
                         @cellClicked="cellClicked"
                         :animateRows="true" :pagination="true"
                         :frameworkComponents="frameworkComponents"
                         @selection-changed="onSelectionChanged"
                         :suppressPaginationPanel="true"
                         :paginationPageSize="paginationPageSize">
            </ag-grid-vue>

            <!--<div style="position:absolute;bottom: 18px">-->
                <!--<div class="example-header">-->
                    <!--<label class="mr-2">Page Size:</label>-->
                    <!--<select v-on:change="onPageSizeChanged()" id="page-size">-->
                        <!--<option value="5" >5</option>-->
                        <!--<option value="10" selected="">10</option>-->
                        <!--<option value="20">20</option>-->
                        <!--<option value="50">50</option>-->
                        <!--<option value="100">100</option>-->
                        <!--<option value="200">200</option>-->
                    <!--</select>-->
                <!--</div>-->
            <!--</div>-->

            <div class="mt-3" style="position: relative;">
                <div class="d-flex align-items-center" style="border-radius:3px;border: 1px solid #c9d2e3;position: absolute">
                    <span class="ml-2 mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ studentData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : studentData.length }} of {{studentData.length}} </span>
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
                <b-pagination class="mb-0"  align="center" v-model="currentPage" :total-rows="totalPages" :per-page="paginationPageSize"></b-pagination>
            </div>

        </b-card>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import TranslationCellRenderer from '../../common/plugins/TranslationCellRenderer'   //翻译
    export default {
        name: "AgGridForm",
        props:{
            topSearch:{},
            topOption:{},
            searchModel:{},
            columnDefs:{},
            studentData:{},
            tabs:{},
            addStudentEmpty:{}
        },
        components: {
            AgGridVue,
        },
        data() {
            return {
                gridOptions:{},
                rowSelection:null,
                frameworkComponents:{agColumnHeader:TranslationCellRenderer},
                gridApi:null,
                currentPageStudent:'',
                studentInfo:'',
                myToggle:false,
                searchQueryStudentKey:'',
                tabCounter:0,
                formData:{}, //存储搜索输入的值
                formAddStudent:{},  //存储添加学生的值
                showhideRemove:true,  //remove按鈕可操作否
                radioAllCurrent: true, //選擇當前頁還是全部頁
                radios1: 'Current',
                selectMainRecords:'0',
                currentAndAll:{display:'none!important',},
                curPageSize:''
            }
        },
        beforeMount() {
            this.rowSelection = "multiple";
        },
        computed: {
            paginationPageSize() {    //每页显示多少条数据
                if(this.gridApi){return this.gridApi.paginationGetPageSize();}
                else {return 10;}
            },
            totalPages() {   //总页数
                if(this.gridApi)
                {
                    let paginationGetTotalPages = this.studentData.length
                    //% this.gridApi.paginationGetPageSize() === 0 ? this.studentData.length / this.gridApi.paginationGetPageSize() : Math.ceil(this.studentData.length / this.gridApi.paginationGetPageSize()) ;
                    return paginationGetTotalPages
                }
                else return 0
                // if(this.gridApi) return this.gridApi.paginationGetTotalPages()
                // else return 0
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
                this.$emit('messageData',this.studentInfo);
                this.$emit('tabsData',this.tabs);
                var studentName = selectRow[0].name;
                this.tabs.push( {title: studentName, i: this.tabCounter++, index: this.tabIndex});
            },
            onPageSizeChanged(newPageSize) {
                var value = document.getElementById('page-size').value;
                this.gridApi.paginationSetPageSize(Number(value));
            },
            onAddStudent(evt) {  //add Save
                evt.preventDefault();
                alert(JSON.stringify(this.formAddStudent));
                this.$refs['modalAddStud'].hide()
            },
            onResetAddForm(evt) {  //add Reset
                evt.preventDefault();
                this.formAddStudent = {};
            },
            generateFormData() {  //输入的搜索值
                for (var i = 0; i < this.topSearch.length; i++){
                    this.$set(this.formData, i.name,'');
                }
            },
            onSubmit(evt) {  //搜索
                evt.preventDefault();
                console.log(this.formData);
            },
            onReset(evt) {  //重置搜索框
                evt.preventDefault();
                this.formData = {}
            },
            updateSearchQueryStudent(){    //keyword search
                console.log(this.searchQueryStudentKey)
            },
            handleDelete(){  //confirm remove
                alert("delete");
                this.$refs['modalRemoveStud'].hide();
                //     this.axios({
                //         method: 'post',
                //         url:this.GLOBAL.rootPath + '/consultant/deleteLead',
                //         data:{leads:this.leads,selectMainRecords:this.selectMainRecords,name:this.name,source:this.source,keyword:this.searchQuery}
                //     })
                //         .then(res => {
                //             console.log(res.data);
                //             if (res.data.success === true) {
                //                 alert(this.$t('delete success'));
                //                 this.reload()  //直接调用this.reload()刷新页面
                //             }else{
                //                 alert(this.$t('delete fail'));
                //             }
                //         })
                //         .catch(error => {
                //             console.log(error);
                //         });
            },
            onSelectionChanged() {  //selection  複選框
                var selectedRows = this.gridApi.getSelectedRows();
                console.log(selectedRows);
                //remove按钮是否可操作，当没有选中leadId的时候不可用。
                if (selectedRows.length === 0) {
                    this.showhideRemove=true;
                }else{
                    this.showhideRemove=false;
                }
                // //赋值到span显示选中了多少条
                // document.querySelector("#selectedRows").innerHTML = selectedRows.length;
                // document.querySelector("#currentRecordNumber").innerHTML = selectedRows.length;
                //
                // var selectedRows2 = this.gridApi.getSelectedRows();
                // var selectedRowsString = "";
                // selectedRows2.forEach(function(selectedRow) {
                //     selectedRowsString += selectedRow.leadId+" , ";
                // });
                // this.selectCurrentLeadId = selectedRowsString
                // //console.log(this.selectCurrentLeadId)
                if (selectedRows.length===this.paginationPageSize || selectedRows.length === this.studentData.length){
                    this.$data.currentAndAll.display='flex!important';
                }
                else {
                    this.$data.currentAndAll.display='none!important';
                }
            },
            clickRadio() {  //radio选择当前页还是全部
                if (this.radios1 === "Current") {
                    this.selectMainRecords = '0'
                }else {
                    this.selectMainRecords = '1'
                }
            },
            importTable(input) {
                if (input.target.files && input.target.files[0]) {
                    var reader = new FileReader()
                    reader.readAsDataURL(input.target.files[0])
                }
                let file = input.target.files[0];
                var picData = new FormData();
                picData.append('file', file);
                console.log(picData);
                // this.axios({
                //     url: this.GLOBAL.rootPath + '/consultant/uploadLeadExcel',
                //     method: 'post',
                //     data: picData,
                // })
                //     .then(res => {
                //         console.log(res.data);
                //         if (res.data.result === true) {
                //             this.reload()  //直接调用this.reload() 刷新页面
                //             alert(this.$t('import data success'))
                //         }else {
                //             alert(this.$t('import data fail'))
                //         }
                //     })
                //     .catch(Error => {
                //         console.log(Error)
                //     })
            },
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.generateFormData();
        }
    }
</script>

<style scoped>
    .ag-theme-alpine{height: 500px}
</style>
