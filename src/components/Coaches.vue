<template>
  <div class="container" id="app">
    <el-table :data="coaches" height="450" style="width: 100%" :stripe="true" :empty-text="noCoachesText">
      <el-table-column prop="firstName" label="First name" width="180"></el-table-column>
      <el-table-column prop="surname" label="Surname" width="180"></el-table-column>
      <el-table-column prop="maxQualification" label="Highest Qualification" width="180"></el-table-column>
      <el-table-column prop="location" label="Location" width="180"></el-table-column>
      <!--<el-table-column label="Rating">-->
        <!--<template slot-scope="scope">-->
          <!--<el-rate v-model="scope.row.rating" disabled show-score text-color="#ff9900" :score-template="scope.row.rating">-->
          <!--</el-rate>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <span style="float: right; margin-top: 20px">
      <router-link to="/CoachDetail">
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">Add Coach</el-button>
      </router-link>
    </span>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      coaches: null,
      noCoachesText: 'There are no coaches in the directory currently'
    }
  },

  mounted: function () {
    var self = this
    axios.get('http://localhost:8081/getallcoaches').then(function (response) {
      self.coaches = response.data
    })
  }
}
</script>
