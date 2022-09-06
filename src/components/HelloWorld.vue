<template>
  <v-container>
    <v-card v-if="isLogin==false">
      <v-card-text>
        โปรดคลิกปุ่ม Login เพื่อเข้าสู่ระบบ
      </v-card-text>      
 
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
 
    <v-card v-else>
      <v-card-text>
        <v-text-field v-model="eventSubject" outlined dense label="Subject"></v-text-field>
        
        <label class="v-label">Start date</label>
        <v-date-picker v-model="eventStart" elevation="1"></v-date-picker>
        
        <label class="v-label">End date</label>
        <v-date-picker v-model="eventEnd" elevation="1" class="mt-3"></v-date-picker>
      </v-card-text>

      <v-card-actions>
        <v-btn color="success" @click="submit">เพิ่ม</v-btn>
        <v-btn color="error" @click="logoff">ออกจากระบบ</v-btn>
      </v-card-actions>


    </v-card>
  </v-container>
</template>
 
<script>
  import auth from '@/auth.js';
  import client from '@/graph';
  export default {
    name: 'HelloWorld',
 
    data() {
      return {
        isLogin: false,
        eventSubject: null,
        eventStart: null,
        eventEnd: null
      }
    },

    mounted() {
    const account = auth.getAccountInfo();
 
    if (account != null) this.isLogin = true;
  },


    methods: {
      async login() {
        const result = await auth.login();
 
        if(result != null) {
          console.log(result);
          this.isLogin = true;
        }
      },

      async logoff(){
          await auth.logoff();
          this.isLogin= false;
      },
      async submit() {
      if (
        this.eventSubject == null ||
        this.eventStart == null ||
        this.eventEnd == null
      ) {
        alert("โปรดกรอกข้อมูลให้ครบถ้วน");
        return;
      }
 
      const start = new Date(this.eventStart);
      const end = new Date(this.eventEnd);
 
      const event = {
        subject: this.eventSubject,
        start: {
          dateTime: start.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: "UTC",
        },
      };
 
      try {
        await client.api("/me/events").post(event);
        alert("ทำการเพิ่มกิจกรรมเรียบร้อยแล้ว");
      } catch (err) {
        alert(err);
      }
    },
    },
  }
</script>
 
<style scoped>
  label {
    display: block;
    padding-bottom: 5px;
    padding-top: 15px;
  }
</style>