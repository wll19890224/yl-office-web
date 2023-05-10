<script setup>
import AboutUsOption from "@/views/LandingPages/components/AboutUsOption.vue";
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
  <section class="py-9">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 my-auto">
          <h3>Our innovation</h3>
          <p class="pe-5">
            In 2020, breast cancer surpassed lung cancer as the most commonly 
            diagnosed cancer on the world. Accurate prognosis is a critical step for 
            medical doctors to design precision treatment well tailored for each patient.
            Our method predict prognosis of breast cancer in terms of Recurrence Free 
            Interval (RFI) and Overall Survival (OS) with very high precision based on 
            patient’s molecular profile. It applies on all subtypes of breast cancer.
          </p>
          <a href="javascript:;" class="text-success icon-move-right"
            >More
            <i class="fas fa-arrow-right text-sm ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
  <DefaultFooter />
</template>
