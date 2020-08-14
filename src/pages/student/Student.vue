<template>

    <div id="content" class="app-content p-1 bg-white">
        <div>
            <b-tabs card content-class="pt-1" ref="theTab"   v-model="tabIndex">
                <b-tab title="Main"  active >
                    <template>
                        <div class="wrap">
                            <div class="container">
                                <form01></form01>
                                <ag-grid-vue style="width: 500px; height: 500px;"
                                             class="ag-theme-alpine"
                                             :columnDefs="columnDefs"
                                             :rowData="rowData" @cellClicked="cellClicked">
                                </ag-grid-vue>
                            </div>

                        </div>
                    </template>
                </b-tab>
                <b-tab title="Data" v-for="tab in this.tabs" :key=tab.length  ref="'Tab' + tab.i"  active>
                    <template v-slot:title>
                        <strong>{{tab.title + tab.i}}</strong> <a v-on:click="tabClose(tab.i)"><i class="fa fa-times-circle" ></i></a>
                    </template>
                </b-tab>
            </b-tabs>
        </div>

    </div>

</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import Form01 from "../../layouts/components/form01"
    export default {
        name: "Student",
        components: {
            AgGridVue,
            Form01
        },
        data() {
            return {
                tabs: [],
                tabCounter: 0,
                tabIndex:0
            }
        },
        beforeMount() {
            this.columnDefs = [
                {headerName: 'Make', field: 'make', sortable: true, filter: true,  },
                {headerName: 'Model', field: 'model', sortable: true, filter: true },
                {headerName: 'Price', field: 'price', sortable: true, filter: true }
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: 35000},
                {make: 'Ford', model: 'Mondeo', price: 32000},
                {make: 'Porsche', model: 'Boxter', price: 72000}
            ];
        },
        methods:{
            cellClicked(){
                console.log("cell");
                this.tabs.push( {title: 'data', i: this.tabCounter++, index: this.tabIndex});
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
            this.$axios.get("./studentlist.json").then(response => {
                console.log(response.data);
            });
        }

    }
</script>

