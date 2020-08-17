<template>
    <div id="content" class="p-2">
        <form action="">
            <div class="form-row" >
                <div class="form-group col-md-6">
                    <div class="row">
                        <div class="col-md-3"><label class="col-form-label">text :</label></div>
                        <div class="col-md-9">
                            <input type="text" class="form-control" value="text" v-model="input1" onchange=""/>
                        </div>
                    </div>
                </div>
                <!--<div class="form-group col-md-6">-->
                    <!--<div class="row">-->
                        <!--<div class="col-md-3"><label class="col-form-label">select :</label></div>-->
                        <!--<div class="col-md-9">-->
                            <!--<select v-model="test.input2">-->
                                <!--<option value ="test1" class="form-control">test1</option>-->
                                <!--<option value ="test2" class="form-control">test2</option>-->
                            <!--</select>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-group col-md-6">-->
                    <!--<div class="row">-->
                        <!--<div class="col-md-3"><label class="col-form-label">textarea :</label></div>-->
                        <!--<div class="col-md-9">-->
                            <!--<textarea rows="3" cols="20" class="form-control" v-model="test.input3">-->
                                <!--test_textarea-->
                            <!--</textarea>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-group col-md-6">-->
                    <!--<div class="row">-->
                        <!--<div class="col-md-3"><label class="col-form-label">radio :</label></div>-->
                        <!--<div class="col-md-9">-->
                            <!--<label><input type="radio"/>radio1 </label>-->
                            <!--<label><input type="radio"/>radio2 </label>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="form-group col-md-6">
                    <div class="row">
                        <button type="submit" @click.prevent="onSubmit()"><span>保存</span></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "test",
        data() {
            return {
                // test:{
                    input1:'',
                //     "input2":'',
                //     "input3":'',
                // },
                inputData:[]
            }
        },
        methods: {
            onSubmit() {

                // let formData=new FormData();
                // for(var key in this.test){
                //     formData.append(key,this.test[key]);
                // }
                // axios({
                //     method:"post",
                //     url:"",
                //     headers:{
                //         "Content-Type":"application/json"
                //     },
                //     withCredentials:true,
                //     data:formData
                // }).then((res)=>{
                //     console.log(123);
                //     console.log(res);
                // });
            }
        }
    }
    axios({
        method:"post",
        url:"",
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true,
        data:this.input1
    })
</script>

<style scoped>

</style>
