<template>
    <div>
        <b-form-group label="name :">
            <b-form-input v-b-modal.ASelect v-model="abc"/>
        </b-form-group>

        <b-modal ref="ASelect" id="ASelect" title="ASelect" hide-footer>
            <template>
                <b-breadcrumb>您的位置：
                    <b-breadcrumb-item v-for="item of items2" :key="item.key" @click="click(item.key)">
                        {{item.name}}
                    </b-breadcrumb-item>
                </b-breadcrumb>
                <b-form @submit="submit">
                    <ag-grid-vue v-if="innerpath==='1'" style="width: 450px; height: 500px;"
                                 class="ag-theme-alpine"
                                 :columnDefs="columnDefs"
                                 :rowData="rowData" @cellClicked="cellClicked($event)">
                    </ag-grid-vue>
                    <ag-grid-vue v-else-if="innerpath==='2'" style="width: 450px; height: 500px;"
                                 class="ag-theme-alpine"
                                 :columnDefs="columnDefs"
                                 :rowData="rowData3" @cellClicked="cellClicked2($event)">
                    </ag-grid-vue>
                    <b-row v-if="innerpath==='2'" class="p-2">
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
                innerpath: '1',//更改显示
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
            }
        },
        beforeMount() { //data
            this.columnDefs = [
                {headerName: 'Make', field: 'make', sortable: true, filter: true,},
                {headerName: 'Model', field: 'model', sortable: true, filter: true},
                {headerName: 'Price', field: 'price', sortable: true, filter: true},
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: '35000'},
                {make: 'Ford', model: 'Ford', price: '32000'},
                {make: 'Porsche', model: 'Boxter', price: '72000'},
            ];

            this.rowData2 = [
                {make: 'Toyota', model: 'Celica', price: '35000'},
                {make: 'Toyota', model: 'Mondeo', price: '32000'},
                {make: 'Toyota', model: 'Boxter', price: '72000'},
                {make: 'Ford', model: 'Celica', price: '35000'},
                {make: 'Ford', model: 'Mondeo', price: '32000'},
                {make: 'Ford', model: 'Boxter', price: '72000'},
                {make: 'Porsche', model: 'Celica', price: '35000'},
                {make: 'Porsche', model: 'Mondeo', price: '32000'},
                {make: 'Porsche', model: 'Boxter', price: '72000'},
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
                this.items2.push(this.items[1]);
                this.items2[1].name = a.data.model;
                this.innerpath = '2';
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
            },
            //查找
            select(e) {
                var evt = window.event || e;
                if (evt.keyCode == 13) {

                }
            },
            //点击导航
            click(a) {
                this.rowData3 = [];
                this.items2 = [];
                this.items2.push(this.items[0]);
                this.innerpath = a;
            }
        },
        mounted() {
            this.items2.push(this.items[0]);
        },
    }
</script>

<style scoped>

</style>
