<script setup>
defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: [String, Object],
    text: String,
    class: String,
    default: () => ({
      class: "",
    }),
  },
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => {
      return []
    }
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
function getClasses(size, success, error) {
  let sizeValue, isValidValue;

  sizeValue = size && `form-control-${size}`;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
}
</script>
<template>
  <div class="input-group">
    <label v-if="label" :class="label.class" :for="id">{{
      typeof label == "string" ? label : label.text
    }}</label>
    <span v-if="icon" class="input-group-text"
      ><i class="fas" :class="`fa-${icon}`" aria-hidden="true"></i
    ></span>
    <select 
      :id="id"
      :type="type"
      class="form-select"
      :class="[getClasses(size, success, error), inputClass]"
      :value="value"
      :placeholder="placeholder"
      :isRequired="isRequired"
      :disabled="isDisabled"
    >
      <option class="select_option" value="university">university</option>
      <option class="select_option" value="hospital">hospital</option>
      <option value="research">research</option>
      <option value="institute">institute</option>
      <option value="company">company</option>
    </select>
  </div>
</template>

<style scoped>
.form-select{
  border-radius: .375rem !important;
  padding-left: 0.75rem;
}
.input-group.input-group-outline.is-focused .form-label + .form-select, .input-group.input-group-outline.is-filled .form-label + .form-select {
  border-color: #e91e63 !important;
  border-top-color: transparent !important;
  box-shadow: inset 1px 0 #e91e63, inset -1px 0 #e91e63, inset 0 -1px #e91e63;
}
</style>
