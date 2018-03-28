window.Event = new Vue();

Vue.component('alert',{
    props : ['title','message','type', 'show'],
    template : `
        <div :class="['alert' , type ]" role="alert" >
            <button type="button" class="close" @click="close" >
                <span aria-hidden="true">×</span>
            </button>
            <strong>{{ title }} </strong>- {{ message }}
        </div>`,
    methods : {
        close() {
            this.$emit('close')
        }
    }
});

Vue.component('Articles',{
    props : ['articles'],
    template : `
        <ul class="col-lg-12">
            <article1 v-for="(article,index) in articles" :article="article" :key="index" :index="index" ></article1>
        </ul>
    `,
});

Vue.component('article1',{
    props : ['article','index'],
    template : `
       <li class="list-group-item" style="text-align: justify" >
            <a href="#" v-on:click ="removearticle(index)" :class="{ complete : article.complete }" >{{ article.title }}</a><br>
       </li>
    `,
    methods : {
        removearticle(index) {
            Event.$emit('remove' , index);
        }
    }
});

new Vue({
    el: '#app',
    data: {
        newArticle : {
            title : '',
            complete : false
        },
        Articles : [
            { title:"آموزش لاراول", complete:true },
            { title:"پایتخت 5", complete:true },
            { title:"تماشای فوتبال", complete:false },
            { title:"فیلم 10 لاراول", complete:false }
        ],
        alert : {
            title: "",
            message: "",
            show: false,
            type: ""
        }
    },
    methods : {
        addArticle() {
            if(this.newArticle.title != "") {
                this.Articles.push(this.newArticle);
                this.newArticle = { title : "" , complete : false};
                this.alert = {
                    title:"موفقیت آمیز",
                    message:"کار جدید با موفقیت ثبت گردید.",
                    show : true,
                    type : "alert-success"
                }
            }else{
                this.alert = {
                    title:"خطا",
                    message:"لطفا فیلد کار جدید را وارد نمایید.",
                    show : true,
                    type : "alert-danger"
                }
            }
        },
        removearticle(index) {
            this.Articles[index].complete = ! this.Articles[index].complete;
        },
    },
    computed : {
        readArticle(){
            return this.Articles.filter(article => article.complete)
        }
    },
    created() {
        Event.$on('remove' , (index) => {
            this.removearticle(index);
        });
    }
});
