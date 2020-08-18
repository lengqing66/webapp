<template>
    <div class="p-2">
        <div class="form-row" :key="index" v-for="(item,index) in topSearch">
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{item.label1}} :</label></div>
                    <div class="col-md-9">
                        <input v-if="item.type1==='text'" type="text" class="form-control" >
                        <input v-if="item.type1==='email'" type="emial" class="form-control" >
                        <input v-if="item.type1==='number'" type="number" class="form-control" >
                        <input v-if="item.type1==='password'" type="password" class="form-control" >
                        <multiselect v-if="item.type1==='multiselect'" v-model="value" placeholder="Select center" label="name" track-by="code" :options="topOption" :multiple="true" :taggable="true" ></multiselect>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="col-md-3"><label class="col-form-label">{{item.label2}} :</label></div>
                    <div class="col-md-9"><input v-if="item.type1==='text'" type="text" class="form-control" >
                        <input v-if="item.type2==='email'" type="emial" class="form-control" >
                        <input v-if="item.type2==='number'" type="number" class="form-control" >
                        <input v-if="item.type2==='password'" type="password" class="form-control" >
                        <multiselect v-if="item.type2==='multiselect'" v-model="value" placeholder="Select center" label="name" track-by="code" :options="topOption" :multiple="true" :taggable="true" ></multiselect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/scss/vue-multiselect.min.css'
    export default {
        name: "form01",
        props:{
            topSearch:{},
            topOption:{},
        },
        data () {
            return {
                value: [],
            }
        },
    }
</script>

<style scoped>

</style>
