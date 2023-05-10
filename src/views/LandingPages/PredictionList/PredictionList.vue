<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { get, post } from "@/api/index";
import { uploadApi } from "@/api/api";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { Select, message, Spin, Modal } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//image
// import image from "@/assets/img/illustrations/illustration-signin.jpg";
import bg0 from "@/assets/img/vue-mk-header.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";

const dataSource = reactive([]);
const currentRecord = reactive({});
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false)
const fileList0 = ref([]);
const fileList = ref([]);
const upLoading = ref(false);
const visible = ref(false);


const queryList = () => {
  loading.value = true
  get("/yl/ylOrder/list", { pageNo: currentPage.value, pageSize: pageSize.value, }).then((response) => {
    loading.value = false
    // console.log(response);
    if (response.code == 200) {
      dataSource.value = response.result.records;
      total.value = response.result.total
    }
  }).catch(err => {
    loading.value = false
  });
};

const handlePageChange = (val) => {
  currentPage.value = val
  queryList()
}

const onShowSizeChange = (currentNum, pageSizeNum) => {
  console.log(pageSizeNum)
  currentPage.value = 1
  pageSize.value = pageSizeNum
  queryList()
}


const columns = [
  {
    title: "Create Time",
    key: 'createTime',
    dataIndex: "createTime",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "Input Data Type",
    dataIndex: "inputDataType",
    key: 'inputDataType',
    slots: { customRender: 'inputDataType' },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "Survival Type",
    dataIndex: "survivalType",
    key: "survivalType",
    slots: { customRender: 'survivalType' },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    slots: { customRender: 'orderStatus' },
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "Tips",
    dataIndex: "reception",
    key: "reception",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "User",
    dataIndex: "userName",
    key: "userName",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
    ellipsis: true,
    tooltip: true,
  },
];

const handleCancle = () => {
  visible.value = false;
  currentRecord.value = {}
  fileList0.value = []
  fileList.value = [];
}

const handleOk = () => {
  // visible.value = false;
  // console.log(fileList,currentRecord)
  if (fileList._rawValue.length == 0)
    return message.warning("Please select at least one file");

  let resultId = currentRecord.value.id;
  console.log(resultId)
  upLoading.value = true;
  const total = fileList.value.length;
  let uploaded = 0;
  fileList._rawValue.forEach((file) => {
    get("/yl/ylOrder/getAwsSignBucketUrl", {
      id: resultId,
      fileName: file.name,
      contentType: file.raw.type,
    }).then((res) => {
      console.log(res);
      if (res.code == 200) {
        let formData = new FormData();
        formData.append(`file`, file.raw);
        let contentType = file.originFileObj.type;
        uploadApi(res.result, file.raw.originFileObj, contentType, ({ event }) => {
          console.log(event, file);
          if (event.lengthComputable) {
            file.percent = Math.round((event.loaded / event.total) * 100);
          }
        }).then((uploadRes) => {
          // if (uploadRes.status == 200) {

          // } else {

          // }
          uploaded++;
          console.log("loading", upLoading);
          if (uploaded === total) {
            upLoading.value = false;
            uploadFilesAction()
          }
        })
      }
    })

  })



}

const uploadFilesAction = () => {
  get("/yl/ylOrder/uploadFilesAction", {
    id: currentRecord.value.id,
  }).then((res) => {
    if (res.code == 200) {
      message.success("uploadAction success, you can initiate compute in list page.");
      visible.value = false;
      currentRecord.value = {}
      fileList0.value = []
      fileList.value = [];
      queryList()
    }
  })
}

const beforeUpload = (e) => {
  return false;
};

const handleFileChange = (event) => {
  const files = event.fileList;
  fileList.value = Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    percent: 0,
    raw: file,
  }));
  // console.log(fileList.value);
};

const uploadFile = (record) => {
  currentRecord.value = record
  visible.value = true;
}

const compute = (record) => {
  console.log(record)
  get("/yl/ylOrder/uploadAndCallLambda", {
    id: record.id,
  }).then((res) => {
    if (res.code == 200) {
      message.success('compute succeeded')
      queryList()
    }
  })
}

const downLoad = (record) => {
  console.log(record)
  get("/yl/ylOrder/getDownloadUrlById", { id: record.id }).then((response) => {
    console.log(response);
    if (response.code == 200) {
      var a = document.createElement('a') // 创建一个<a></a>标签
      a.href = response.result
      // a.download = 'result.txt' // 设置下载文件文件名
      a.style.display = 'none' // 隐藏a标签
      a.target = "_blank"
      document.body.appendChild(a) // 将a标签追加到文档对象中
      a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
      a.remove() // 一次性的，用完就删除a标签
    }
  }).catch(err => {
    console.log(err)
  });
}

const scrollX = ref(false)

const handleResize = () => {
  
    if (window.innerWidth < 770) {
      scrollX.value = true
    } else {
      scrollX.value = false
    }
  }

onMounted(() => {
  setMaterialInput();
  queryList();
  window.addEventListener('resize', handleResize)
  handleResize()
});

onBeforeUnmount(() => {
  console.log('beforeUnmount')
  window.removeEventListener('resize', handleResize)
});

</script>
<template>
  <!-- upLoading -->
  <a-spin tip="upload-Loading..." v-if="upLoading" :spinning="upLoading">
    <div style="width: 100vw;height: 100vh;display: none;" ></div>
  </a-spin>
    <DefaultNavbar :action="{
      route: '/pages/landing-pages/basic',
      label: 'Sign In',
      color: 'btn-white',
    }" transparent />

    <header class="bg-gradient-dark">
      <div class="page-header min-vh-fill" :style="{ backgroundImage: `url(${bg0})` }">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container" style="padding-top: 80px;padding-bottom: 30px;">
          <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-success shadow-success border-radius-lg p-3">
                <h3 class="text-white text-success mb-0">
                  My prediction list
                </h3>
              </div>
            </div>
            <div class="card-body" style="padding-top:30px !important">
              <a href="/pages/landing-pages/upload-data" 
                  class="text-success icon-move-right"
                >* Upload data & compute and predict
                <i class="fas fa-arrow-right text-sm ms-1"></i>
              </a>
            </div>
            <div class="card-body" style="padding-top:0px !important">
              <a-table :dataSource="dataSource.value" :columns="columns" :pagination="false" :loading="loading">
                <template #inputDataType="{ text }">
                  <span v-if="text == '1'">Raw RNA-seq</span>
                  <span v-else-if="text == '2'">Gene expression (FPKM) full table</span>
                  <span v-else-if="text == '3'">Gene expression (FPKM) 500 gene table</span>
                  <span v-else-if="text == '4'">Gene expression (FPKM) 1000 gene table</span>
                  <span v-else-if="text == '5'">Gene expression (FPKM) 1500 gene table</span>
                  <span v-else-if="text == '6'">Gene expression (FPKM) 2000 gene table</span>
                  <span v-else>{{ text }}</span>
                </template>
                <template #survivalType="{ text }">
                  <span v-if="text == '1'">Recurrence Free Interval (RFI)</span>
                  <span v-else-if="text == '2'">Overall Survival (OS)</span>
                  <span v-else-if="text == '3'">RFI and OS</span>
                  <span v-else>{{ text }}</span>
                </template>
                <template #orderStatus="{ text }">
                  <span v-if="text == '0'">Need upload Data</span>
                  <span v-else-if="text == '1'">uploaded Data but no compute</span>
                  <span v-else-if="text == '2'">Computing</span>
                  <span v-else-if="text == '3'">Finish</span>
                  <span v-else>{{ text }}</span>
                </template>
                <template #action="{ record }">
                  <span v-if="record.orderStatus == 0">
                    <a-button type="link" @click.prevent="uploadFile(record)">upload file</a-button>
                  </span>
                  <span v-else-if="record.orderStatus == 1">
                    <a-button type="link" @click.prevent="compute(record)">compute</a-button>
                  </span>
                  <span v-else-if="record.orderStatus == 3">
                    <a-button type="link" @click.prevent="downLoad(record)">download</a-button>
                  </span>
                  <span v-else>
                    <a-button type="link" disabled>compute</a-button>
                  </span>
                </template>
              </a-table>
              <a-pagination :current="currentPage" :total="total" :page-size="pageSize" show-size-changer
                @change="handlePageChange" @showSizeChange="onShowSizeChange"></a-pagination>
            </div>
          </div>
        </div>
      </div>
    </header>
    <DefaultFooter />
    <a-modal v-model:visible="visible" title="Upload File" @ok="handleOk" @cancel="handleCancle">

      <div style="width: 100%;">
        <a-upload v-model:file-list="fileList0" :showUploadList="false" name="file" :multiple="true"
          :beforeUpload="beforeUpload" @change="handleFileChange">
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Select File
          </a-button>
        </a-upload>
        <div v-for="(file, index) in fileList" :key="index">
          <p style="margin: 0px; margin-bottom: 5px">
            {{ file.name }}
          </p>
          <a-progress :percent="file.percent" />
        </div>
      </div>

    </a-modal>
</template>

<style scoped>

.ant-spin-nested-loading{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  height: 100vh;
  width: 100vw;
}
.ant-btn-link{
  color: #4caf50 !important;
}
.ant-modal-wrap {
  z-index: 100 !important;
}
.ant-pagination {
  text-align: right;
  margin-top: 20px;
}
/* .ant-pagination-item-ellipsis{
  background-color: #fff;
} */

/* .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis{
  background-color: #fff !important;
} */
</style>
