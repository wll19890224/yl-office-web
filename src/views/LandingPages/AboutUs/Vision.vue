<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/vue-mk-header.jpg";

//dep
import Typed from "typed.js";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <!-- label: '/pages/landing-pages/basic', -->
  <!-- route: 'javascript:;', -->
  <DefaultNavbar
    :action="{
      route: '/pages/landing-pages/basic',
      label: 'Sign In',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-fill"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-8 text-center mx-auto my-auto">
             <h1>
              Our vision
            </h1>
            <h4>
                Our vision is to enable patients worldwide to receive the most effective treatment. We achieve this by providing superior prediction precision, accessibility, and affordability through our AI-powered solutions.
            </h4>
          </div>
        </div>
      </div>
    </div>
  </header>
  <DefaultFooter />
</template>
