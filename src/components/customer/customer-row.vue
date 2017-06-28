<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">是否需要行车：</span>
      <span class="expand-value">{{ row.isDriving }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">车辆吨位：</span>
      <span class="expand-value">{{ row.driviecontent }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">配电量(kva)：</span>
      <span class="expand-value">{{ row.distribution }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <span class="expand-key">跟踪情况：</span>
      <span class="expand-value">《{{ row.trackingstatus }}》</span>
      </Col>
      <Col span="8">
      <span class="expand-key">企业性质：</span>
      <span class="expand-value">{{ row.nature }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">房源面积(单位:㎡)：</span>
      <span class="expand-value">{{ row.housearea }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
