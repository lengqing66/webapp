<template>
    <div class="box">
        <b-card>
            <b-container>
                <b-row class="border border-bottom-0 border-right-0">
                    <b-col cols="12"  md="6" class="border-bottom border-right" v-for="(value,name) in studentInfo" :key="name">
                        <div class="row">
                            <div class="col-md-3 border-right"><label class="col-form-label">{{name}} :</label></div>
                            <div class="col-md-9"><p class="col-form-label">{{value}}</p></div>
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
