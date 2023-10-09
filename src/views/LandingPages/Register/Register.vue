<script setup>
import { useRoute,useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import { setToken } from '@/utils/auth'

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSelect from "@/components/MaterialSelect.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { Select, message, Spin, Modal } from "ant-design-vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import setMaterialSelect from "@/assets/js/material-select";

import { get, post } from '@/api/index'

onMounted(() => {
  setMaterialInput();
  setMaterialSelect();
});
const selected1 = ref(undefined);
const router = useRouter();
const register = () => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const affiliation = document.getElementById("affiliation").value;
    const password = document.getElementById("password").value;
    const passwordAgain = document.getElementById("passwordAgain").value;
    var emailRegExp=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!emailRegExp.test(email)){
      return message.warning('Please fill in the correct email address!');
    }
    if(!username){
      return message.warning('Please fill in the username!');
    }
    if(!password){
      return message.warning('Please fill in the password!');
    }
    if(!passwordAgain){
      return message.warning('Please fill in the passwordAgain!');
    }
    if(password !== passwordAgain){
      return message.warning('The password is different!');
    }
    // return
    post('/sys/register', { username: username, password: password,  email: email, affiliation: affiliation})
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
        alert(error)
        console.log(error);
        // 处理请求失败后的逻辑，比如显示错误信息等等
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
                  Register
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <MaterialInput
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email address', class: 'form-label' }"
                    type="email"
                  />
                  <MaterialInput
                    id="username"
                    class="input-group-outline my-3"
                    :label="{ text: 'Name', class: 'form-label' }"
                    :validator="value => value.length > 3 || 'UserName must be at least 4 characters'"
                />
                <MaterialSelect
                    id="affiliation"
                    class="input-group-outline my-3"
                    :label="{ text: 'Affiliation', class: 'form-label' }"
                />
                
                  <MaterialInput
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="password"
                  />
                  <MaterialInput
                    id="passwordAgain"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password again', class: 'form-label' }"
                    type="password"
                  />
                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      @click.prevent="register"
                      fullWidth
                      >Register</MaterialButton
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
