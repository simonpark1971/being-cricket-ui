<template>
  <div class="container" id="app">
    <el-row>
      <el-col style="padding-left: 80px" :span="15">
        <h2>Enter Coach Detail</h2>
        <el-form :model="form" ref="videoForm" :rules="rules">
          <el-form-item label="First name" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.firstName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Surname" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.surname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Main contact method" :label-width="formLabelWidth">
            <el-select v-model="form.mainContactMethod" auto-complete="off">
              <el-option v-for="item in contactTypes" :key="item.key" :value="item.value"></el-option>
            </el-select>
            <el-input v-if="form.mainContactMethod == 'Email'" v-model="form.emailAddress" auto-complete="off"></el-input>
            <el-input v-if="form.mainContactMethod == 'Mobile'" v-model="form.mobilePhoneNumber" auto-complete="off"></el-input>
            <el-input v-if="form.mainContactMethod == 'Land line'" v-model="form.landlinePhoneNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Secondary contact method" :label-width="formLabelWidth">
            <el-select v-model="form.secondaryContactMethod" auto-complete="off">
              <el-option v-for="item in contactTypes" :key="item.key" :value="item.value"></el-option>
            </el-select>
            <el-input v-if="form.secondaryContactMethod == 'Email'" v-model="form.emailAddress" auto-complete="off"></el-input>
            <el-input v-if="form.secondaryContactMethod == 'Mobile'" v-model="form.mobilePhoneNumber" auto-complete="off"></el-input>
            <el-input v-if="form.secondaryContactMethod == 'Land line'" v-model="form.landlinePhoneNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Highest coaching qualification" :label-width="formLabelWidth">
            <el-select v-model="form.maxQualification" auto-complete="off">
              <el-option v-for="item in qualifications" :key="item.key" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="Coaching formats offered">
              <el-checkbox v-model="form.groupCoaching" label="Group coaching" :label-width="formLabelWidth"></el-checkbox>
              <el-checkbox v-model="form.oneToOneCoaching" label="1-2-1" :label-width="formLabelWidth"></el-checkbox>
              <el-checkbox v-model="form.clubCoaching" label="Club coaching" :label-width="formLabelWidth"></el-checkbox>
            </el-form-item>
          <el-form-item label="Specialist skills offered" :label-width="formLabelWidth">
            <el-checkbox v-model="form.battingCoaching" label="Batting" :label-width="formLabelWidth"></el-checkbox>
            <el-checkbox v-model="form.fastBowlingCoaching" label="Fast Bowling" :label-width="formLabelWidth"></el-checkbox>
            <el-checkbox v-model="form.spinBowlingCoaching" label="Spin Bowling" :label-width="formLabelWidth"></el-checkbox>
            <el-checkbox v-model="form.fieldingCoaching" label="Fielding" :label-width="formLabelWidth"></el-checkbox>
            <el-checkbox v-model="form.wicketKeepingCoaching" label="Wicket Keeping" :label-width="formLabelWidth"></el-checkbox>
          </el-form-item>
          <el-form-item label="Location" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.location" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span style="float: right; margin-top: 20px">
          <el-button @click="$router.go(-1)" size="small">Cancel</el-button>
          <el-button type="primary" @click="submitForm" size="small">Save</el-button>
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
      form: {
        firstName: '',
        surname: '',
        mainContactMethod: '',
        secondaryContactMethod: '',
        emailAddress: '',
        mobilePhoneNumber: '',
        landlinePhoneNumber: '',
        groupCoaching: false,
        oneToOneCoaching: false,
        clubCoaching: false,
        battingCoaching: false,
        fastBowlingCoaching: false,
        spinBowlingCoaching: false,
        wicketKeepingCoaching: false,
        fieldingCoaching: false,
        maxQualification: ''
      },
      qualifications: [
        {key: 'L1', value: 'ECB Level 1'},
        {key: 'L2', value: 'ECB Level 2'},
        {key: 'L3', value: 'ECB Level 3'},
        {key: 'L4', value: 'ECB Level 4'}
      ],
      contactTypes: [
        {key: 'M', value: 'Mobile'},
        {key: 'E', value: 'Email'},
        {key: 'L', value: 'Land line'}
      ],
      skills: [
        {key: 'batting', value: 'Batting'},
        {key: 'fbowling', value: 'Fast Bowling'},
        {key: 'sbowling', value: 'Spin Bowling'},
        {key: 'wicketkeeping', value: 'Wicket Keeping'},
        {key: 'fielding', value: 'Fielding'}
      ],
      formLabelWidth: '200px',
      rules: []
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
    submitForm: function () {
      var self = this
      axios.post('http://localhost:8081/addcoach', self.form).then(function (response) {
        self.videos = response.data
        self.$router.push('/BeingCricket/Coaches')
      })
    }
  }
}
</script>
