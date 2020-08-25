<template>
    <div id="content" class="app-content p-1 bg-white select-parent">
        <ag-grid-vue style="width: 500px; height: 500px;"
                     class="ag-theme-alpine"
                     :columnDefs="columnDefs"
                     :rowData="rowData">
        </ag-grid-vue>

    </div>

</template>
<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: 'ParentSelect',
        data() {
            return {
                tabs: [],
                tabCounter: 0,
                tabIndex: 0
            }
        },
        beforeMount() {
            this.columnDefs = [
                {headerName: 'Make', field: 'make', sortable: true, filter: true,},
                {headerName: 'Model', field: 'model', sortable: true, filter: true},
                {headerName: 'Price', field: 'price', sortable: true, filter: true}
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: 35000},
                {make: 'Ford', model: 'Mondeo', price: 32000},
                {make: 'Porsche', model: 'Boxter', price: 72000}
            ];
        },
        components: {
            AgGridVue
        }
    }
</script>
<style lang="css">
    div.select-parent {
        margin-left: 0px;
    }

    .tab-pane .app-content {
        margin-left: 0px;
    }

    .tabs .card-body {
        padding-top: 0px;
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
    }
</style>
