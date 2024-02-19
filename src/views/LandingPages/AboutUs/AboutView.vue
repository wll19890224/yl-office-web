<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/vue-mk-header.jpg";

//dep
import Typed from "typed.js";

const body = document.getElementsByTagName("body")[1];
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

  <!--         :style="`background: rgb(220,255,38)`"    :style="{ backgroundImage: `url(${bg0})` }" -->
  <header>
    <div
      class="page-header min-vh-fill"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <h3 class="pb-3">
          At BioSpringbok ApS, we are driven by a singular mission to transform healthcare through the power of advanced technology. Founded in 2021, we have been at the forefront of innovation in the field of precision medicine and digital healthcare.
        </h3>
        <h3>
          Our mission:
        </h3>
        <h4 class="pb-3">
          We are committed to advancing precision medicine to make society healthier. Our dedication to this mission is reflected in the development of cutting-edge AI tools, which harness the potential of big data generated from modern biotechnology. These tools empower medical practitioners to make well-informed decisions, ultimately leading to better patient care.
        </h4>

        <h3>
          Our vision:

        </h3>
        <h4 class="pb-3">
          Our vision is to enable patients worldwide to receive the most effective treatment. We achieve this by providing superior prediction precision, accessibility, and affordability through our AI-powered solutions.
        </h4>

        <h3>
          Why choose BioSpringbok ApS?

        </h3>
        <h4 class="pb-3">
          Pioneering innovation: We are at the forefront of AI-driven healthcare solutions, constantly pushing the boundaries of what's possible in precision medicine.
Global Reach: Our user-friendly platform ensures that medical professionals worldwide can access and benefit from our tools.
Collaboration: We actively seek partnerships and collaborations with industry leaders, researchers, and organizations to drive innovation in healthcare.
        </h4>

        <h3>
          Our Achievements:
        </h3>
        <h4 class="pb-3">
          Our solutions for breast cancer prognosis prediction and RNA-seq data preprocessing are now available online, providing accessible and valuable tools for the medical community.
        </h4>

        <h3>
          Join Us on Our Journey:
        </h3>
        <h4 class="pb-3">
          We invite you to be a part of our journey as we strive to shape the future of healthcare. Whether you are a medical professional, researcher, or potential partner, we look forward to collaborating with you to make healthcare more precise, accessible, and effective.
        </h4>

        <!-- <div class="row justify-content-center"> -->
          <!-- <div class="col-lg-8 text-center mx-auto my-auto">
            <h1>
              Our mission
            </h1>
            <p class="lead mb-3 text-white opacity-8">
              <p class="text-white">
                <h4> -->
                <!-- We are committed to advancing precision medicine to make society healthier. Our dedication to this mission is reflected in the development of cutting-edge AI tools, which harness the potential of big data generated from modern biotechnology. These tools empower medical practitioners to make well-informed decisions, ultimately leading to better patient care. -->
              <!-- </p> -->
            <!-- </h4> -->
          <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>
  </header>
  <DefaultFooter />
</template>
