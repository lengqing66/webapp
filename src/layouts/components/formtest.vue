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
                <hiddenChange ref="myHiddenChange"></hiddenChange>
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
    import hiddenChange from './hiddenChange';
    export default {
        name: 'formtest',
        components: {
            hiddenChange
        },
        data() {
            return {
                arrayTest: [],
                hidden_testTest: [],   //改变的值
                // defaultData0: [],  //存默认的值
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
            newadd() {
                console.log("保存成功" + this.$refs.myHiddenChange.hidden_testTest);  //改變了的值
            },
            changeFunc(item, index) {
                if (this.$refs.myHiddenChange.defaultData0[index].customItem !== item) {
                    this.$refs.myHiddenChange.watchVal(this.$refs.myHiddenChange.defaultData0[index].customItem, item, this.$refs.myHiddenChange.defaultData0[index].label);
                }
            },
        }
    }
</script>

