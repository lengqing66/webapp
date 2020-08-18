<template>
        <form action="" name="form1test">

            <label class="col-form-label">text :</label>
            <input type="text" class="form-control" @change="Test(test.input1,$event)" :value="test.input1" name="text"/>

            <label class="col-form-label">select :</label>
            <select class="form-control" :value="test.input2" @change="Test(test.input2,$event)" name="select">
                <option value ="test1" selected>test1</option>
                <option value ="test2">test2</option>
            </select>

            <label class="col-form-label">select :</label>
            <textarea class="form-control" @change="Test(test.input3,$event)" :value="test.input3" name="textarea"/>

            <input type="hidden" v-model="hidden_test" id="hidden"/>

            <button type="submit" @click.prevent="onSubmit()"><span>提交</span></button>

        </form>
</template>

<script>

    export default {
        name: "test",
        changeLog:[],
        data() {
            return {
                test:
                    {
                    "input1":'test',
                    "input2":'test1',
                    "input3":'textarea',
                },
                array:[],
                hidden_test:[],
            }
        },
        methods: {
            Test(test,event) {
                if (test !== event) {
                    this.changehidden(test, event.target.value,event.target.name);
                }
            },
            changehidden(oldValue,newValue,name){
                let json_obj={};
                json_obj.name=name;
                json_obj.oldValue=oldValue;
                json_obj.newValue=newValue;
                this.array=JSON.stringify(json_obj);
                this.hidden_test.push(this.array);
                console.log(this.hidden_test);
            },
            onSubmit() {
            }
        }
    }

</script>

<style scoped>

</style>
