<template>
    <div id="content" class="app-content p-1 bg-white">
        <div>
            <b-tabs card content-class="pt-1" ref="theTab"  @changed="tabChanged" v-model="tabIndex" >
                <b-tab v-for="tab in this.$store.state.tabs" :key="'dyn-tab-' + tab.i"  ref="'Tab' + tab.i"  active>
                    <template v-slot:title>
                         <strong>{{tab.title}}</strong> <a v-on:click="tabClose(tab.i)"><i class="fa fa-times-circle" ></i></a>
                    </template>
                    <div :ref="'TabContent-' + tab.i"  ></div>
                </b-tab>
            </b-tabs>
        </div>

    </div>

</template>
<script>
    import Vue from 'vue'

    export default {
        name: 'Tabs',
        data() {
            return {
                tabCounter: 0,
                tabIndex:0
            }
        },
        watch:{
            $route (to){
                this.openNewTab(to.name)
            }
        },
        methods:{
            openNewTab:function(title){
                var isExists=false;

                for (let i = 0; i < this.$store.state.tabs.length; i++) {
                    if (this.$store.state.tabs[i].title === title) {

                        isExists = true;
                        this.tabIndex = i;
                    }
                }
                if(isExists==false) {
                    this.$store.commit('add_tabs', {title: title, i: this.tabCounter++, index: this.tabIndex});
                }
            },
            tabChanged:function(currentTabs, previousTabs ){
                if(currentTabs.length>previousTabs.length) {
                    var lastIndex = this.tabCounter - 1;
                    var container = this.$refs['TabContent-' + lastIndex];
                    var Comm = this.$router.getMatchedComponents()[0];
                    var comm = Vue.extend(Comm);
                    var commInstand = new comm();
                    commInstand.$mount();
                    container[0].append(commInstand.$el);
                }
            },
            tabClose:function(x){
                this.$store.commit('delete_tabs', x);
            }

        },
        mounted(){

        }
    }
</script>
<style lang="css">
    .tab-pane .app-content{
        margin-left: 0px;
    }
    .tabs .card-body{
        padding-top:0px;
        padding-left:0px;
        padding-right:0px;
        padding-bottom: 0px;
    }
</style>
