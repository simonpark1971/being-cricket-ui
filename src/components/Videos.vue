<template>
  <div class="container" id="app">

    <el-dialog title="Watch Video" :visible.sync="watchDialogFormVisible" :beforeClose="hideVideoViewer">
      <div>
        <video id="video" controls :src="videoSource">
          <source video-player id="channel"/>
        </video>
      </div>
    </el-dialog>

    <!-- Add Video Form -->
    <el-dialog title="Add Video" :visible.sync="addDialogFormVisible">
      <el-form :model="form" ref="videoForm" :rules="rules">
        <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Player Name" :label-width="formLabelWidth" prop="playerName">
          <el-input v-model="form.playerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Video Name" :label-width="formLabelWidth">
          <el-input v-model="form.videoName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Date" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="Session date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Category" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" auto-complete="off">
            <el-option v-for="item in categories" :key="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Comments" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.comments"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-upload ref="upload" action="http://localhost:8081/upload" :auto-upload="false" :data="form" :on-success="updateList">
          <el-button slot="trigger" size="small" type="primary">Select file</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload" @click="submitUpload('videoForm')">Upload</el-button>
        </el-upload>
      </span>
    </el-dialog>

    <el-table :data="videos" height="450" style="width: 100%" :stripe="true" :empty-text="noVideoText">
      <el-table-column prop="title" label="Title" width="180"></el-table-column>
      <el-table-column prop="playerName" label="Player Name" width="180"></el-table-column>
      <el-table-column prop="videoName" label="Video Name"></el-table-column>
      <el-table-column prop="date" label="Date"></el-table-column>
      <el-table-column prop="category" label="Category"></el-table-column>
      <el-table-column fixed="right" label="Actions">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="Watch this video" placement="right">
            <el-button @click="showWatchVideo(scope.row)" type="text" size="mini"><mdi-video-icon  :width="16" :height="16"/></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Delete this video" placement="right">
            <el-button @click="deleteVideo(scope.row)" type="text" size="mini"><mdi-delete-icon  :width="16" :height="16"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <span style="float: right; margin-top: 20px">
      <router-link to="/VideoDetail">
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">Add Video</el-button>
      </router-link>
    </span>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      videos: null,
      addDialogFormVisible: false,
      watchDialogFormVisible: false,
      form: {
        id: '',
        title: '',
        playerName: '',
        videoName: '',
        date: null,
        category: 'Batting',
        playerId: 'george-park',
        comments: '',
        description: ''
      },
      categories: [{key: 'Batting', value: 'Batting'}, {key: 'Bowling', value: 'Bowling'}],
      formLabelWidth: '120px',
      videoSource: null,
      noVideoText: 'There are no videos currently',
      formValid: false,
      rules: {
        title: [ { required: true, message: 'Please enter a title', trigger: 'blur' } ],
        playerName: [ { required: true, message: 'Please enter player name', trigger: 'blur' } ],
        category: [ { required: true, message: 'Please enter category', trigger: 'blur' } ]
      }
    }
  },

  mounted: function () {
    var self = this
    axios.get('http://localhost:8081/getallvideos').then(function (response) {
      self.videos = response.data
    })
  },

  methods: {
    submitUpload: function (formName) {
      this.formValid = this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs['upload'].submit()
        } else {
          return false
        }
      })
    },

    showWatchVideo: function (row) {
      this.videoSource = 'http://localhost:8081/download?id=' + row.id
      this.watchDialogFormVisible = true
    },

    deleteVideo: function (row) {
      var self = this
      axios.get('http://localhost:8081/deletevideo?id=' + row.id).then(function (response) {
        self.videos = response.data
      })
    },

    hideVideoViewer: function () {
      this.watchDialogFormVisible = false
      this.videoSource = ''
    },

    updateList: function (response, file, fileList) {
      var self = this
      axios.get('http://localhost:8081/getallvideos').then(function (response) {
        self.videos = response.data
      })
      this.addDialogFormVisible = false
    }
  }
}
</script>
