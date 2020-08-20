<template>
    <!-- BEGIN #content -->
    <div id="content" class="app-content">
        <!--20200820-->
        <div>
            <b-row>
                <b-col cols="12" :key="index" v-for="(item,index) in arrsTest">
                    <b-form-group label-cols="4" label-cols-lg="3" :label="item.label+' :'">

                        <b-form-input @change="changeFunc2(item.customItem, index)"
                                      v-model="item.customItem"
                                      v-if="item.type==='text' || item.type==='email' || item.type==='number' || item.type==='password'"
                                      :type="item.type"></b-form-input>

                        <b-form-radio-group v-if="item.type==='radio'" name="radio-sub-component">
                            <!--<b-form-radio  @change="changeFunc2(defaultDataTest[item.label], index)" v-model="defaultDataTest[item.label]" value="male">Male</b-form-radio>-->
                            <!--<b-form-radio  @change="changeFunc2(defaultDataTest[item.label], index)" v-model="defaultDataTest[item.label]" value="female">Female</b-form-radio>-->
                            <input type="radio" id="one" value="male"
                                   @change="changeFunc2(item.customItem, index)"
                                   v-model="item.customItem">
                            <label for="one" class="radio-label-sty">{{ $t('HOME.Male') }}</label>
                            <input type="radio" id="two" value="female"
                                   @change="changeFunc2(item.customItem, index)"
                                   v-model="item.customItem">
                            <label for="two" class="radio-label-sty">{{ $t('HOME.Female') }}</label>
                        </b-form-radio-group>

                        <b-form-datepicker @context="changeFunc2(item.customItem, index)"
                                           v-model="item.customItem"
                                           :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                           v-if="item.type==='date'" :locale="$t('language')"></b-form-datepicker>

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

    </div>
    <!-- END #content -->
</template>

<script>
    import i18n from '../common/plugins/vue-i18n'

    export default {
        data() {
            return {
                //20200820
                arrayTest: [],
                hidden_testTest: [],   //改变的值
                defaultData0: [],  //存默认的值
                arrsTest: [           //原始的值
                    {customItem: '', label: i18n.t("HOME.name"), type: 'text'},
                    {customItem: '', label: i18n.t("HOME.gender"), type: 'radio'},
                    {customItem: '', label: i18n.t("HOME.center"), type: 'select'},
                    {customItem: '', label: i18n.t("HOME.selectTwo"), type: 'select'},
                    {customItem: '', label: i18n.t("HOME.email"), type: 'email'},
                    {customItem: '', label: i18n.t("HOME.date"), type: 'date'}
                ],
                topOption: [
                    {text: 'Tai', value: 'Tai'},
                    {text: 'Hell', value: 'Hell'},
                    {text: 'Cri', value: 'Cri'},
                    {text: 'Cheery', value: 'Cheery'},
                ],
                //20200820 end
            }
        },
        methods: {
            //20200820
            getDefaultData2() {  //先將默認的值保存起來
                this.defaultData0 = JSON.parse(JSON.stringify(this.arrsTest));
            },
            newadd2() {
                console.log(this.hidden_testTest);  //改變了的值
            },
            changeFunc2(item, index) {
                if (this.defaultData0[index].customItem !== item) {
                    this.watchVal2(this.defaultData0[index].customItem, item, this.defaultData0[index].label);
                }
            },
            // 监听值的变化
            watchVal2(oldValue, newValue, name) {
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
            //20200820 end
        },
        mounted() {
            this.getDefaultData2();
            // this.getDefaultData();
        }
    }

</script>

