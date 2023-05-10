<script setup>
import { onMounted } from "vue";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//image
// import image from "@/assets/img/illustrations/illustration-signin.jpg";
import bg0 from "@/assets/img/vue-mk-header.jpg";

//material components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
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
        <section class="py-9">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 my-auto text-white">
          <h3>Our innovation</h3>
          <p class="pe-5">
            In 2020, breast cancer surpassed lung cancer as the most commonly 
            diagnosed cancer on the world. Accurate prognosis is a critical step for 
            medical doctors to design precision treatment well tailored for each patient.
            Our method predict prognosis of breast cancer in terms of Recurrence Free 
            Interval (RFI) and Overall Survival (OS) with very high precision based on 
            patient’s molecular profile. It applies on all subtypes of breast cancer.
          </p>
          <a href="https://bayanebartar.org/file-dl/library/IELTS3/Essential-English.pdf" 
          target="_blank"
          class="text-success icon-move-right"
            >More
            <i class="fas fa-arrow-right text-sm ms-1"></i>
          </a>
        </div>
        <div class="col-lg-6 my-auto text-white">
          <h3>Prediction on my data</h3>
          <p class="pe-5">
            The prediction is based on gene expression levels computed from bulk 
            RNA-seq of primary tumor tissue of breast cancer patient. Our 
            computation can start from
          </p>
          <a>* Raw bulk RNA-seq data and output sequence data quality report, gene expression (FPKM) level table, and survival analysis report.</a>
          <br>
          <a>* Gene expression (FPKM) computed from bulk RNA-seq data.</a>
          <br>
          <a>* Gene expression (FPKM) computed from bulk RNA-seq data, then filtered for genes in our 
            <a
              href="/pages/landing-pages/breastcancer-list"
              class="text-success icon-move-right"
              >List
              <i class="fas fa-arrow-right text-sm ms-1"></i>
            </a>
          </a>
        </div>
      </div>
    </div>
  </section>
      </div>
    </div>
  </header>
  <DefaultFooter />
</template>
