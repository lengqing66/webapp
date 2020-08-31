<template>
    <b-row class="p-2">
        <b-col cols="12" class="text-center">
            <input type="hidden" v-model="hidden_testTest" id="hidden1">
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "hiddenChange",
        data(){
            return{
                defaultData0:[],//存默认的值
                hidden_testTest: [],
            }
        },
        methods:{
            getDefaultData() {  //先將默認的值保存起來
                this.defaultData0 = JSON.parse(JSON.stringify(this.$parent.arrsTest));
            },
            watchVal(oldValue, newValue, name) {
                console.log("监听中");
                let json_obj = {};
                json_obj.label = name;
                json_obj.oldValue = oldValue;
                json_obj.newValue = newValue;
                this.$parent.arrayTest = JSON.stringify(json_obj);
                for (let i = 0; i < this.hidden_testTest.length; i++) {
                    if (this.hidden_testTest[i].indexOf(name) !== -1) {
                        this.hidden_testTest.splice(i, 1);
                    }
                }
                this.hidden_testTest.push(this.$parent.arrayTest);
                console.log(this.hidden_testTest);
            },
        },
        mounted() {
            this.getDefaultData();
            console.log("初始值");
            console.log(this.defaultData0);
        },
    }
</script>

<style scoped>

</style>
