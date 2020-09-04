<template>
    <div class="login" style="padding-top: 200px">
        <b-container>
            <b-row class="justify-content-center items-center">

                <b-col cols="12" md="4" class="bg-white p-0">
                    <img src="../assets/images/login.png" alt="login" class="mw-100 h-100">
                </b-col>

                <b-col cols="12" md="4" class="bg-white p-3">
                    <div class="p-8 login-tabs-container">

                        <div class="mb-3">
                            <h4 class="mb-1">Login</h4>
                            <p>Welcome back, please login to your account.</p>
                        </div>

                        <div>
                            <b-form-input
                                type="text"
                                name="login"
                                placeholder="Login"
                                v-model="loginForm.userName"
                                class=" mb-3"></b-form-input>
                            <span class="text-danger text-sm" style="display: none"></span>
                            <b-form-input
                                type="password"
                                name="password"
                                placeholder="Password"
                                v-model="loginForm.password"
                                class="mb-3" @keyup.enter="userName"></b-form-input>
                            <span style="display: none"></span>
                            <div class=" text-center mb-2">
                                <b-button variant="success" @click="signIn">Login</b-button>
                            </div>
                        </div>

                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import AppOptions from '../config/AppOptions.vue';
    import $ from 'jQuery';
    export default {
        data() {
            return {
                loginForm: {
                    userName: "",
                    password: ""
                },
            }
        },
        methods: {
            signIn() {
                let _this = this;
                //console.log(this.$router);
                //console.log(this.loginForm);
                if(this.loginForm.userName===''||this.loginForm.password===''){
                    alert('Account and password cannot be empty');
                }
                else{
                    this.$axios({
                        method:'post',
                        url:this.GLOBAL.rootPath+'/user/login',
                        data:$.param(_this.loginForm),
                    }).then(res => {
                        console.log(res.data);
                        if(res.data.success){
                            localStorage.setItem('token',res.data['token']);
                            // alert("success");
                            _this.$router.push({path: '/home'});
                        }else{
                            alert('用户名或密码错误！');
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
        },
        mounted() {
            AppOptions.appWithoutSidebar = true;
            AppOptions.appWithoutHeader = true;
            AppOptions.appContentFullWidth = true;
        },
        beforeRouteLeave(to, from, next) {
            AppOptions.appWithoutSidebar = false;
            AppOptions.appWithoutHeader = false;
            AppOptions.appContentFullWidth = false;
            next();
        },
    }
</script>
