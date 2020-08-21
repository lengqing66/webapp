<template>
    <div class="box">
        <b-card class="mt-3">
            <b-container class="p-2">
                <b-row >
                    <b-col  md="6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">Case ID :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.caseid" >
                            </div>
                        </div>
                    </b-col>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">Code :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.code" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">BLM :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.blm" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">{{$t('Mobile')}} :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.mobile" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">{{$t('Name')}} :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.name" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">{{$t('Color')}} :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.genderColor" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">{{$t('Phone')}} :</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.phoneHome" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <div class="col-md-3"><label class="col-form-label">{{$t('FullName')}}:</label></div>
                            <div class="col-md-9">
                                <input  type="text" class="form-control" v-model="studentInfo.studentNo" >
                            </div>
                        </div>
                    </div>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "formInputInfo",
        props:{
            studentInfo:{}
        },
        data(){
          return{

          }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>
