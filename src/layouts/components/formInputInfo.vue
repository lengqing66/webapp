<template>
    <div class="box">
        <b-card>
            <b-container>
                <!--<b-row >-->
                    <!--<b-col  md="6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">Case ID :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.caseid" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</b-col>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">Code :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.code" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">BLM :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.blm" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">{{$t('Mobile')}} :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.mobile" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">{{$t('Name')}} :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.name" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">{{$t('Color')}} :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.genderColor" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">{{$t('Phone')}} :</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.phoneHome" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group col-md-6">-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-3"><label class="col-form-label">{{$t('FullName')}}:</label></div>-->
                            <!--<div class="col-md-9">-->
                                <!--<input  type="text" class="form-control" v-model="studentInfo.studentNo" >-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</b-row>-->

                <b-row class="border border-bottom-0 border-right-0">
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row">
                            <div class="col-md-3 border-right"><label class="col-form-label">Case ID :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.caseid}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row">
                            <div class="col-md-3 border-right"><label class="col-form-label">Code :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.code}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">BLM :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.blm}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">HLM :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.hlm}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">SUR NAME :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.surname}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">First Name :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.firstname}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">HKID :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.hkid}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">DOA :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.doa}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">DOR :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.dor}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">Diagnosis :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.diagnosis}}</p></div>
                        </div>
                    </b-col>
                    <b-col cols="12"  md="6" class="border-bottom border-right">
                        <div class="row ">
                            <div class="col-md-3 border-right"><label class="col-form-label">Body Part :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{studentInfo.bodypart}}</p></div>
                        </div>
                    </b-col>
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
