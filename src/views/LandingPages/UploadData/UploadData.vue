<script setup>
import { uploadApi } from "@/api/api";
import { get, post } from "@/api/index";
import { onMounted, ref, createVNode } from "vue";
import { useRoute,useRouter } from 'vue-router'

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { Select, message, Spin, Modal  } from "ant-design-vue";
import { ExclamationCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons-vue';
import "ant-design-vue/dist/antd.css";

//image
// import image from "@/assets/img/illustrations/illustration-signin.jpg";
import bg0 from "@/assets/img/vue-mk-header.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";

const router = useRouter();
const data1 = [
  { label: "Raw RNA-seq", value: "1" },
  { label: "Gene expression (FPKM) full table", value: "2" },
  { label: "Gene expression (FPKM) 500 gene table", value: "3" },
  { label: "Gene expression (FPKM) 1000 gene table", value: "4" },
  { label: "Gene expression (FPKM) 1500 gene table", value: "5" },
  { label: "Gene expression (FPKM) 2000 gene table", value: "6" },
];

const data2 = [
  { label: "Recurrence Free Interval (RFI)", value: "1" },
  { label: "Overall Survival (OS)", value: "2" },
  { label: "RFI and OS", value: "3" },
];

const data3 = [
  { label: "GeneExpr", value: "GeneExpr" },
  { label: "RNAseq", value: "RNAseq" },
];

const options = ref(
  data1.map((item) => ({
    value: item.value,
    label: item.label,
  }))
);

const options2 = ref(
  data2.map((item) => ({
    value: item.value,
    label: item.label,
  }))
);

const options3 = ref(
  data3.map((item) => ({
    value: item.value,
    label: item.label,
  }))
);

const selected1 = ref(undefined);
const selected2 = ref(undefined);
const data_type = ref(undefined);
const isNeedUplaodclinical = ref(false);
const isNeedUplaodGen = ref(false);
const params = ref({
  data_paired: undefined,
  data_suffix: undefined,
  data_ext: undefined,
  rna_strandness: undefined,
  adapter: undefined,
  merge: 'No',
  surv_type: undefined,
  pred_err: undefined,
  notify_by_email: undefined,
  rpt_by_email: undefined,
})

// rna standess选项
const rna_standess_option = ref([{
          value: 'Unstranded',
          label: 'Unstranded',
        }])

const childOptions = ref([])

const fileList = ref([]);
const fileListProgres = ref([]);

const fileList2 = ref([]);
const fileListProgres2 = ref([]);

const upLoading = ref(false);

const isClick = ref(false);
const resultId = ref(undefined);

const beforeUpload = (e) => {
  return false;
};
const beforeUpload2 = (e) => {
  return false;
};

const customRequest = (e) => {
  console.log(e);
};

const handleFileChange = (event) => {
  const files = event.fileList;
  fileListProgres.value = Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    percent: 0,
    raw: file,
  }));
  console.log(fileListProgres.value);
};

// 第二个上传文件选择文件
const handleFileChange2 = (event) => {
  const files = event.fileList;
  fileListProgres2.value = Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    percent: 0,
    raw: file,
  }));
  console.log(fileListProgres2.value);
};

const confirm = () => {
  console.log('selected1',selected1.value)
  console.log('selected2',selected2.value)
  console.log('data_type',data_type.value)
  console.log('data_paired',params.value.data_paired)
  console.log('data_suffix',params.value.data_suffix)
  console.log('data_ext',params.value.data_ext)
  console.log('rna_strandness',params.value.rna_strandness)
  console.log('adapter',params.value.adapter)
  console.log('merge',params.value.merge)
  console.log('surv_type',params.value.surv_type)
  console.log('pred_err',params.value.pred_err)
  console.log('notify_by_email',params.value.notify_by_email)
  console.log('rpt_by_email',params.value.rpt_by_email)
  console.log(fileListProgres._rawValue, selected1._rawValue);
  // if (!selected1._rawValue)
  //   return message.warning("Please Select Input data type!");
  // if (!selected2._rawValue)
  //   return message.warning("Please Select Survival type!");
  // if (fileListProgres._rawValue.length == 0)
  //   return message.warning("Please select at least one file");
  let jsonData = {}; // 上传的json
  if(data_type.value == undefined) {
    return message.warning("Please Select data type!");
  } else if(data_type.value == "GeneExpr") {
    // geng上传 需要校验 surv_type Prediction Error Notify By Emai Rpt By Emai
      if(params.value.surv_type == undefined) {
        return message.warning("Please Select Surv type!");
      }

      if(params.value.pred_err == undefined) {
        return message.warning("Please Select Prediction Error!");
      }

      if(params.value.notify_by_email == undefined) {
        return message.warning("Please Select Notify By Email!");
      }

      if(params.value.rpt_by_email == undefined) {
        return message.warning("Please Select Rpt By Email!");
      }

       if (fileListProgres._rawValue.length == 0) {
        return message.warning("Please select at least one gene expr file");
       }
       jsonData = {
          dataType : data_type.value,
          survType : params.value.surv_type,
          predErr : params.value.pred_err,
          notifyByEmail: params.value.notify_by_email,
          rptByEmail: params.value.rpt_by_email,
       }
  } else { // RNA 数据上传
      if(params.value.data_paired == undefined) {
        return message.warning("Please Select data paired!");
      }

      if(params.value.rna_strandness == undefined) {
        return message.warning("Please Select rna strandness!");
      }

      if(params.value.merge == undefined) {
        return message.warning("Please Select Merge!");
      }

      if(params.value.surv_type == undefined) {
        return message.warning("Please Select Surv type!");
      }

      if(params.value.pred_err == undefined) {
        return message.warning("Please Select Prediction Error!");
      }

      if(params.value.notify_by_email == undefined) {
        return message.warning("Please Select Notify By Email!");
      }

      if(params.value.rpt_by_email == undefined) {
        return message.warning("Please Select Rpt By Email!");
      }

      if (fileListProgres._rawValue.length == 0) {
        return message.warning("Please select at least one gene expr file");
      }

      if (fileListProgres2._rawValue.length == 0) {
        return message.warning("Please select at least one clinical phenotype file");
      }

      jsonData = {
          dataType : data_type.value,
          dataPaired: params.value.data_paired,
          rnaStrandness: params.value.rna_strandness,
          orderMerge: params.value.merge,
          orderAdapter: params.value.adapter,
          dataSuffix: params.value.data_suffix,
          dataExt: params.value.data_ext,
          survType : params.value.surv_type,
          predErr : params.value.pred_err,
          notifyByEmail: params.value.notify_by_email,
          rptByEmail: params.value.rpt_by_email,
       }
  }

  post("/yl/ylOrder/add", jsonData).then((response) => {
    console.log(response);
    if (response.code == 200) {
      resultId.value = response.result.id;
      upLoading.value = true;
      const total = fileListProgres.value.length;
      let uploaded = 0;
      fileListProgres._rawValue.forEach((file) => {
        console.log(file);
          get("/yl/ylOrder/getAwsSignBucketUrl", {
              id: resultId.value,
              fileName: file.name,
              contentType: file.raw.type,
            }).then((res) => {
              console.log(res);
              if (res.code == 200) {
                let formData = new FormData();
                formData.append(`file`, file.raw);
                // let contentType = file.originFileObj.type;
                uploadApi(res.result, file.raw.originFileObj, ({ event }) => {
                  console.log(event, file);
                  if (event.lengthComputable) {
                    file.percent = Math.round((event.loaded / event.total) * 100);
                    console.log("2222", file);
                  }
                }).then((uploadRes) => {
                  // if (uploadRes.status == 200) {
                    uploaded++;
                    console.log("loading", upLoading);
                    if (uploaded === total) {
                      if(data_type.value == "GeneExpr") {
                        upLoading.value = false;
                        console.log(upLoading);
                        isClick.value = true;
                        showConfirm()
                      } else {
                        // 上传 RNA 数据
                        const total2 = fileListProgres2.value.length;
                        let uploaded2 = 0;
                        fileListProgres2._rawValue.forEach((file) => {
                        console.log(file);
                        get("/yl/ylOrder/getAwsClinSignBucketUrl", {
                            id: resultId.value,
                            fileName: file.name,
                            contentType: file.raw.type,
                          }).then((res) => {
                            console.log(res);
                            if (res.code == 200) {
                              let formData = new FormData();
                              formData.append(`file`, file.raw);
                              // let contentType = file.originFileObj.type;
                              uploadApi(res.result, file.raw.originFileObj, ({ event }) => {
                                console.log(event, file);
                                if (event.lengthComputable) {
                                  file.percent = Math.round((event.loaded / event.total) * 100);
                                  console.log("rna", file);
                                }
                              }).then((uploadRes) => {
                                  uploaded2++;
                                  console.log("loading", upLoading);
                                  if (uploaded2 === total2) {
                                    upLoading.value = false;
                                    console.log(upLoading);
                                    isClick.value = true;
                                    showConfirm()
                                  }
                              }).catch(
                                  function (error) {
                                    console.log('Show error notification!')
                                    upLoading.value = false;
                                      console.log("fail=" + error);
                                    message.warning("Upload fail :" + error);
                                    return Promise.reject(error)
                                  }
                              );
                            }else{
                              isClick.value = true;
                              upLoading.value = false;
                            }
                          });
                        });
                      }
                    }
                }).catch(
                    function (error) {
                      console.log('Show error notification!')
                      upLoading.value = false;
                        console.log("fail=" + error);
                      message.warning("Upload fail :" + error);
                      return Promise.reject(error)
                    }
                );
              }else{
                isClick.value = true;
                upLoading.value = false;
              }
            });
      });
    }
  }).catch(
      function (error) {
        console.log('Show error notification!')
          upLoading.value = false;
          console.log("fail=" + error);
          message.warning("error :" + error);
        return Promise.reject(error)
      }
  );
};

const startCount = () => {
  console.log(resultId);
  get("/yl/ylOrder/uploadAndCallLambda", {
    id: resultId.value,
  }).then((res) => {
    if (res.code == 200) {
      message.success("Calculation succeeded");
      isClick.value = false;
      selected1.value = undefined;
      selected2.value = undefined;
      fileListProgres.value = [];
      fileList.value = []
      router.push({
        path: '/pages/landing-pages/prediction-list'
      })
    }
  });
};

const uploadFilesAction = () => {
  get("/yl/ylOrder/uploadFilesAction", {
    id: resultId.value,
  }).then((res) => {
    if (res.code == 200) {
      message.success("upload success, you can initiate compute in list page.");
      isClick.value = false;
      selected1.value = undefined;
      selected2.value = undefined;
      fileListProgres.value = [];
      fileList.value = []
    }
  })
}

const showConfirm = () => {
    Modal.confirm({
      title: () => 'The upload has been completed, do you want to start the calculation now?',
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => '',
      okText: () => 'Yes',
      okType: 'success',
      cancelText: () => 'No',
      onOk() {
        console.log('OK');
        startCount()
      },
      onCancel() {
        console.log('Cancel');
        uploadFilesAction()
      },
    });
  };

  // 修改选项
const handleChange1 = (val) => {
  if(val == 'Single end'){
    rna_standess_option.value = [
      {
          value: 'F',
          label: 'F',
        },{
          value: 'R',
          label: 'R',
        },{
          value: 'Unstranded',
          label: 'Unstranded',
        }
    ]
  } else {
    rna_standess_option.value = [
      {
          value: 'FR',
          label: 'FR',
        },{
          value: 'RF',
          label: 'RF',
        },{
          value: 'Unstranded',
          label: 'Unstranded',
        }
    ]
  }
}

const handleChange = (val) => {
  if(val == 'GeneExpr'){
    isNeedUplaodclinical.value = false
    isNeedUplaodGen.value = true
    childOptions.value = [
      {
        name: 'Surv Type',
        id: 'surv_type',
        options: [{
          value: 'Recurrence',
          label: 'Recurrence',
        },{
          value: 'Death',
          label: 'Death',
        }],
        type: 'select',
        tip: `Choose the type of prognosis to predict.
          Recurrence: Counting from diagnosis date, the time of recurrence free interval (RFI)
          Death: Counting from diagnosis date, the time of overall survival (OS)`
      },
      {
        id: 'pred_err',
        name: 'Prediction Error',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to estimate prediction error, you must upload clinical phenotype data.`
      },
      {
        id: 'notify_by_email',
        name: 'Notify By Email',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to receive notifications by email, expected computation completion time, any
missing genes etc. will be sent to your email address.`
      },
      {
        id: 'rpt_by_email',
        name: 'Rpt By Email',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to receive report by email, full results will be sent to your email address as a
compressed file.`
      }
    ]
  }else if(val == 'RNAseq'){
    isNeedUplaodclinical.value = true
    isNeedUplaodGen.value = true
    childOptions.value = [
      {
        id: 'data_paired',
        name: 'Data Paired',
        options: [{
          value: 'Paired end',
          label: 'Paired end',
        },{
          value: 'Single end',
          label: 'Single end',
        }],
        type: 'select1',
        tip: `Please specify your RNA-seq data as paired-end or single-end.`
      },
      {
        id: 'rna_strandness',
        name: 'Rna Strandness',
        options: rna_standess_option,
        type: 'select',
        tip: `(Please provide the strandness of the RNA-seq data.
        “F” stands for forward strand-specific sequencing, i.e., the sequenced RNA molecules are
        derived from the sense/positive strand of the genome.
        “R” stands for reverse strand-specific sequencing, i.e., the sequenced RNA molecules are
        derived from the antisense/negative strand of the genome.
        For single-end RNA-seq data: “F” or “R”.
        For paired-end RNA-seq data: “FR” or “RF”.
        Default is “Unstranded”)`
      },
      {
        id: 'merge',
        name: 'Merge',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `For paired-end RNA-seq data, if the reads from both ends have significant overlap, it is
        recommended to merge the reads from both ends.
        Default value is ‘No’`
      },
      {
        id: 'surv_type',
        name: 'Surv Type',
        options: [{
          value: 'Recurrence',
          label: 'Recurrence',
        },{
          value: 'Death',
          label: 'Death',
        }],
        type: 'select',
        tip: `Choose the type of prognosis to predict.
          Recurrence: Counting from diagnosis date, the time of recurrence free interval (RFI)
          Death: Counting from diagnosis date, the time of overall survival (OS)`
      },
      {
        id: 'pred_err',
        name: 'Pred Error',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to estimate prediction error, you must upload clinical phenotype data.`
      },
      {
        id: 'adapter',
        name: 'Adapter',
        options: [],
        type: 'input',
        tip: `The short DNA sequence that is ligated to target molecules during library preparation.
        The default value is ‘AutoDetect‘.
          For single-end RNA-seq data: one sequence.
          For paired-end RNA-seq data: two sequences for both ends.
          please Use ‘|‘ as a split match like [‘xxxx|xxxx’].`
      },
      {
        id: 'data_suffix',
        name: 'Data Suffix',
        options: [],
        type: 'input',
        tip: `In the RNA-seq file name, the part that indicates strand direction. For example, for pairedend RNA-seq data for Sample:
          Sample_R1.fastq
          Sample_R2.fastq
          please Use ‘|‘ as a split match like [‘_R1|_R2’]
          if it is single-end RNA-seq data, and there is nothing between sample name and file
          extension, please leave it empty.`
      },
      {
        id: 'data_ext',
        name: 'data Ext',
        options: [],
        type: 'input',
        tip: `The extension of RNA-seq file name. For example, for paired-end RNA-seq data for Sample:
          Sample_R1.fastq
          Sample_R2.fastq
          please enter ‘.fastq’`
      },
      {
        id: 'notify_by_email',
        name: 'Notify By Email',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to receive notifications by email, expected computation completion time, any
missing genes etc. will be sent to your email address.`
      },
      {
        id: 'rpt_by_email',
        name: 'Rpt By Email',
        options: [{
          value: 'Yes',
          label: 'Yes',
        },{
          value: 'No',
          label: 'No',
        }],
        type: 'select',
        tip: `If you choose to receive report by email, full results will be sent to your email address as a
compressed file.`
      }
    ]
  }else{
    childOptions.value = []
  }
}
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <a-spin tip="upload-Loading..." :spinning="upLoading">
    <DefaultNavbar
      :action="{
        route: '/pages/landing-pages/basic',
        label: 'Sign In',
        color: 'btn-white',
      }"
      transparent
    />
    <header class="bg-gradient-dark" :style="{ backgroundImage: `url(${bg0})` }">
      <div
        class="page-header min-vh-fill"
        :style="{ backgroundImage: `url(${bg0})` }"
      >
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container" style="padding-top: 50px">
          <div
            class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
          >
            <div
              class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
            >
              <div
                class="bg-gradient-success shadow-success border-radius-lg p-3"
              >
                <h3 class="text-white text-success mb-0">
                  Upload Data and compute
                </h3>
              </div>
            </div>

            <div class="card-body">
              <p>
                Please Select Input data type and Survival type, then choose the
                upload
              </p>

              <div style="display: flex; flex-wrap: wrap">
                <!-- <div style="width: 100%">
                  <Select
                    placeholder="Please Select Input data type"
                    style="width: 400px; margin-top: 10px; margin-right: 10px"
                    v-model:value="selected1"
                    :options="options"
                    id="selected1"
                  >
                    <template #suffix>
                      <i
                        class="ant-select-arrow ant-select-arrow-icon"
                        style="color: #ccc"
                      ></i>
                    </template>
                  </Select>
                </div>
                <div style="width: 100%">
                  <Select
                    placeholder="Please Select Survival type"
                    style="width: 400px; margin-top: 10px"
                    v-model:value="selected2"
                    id="selected2"
                    :options="options2"
                  >
                    <template #suffix>
                      <i
                        class="ant-select-arrow ant-select-arrow-icon"
                        style="color: #ccc"
                      ></i>
                    </template>
                  </Select>
                  <Icon type="question-circle" />
                </div> -->
                <div style="width: 50%">
                  <label class="my_label">Data Type：</label>
                  <Select
                    placeholder="Please Select Input data type"
                    style="width: 400px; margin-top: 10px; margin-right: 10px"
                    v-model:value="data_type"
                    :options="options3"
                    id="selected3"
                    @change="handleChange"
                  >
                    <template #suffix>
                      <i
                        class="ant-select-arrow ant-select-arrow-icon"
                        style="color: #ccc"
                      ></i>
                    </template>
                  </Select>
                </div>
                <template v-if="data_type">
                  <div style="width: 50%" v-for="item in childOptions" :key="item.name">
                    <label class="my_label">{{ item.name }}：</label>
                    <Select
                      v-if="item.type == 'select'"
                      :placeholder="item.name"
                      style="width: 400px; margin-top: 10px; margin-right: 10px"
                      v-model:value="params[item.id]"
                      :options="item.options"
                    >
                      <template #suffix>
                        <i
                          class="ant-select-arrow ant-select-arrow-icon"
                          style="color: #ccc"
                        ></i>
                      </template>
                    </Select>
                    <Select
                      v-if="item.type == 'select1'"
                      :placeholder="item.name"
                      style="width: 400px; margin-top: 10px; margin-right: 10px"
                      v-model:value="params[item.id]"
                      @change="handleChange1"
                      :options="item.options"
                    >
                      <template #suffix>
                        <i
                          class="ant-select-arrow ant-select-arrow-icon"
                          style="color: #ccc"
                        ></i>
                      </template>
                    </Select>
                    <a-input v-if="item.type == 'input'" style="width: 400px; margin-top: 10px; margin-right: 10px" v-model:value="params[item.id]" :placeholder="item.name" />
                    <a-tooltip :title="item.tip" color="#66bb6a">
                      <QuestionCircleOutlined />
                    </a-tooltip>
                  </div>
                </template>
                <div style="width: 100%; margin-top: 10px;padding-left: 120px;display: flex;justify-content: flex-start;">
                  <div class="upload_one" style="margin-right:15px" v-if="isNeedUplaodGen == true">
                    <a-upload
                      v-model:file-list="fileList"
                      :showUploadList="false"
                      name="file"
                      :multiple="true"
                      :beforeUpload="beforeUpload"
                      @change="handleFileChange"
                    >
                      <a-button>
                        <upload-outlined></upload-outlined>
                        Click to Select GeneExpr File
                      </a-button>
                    </a-upload>
                    <div v-for="(file, index) in fileListProgres" :key="index">
                      <p style="margin: 0px; margin-bottom: 5px">
                        {{ file.name }}
                      </p>
                      <a-progress :percent="file.percent" />
                    </div>
                  </div>
                  <div class="upload_two" v-if="isNeedUplaodclinical == true">
                    <a-upload
                      v-model:file-list="fileList2"
                      :showUploadList="false"
                      name="file2"
                      :multiple="true"
                      :beforeUpload="beforeUpload2"
                      @change="handleFileChange2"
                    >
                      <a-button>
                        <upload-outlined></upload-outlined>
                        Click to Select Clinical Phenotype File
                      </a-button>
                    </a-upload>
                    <div v-for="(file2, index) in fileListProgres2" :key="index">
                      <p style="margin: 0px; margin-bottom: 5px">
                        {{ file2.name }}
                      </p>
                      <a-progress :percent="file2.percent" />
                    </div>
                  </div>
                </div>

                <div
                  class="card-body"
                  style="width: 100%; padding: 0px; margin-top: 10px;padding-left: 120px;"
                >
                  <MaterialButton
                    variant="gradient"
                    color="success"
                    @click="confirm"
                    >Confirm</MaterialButton
                  >
                </div>

                <!-- <div
                  class="card-body"
                  style="width: 100%; padding: 0px; margin-top: 10px"
                  v-if="isClick"
                >
                  <MaterialButton
                    variant="gradient"
                    color="success"
                    @click="startCount"
                    >Start Count</MaterialButton
                  >
                </div> -->
              </div>
            </div>

            <div class="card-body" style="padding-top:0px !important">
              <a href="/pages/landing-pages/prediction-list" 
                  class="text-success icon-move-right"
                >* My prediction list
                <i class="fas fa-arrow-right text-sm ms-1"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </header>
    <DefaultFooter />
  </a-spin>
</template>
<style scoped>
.my_label{
  width: 120px;
  font-weight: 600;
  text-align: right;
  color: #000;
  margin-left: 0px;
}
</style>