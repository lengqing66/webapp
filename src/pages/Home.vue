<template>
    <!-- BEGIN #content -->
    <div id="content" class="app-content">
        <!--<b-breadcrumb>-->
            <!--<b-breadcrumb-item href="#">BREADCRUMB</b-breadcrumb-item>-->
            <!--<b-breadcrumb-item active>HOME PAGE</b-breadcrumb-item>-->
        <!--</b-breadcrumb>-->

        <!--<h1 class="page-header">-->
            <!--Starter Page <small>page header description goes here...</small>-->
        <!--</h1>-->

        <!--<p>-->
            <!--Start build your page here-->
        <!--</p>-->


        <!--<div>-->
            <!--<div :key="index" v-for="(item, index) in arrs">-->
                <!--<label>{{item.label}}</label>-->
                <!--<input type="number" v-model="item.customItem" @change="changeFunc(item, index)"/>-->
            <!--</div>-->
            <!--<b-button @click="newadd">Submit</b-button>-->
        <!--</div>-->

        <!--20200820-->
        <div >
            <b-row>
                <b-col cols="12" :key="index" v-for="(item,index) in arrsTest">
                    <b-form-group label-cols="4" label-cols-lg="3" :label="$t(item.label)+' :'" >

                        <b-form-input @change="changeFunc2(item.customItem, index)" v-model="item.customItem" v-if="item.type==='text' || item.type==='email' || item.type==='number' || item.type==='password'" :type="item.type" ></b-form-input>

                        <b-form-radio-group v-if="item.type==='radio'"  name="radio-sub-component">
                            <!--<b-form-radio  @change="changeFunc2(defaultDataTest[item.label], index)" v-model="defaultDataTest[item.label]" value="male">Male</b-form-radio>-->
                            <!--<b-form-radio  @change="changeFunc2(defaultDataTest[item.label], index)" v-model="defaultDataTest[item.label]" value="female">Female</b-form-radio>-->
                            <input type="radio" id="one" value="male" @change="changeFunc2(item.customItem, index)" v-model="item.customItem">
                            <label for="one" class="radio-label-sty">Male</label>
                            <input type="radio" id="two" value="female" @change="changeFunc2(item.customItem, index)" v-model="item.customItem">
                            <label for="two" class="radio-label-sty">Female</label>
                        </b-form-radio-group>

                        <b-form-datepicker @context="changeFunc2(item.customItem, index)" v-model="item.customItem" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-if="item.type==='date'" locale="en"></b-form-datepicker>

                        <b-form-select
                            @change="changeFunc2(item.customItem, index)"
                            v-model="item.customItem"
                            v-if="item.type==='select'"
                            :options="topOption">
                        </b-form-select>

                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="p-2">
                <b-col cols="12" class="text-center">
                    <b-button @click="newadd2" type="submit" variant="success" class="mr-2">Submit</b-button>
                </b-col>
            </b-row>
        </div>
        <!--20200820-->

        <!--<div>-->
            <!--<div class="number" :key="'number-'+index" v-for="(item, index) in arrs">-->
                <!--<label>{{item.label}}</label>-->
                <!--<input type="number" v-model="item.customItem" @change="changeFunc(item, index)"/>-->
            <!--</div>-->
            <!--<div class="text" :key="'text-'+index" v-for="(item, index) in arrs2">-->
                <!--<label>{{item.text}}</label>-->
                <!--<input type="text" v-model="item.customItem" @change="changeFunc(item, index)"/>-->
            <!--</div>-->
            <!--<div class="select" :key="'select-'+index" v-for="(item,index) in arrs3" >-->
                <!--<label>{{item.name}}</label>-->
                <!--<select @change="changeFunc(item, index)" v-model="item.customItem">-->
                    <!--<option :key="'select1-'+index" v-for="(item2, index) in item.list" :value="item2.customItem" >{{item2.customItem}}</option>-->
                <!--</select>-->
            <!--</div>-->
            <!--<b-button @click="newadd">Submit</b-button>-->
        <!--</div>-->


    </div>
    <!-- END #content -->
</template>

<script>

    export default {
        data() {
            return {
                //20200820
                arrayTest:[],
                hidden_testTest:[],   //改变的值
                defaultData0:[],  //存默认的值
                defaultDataTest:[],   //输入的值
                arrsTest: [           //原始的值
                    {customItem: 'test01',label:'name',type:'text'},
                    {customItem: 'test01',label:'name2',type:'text'},
                    {customItem: 'male',label:'gender',type:'radio'},
                    {customItem: '',label:'center',type:'select'},
                    {customItem: '',label:'selectTwo',type:'select'},
                    {customItem: '343@qq.com',label:'email',type:'email'},
                    {customItem: '2020-4-05',label:'birthday',type:'date'}
                ],
                topOption:[
                    {text:'Tai',value:'1'},
                    {text:'Hell',value:'2'},
                    {text:'Cri',value:'3'},
                    {text:'Cheery',value:'4'},
                ],
                //20200820 end


                array:[],
                hidden_test:[],
                defaultData:[],
                arrs: [
                    {customItem: '1',label:'label1'},
                    {customItem: '2',label:'label2'},
                    {customItem: '3',label:'label3'},
                    {customItem: '4',label:'label4'},
                ],
                arrs2: [
                    {customItem: '5',text:'text1'},
                    {customItem: '6',text:'text2'},
                    {customItem: '7',text:'text3'},
                ],
                arrs3: [
                    {
                        name: "select1",
                        list: [
                            {customItem: '8', select: 'select1-1'},
                            {customItem: '9', select: 'select1-2'},
                        ]
                    },
                    {
                        name: "select2",
                        list: [
                            {customItem: '10', select: 'select2-1'},
                            {customItem: '11', select: 'select2-2'},
                        ]
                    }
                ]


            }
        },
        methods: {

            // getDefaultData(){  //先將默認的值保存起來
            //     this.defaultData = JSON.parse(JSON.stringify(this.arrs));
            //     this.defaultData=this.defaultData.concat(JSON.parse(JSON.stringify(this.arrs2)));
            //     for(var i=0;i<this.arrs3.length;i++){
            //         this.defaultData=this.defaultData.concat(JSON.parse(JSON.stringify(this.arrs3[i].list)));
            //     }
            //    // console.log("运行");
            //    // console.log(this.defaultData);
            // },
            // newadd() {
            //     console.log(this.defaultData);  //默認的值
            //     console.log(this.hidden_test);  //改變了的值
            // },
            // changeFunc(item, index) {
            //     if(item.name) {
            //         console.log(item.list);
            //         console.log(index);
            //         // if (this.defaultData[index+7].customItem !== item.list[index+1].customItem) {
            //         //     this.watchVal(this.defaultData[index+7].customItem, item.list.customItem, item.name);
            //         // }
            //     }
            //     if(item.text){
            //         if (this.defaultData[index+4].customItem !== item.customItem) {
            //             this.watchVal(this.defaultData[index+4].customItem, item.customItem, item.text);
            //         }
            //     }else {
            //         if (this.defaultData[index].customItem !== item.customItem) {
            //             this.watchVal(this.defaultData[index].customItem, item.customItem, item.label);
            //         }
            //     }
            // },
            // watchVal(oldValue,newValue,name) {
            //     let json_obj={};
            //     json_obj.label=name;
            //     json_obj.oldValue=oldValue;
            //     json_obj.newValue=newValue;
            //     this.array=JSON.stringify(json_obj);
            //     for (var i=0;i<this.hidden_test.length;i++) {
            //         if (this.hidden_test[i].indexOf(name) !== -1) {
            //             this.hidden_test.splice(i, 1);
            //         }
            //     }
            //     this.hidden_test.push(this.array);
            //     console.log(this.hidden_test);
            // },



            //20200820
            getDefaultData2(){  //先將默認的值保存起來
                this.defaultData0 = JSON.parse(JSON.stringify(this.arrsTest));
                console.log(this.arrsTest);
            },
            newadd2() {
                console.log(this.hidden_testTest);  //改變了的值
            },
            changeFunc2(item, index) {
                console.log(item);
                if (this.defaultData0[index].customItem !== item) {
                    this.watchVal2(this.defaultData0[index].customItem,item,this.defaultData0[index].label );
                }
            },
            // 监听值的变化
            watchVal2(oldValue,newValue,name) {
                let json_obj={};
                json_obj.label=name;
                json_obj.oldValue=oldValue;
                json_obj.newValue=newValue;
                this.arrayTest=JSON.stringify(json_obj);
                for (let i=0;i<this.hidden_testTest.length;i++) {
                    if (this.hidden_testTest[i].indexOf(name) !== -1) {
                        this.hidden_testTest.splice(i, 1);
                    }
                }
                this.hidden_testTest.push(this.arrayTest);
            },
            //20200820 end
        },
        mounted(){
            this.getDefaultData2();
            //this.getDefaultData();
        }
    }

</script>

