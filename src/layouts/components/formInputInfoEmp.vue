<template>
    <b-container class="p-2">
        <b-row>
            <b-col md="6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Age')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.age">
                    </div>
                </div>
            </b-col>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Center')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.centerName">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Gender')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.gender">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Mobile')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.mobile">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Name')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.name">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Color')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.genderColor">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('Phone')}} :</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.phoneHome">
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{$t('FullName')}}:</label></div>
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="studentInfo.studentNo">
                    </div>
                </div>
            </div>
        </b-row>
        <b-row>
            <b-col cols="12" class="text-center">
                <b-button @click="saveStudent" variant="success" class="mr-2">{{$t('Save')}}</b-button>
                <b-button @click="resetForm" variant="secondary">{{$t('Reset')}}</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "formInputInfo",
        data() {
            return {
                addStudentInfo: {
                    age: '',
                    centerName: '',
                    gender: '',
                    name: '',
                    mobile: '',
                    genderColor: '',
                    phoneHome: '',
                    studentNo: '',
                }
            }
        },
        methods: {
            saveStudent() {
                console.log(this.addStudentInfo)
            },
            resetForm() {
                this.addStudentInfo = {
                    age: '',
                    centerName: '',
                    gender: '',
                    name: '',
                    mobile: '',
                    genderColor: '',
                    phoneHome: '',
                    studentNo: '',
                };
                console.log(this.addStudentInfo)
            }
        }
    }
</script>

<style scoped>

</style>
