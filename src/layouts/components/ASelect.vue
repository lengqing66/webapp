<template>
    <div id="content" class="app-content">
        <div>
            <b-row>
                <b-col cols="12">
                    <b-form-group label-cols="4" label-cols-lg="3" :label="$t('ASelect.name') +':'">
                        <b-form-input v-b-modal.ASelect v-model="abc"/>
                    </b-form-group>

                    <b-modal ref="ASelect" id="ASelect" :title="$t('ASelect.select')" hide-footer>
                        <template>
                            <div class="nav">
                                <div style="float:left;width: 250px">
                                    <b-breadcrumb>
                                        <h6>{{ $t('ASelect.Navigation') +':'}}</h6>
                                        <b-breadcrumb-item v-for="item of items2" :key="item.key"
                                                           @click="click(item.key)">
                                            {{item.name}}
                                        </b-breadcrumb-item>
                                    </b-breadcrumb>
                                </div>
                                <div style="float:right;width: 200px">
                                    <b-nav-form>
                                        <b-form-input v-model="selectData" @keydown="onSearch()"></b-form-input>
                                    </b-nav-form>
                                </div>
                            </div>
                            <b-form @submit="submit">
                                <ag-grid-vue v-if="count==='1'" style="width: 450px; height: 500px;"
                                             class="ag-theme-alpine"
                                             :columnDefs="columnDefs"
                                             :rowData="rowData" @cellClicked="cellClicked($event)" :enableFilter="true">
                                </ag-grid-vue>
                                <ag-grid-vue v-else-if="count==='2'" style="width: 450px; height: 500px;"
                                             class="ag-theme-alpine"
                                             :columnDefs="columnDefs"
                                             :rowData="rowData3" @cellClicked="cellClicked2($event)"
                                             :enableFilter="true">
                                </ag-grid-vue>
                                <ag-grid-vue v-else-if="count==='3'" style="width: 450px; height: 500px;"
                                             class="ag-theme-alpine"
                                             :columnDefs="columnDefs"
                                             :rowData="rowData4" @cellClicked="cellClicked2($event)">
                                </ag-grid-vue>
                                <b-row v-if="count==='2'" class="p-2">
                                    <b-col cols="12" class="text-center">
                                        <b-button type="submit" variant="success" class="mr-2">{{$t('Save')}}</b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </template>
                    </b-modal>
                </b-col>
            </b-row>
        </div>
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
                abc: '',//保存结果
                abcd: '',//临时选择结果
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
                //当前导航
                items2: [],
                selectData: '',

                count: '',//计数
            }
        },
        beforeMount() { //data
            this.columnDefs = [
                {headerName: 'Number', field: 'number', sortable: true, filter: true,},
                {headerName: 'Name', field: 'name', sortable: true, filter: true},
                {headerName: 'Detailed', field: 'detailed', sortable: true, filter: true},
            ];

            this.rowData = [
                {number: '1', name: 'Celica', detailed: 'detailed1'},
                {number: '2', name: 'Mondeo', detailed: 'detailed2'},
                {number: '3', name: 'Boxter', detailed: 'detailed3'},
            ];

            this.rowData2 = [
                {number: '1', name: 'Celica1', detailed: 'detailed11'},
                {number: '1', name: 'Mondeo1', detailed: 'detailed12'},
                {number: '1', name: 'Boxter1', detailed: 'detailed13'},
                {number: '2', name: 'Celica2', detailed: 'detailed21'},
                {number: '2', name: 'Mondeo2', detailed: 'detailed22'},
                {number: '2', name: 'Boxter2', detailed: 'detailed23'},
                {number: '3', name: 'Celica3', detailed: 'detailed31'},
                {number: '3', name: 'Mondeo3', detailed: 'detailed32'},
                {number: '3', name: 'Boxter3', detailed: 'detailed33'},
            ];
            this.rowData3 = [];//筛选后的二级数据
            this.rowData4 = [];//查找数据
        },
        methods: {
            //第一次选择
            cellClicked(e) {
                for (let i = 0; i < this.rowData2.length; i++) {
                    if (e.data.number === this.rowData2[i].number) {
                        this.rowData3.push(this.rowData2[i]);
                    }
                }
                this.items2.push(this.items[1]);
                this.items2[1].name = e.data.name;
                this.count = '2';
            },
            //第二次选择
            cellClicked2(e) {
                this.abcd = this.items2[1].name + '/' + e.data.name;
                alert(this.abcd);
            },
            //提交
            submit(evt) {
                evt.preventDefault();
                this.abc = this.abcd;
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
                this.rowData3 = [];
                this.items2 = [];
                this.items2.push(this.items[0]);
                this.count = '1';
            },
        },
        mounted() {
            this.items2.push(this.items[0]);
            this.count = '1';
        },
    }
</script>

<style scoped>

</style>
