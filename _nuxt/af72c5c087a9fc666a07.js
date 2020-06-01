(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{281:function(t,e,r){"use strict";var o=r(216);e.a=o.a},431:function(t,e,r){},434:function(t,e,r){"use strict";r(10),r(8),r(11),r(32),r(15),r(16),r(12),r(13);var o=r(1),n=(r(431),r(100)),c=r(281),l=r(83),h=r(41),d=r(18),v=r(3).a.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),f=r(5),m=r(9);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function $(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(f.a)(n.a,h.a,v).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,icon:{default:"",type:[Boolean,String],validator:function(t){return"string"==typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var data={staticClass:"v-alert__border",class:Object(o.a)({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&((data=this.setBackgroundColor(this.computedColor,data)).class["v-alert__border--has-color"]=!0),this.$createElement("div",data)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(c.a,{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(l.a,{props:{color:e}},"$cancel")])},__cachedIcon:function(){return this.computedIcon?this.$createElement(l.a,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=$($({},n.a.options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"==typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||d.a.options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(m.a)("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible];return this.$createElement("div",{staticClass:"v-alert__wrapper"},t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var data={staticClass:"v-alert",attrs:{role:"alert"},class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};this.coloredBorder||(data=(this.hasText?this.setTextColor:this.setBackgroundColor)(this.computedColor,data));return this.$createElement("div",data,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},445:function(t,e,r){"use strict";r.r(e);r(33),r(56),r(62);var o=r(19),n={name:"Login",middleware:"auth",data:function(){return{username:"",password:"123",error:null}},computed:{redirect:function(){return this.$route.query.redirect&&decodeURIComponent(this.$route.query.redirect)},errorMessage:function(){var t=this.error;if(!t||"string"==typeof t)return t;var e="";return t.message&&(e+=t.message),t.errors&&(e+="(".concat(JSON.stringify(t.errors).replace(/[{}"[\]]/g,"").replace(/:/g,": ").replace(/,/g," "),")")),e}},methods:{consoleLog:function(text){null!==this.log?this.log+=text+"\n":this.log=text+"\n"},loginClicked:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$auth.loginWith("google");case 3:r=e.sent,console.log("login result: "+r),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t.consoleLog("login error: "+e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},loginWithGoogle:function(){var t=this;this.$auth.loginWith("google").then((function(){return t.$toast.success("Logged In!")}))}}},c=r(82),l=r(104),h=r.n(l),d=r(434),v=r(216),f=r(428),m=r(417),_=r(422),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-content",[r("v-container",[r("h1",[t._v("Login Page")]),t._v(" "),t.errorMessage?r("v-alert",{attrs:{show:"",color:"danger"}},[t._v("\n      "+t._s(t.errorMessage)+"\n    ")]):t._e(),t._v(" "),t.$auth.$state.redirect?r("v-alert",{attrs:{color:"blue lighten-3"}},[t._v("\n      You have to login before accessing to\n      "),r("strong",[t._v(t._s(t.$auth.$state.redirect))])]):t._e(),t._v("\n\n    is logged in? "+t._s(t.$auth.loggedIn)+" "),r("br"),t._v("\n    User?: "+t._s(t.$auth.user)+" "),r("br"),t._v("\n    Token?: "+t._s(t.$auth.token)+" "),r("br"),t._v("\n    is admin?: "+t._s(t.$auth.hasScope("admin"))+"\n\n    "),r("v-row",[r("v-btn",{on:{click:function(e){return t.$auth.loginWith("auth0")}}},[t._v("Login with auth0")]),t._v(" "),r("v-btn",{on:{click:function(e){return t.$auth.logout()}}},[t._v("Logout")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VAlert:d.a,VBtn:v.a,VContainer:f.a,VContent:m.a,VRow:_.a})}}]);