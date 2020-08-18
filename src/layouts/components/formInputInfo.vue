<template>
    <div class="p-2">
        <div class="form-row" >
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Age :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.age" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">CenterName :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.centerName" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Gender :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.gender" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Mobile :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.mobile" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Name :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.name" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Color :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.genderColor" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Phone(home) :</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.phoneHome" >
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">Full name:</label></div>
                    <div class="col-md-9">
                        <input  type="text" class="form-control" v-model="studentInfo.studentNo" >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "formInputInfo",
        props:{
            studentInfo:{}
        },
    }
</script>

<style scoped>

</style>
