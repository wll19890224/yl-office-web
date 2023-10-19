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
        <div class="col-lg-6 my-auto">
          <div
              class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
            >
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg p-3"
                >
                  <h3 class="text-white text-success mb-0">List of required genes:</h3>
                </div>
              </div>
                  <div class="card-body">
                    <div class="col-lg-12 my-auto">
                    <div class="card-body">
                      <a href="https://www.biospringbok.com/GeneList_RFI.txt.zip"
                          target="_blank"
                          class="text-success icon-move-right"
                        >* For RFI
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a>
                    <br>
                    <a href="https://www.biospringbok.com/GeneList_OS.txt.zip"
                          target="_blank"
                          class="text-success icon-move-right"
                        >* For OS
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a>
                    <br>
                    <a href="https://www.biospringbok.com/ReadMe.pdf.zip"
                          target="_blank"
                          class="text-success icon-move-right"
                        >* ReadMe
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a>
                    <br>
                    <!-- <a href="https://bayanebartar.org/file-dl/library/IELTS3/Essential-English.pdf" 
                          target="_blank"
                          class="text-success icon-move-right"
                        >* Gene expression (FPKM) 2000 gene list
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a> -->
                  </div>
                 </div>
              </div>
            </div>
        </div>
        <div class="col-lg-6 my-auto">
          <div
              class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
            >
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg p-3"
                >
                  <h3 class="text-white text-success mb-0">Prediction on my data</h3>
                </div>
              </div>
                  <div class="card-body">
                    <div class="col-lg-12 my-auto">
                    <div class="card-body">
                      <a href="/pages/landing-pages/upload-data" 
                          class="text-success icon-move-right"
                        >* Upload data & compute and predict
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a>
                    <br>
                    <br>
                    <a href="/pages/landing-pages/prediction-list" 
                          class="text-success icon-move-right"
                        >* My prediction list
                        <i class="fas fa-arrow-right text-sm ms-1"></i>
                      </a>
                    <br>
                  </div>
                 </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
      </div>
    </div>
  </header>
  <DefaultFooter />
</template>
