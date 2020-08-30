<template>
    <b-row class="p-2">
        <b-col cols="12" class="text-center">
            <input type="hidden" v-model="hidden_testTest" id="hidden1">
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                hidden_testTest: [],
            }
        },
        methods:{
            getDefaultData() {  //先將默認的值保存起來
                this.$parent.defaultData0 = JSON.parse(JSON.stringify(this.$parent.arrsTest));
            },
        },
        mounted() {
            this.getDefaultData();
            console.log(this.$parent.defaultData0);
        },
    }
</script>

<style scoped>

</style>
