const gulp =require("gulp");
const connect=require("gulp-connect");
var concat=require("gulp-concat");
var uglify = require("gulp-uglify");
//babel 插件;
var babel = require("gulp-babel");
// css 插件;
var cleanCss = require("gulp-clean-css");
gulp.task("html",()=>{
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
})
gulp.task("html",()=>{
    return gulp.src("*.html")
   .pipe(gulp.dest("dist/"))
})
gulp.task("script",()=>{
   return gulp.src(["script/*/**"])
    .pipe(concat("mian.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/script"))

})

gulp.task("styles",()=>{
    return gulp.src(["styles/*.css"])
 .pipe(gulp.dest("dist/css"))
 })
gulp.task("default",["html","script","styles"])
gulp.task("es6",()=>{
    return gulp.src("script/es2015/es6.js")
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(gulp.dest(dist/script))
})
gulp.task("css", ()=>{
    return gulp.src(["styles/*.css"])
           .pipe(cleanCss())
           .pipe(gulp.dest("dist/css"))
})
gulp.task("watch",()=>{
   gulp.watch("index.html",["html"])
//    gulp.watch("index.scss",["html"])
//    gulp.watch("index.html",["html"])
})
gulp.task("connect",()=>{
    connect.server({
        port:8888,//改变端口号
        root:"dist/",//改变更目录,
        livereload:true,//更新到浏览器
        middleware:function(connect,opt){//中间件选项
            var Proxy = require("gulp-connect-proxy");//加载并配置
            opt.routr='/proxy';//实例化插件
            var proxy=new Proxy(opt);
            return [proxy]
        }
    })
})
gulp.task("html",()=>{
     return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload())
})
gulp.task("default",["watch","connect"])//实时刷新
