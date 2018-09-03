<template>
  <div id="app">
    <el-container>
      <el-header height="40" style="background-color: darkred; color: white; font-size: 36px;"></el-header>
      <el-main style="padding: 0px">
        <el-row style="height: 500px; background-image: linear-gradient(darkred, midnightblue); color: white; padding-top: 40px">
          <el-row style="padding-left: 80px;">
            <p><i><h1>being cricket platform</h1></i></p>
          </el-row>
          <el-col :span="14" style="padding-left: 120px;">
            <h2>Cricket, better</h2>
            <p><mdi-check-icon  :width="32" :height="32"/>Video Analysis</p>
            <p><mdi-check-icon  :width="32" :height="32"/>Book coaching sessions</p>
            <p><mdi-check-icon  :width="32" :height="32"/>Coaching services directory</p>
          </el-col>
          <el-col :span="8">
            <div >
              <el-card :body-style="{ padding: '16px', backgroundColor: 'white' }" shadow="always">
                <h3>Access to coaching specialists</h3>
                <p>Our coaching services directory gives you access to a whole range of coaches you probably didn't know exist</p>

                <h3>Specific targeted coaching feedback</h3>
                <p>Video analysis is no longer exclusive to top level professionals.  Upload you video and let a coach provide feedback</p>

                <h3>Better player coach relationship</h3>
                <p>Build a strong relationship with your coach(es) by having an always connected communication method</p>

                <h3>Cutting edge</h3>
                <p>Get access to the latest coaching theories, practise methods and knowledge</p>
                <div>
                  <router-link :to="'BeingCricket'">
                    <el-button type="primary" size="medium">Enter Site</el-button>
                  </router-link>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: ['../static/photos/1.jpg', '../static/photos/2.jpg', '../static/photos/3.jpg', '../static/photos/4.jpg'],
      currentDate: new Date()
    }
  }
}
</script>
