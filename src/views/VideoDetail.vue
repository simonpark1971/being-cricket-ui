<template>
  <div class="container" id="app">
    <el-row>
      <el-col style="padding-left: 80px" :span="15">
        <h2>Enter Video Details</h2>
        <el-form :model="form" :rules="rules" ref="videoForm" >
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
        <span style="float: right">
          <el-upload ref="upload" action="http://localhost:8081/upload" :auto-upload="true" :data="form" :multiple="false" :on-success="backToVideos">
            <el-button size="small" @click="$router.go(-1)">Cancel</el-button>
            <el-button size="small" type="primary" icon="el-icon-upload" @click="submitUpload('videoForm')">Upload</el-button>
          </el-upload>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      formValid: false,
      rules: {
        title: [ { required: true, message: 'Please enter a title', trigger: 'blur' } ],
        playerName: [ { required: true, message: 'Please enter player name', trigger: 'blur' } ],
        category: [ { required: true, message: 'Please enter category', trigger: 'blur' } ]
      }
    }
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
    submitUpload: function (formName) {
      this.formValid = this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs['upload'].submit()
        } else {
          return false
        }
      })
    },

    backToVideos: function () {
      this.$router.push('/BeingCricket/Videos')
    }
  }
}
</script>
