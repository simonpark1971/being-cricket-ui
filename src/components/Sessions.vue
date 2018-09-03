<template>
  <div class="container" id="app">
    <el-table :data="sessions" height="450" style="width: 100%" :stripe="true" :empty-text="noSessionsText">
      <el-table-column :formatter="dateFormatter" label="Date / time" width="180"></el-table-column>
      <el-table-column prop="minutesDuration" label="Duration" width="180"></el-table-column>
      <el-table-column prop="sessionLocation.locationName" label="Location"></el-table-column>
      <el-table-column prop="sessionVideos.length" label="Videos">
        <template slot-scope="scope">
          <el-popover ref="popover" placement="bottom" width="250" v-model="scope.row.visible">
            <el-table :data="videos" height="100" style="width: 100%" :stripe="true" empty-text="No Videos" @selection-change="handleSelectionChange">
              <el-table-column label="Select" type="selection"></el-table-column>
              <el-table-column prop="title" label="Video"></el-table-column>
            </el-table>
            <el-button type="primary" size="mini" style="float: right" @click="updateSession(scope.row)">Add</el-button>
          </el-popover>
          <el-button v-popover:popover @click="scope.row.visible = true">{{scope.row.sessionVideos.length}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Actions">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="Book session" placement="right">
            <el-button v-if="scope.row.sessionStatus === 'AVAILABLE'" @click="bookSession(scope.row)" type="text">
              <mdi-lock-open-icon :width="16" :height="16" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Session booked" placement="right">
            <el-button v-if="scope.row.sessionStatus !== 'AVAILABLE'" type="text" >
              <mdi-lock-icon :width="16" :height="16" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Cancel this session" placement="right">
            <el-button @click="cancelSession(scope.row)" type="text" size="mini"><mdi-delete-icon  :width="16" :height="16"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <span style="float: right; margin-top: 20px">
      <router-link to="/SessionDetail">
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">Add Session</el-button>
      </router-link>
    </span>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      sessions: null,
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

  methods: {
    updateSession: function (row) {
      var self = this
      row.sessionVideos = this.selected
      row.visible = false
      axios.post('http://localhost:8081/updatesession', row).then(function (data) {
        self.sessions = data
      })
    },

    handleSelectionChange: function (val) {
      this.selected = val
    },

    cancelSession: function (row) {
      var self = this
      axios.get('http://localhost:8081/cancelSession?id=' + row.id).then(function (response) {
        self.sessions = response.data
      })
    },

    bookSession: function (row) {
      axios.post('http://localhost:8081/booksession', row).then(function () {
        row.sessionStatus = 'BOOKED'
      })
    },

    dateFormatter: function (value) {
      return moment(value.startDateTime, 'x').format('DD MMM YYYY HH:mm')
    }
  }
}
</script>
