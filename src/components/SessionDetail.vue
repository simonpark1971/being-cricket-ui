<template>
  <div class="container" id="app">
    <el-row>
      <el-col style="padding-left: 80px" :span="15">
        <h2>Enter Session Details</h2>
        <el-form :model="sessionForm" ref="sessionForm" :rules="rules">
          <el-form-item label="Start date and time" :label-width="formLabelWidth">
            <el-date-picker v-model="sessionForm.startDateTime" type="datetime" placeholder="Set date and time">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Location" :label-width="formLabelWidth" prop="location">
            <el-select v-model="sessionForm.sessionLocation.locationName" auto-complete="off">
              <el-option v-for="item in locations" :key="item.key" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Duration" :label-width="formLabelWidth" prop="minutesDuration">
            <el-input-number v-model="sessionForm.minutesDuration" :min="30" :max="300" :step="30">
            </el-input-number>
          </el-form-item>
          <el-form-item label="Available to book" :label-width="formLabelWidth">
            <el-switch v-model="sessionAvailable">
            </el-switch>
          </el-form-item>
        </el-form>
        <span style="float: right; margin-top: 20px">
          <el-button @click="$router.go(-1)" size="small">Cancel</el-button>
          <el-button type="primary" @click="addSession" size="small">Save</el-button>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      sessionForm: {
        sessionLocation: {
          locationName: 'Basford'
        },
        startDateTime: null,
        minutesDuration: 0,
        sessionStatus: ''
      },
      locations: [{key: 'Basford', value: 'Basford'}, {key: 'Trent Bridge', value: 'Trent Bridge'}],
      formValid: false,
      rules: {
        title: [ { required: true, message: 'Please enter a title', trigger: 'blur' } ],
        playerName: [ { required: true, message: 'Please enter player name', trigger: 'blur' } ],
        category: [ { required: true, message: 'Please enter category', trigger: 'blur' } ]
      },
      formLabelWidth: '120px',
      noSessionsText: 'No sessions found',
      videos: null,
      selected: []
    }
  },

  mounted: function () {
    var self = this
    axios.get('http://localhost:8081/getallsessions').then(function (response) {
      self.sessions = response.data
    })

    axios.get('http://localhost:8081/getallvideos').then(function (response) {
      self.videos = response.data
    })
  },

  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },

  methods: {
    addSession: function () {
      var self = this
      if (this.sessionAvailable === true) {
        this.sessionForm.sessionStatus = 'AVAILABLE'
      } else {
        this.sessionForm.sessionStatus = 'FREE'
      }
      axios.post('http://localhost:8081/addsession', this.sessionForm).then(function (response) {
        axios.get('http://localhost:8081/getallsessions').then(function (response) {
          self.sessions = response.data
          self.$router.push('/BeingCricket/Sessions')
        })
      })
    }
  }
}
</script>
