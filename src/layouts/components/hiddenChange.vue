<template>
    <div class="box">
        <b-card :title="$t('HOME.Form')">
            <b-container>
                <b-row>
                    <b-col cols="12" :key="index" v-for="(item,index) in arrsTest">
                        <b-form-group label-cols="4" label-cols-lg="3" :label="$t('HOME.'+item.label) +':'">

                            <b-form-input @change="changeFunc(item.customItem, index)" v-model="item.customItem"
                                          v-if="item.type==='text' || item.type==='email' || item.type==='number' || item.type==='password'"
                                          :type="item.type"></b-form-input>

                            <b-form-radio-group v-if="item.type==='radio'" name="radio-sub-component">
                                <input type="radio" id="one" value="male" @change="changeFunc(item.customItem, index)"
                                       v-model="item.customItem">
                                <label for="one" class="radio-label-sty">{{ $t('HOME.Male') }}</label>
                                <input type="radio" id="two" value="female" @change="changeFunc(item.customItem, index)"
                                       v-model="item.customItem">
                                <label for="two" class="radio-label-sty">{{ $t('HOME.Female') }}</label>
                            </b-form-radio-group>

                            <b-form-datepicker @context="changeFunc(item.customItem, index)" v-model="item.customItem"
                                               :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                               v-if="item.type==='date'" :locale="$t('HOME.locale')"></b-form-datepicker>

                            <b-form-select
                                @change="changeFunc(item.customItem, index)"
                                v-model="item.customItem"
                                v-if="item.type==='select'"
                                :options="topOption">
                            </b-form-select>

                        </b-form-group>
                    </b-col>
                </b-row>
                <test></test>
                <!--<b-row class="p-2">-->
                    <!--<b-col cols="12" class="text-center">-->
                        <!--<input type="hidden" v-model="hidden_testTest" id="hidden1">-->
                    <!--</b-col>-->
                <!--</b-row>-->
                <b-row class="p-2">
                    <b-col cols="12" class="text-center">
                        <b-button @click="newadd" type="submit" variant="success" class="mr-2">{{$t('HOME.Submit')}}</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
    import test from './test';
    export default {
        name: 'hiddenChange',
        components: {
            test
        },
        data() {
            return {
                arrayTest: [],
                hidden_testTest: [],   //改变的值
                defaultData0: [],  //存默认的值
                defaultDataTest: [],   //输入的值
                arrsTest: [           //原始的值
                    {customItem: 'test01', label: 'name', type: 'text'},
                    {customItem: 'test01', label: 'name2', type: 'text'},
                    {customItem: 'male', label: 'gender', type: 'radio'},
                    {customItem: '', label: 'center', type: 'select'},
                    {customItem: '', label: 'selectTwo', type: 'select'},
                    {customItem: '343@qq.com', label: 'email', type: 'email'},
                    {customItem: '2020-4-05', label: 'birthday', type: 'date'}
                ],
                topOption: [
                    {text: 'Tai', value: '1'},
                    {text: 'Hell', value: '2'},
                    {text: 'Cri', value: '3'},
                    {text: 'Cheery', value: '4'},
                ],
            }
        },
        methods: {
            // getDefaultData() {  //先將默認的值保存起來
            //     this.defaultData0 = JSON.parse(JSON.stringify(this.arrsTest));
            // },
            newadd() {
                console.log(this.hidden_testTest);  //改變了的值
            },
            changeFunc(item, index) {
                if (this.defaultData0[index].customItem !== item) {
                    this.watchVal(this.defaultData0[index].customItem, item, this.defaultData0[index].label);
                }
            },
            // 监听值的变化
            watchVal(oldValue, newValue, name) {
                let json_obj = {};
                json_obj.label = name;
                json_obj.oldValue = oldValue;
                json_obj.newValue = newValue;
                this.arrayTest = JSON.stringify(json_obj);
                for (let i = 0; i < this.hidden_testTest.length; i++) {
                    if (this.hidden_testTest[i].indexOf(name) !== -1) {
                        this.hidden_testTest.splice(i, 1);
                    }
                }
                this.hidden_testTest.push(this.arrayTest);
            },
        },
        // mounted() {
        //     this.getDefaultData();
        // },
    }
</script>

