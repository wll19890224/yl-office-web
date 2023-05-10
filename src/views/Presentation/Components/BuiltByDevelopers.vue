<script setup></script>
<template>
  <div class="container mt-sm-5">
    <div
      class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
      :style="{
        backgroundImage:
          'url(https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg)'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 ms-lg-5">
            <!-- <h4 class="text-white">Built by developers</h4> -->
            <h1 class="text-white">Prediction on my data</h1>
            <p class="lead text-white opacity-8">
              The prediction is based on gene expression levels computed from bulk 
              RNA-seq of primary tumor tissue of breast cancer patient
            </p>
            <a
              href="/pages/landing-pages/breastcancer"
              class="text-white icon-move-right"
            >
              Go
              <i class="fas fa-arrow-right text-sm ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
