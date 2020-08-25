<template>
    <div>
        <b-form-group label="name :">
            <b-form-input v-b-modal.ASelect v-model="abc"/>
        </b-form-group>

        <b-modal ref="ASelect" id="ASelect" title="ASelect" hide-footer>
            <template>
                <b-form @submit="submit">
                    <b-breadcrumb>您的位置：
                        <b-breadcrumb-item :to="{path: item.path}" v-for="item of items" :key="item.path">
                            {{item.name}}
                        </b-breadcrumb-item>
                    </b-breadcrumb>
                    <ag-grid-vue v-if="this.items2.length===1" style="width: 450px; height: 500px;"
                                 class="ag-theme-alpine"
                                 :columnDefs="columnDefs"
                                 :rowData="rowData" @cellClicked="cellClicked($event)">
                    </ag-grid-vue>
                    <ag-grid-vue v-else style="width: 450px; height: 500px;"
                                 class="ag-theme-alpine"
                                 :columnDefs="columnDefs"
                                 :rowData="rowData3" @cellClicked="cellClicked2($event)">
                    </ag-grid-vue>
                    <b-row v-if="this.items2.length!==1" class="p-2">
                        <b-col cols="12" class="text-center">
                            <b-button type="submit" variant="success" class="mr-2">save</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </template>
        </b-modal>
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
                //导航
                items: [
                    {
                        path: '',
                        name: '/home'
                    },
                    {
                        path: '',
                        name: '二级'
                    },
                ],
                //临时导航
                items2: [],
            }
        },
        beforeMount() { //data
            this.columnDefs = [
                {headerName: 'Make', field: 'make', sortable: true, filter: true,},
                {headerName: 'Model', field: 'model', sortable: true, filter: true},
                {headerName: 'Price', field: 'price', sortable: true, filter: true},
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: 35000},
                {make: 'Ford', model: 'Mondeo', price: 32000},
                {make: 'Porsche', model: 'Boxter', price: 72000},
            ];

            this.rowData2 = [
                {make: 'Toyota', model: 'Celica', price: 35000},
                {make: 'Toyota', model: 'Mondeo', price: 35000},
                {make: 'Toyota', model: 'Boxter', price: 35000},
                {make: 'Ford', model: 'Celica', price: 35000},
                {make: 'Ford', model: 'Mondeo', price: 35000},
                {make: 'Ford', model: 'Boxter', price: 35000},
                {make: 'Porsche', model: 'Celica', price: 35000},
                {make: 'Porsche', model: 'Mondeo', price: 35000},
                {make: 'Porsche', model: 'Boxter', price: 35000},
            ];
            this.rowData3 = [];//筛选后的二级数据
        },
        methods: {
            //第一次选择
            cellClicked(a) {
                for (let i = 0; i < this.rowData2.length; i++) {
                    if (a.data.make === this.rowData2[i].make) {
                        this.rowData3.push(this.rowData2[i]);
                    }
                }
                this.items2.push({path: '', name: a.data.model});
            },
            //第二次选择
            cellClicked2(a) {
                this.abcd = this.items2[1].name + '/' + a.data.model;
                alert(this.abcd);
            },
            //提交
            submit(evt) {
                evt.preventDefault();
                this.abc = this.abcd;
                this.$refs['ASelect'].hide();
            }
        },
        mounted() {
            this.items2.push(this.items[0]);
        },
    }
</script>

<style scoped>

</style>
