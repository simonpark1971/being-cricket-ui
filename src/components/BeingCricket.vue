<template>
  <div>
    <el-container>
      <el-header height="30px" style="text-align: left; font-size: 26px;">
        <i>being cricket</i>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu default-active="3" :router="true">
            <el-menu-item index="1" route="/BeingCricket/Videos">
              <mdi-video-icon  :width="16" :height="16"/>
              <span>Videos</span>
            </el-menu-item>
            <el-menu-item index="2" route="/BeingCricket/Sessions">
              <mdi-calendar-today-icon  :width="16" :height="16"/>
              <span>Sessions</span>
            </el-menu-item>
            <el-menu-item index="3" route="/BeingCricket/Coaches">
              <mdi-contacts-icon  :width="16" :height="16"/>
              <span>Coach Directory</span>
            </el-menu-item>
            <el-menu-item index="4">
              <mdi-settings-icon  :width="16" :height="16"/>
              <span>Settings</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script></script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
</style>
