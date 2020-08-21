<template>
    <b-container class="p-2">
        <b-row>
            <b-col md="6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Age')}} :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.age" >
                    </div>
                </div>
            </b-col>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Center')}} :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.centerName" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Gender')}} :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.gender" >
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
        <!--<b-row v-if="!studentInfo">-->
        <!--<b-col cols="12" class="text-center">-->
        <!--<b-button variant="success" class="mr-2">{{$t('Save')}}</b-button>-->
        <!--<b-button variant="secondary">{{$t('Reset')}}</b-button>-->
        <!--</b-col>-->
        <!--</b-row>-->
    </b-container>
</template>

<script>
    export default {
        name: "formInputInfo",
        props:{
            studentInfo:{}
        },
        methods: {
            // saveStudent(){
            //     console.log(this.studentInfo)
            // },
            // resetForm(){
            //     this.studentInfo = ''
            //     console.log(this.studentInfo)
            // }
        }
    }
</script>

<style scoped>

</style>
