<script setup>
import { useRoute,useRouter } from 'vue-router'
import { onMounted } from "vue";
import { setToken } from '@/utils/auth'

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

import { get, post } from '@/api/index'

import { Select, message, Spin, Modal } from "ant-design-vue";

onMounted(() => {
  setMaterialInput();
});
const router = useRouter();
const login = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username + "|" + password);
    var emailRegExp=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!emailRegExp.test(username)){
      return message.warning('Please fill in the correct email address!');
    }
    post('/sys/login', { username: username, password: password })
      .then(response => {
        console.log(response);
        // 处理请求成功后的逻辑，比如跳转页面等等
        if(response.code == 200){
          let userInfo = response.result.userInfo
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
          setToken(response.result.token)
          router.push({
            path: '/'
          })
        }
        
      })
      .catch(error => {
        message.warning('error:' + error);
      })
  }

</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://cdn.buymeacoffee.com/uploads/gallery/3203824/2023-03-06/vuemkheader.jpg@1600w_0e.webp)'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Sign in
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <!-- <MaterialInput
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    type="email"
                  /> -->
                  <MaterialInput
                    id="username"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    :validator="value => value.length > 3 || 'Email must be at least 4 characters'"
/>
                  <MaterialInput
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="password"
                  />
                  <MaterialSwitch
                    class="d-flex align-items-center mb-3"
                    id="rememberMe"
                    labelClass="mb-0 ms-3"
                    checked
                    >Remember me</MaterialSwitch
                  >

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      @click.prevent="login"
                      fullWidth
                      >Sign in</MaterialButton
                    >
                  </div>
                  <!-- <p class="mt-4 text-sm text-center">
                    Don't have an account?
                    <a
                      href="#"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p> -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
