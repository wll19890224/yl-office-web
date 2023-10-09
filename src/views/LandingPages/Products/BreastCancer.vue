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
        <h3>
            The solution is to predict breast cancer prognosis in terms of Recurrence Free Interval (RFI) and Overall Survival (OS) based on RNA-seq data. Precise prognosis prediction can help medical doctors make better informed treatment decisions.
      </h3>
        <section class="py-9">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 my-auto text-white">
          <h3>Key Features</h3>
          <p class="pe-5">
            The solution provides more functions and proved to have much improved prediction precision compared to similar solutions on the market (MammaPrint, Oncotype DX).
          </p>
          <!-- <a href="https://bayanebartar.org/file-dl/library/IELTS3/Essential-English.pdf" 
          target="_blank"
          class="text-success icon-move-right"
            >More
            <i class="fas fa-arrow-right text-sm ms-1"></i>
          </a> -->
        </div>
        <div class="col-lg-6 my-auto text-white">
          <h3>How It Works?</h3>
          <p class="pe-5">
            Please sign up an account, and log in your account. On your account name, choose "New run", then choose the solution. Fore detailed insturction, ReadMe (link to the ReadMe file in S3).
          </p>
          <!-- <a>* Raw bulk RNA-seq data and output sequence data quality report, gene expression (FPKM) level table, and survival analysis report.</a>
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
          </a> -->
        </div>

        <div class="col-lg-6 my-auto text-white">
          <h3>Validation</h3>
          <p class="pe-5">
            The solution is validated on public data. We seek collaboration with medical institutes for further validataion and refinement.
          </p>
        </div>

        <div class="col-lg-6 my-auto text-white">
          <!-- <h3>Upload data and compute</h3> -->
          <a
              href="/pages/landing-pages/breastcancer-list"
              class="text-success icon-move-right"
              ><h3>Upload data and compute</h3>
              <i class="fas fa-arrow-right text-lg ms-1"></i>
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
