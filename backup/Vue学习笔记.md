# Vue学习笔记

### 1. [Vue基础](#vue基础)
### 2. [Vue组件化编程](#Vue组件化编程)
### 3. [脚手架Vue-cli](#脚手架vue-cli)
### 4. [Vue-router路由](#vue-router)
### 5. [Vuex](#vuex)
### 6. [element-ui](#element-ui)
### 7. [Vue3](#vue3)
### 8. [工具收藏夹](#tools)
********************************

## <span id="vue基础">Vue基础</span>

### 初识Vue：
1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
2. root容易里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
3. root容器里的代码被称为【Vue模板】
3. Vue实例和容器是一一对应的；
3. 真实开发中只有一个Vue实例，并且会配合着组件一起使用；
3. `{{ xxx }}`中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
1. 一旦data中的数据发生改变，那么模板中用到该数据的地方也会自动更新

        注意区分：js表达式 和 js代码（语句）
        1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
            1. `a`
            2. `a + b`
            3. `demo(1)`
            4. `x === y ? 'a' : 'b'`
        2. js代码（语句）
            1. `if(){}`
            2. `for(){}`

### Vue模板语法有2大类：
1. 插值语法：

    功能：用于解析标签体内容。

    写法：`{{ xxx }}` ，xxx是js表达式，且可以直接读取到data中的所有属性。
2. 指令语法：

    功能：用于解析标签（包括：标签属性、标签内容、绑定事件...）。

    举例：`v-bind:href="xxx"` 或 简写为 `:href="xxx"`，xxx同样要写js表达式。

    备注：Vue中有很多的指令，且形式都是：`v-???`，此处我们只是拿v-bind举例。

```html
    <h1 v-bind:title="title">{{ name }} 欢迎回来</h1>
    <h2 :title="title">三国演义</h2>

    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el:'#root',
            data:{
                name:'关羽',
                title:'threekingdom'
            }
        })

    </script>
```


### Vue中有2种数据绑定的方式：
1. 单向绑定（`v-bind`）：数据只能从data流向页面。
2. 双向绑定（`v-model`）：数据不仅能从data流向页面，还可以从页面流向data。

        备注：
        1. 双向绑定一般都应用在表单类元素上。（如：input，select等）
        2. `v-model:value` 可以简写为 `v-model` ,因为v-model默认收集的就是value值。
```html
    <input type="text" v-model:value="name" />
    <input type="text" v-model="email" />
```

### MVVM模型
1. M:模型（model）：data中的数据
2. V：视图（View）：模板代码
3. VM:试图模型（ViewModel）：Vue实例

            观察发现：
            1.data中所有的属性，最后都出现在了vm身上。
            2.vm身上所有的属性及Vue原型上所有属性，在Vue模板中都可以直接使用。

### 数据代理
> 通过一个对象代理对另一个对象中属性的操作（读/写）
```js
    let obj = {x:100}
    let obj2 = {y:200}

    Object.defineProperty(obj2,'x',{
        get(){
            return obj.x
        },
        set(value){
            obj.x = value
        }
    })

    //此时读取obj2.x会从obj.x获取值，修改obj2.x会同时修改obj.x
    console.log(obj2.x)
    obj2.x = 300
    console.log(obj.x)
```

            1.Vue中的数据代理：
                通过Vm对象来代理data对象中属性的操作（读/写）
            2.Vue中数据代理的好处：
                更加方便的操作data中的数据
            3.基本原理：
                通过Object.defineProperty()把data对象中所有属性添加到vm上。
                为每一个添加到vm上的属性，都指定一个getter和setter。
                在getter和setter内部去操作（读/写）data中对应的属性。

### 事件的基本使用：
1. 使用`v-on:xxx` 或 `@xxx` 绑定事件，其中xxx是事件名；
2. 事件的回调需要配置在`methods`对象中，最终会在vm上；
3. `methods`中配置的函数，**不要用箭头函数！** 否则this就不是vm了；
4. `methods`中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
5. `@click="demo"` 和 `@click="demo($evnet)"` 效果一致，但后者可以传参。
```html
    <a href="https://github.com/" v-on:click="showMsg">Click Me</a>
    <a href="https://github.com/" @click="showMsg">Click Me</a>

    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el:'#root',
            data:{
                name:'关羽',
                title:'threekingdom'
            },
            methods:{
                showMsg(){
                    console.log(this)
                    console.log('123')
                }
            }
        })

    </script>
```

### Vue中的事件修饰符：
1. `.prevent`：阻止默认事件（常用）；
2. `.stop`：阻止事件冒泡（常用）；
3. `.once`：事件只触发一次（常用）；
4. `.capture`：使用事件的捕获模式；
5. `.self`：只有event.target是当前操作的元素时才触发事件；
6. `.passive`：事件的默认行为立即执行，无需等待事件回调执行完毕。
```html
    <a href="https://github.com/" v-on:click.prevent="showMsg">Click Me</a>
    <a href="https://github.com/" @click.prevent.stop="showMsg">Click Me</a>
```

### Vue中常用的按键别名：
            回车 => enter
            删除 => delete（捕获 “删除” 和 “退格” 键）
            退出 => esc
            空格 => space
            换行 => tab (特殊，必须配合keydown使用)
            上   => up
            下   => down
            左   => left
            右   => right

> Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case(短横线命名：caps-lock)
> 系统修饰键（用法特殊）：ctrl alt shift meta
> 1. 配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
> 2. 配合`keydown`使用：正常触发事件。
> 3. 也可以使用keyCode去指定具体的按键（不推荐）
> 4. Vue.config.keyCodes.自定义键名 = 键码  可以去定制按键别名  => `Vue.config.keyCodes.huiche = 13`
```html
    <input type="text" @keyup.enter="show" />
    <input type="text" @keyup.ctrl.y="show" />
    <input type="text" @keydown.tab="show" />
```
### 计算属性`computed`
1. 定义：要用的属性不存在，要通过已有属性计算得来。
2. 原理：底层借助了`Object.defineProperty()`方法提供的getter和setter。
3. get函数什么时候执行？
    - 初次读取时会执行一次。
    - 当依赖的数据发生变化时会被再次调用。
4. 优势：与`methods`实现相比，内部有缓存机制（复用），效率更高，调试方便。
5. 备注：
    - 计算属性最终会出现在vm上，直接读取使用即可。
    - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
```html
<div id="root">
    姓：<input type="text" v-model="firstname"><br>
    名：<input type="text" v-model="lastname" ><br>
    姓名：<span>{{ fullname }}</span>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            firstname:'张',
            lastname:'三'
        },
        computed:{
            fullname:{
                //get有什么作用？当有人读取fullname时，get就会被调用，且返回值就作为fullname的值
                //get什么时候调用？1.初次读取fullname时。 2.所依赖的数据发生变化时。
                get(){
                    console.log(this) //此处的this就是vm
                    return this.firstname + ' - ' + this.lastname
                },
                //set什么时候调用？当fullname被修改时调用
                set(value){
                    console.log('set被调用了',value)
                    const arr = value.split(' - ')
                    this.firstname = arr[0]
                    this.lastname = arr[1]
                }
            }
        }
    })
</script>
```
### 计算属性`computed`的简写形式

```js
//当只需要读取，不需要修改时，省略set,fullname直接写成一个函数
    computed:{
        fullname(){
            return this.firstname + ' - ' + this.lastname
        }
    }
```
### 监视属性`watch`
1. 当被监视的属性发生变化时，回调函数自动调用，进行相关操作。
2. 监视的属性必须存在，才能进行监视！！
3. 监视的两种写法：
    - `new Vue`时传入`watch`配置
    - 通过`vm.$watch`监视

```html
<div id="root">
    <h1>今天天气很{{ info }}</h1>
    <button @click="change" >切换天气</button>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            isCool:true
        },
        methods:{
            change(){
                this.isCool = !this.isCool
            }
        },
        computed:{
            info(){
                return this.isCool ? '凉爽' : '炎热'
            }
        },
        watch:{
            info:{
                //handler什么时候调用？当isCool发生改变时。
                handler(newValue,oldValue){
                    console.log(`info被改变了，之前是${oldValue},现在是${newValue}`)
                },
                immediate:true //初始化时让handler调用一下
            }
        }

    })

    vm.$watch('info',{
        handler(newValue,oldValue){
            console.log(`info被改变了，之前是${oldValue},现在是${newValue}`)
        },
        immediate:true
    })
</script>
```

### 深度监视`watch`
1. Vue中的watch默认不监测对象内部值的改变（一层）。
2. 配置`deep:true`可以监测对象内部值的改变（多层）。
备注：
- Vue自身可以监测对象内部值的改变，但Vue提供的`watch`默认不可以。
- 使用`watch`时根据数据的具体结构，决定是否采用深度监视。

```html
<div id="root">
    <h1>a的值是{{ numbers.a }}</h1>
    <button @click="numbers.a++">点我a++</button>
    <h1>b的值是{{ numbers.b }}</h1>
    <button @click="numbers.b++">点我b++</button>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            numbers:{
                a:1,
                b:1
            }
        },
        watch:{
            //监视多级结构中某个属性的变化时用原始字符串的形式写属性名
            'numbers.a':{
                handler(){
                    console.log('a被改变了')
                }
            },
            //监视多级结构中所有属性的变化
            numbers:{
                handler(){
                    console.log('numbers中的某个属性值改变了')
                },
                deep:true
            }
        }
    })
</script>
```

### `watch`的简写形式（当只需要`handler`，不需要配置`deep`和`immediate`时可以使用）
```js
    watch:{
        info(){
            console.log('info被改变了')
        }
    }
或
    vm.$watch('info',function(){
        console.log('info被改变了')
    })
```

### `computed` 和 `watch`之间的区别：
1. `computed`能完成的功能，`watch`都可以完成。
2. `watch`能完成的功能，`computed`不一定能完成。例如：`watch`能完成异步任务。
3. 两个重要的小原则：
    1. 所有被Vue管理的函数，最好写成普通函数，这样`this`的指向才会是`vm` 或 组件实例对象。
    2. 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数、promise的回调函数等），最好写成箭头函数，这样`this`的指向才是`vm` 或 组件实例对象。 

```html
    <div id="root">
        <h1>今天天气很{{ info }}</h1>
        <button @click="change" >切换天气</button>
    </div>

    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                isCool:true,
                info:'cool'
            },
            methods:{
                change(){
                    this.isCool = !this.isCool
                }
            },
            watch:{
                isCool(){
                    setTimeout(()=>{
                        this.isCool ? this.info = 'cool' : this.info = 'hot'
                    },1000)
                    console.log('info被改变了')
                }
            }
        })
    </script>
```

### 绑定样式
1. class样式
    1. 写法：`class="xxx"` xxx可以是字符串、数组、对象
        - 字符串写法适用于：类名不确定，需要动态指定。
        - 数组写法适用于：要绑定多个样式，个数不确定，名字也不确定
        - 对象写法使用于：要绑定的样式个数确定，名字也确定 ,但要动态决定用不用
    2. style样式
        - `:style="{fontSize:xxx}"` 其中xxx是动态值，样式名右多个单词组成须写成小驼峰形式
        - `:style="[a,b]"` 其中a、b是样式对象。
```html
<div id="root">
    <div class="basic" :class="mood" @click="changeMood">test</div>
    <div class="basic" :class="classArr" >test</div>
    <div class="basic" :class="classObj" >test</div>
    <div :style="styleObj" >test</div>
    <div :style="styleArr" >test</div>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            mood:'normal',
            classArr:['a','b','c'],
            classObj:{
                a:false,
                b:true
            },
            styleObj:{fontSize:'50px',backgroundColor:'orange',border:'1px solid black'},
            styleArr:[
                {fontSize:'50px',backgroundColor:'orange',},
                {border:'1px solid black'}
                ]
        },
        methods:{
            changeMood(){
                const arr = ['normal','happy','sad']
                this.mood = arr[Math.trunc(Math.random()*3)]
            }
        }
    })
</script>
```

### 条件渲染
1. `v-if`
    - 写法：
        1. `v-if="表达式"`
        2. `v-else-if="表达式"`
        3. `v-else="表达式"`
    - 适用于：切换频率较低的场景
    - 特点：不展示的DOM元素直接被移除
    - 注意：`v-if` 可以和 `v-else-if` 、`v-else` 一起使用，但要求结构不能被打断，必须是紧挨着的兄弟元素。
    - 如果有多个元素需要同时使用`v-if`判断同一个条件，可以使用`<template></template>`进行包裹，只写一个`v-if`在`<template>`上，渲染后template不会产生DOM
2. `v-show`
    - 写法：`v-show="表达式"`
    - 适用于：切换频率较高的场景。
    - 特点：不展示DOM元素未被移除，仅仅是使用`display:none`隐藏。
3. 备注：使用v-if时，元素可能无法获取到，因为值为false时不生成DOM，而使用v-show一定可以获取到。

```html
    <div id="root">
        <h1 v-show="show">welcome</h1>
        <button @click="show = !show">切换</button>
        <button @click="n++">n++</button>
        <div v-if="n === 1">First</div>
        <div v-else-if="n === 2">Tow</div>
        <div v-else>Three</div>
    </div>
 
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                show:true,
                n:0
            }
        })
    </script>
```

### 列表渲染`v-for`
1.  用于展示列表数据,想生成多个谁，就在谁身上用`v-for`
2. 语法：这里的`in`也可以使用`of`
    - 遍历数组：`v-for="(item,index) in xxx" :key="yyy"`
    - 遍历对象：`v-for="(value,key,index) in xxx" :key="yyy"`
    - 遍历字符串：`v-for="(letter,index) in xxx" :key="yyy"`
    - 遍历指定次数：`v-for="(a,b) in c" :key="yyy"` （备注：`a`从1开始，`b`从0开始，`c`为指定次数）

```html
    <div id="root">
        <h2>展示人员信息</h2>
        <ul>
            <li v-for="(per,i) in person" :key="per.id">
                {{ per.name }}---{{ per.age }}
            </li>
        </ul>
        <h2>展示车的信息</h2>
        <ul>
            <li v-for="(value,key,i) of car" :key="i">
                {{key}}:{{value}}
            </li>
        </ul>
    </div>
 
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                person:[
                    {id:1,name:'Jack',age:18},
                    {id:2,name:'Tom',age:20},
                    {id:3,name:'Anne',age:25}
                ],
                car:{name:'BMW',price:'80W',color:'Red'}
            }
        })
    </script>
```

### React、Vue中的key有什么作用？（key的内部原理）
1. 虚拟DOM中的key的作用：
    - key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】
    - 随后Vue进行【新】与【旧】虚拟DOM的差异比较（diff算法），规则如下：
2. 对比规则：
    1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
        - 若虚拟DOM中内容没变，直接使用之前的真实DOM。
        - 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    2. 旧虚拟DOM中未找到与新虚拟DOM相同的key
        - 创建新的真实DOM，随后渲染到页面。
3. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作，会产生没有必要的真实DOM更新 ==> 界面效果没问题，但效率低
    2. 如果结构中还包含了输入类的DOM，会产生错误DOM更新 ==> 界面有问题。
4. 开发中如何选择key？
    1. 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号
    2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key时没有问题的。

```html
    <div id="root">
        <ul>
            <li v-for="p in person" :key="p.id">
                {{p.name}}--{{p.age}}
                <input type="text">
            </li>
        </ul>
        <button @click="person.unshift({id:4,name:'老刘',age:30})">
            添加一个老刘
        </button>
    </div>
 
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                person:[
                    {id:1,name:'Jack',age:18},
                    {id:2,name:'Tom',age:20},
                    {id:3,name:'Anne',age:25}
                ]
            }
        })
    </script>
```

### 列表过滤
```html
    <div id="root">
        搜索<input type="text" v-model="keyWord">
        <ul>
            <li v-for="p in filPersons" :key="p.id">
                {{p.name}}--{{p.age}}
            </li>
        </ul>
    </div>
 
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                keyWord:'',
                persons:[
                    {id:1,name:'马冬梅',age:18},
                    {id:2,name:'周冬雨',age:20},
                    {id:3,name:'周杰伦',age:25},
                    {id:4,name:'温兆伦',age:30}
                ]
            },
            computed:{
                filPersons(){
                    return this.persons.filter((p)=>{
                        return p.name.includes(this.keyWord.trim())
                        //或者 p.name.indexOf(this.search.trim()) > -1
                    })
                }
            }
        })
    </script>
```

### 列表排序
```html
    <div id="root">
        搜索<input type="text" v-model="keyWord">
        <button @click="sortType = 2">年龄升序</button>
        <button @click="sortType = 1">年龄降序</button>
        <button @click="sortType = 0">原顺序</button>
        <ul>
            <li v-for="p in filPersons" :key="p.id">
                {{p.name}}--{{p.age}}
            </li>
        </ul>
    </div>
 
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示

        const vm = new Vue({
            el:'#root',
            data:{
                keyWord:'',
                persons:[
                    {id:1,name:'马冬梅',age:40},
                    {id:2,name:'周冬雨',age:20},
                    {id:3,name:'周杰伦',age:25},
                    {id:4,name:'温兆伦',age:18}
                ],
                sortType:0 //0原顺序，1代表降序，2代表升序
            },
            computed:{
                filPersons(){
                    const arr = this.persons.filter((p)=>{
                        return p.name.includes(this.keyWord.trim())
                        //或者 p.name.indexOf(this.search.trim()) > -1
                    })
                    if(this.sortType){
                        arr.sort((p1,p2)=>{
                            return this.sortType === 1 ?
                                        p2.age - p1.age :
                                        p1.age - p2.age
                        })
                    }
                    return arr
                }
            }
        })
    </script>
```

### Vue监视数据的原理
1. vue会监视data中所有层次的数据。
2. 如何监测对象中的数据？
>通过setter实现监视，且要在new Vue时就传入要监测的数据。
>1. 对象中后追加的属性，Vue默认不做响应式处理。
>2. 如需给后添加的属性做响应式，请使用如下API:
      `Vue.set(target,propertyName/index,value)` 或
      `vm.$set(target,propertyName/index,value)`
      在实例对象中vm写为this即可。
3. 如何监测数组中的数据？
>通过包裹数组更新元素的方法实现，本质就是做了两件事：
>1. 调用原生对应的方法对数组进行更新。
>2. 重新解析模板，进行页面更新。
4. 在Vue修改数组中的某个元素一定要用如下方法：
>1. 使用这些API：`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`
>
>2. `Vue.set()` 或 `vm.$set()`
>
>**特别注意**：`Vue.set()` 和 `vm.$set()` 不能给vm 或 vm 的根数据对象添加属性！

```html
<div id="root">
    <h1>学生信息</h1>
    <button @click="student.age += 1">年龄+1岁</button>
    <button @click="sex">添加性别属性，默认值是：男</button>
    <button @click="newFriend">在列表首位添加一个朋友</button>
    <button @click="student.friends[0].name = '张三'">修改第一个朋友的名字为：张三</button>
    <button @click="student.hobby.push('新爱好')">添加一个爱好</button>
    <button @click="student.hobby.splice(0,1,'开车')">修改第一个爱好为：开车</button>

    <h2>姓名：{{student.name}}</h2>
    <h2>年龄：{{student.age}}</h2>
    <h2 v-show="student.sex">性别：{{student.sex}}</h2>
    <h2>爱好：</h2>
    <ul>
        <li v-for="h,i in student.hobby" :key="i">
            {{h}}
        </li>
    </ul>
    <h2>朋友们：</h2>
    <ul>
        <li v-for="f in student.friends" :key="f.id">
            {{f.name}}---{{f.age}}
        </li>
    </ul>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            student:{
                name:'Tom',
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {id:1,name:'Jerry',age:35},
                    {id:2,name:'Tony',age:36},
                ]
            }
        },
        methods: {
            sex(){
                this.$set(this.student,'sex','男')
                // Vue.set(this.student,'sex','男')
                //this.student.sex = '男' // 也可以添加，但不是响应式的
            },
            newFriend(){
                this.student.friends.unshift({id:3,name:'Jenny',age:20})
            }
        },
    })
</script>
```

### 收集表单数据
```html
<div id="root">
    <form @submit.prevent='submit'>
        <!-- .trim修饰符，去掉两端空格 -->
        账号：<input type="text" v-model.trim="userInfo.username"><br>
        密码：<input type="password" v-model="userInfo.password"><br>
        <!-- .number修饰符，将收集到的数据转为数字类型，配合原生的num一起使用限制只能输入数字 -->
        年龄：<input type="number" v-model.number="userInfo.age">
        性别：
        <!-- 单选项需设定value值以提交 -->
        男<input type="radio" name="sex" v-model="userInfo.gender" value="男">
        女<input type="radio" name="sex" v-model="userInfo.gender" value="女"> <br>  
        爱好：
        <!-- 多选时使用数组来收集数据 -->
        抽烟<input type="checkbox" v-model="userInfo.hobby" value="抽烟">      
        喝酒<input type="checkbox" v-model="userInfo.hobby" value="喝酒">      
        烫头<input type="checkbox" v-model="userInfo.hobby" value="烫头"><br>
        所属校区：
        <!-- 单选项需设定value值以提交 -->
        <select v-model="userInfo.area">
            <option value="" disabled selected>请选择校区</option>
            <option value="北京">北京</option>
            <option value="上海">上海</option>
        </select><br>
        其他信息：
        <!-- .lazy修饰符，当元素失去焦点时才收集数据 -->
        <textarea cols="30" rows="10" v-model.lazy="userInfo.otherMsg"></textarea><br>
        <!-- 单选时只会收集true 或者 false -->
        <input type="checkbox" v-model="userInfo.isAccpet">阅读并接受<a href="#">《用户协议》</a><br>
        <input type="submit">
    </form>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            userInfo:{
                username:'',
                password:'',
                age:'',
                gender:'',
                hobby:['喝酒'], //作为多选项时设置默认值
                area:'',
                otherMsg:'',
                isAccpet:'', //单选时只会收集true 或者 false
            }
        },
        methods: {
            submit(){
                console.log(JSON.stringify(this.userInfo)) //将js对象转换为JSON
            }
        },
    })
</script>
```

### 过滤器
- 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
- 语法：
    1. 注册过滤器：全局`Vue.filter(name,callback)` 或 局部配置`new Vue{filters:{}}`
    2. 使用过滤器：`{{xxx | filterName}}` 或 `v-bind:属性 = "xxx | filterName"`
- 备注：
    1. 过滤器也可以接收额外参数，多个过滤器也可以串联
    2. 并没有改变原本的数据，是产生新的对应的数据

```html
<div id="root">
    <h2>现在的时间是</h2>
    <h3>时间戳{{ time }}</h3>
    <h3>使用计算属性：{{ timeFormat }}</h3>
    <!-- 过滤器filters实现 -->
    <h3>过滤器不传参：{{ time | timeFilter }}</h3>
    <h3>过滤器传参：{{ time | timeFilter('YYYY_MM_DD') }}</h3>
    <h3>过滤器串联：{{ time | timeFilter('YYYY_MM_DD') | mySlice }}</h3>
    <h3 :x="msg | mySlice">在属性中使用过滤器,右键检查查看</h3>
    <div v-show="timer !== ''">会走的时间{{timer | timeFilter}}</div>
</div>

<script src="js/vue.js"></script>
<script src="js/day.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    //全局过滤器
    Vue.filter('mySlice',function(value){
        return value.slice(0,4)
    })

    const vm = new Vue({
        el:'#root',
        data:{
            time:1636894491772,
            msg:'一二三四五六七八',
            timer:''
        },
        computed:{
            timeFormat(){
                //时间第三方库day.js来解析时间戳
                return dayjs(this.time).format("YYYY年MM月DD日 HH:mm:ss")
            }
        },
        //局部过滤器
        filters:{
            timeFilter(value,str="YYYY年MM月DD日 HH:mm:ss"){
                return dayjs(value).format(str)
            }
        },
        watch:{
            timer:{
                handler(){
                    setInterval(() => {
                        this.timer = Date.now()
                    }, 1000);
                },
                immediate:true
            }
        }
    })
</script> 
```

### `v-text`指令
1. 向其所在的节点中渲染文本内容。
2. 与插值语法的区别：`v-text`会替换掉节点中的内容，`{{xx}}`则不会。

```html
    <div id="root">
        <div v-text="name"></div>
        <div v-text="h3"></div>
    </div>
    
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    
        const vm = new Vue({
            el:'#root',
            data:{
                name:'hello',
                h3:'<h3>可以渲染代码片段</h3>'
            }
        })
    </script> 
```

### `v-html`指令
1. 作用：向指定节点中渲染包含html结构的内容。
2. 与插值语法的区别：
    - `v-html`会替换掉节点中所有的内容，`{{xx}}`则不会。
    - `v-html`可以识别html结构。
3. **严重注意** ：`v-html`有安全性问题！！！
    - 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
    - 一定要在可信的内容上使用`v-html`，永远不要在用户提交的内容上！
```html     
    <div id="root">
        <div v-html="h3"></div>
    </div>
    
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    
        const vm = new Vue({
            el:'#root',
            data:{
                name:'hello',
                h3:'<h3>v-html可以解析代码片段</h3>'
            }
        })
    </script> 
```

### `v-cloak`指令---没有值
1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性。
2. 使用css配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`的问题
```html
    <style>
        [v-cloak]{
            display: none;
        }
    </style>

    <div id="root" v-cloak>
        <div>{{name}}</div>
    </div>
```

### `v-once`指令---没有值
1. `v-once`所在节点在初次动态渲染后，就视为静态内容了。
2. 以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能。
```html
    <div id="root" v-cloak>
        <h2 v-once>初始化的n值：{{n}}</h2>
        <h2>当前的n值：{{n}}</h2>
        <button @click="n++">点我n++</button>
    </div>
    
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    
        const vm = new Vue({
            el:'#root',
            data:{
                n:1
            }
        })
    </script> 
```

### `v-pre`指令---没有值
1. 跳过其所在节点的编译过程。
2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
```html
    <div id="root" v-cloak>
        <h2 v-pre>Vue其实很简单</h2>
        <!-- 加了v-pre，该节点就不会被解析，直接展示 -->
        <h2 v-pre>当前的n值：{{n}}</h2> 
        <button @click="n++">点我n++</button>
    </div>
    
    <script src="js/vue.js"></script>
    <script>
        Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    
        const vm = new Vue({
            el:'#root',
            data:{
                n:1
            }
        })
    </script> 
```

### Vue自定义指令
1. 定义语法：查看代码
2. 配置对象中常用的3个回调：查看代码
3. 备注：
    - 指令定义时不加v-，但使用时要加v-
    - 指令名如果是多个单词，要使用kebab-case命名方式，不要使用camelCase命名。
```html
<!-- 
    需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
    需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
    -->
<div id="root" v-cloak>
    <h2>当前的n值是：{{n}}</h2>
    <h2>放大10倍的n值是：<span v-big="n"></span></h2>
    <!-- 当指令名由多个单词组成时，用烤肉串命名法，就是用横线“-”隔开隔开 -->
    <!-- <h2>放大10倍的n值是：<span v-big-number="n"></span></h2> -->
    <button @click="n++">点我++</button>
    <hr>
    <input type="text" v-fbind:value="n">
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    // 全局的自定义指令
    Vue.directive('fbind',{
        bind(element,binding){
            element.value = binding.value
        },
        inserted(element,binding){
            element.focus()
        },
        update(element,binding){
            element.value = binding.value
        }
    })
    Vue.directive('big',function(element,binding){
        element.innerText = binding.value *10
    })

    const vm = new Vue({
        el:'#root',
        data:{
            n:1
        },
        // 局部的自定义指令
        directives:{
            //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时
            big(element,binding){
                // 注意，此处的this是window
                console.log(this)
                element.innerText = binding.value *10
            },
            // 'big-number'(element,binding){
            //     element.innerText = binding.value *10
            // },
            fbind:{
                //指令与元素成功绑定时（一上来）
                bind(element,binding){
                    element.value = binding.value
                },
                //指令所在元素被插入页面时
                inserted(element,binding){
                    element.focus()
                },
                //指令所在的模板被重新解析时
                update(element,binding){
                    element.value = binding.value
                }
            }
        }
    })
</script> 
```

### Vue生命周期钩子
1. 常用的钩子：
    - `mounted`：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等**初始化操作**。
    - `beforeDestroy`：清除定时器、解绑自定义事件、取消订阅消息等**收尾操作**。
```html
<div id="root">
    <h2>{{n}}</h2>
    <button @click="add">n++</button>
    <button @click="destroy">destroy</button>
</div>

<script src="js/vue.js"></script>
<script>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示

    const vm = new Vue({
        el:'#root',
        data:{
            n:1
        },
        methods: {
            add(){
                this.n++
            },
            destroy() {
                this.$destroy()
            },
        },
        beforeCreate() {
            //此时无法通过vm访问到data中的数据、methods中的方法
            console.log('beforeCreate')
        },
        created() {
            //此时可以通过vm访问到data中的数据、methods中的方法
            console.log('created')
        },
        beforeMount() {
            //此时页面呈现的是未经Vue编译的DOM结构，所有对DOM的操作，最终都不凑效。
            console.log('beforeMount')
        },
        mounted() {
            //此时页面中呈现的是经过Vue编译的DOM，对DOM的操作均有效（尽可能避免），至此初始化过程结束。
            //一般在此进行开启定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作。
            console.log('mounted')
        },
        beforeUpdate() {
            //此时数据是新的，但页面是旧的，即：页面尚未和数据保持同步
            console.log('beforeUpdate')
        },
        updated() {
            //此时数据是新的，页面也是新的，即：页面和数据保持同步。
            console.log('updated')
        },
        beforeDestroy() {
            //此时：vm中所有的：data、methods、指令等等，都处理可用状态，马上要执行销毁过程。
            //一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作。
            console.log('beforeDestroy')
        },
        destroyed() {
            console.log('destroyed')
        },
    })
</script>
```

## <span id="Vue组件化编程">Vue组件化编程</span>

### Vue中使用组件的三大步骤
1. 定义组件（创建组件）
2. 注册组件
3. 使用组件（写组件标签）
```html
<div id="root">
    {{msg}}
    <school></school>
    <hr>
    <student></student>
    <hello/>
</div>

<script src="js/vue.js"></script>
<script>
``````js
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    //定义组件
    const school = Vue.extend({
        //data必须写成函数形式，因组件复用时，数据存在引用关系。
        data(){
            return {
            name:'深职院',
            address:'深圳'
            }
        },
        template:`
        <div>
            <h2>学校名称：{{name}}</h2>
            <h2>学校地址：{{address}}</h2>    
        </div>
        `
    })
    const student = Vue.extend({
        data(){
            return {
                name:'关羽',
                age:18
            }
        },
        template:`
        <div>
            <h2>学生姓名：{{name}}</h2>
            <h2>学生年龄：{{age}}</h2>  
        </div>
        `
    })
    const hello = Vue.extend({
        template:`
        <div>
            <h2>Hello</h2> 
        </div>
        `
    })
    //全局注册组件
    Vue.component('hello',hello)

    const vm = new Vue({
        el:'#root',
        data:{
            msg:'Welcome'
        },
    //局部注册组件
        components:{school,student}
    })
</script> 
```

### 几个注意点
1. 关于组件名：
    - 一个单词组成:
        1. 全小写：`school`
        2. 首字母大写：`School`
    - 多个单词组成：
        1. 烤肉串写法：`my-school`
        2. 驼峰写法：`MySchool` (需要Vue脚手架支持)
    - 备注：
        1. 组件名尽可能回避HTML中已有的元素名称，例如：`h2`,`h3`
        2. 可以使用`name`配置项指定组件在开发者工具中呈现的名字。
2. 关于组件标签：
    1. 第一种：`<school></school>`
    2. 第二种：`<school/>`
    3. 不使用脚手架时，`<school/>`会导致后续组件不能渲染。
3. 一个简写方式：
    `const school = Vue.extend(options)` 可简写为 `const school = options`

### 单文件组件
```html
<template>
    <!-- 组件的结构,必须且只能有一个根标签 -->
    <div class="demo">
        <h2>欢迎回来！</h2>
        <h2>学校名称：{{name}}</h2>
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
// 组件交互式相关的代码（数据、方法等）
    export default {
        name:'School',
        data(){
            return {
            name:'深职院',
            address:'深圳'
            }
        }
    }
</script>

<style>
    /* 组件的样式 */
    .demo{
        background-color: aqua;
    }
</style>
```

## <span id="脚手架vue-cli">脚手架Vue-cli</span>

### 在Vue中使用sass

安装：npm install --save-dev sass

标签中：

```vue
<style lang="scss">
</style>
```



### 关于不同版本的Vue

1. vue.js 与 vue.runtime.xxx.js的区别：
    - vue.js是完整版的Vue,包含：核心功能+模板解析器。
    - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用`render`函数接收到的`createElement`函数去指定具体内容。

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

```

### vue.config.js配置文件
>使用veu.config.js可以对脚手架进行个性化定制。https://cli.vuejs.org/zh/config/

### ref属性
1. 被用来给元素或子组件注册可引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（VC）
3. 使用方式：

```vue
<template>
    <div>
        <h1 ref="title">{{ msg }}</h1>
        <School ref="sch"/>
        <button ref="btn" @click="showDOM">点我输出上方节点</button>
    </div>
</template>

<script>
import School from './components/School.vue'

export default {
    name:'App',
    components:{School},
    data() {
        return {
            msg:'欢迎学习Vue'
        }
    },
    methods:{
        showDOM(){
            console.log(this.$refs.title) //真实DOM元素
            console.log(this.$refs.sch) //school组件实例对象
            console.log(this.$refs.btn) //真实DOM元素
        }
    }
}
</script>
```

### 配置项props
- 功能：让组件接收外部传过来的数据
- 传递数据：`<Demo name="xxx"/>`
```vue
<!-- 使用v-bind，则属性值是js代码运算的结果，所以18从原本的字符串变成了数字18 -->
<School name="Jack" :age="18" sex="M"/>
```
- 接收数据：
```vue
<template>
    <div class="box1">
        <h1>{{ msg }}</h1>
        <h2>学生名字: {{ name }}</h2>
        <h2>学生年龄: {{ myAge }}</h2>
        <h2>学生性别: {{ sex }}</h2>
        <button @click="change">修改接收到的年龄</button>
    </div>
</template>

<script>
export default {
    name:'Student',
    data(){
        return {
            msg:'欢迎学习Vue',
            myAge:this.age
        }
    },
    props:['name','age','sex'], //简单接收

    //接收的同时对数据进行类型限制
    // props:{
    //     name:String,
    //     age:Number,
    //     sex:String
    // }
    // 接收的同时对数据进行类型限制+默认值的指定+必要性的限制
    // props:{
    //     name:{
    //         type:String,
    //         required:true //必须的
    //     },
    //     age:{
    //         type:Number, //类型
    //         default:20 //默认值
    //     },
    //     sex:{
    //         type:String,
    //         required:true
    //     }
    // }

    methods:{
        change(){
            this.myAge++
        }
    }
}
</script>
```
- 备注：`props`是只读的，Vue底层会监测你对`props`的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制`props`的内容到`data`中一份，然后去修改`data`中的数据

### `mixin`混入
- 功能：可以把多个组件共用的配置提取成一个混入对象
- 使用方式：
	1. 定义混合，例如：`{data(){...},methods:{...}...}`
	2. 使用混入，例如：全局混入：`Vue.mixin(xxx)` 和 局部混入：`import xxx from xxx 之后配置 mixins:[xxx]`(和`props`不同，这里不需要引号)
```js
//mixin.js文件
export const hunhe1 =  {
    methods: {
        showName(){
            alert(this.name)
        }
    }
}
```
```vue
<template>
    <div class="box1">
        <!-- 混合中定义了showName方法，所以这里可以直接使用 -->
        <h2 @click="showName">学校名称: {{ name }}</h2>
        <h2>学校地址: {{ address }}</h2>
    </div>
</template>

<script>
//引入混入
import {hunhe1} from '../mixin'

export default {
    name:'School',
    data(){
        return {
            name:'深职院',
            address:'深圳'
        }
    },
    mixins:[hunhe1]
}
</script>
```

### 插件plugins
- 功能：用于增强Vue
- 本质：包含`install`方法的一个对象，`install`的第一个参数是`Vue`，第二个以后的参数是插件使用者传递的数据。
- 定义插件：创建plugins.js文件
```js
export default {
    install(Vue,options){
        console.log('install被调用了')
        //1.添加全局过滤器
        Vue.filter(...)
        //2.添加全局指令
        Vue.directive(...)
        //3.配置全局混入
        Vue.mixin(...)
        //4.添加实例方法
        Vue.prototype.$myMethod = function(){...}
        Vue.prototype.$myProperty = xxx
    }
}
```
- 使用插件:`Vue.use()`
```js
import Vue from 'vue'
import App from './App'
//引入插件
import plugins from './plugins'

Vue.config.productionTip = false

//在渲染应用前使用插件
Vue.use(plugins)

new Vue({
  el:'#app',
  render:h => h(App)
})
```

### `scoped`样式
- 作用：让样式在局部生效，防止冲突。
- 写法：`<style scoped>...</style>`

### 总结TodoList案例
1. 组件化编码流程：
	1. 拆分静态组件：组件要按照功能拆分，命名不要与html元素冲突。
	2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
		- 一个组件在用：放在组件自身即可。
		- 一些组件在用：放在他们共同的父组件上（状态提升）。
	3. 实现交互：从绑定事件开始。
2. `props`适用于：
	1. 父组件 ==> 子组件 通信
	2. 子组件 ==> 父组件 通信（要求父组件先给子组件一个函数）
3. 使用`v-model`时要切记：`v-model`绑定的值不能是`props`传过来的值，因为`props`是不可以修改的！不需要修改的话就可以使用。
4. `props`传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
```vue
//app.vue
<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Topper :newTodo="newTodo" />
            <List 
                :list="list" 
                :updateItem="updateItem"
                :clearOne="clearOne"
            />
            <Footer 
                :list="list" 
                :updateAllItem="updateAllItem"
                :clearAllDone="clearAllDone"
            />
        </div>
    </div>
</template>

<script>
    import Topper from './components/Topper.vue'
    import List from './components/List.vue'
    import Footer from './components/Footer.vue'

    export default {
        name:'App',
        components:{Topper,List,Footer},
        data(){
            return{
                list:[
                    {id:'001',name:'吃饭',done:false},
                    {id:'002',name:'睡觉',done:true},
                    {id:'003',name:'打代码',done:false}
                ]
            }
        },
        methods:{
            newTodo(obj){
                this.list.unshift(obj)
            },
            updateItem(id,done){
                this.list.forEach((item)=>{
                    if(item.id === id) item.done = done
                })
            },
            updateAllItem(done){
                this.list.forEach((item)=>{
                    item.done = done
                })
            },
            clearAllDone(){
                this.list = this.list.filter((item)=>{
                    return !item.done
                })
            },
            clearOne(id){
                if(confirm('确定删除吗？')){
                    this.list = this.list.filter((item)=>{
                        return item.id !== id
                    })
                }
                
            }
        }

    }
</script>
```
```vue
//topper.vue
<template>
    <div class="todo-header">
        <input @keyup.enter="add" type="text" placeholder="请输入你的任务名称，按回车键确认"/>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'

    export default {
        name:'Topper',
        props:['newTodo'],
        methods:{
            add(e){
                const {value} = e.target
                if(value.trim() === ''){
                    alert('内容不能为空！')
                    return
                }
                const obj = {id:nanoid(),name:value,done:false}
                this.newTodo(obj)
                e.target.value = ''
            }
        }
    }
</script>
```
```vue
//list.vue
<template>
    <ul class="todo-main">
        <Item  v-for="item in list" :key="item.id" 
            :item="item"
            :updateItem="updateItem"
            :clearOne="clearOne"
        />
    </ul>
</template>

<script>
    import Item from './Item.vue'

    export default {
        name:'List',
        components:{Item},
        props:['list','updateItem',"clearOne"]
        
    }
</script>
```
```vue
//item.vue
<template>
    <li  @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
        <label>
            <input type="checkbox" :checked="item.done" @change="update"/>
            <!-- v-model会双向绑定数据，所以以下代码也可以实现功能，并且也不需要绑定事件，但因为修改了props属于违反原则，所以不推荐使用 -->
            <!-- <input type="checkbox" v-model="item.done"/> -->
            <span>{{ item.name }}</span>
        </label>
        <button class="btn btn-danger" v-show="mouseIn" @click="clearOne(item.id)">删除</button>
    </li>
</template>

<script>
    export default {
        name:'Item',
        props:['item','updateItem','clearOne'],
        data(){
            return{
                mouseIn:false,
            }
        },
        methods:{
            update(e){
                this.updateItem(this.item.id,e.target.checked)
            }
        }
    }
</script>
```
```vue
//footer.vue
<template>
    <div class="todo-footer" v-show='list.length'>
        <label>
            <!-- <input type="checkbox" :checked="allDone" @change="updateAll"/> -->
            <!-- 应用计算属性setter来实现功能，不用绑定事件 -->
            <input type="checkbox" v-model="allDone" />
        </label>
        <span>
            <span>已完成{{done}}</span> / 全部{{list.length}}
        </span>
        <button class="btn btn-danger" @click="clearAllDone">清除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name:'Footer',
        props:['list','updateAllItem','clearAllDone'],
        computed:{
            done(){
                return this.list.filter((item)=>{
                    return item.done === true
                }).length

                // return this.list.reduce((acc,curr)=>{
                //     return acc + (curr.done ? 1 : 0)
                // },0)
            },
            allDone:{
                get(){
                    return this.done === this.list.length && this.done > 0
                },
                set(value){
                    this.updateAllItem(value)
                }
            }
        },
        methods:{
            updateAll(e){
                this.updateAllItem(e.target.checked)
            }
        }
    }
</script>
```

### webStorage浏览器本地存储
1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
2. 浏览器端通过Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
3. 相关API:
	- `xxxxStorage.setItem('key','value')`
	该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
	- `xxxxStorage.getItem('key')`
	该方法接收一个键名作为参数，返回键名对应的值。
	- `xxxxStorage.removeItem('key')`
	该方法接收一个键名作为参数，并把该键名、对应的值从存储中删除。
	- `xxxxStorage.clear()`
	该方法会清空存储中的所有数据。
4. 备注：
	- sessionStorage存储的内容会随着浏览器窗口关闭而消失。
	- localStorage存储的内容，需要手动清除才会消失。
	- `xxxxStorage.getItem('key')`如果没有key对应的value，则返回值是null。
	- `JSON.parse(null)`的结果依然是null。
```html
<button onclick="saveData()">点我保存一个数据</button>
<button onclick="readData()">点我读取一个数据</button>
<button onclick="deleteData()">点我删除一个数据</button>
<button onclick="cleareData()">点我清空所有数据</button>

<script>
    let p = {name:'Jack',age:18}

    function saveData(){
        //第二个参数会帮你调用toString方法强制转换为字符串
        localStorage.setItem('msg','I want to play a game!')
        localStorage.setItem('msg2',666)
        localStorage.setItem('msg3',JSON.stringify(p))
    }

    function readData(){
        console.log(localStorage.getItem('msg'))
        console.log(localStorage.getItem('msg3'))
        // 读取不存在的数据会得到null
        console.log(localStorage.getItem('abc'))
    }

    function deleteData(){
        localStorage.removeItem('msg2')
    }

    function cleareData(){
        localStorage.clear()
    }

</script>
```

### TodoList本地存储
```vue
//App.vue
<script>
  import Topper from './components/Topper.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  export default {
      name:'App',
      components:{Topper,List,Footer},
      data(){
          return{
          //从localStorage中读取数据，首次读取为`null`所有要配置一个空串
              list:JSON.parse(localStorage.getItem('list')) || []
          }
      },
      methods:{
          newTodo(obj){
              this.list.unshift(obj)
          },
          updateItem(id,done){
              this.list.forEach((item)=>{
                  if(item.id === id) item.done = done
              })
          },
          updateAllItem(done){
              this.list.forEach((item)=>{
                  item.done = done
              })
          },
          clearAllDone(){
              this.list = this.list.filter((item)=>{
                  return !item.done
              })
          },
          clearOne(id){
              if(confirm('确定删除吗？')){
                  this.list = this.list.filter((item)=>{
                      return item.id !== id
                  })
              }
          }
      },
      //配置watch属性，监测属性，有变化就存入localStorage，并开启深度监测，监测list内部的更新，比如`done`属性。
      watch:{
        list:{
          handler(value){
            localStorage.setItem('list',JSON.stringify(value))
          },
          deep:true
        }
      }

  }
</script>
```

### 组件的自定义事件
1. 一种组件间通信的方式，适用于：子组件 ===> 父组件
2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
3. 绑定自定义事件：
	1. 在父组件中 `<Demo @atguigu="test">` 或 `<Demo v-on:atguigu="test">`
	2. 在父组件中 ：
```vue		
	<Demo ref="demo">
    .....
    mounted(){
        this.$refs.demo.$on('atguigu',this.test)
    }
```
	3. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
4. 触发自定义事件：`this.$emit('atguigu',数据)`
5. 解绑自定义事件：`this.$off('atguigu')`
6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符
7. 注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在`methods`中，要么用箭头函数，否则`this`指向会出问题！
```vue
//App.vue
<template>
  <div class="app">
    <h1>{{msg}}，学生的名字是：{{studentName}}</h1>
    <!-- 通过父组件给子组件传递函数类型的prorps实现：子给父传递数据 -->
    <School :showName="showName" />
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或v-on） -->
    <Student @atguigu="demo" @atguigu2.once="demo1"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法：使用ref）.native可以将原生事件作为自定义事件传给子组件以触发 -->
    <!-- <Student ref="student" @click.native="show"/> -->
  </div>
  
</template>

<script>
  import School from './components/School.vue'
  import Student from './components/Student.vue'

  export default {
    components: { School,Student },
    data(){
      return{
        msg:'Hello world',
        studentName:''
      }
    },
    methods:{
      showName(v){
        console.log('app收到了学校的名字：',v)
      },
      demo(v){
        console.log('app收到学生的名字了：',v)
        this.studentName = v
      },
      demo1(){
        console.log('atguigu2自定义事件被触发了！')
      },
      show(){
        alert(123)
      }
    },
    mounted(){
      // this.$refs.student.$on('atguigu',this.demo) //绑定自定义事件
      // this.$refs.student.$once('atguigu',this.demo) //绑定自定义事件并限制只触发一次
    }
  }
</script>
```
```vue
//Student.vue
<template>
  <div class="xuesheng">
      <h3>学生姓名：{{name}}</h3>
      <h3>学生年龄：{{age}}</h3>
      <h3>{{number}}</h3>
      <button @click="add">numer++</button>
      <button @click="sendStudentName">click</button>
      <button @click="unbind">解绑atguigu事件</button>
      <button @click="death">销毁当前student实例</button>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                name:'Jack',
                age:18,
                number:0
            }
        },
        methods:{
            add(){
                console.log('add回调被调用了！')
                this.number++
            },
            sendStudentName(){
                // 触发Student组件实例身上的atguigu事件
                this.$emit('atguigu',this.name)
                this.$emit('atguigu2')
            },
            unbind(){
                this.$off('atguigu') //解绑一个自定义事件
                // this.$off(['atguigu','atguigu2']) // 解绑多个自定义事件
                // this.$off() //解绑所有的自定义事件
            },
            death(){
                this.$destroy() //销毁当前student组件的实例，销毁后所有student实例的自定义事件全都不凑效
            }
        }
    }
</script>
```
### TodoList自定义事件版本
```vue
//App.vue
<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Topper @newTodo="newTodo" />
            <List 
                :list="list" 
                :updateItem="updateItem"
                :clearOne="clearOne"
            />
            <Footer 
                :list="list" 
                @updateAllItem="updateAllItem"
                @clearAllDone="clearAllDone"
            />
        </div>
    </div>
</template>

//Topper.vue
<script>
    import {nanoid} from 'nanoid'

    export default {
        name:'Topper',
        methods:{
            add(e){
                const {value} = e.target
                if(value.trim() === ''){
                    alert('内容不能为空！')
                    return
                }
                const obj = {id:nanoid(),name:value,done:false}
                this.$emit('newTodo',obj)
                e.target.value = ''
            }
        }
    }
</script>
//Footer.vue
<script>
    export default {
        name:'Footer',
        props:['list'],
        computed:{
            done(){
                return this.list.filter((item)=>{
                    return item.done === true
                }).length
            },
            allDone:{
                get(){
                    return this.done === this.list.length && this.done > 0
                },
                set(value){
                    this.$emit('updateAllItem',value)
                }
            }
        },
        methods:{
            updateAll(e){
                this.$emit('updateAllItem',e.target.checked)
            },
            clearAll(){
                this.$emit('clearAllDone')
            }
        }
    }
</script>
```

### 全局事件总线（GlobalEventBus)
1. 一种组件间通信的方式，适用于任意组件间通信。
2. 安装全局事件总线：
```js
//main.js
new Vue({
    el:'#app',
    render:h => h(App),
    beforeCreate(){
        //在初始化时在vue的原型对象上安装全局事件总线
        //这样所有的组件都可以通过this.$bus访问并操作绑定和触发事件。
        //实现任意组件间传递数据
        Vue.prototype.$bus = this 
    }
})
```
3. 使用事件总线：
```vue
//School.vue
<script>
    export default {
        data(){
            return{
                name:'尚硅谷',
                address:'深圳',
                studentName:''
            }
        },
        mounted(){
            //通过$bus.$on绑定自定义事件接收来自其他组件的数据
            this.$bus.$on('showName',(v)=>{
                console.log('showName被触发了')
                this.studentName = v
            })
        },
        beforeDestroy(){
            //组件销毁前解绑事件。
            this.$bus.$off('showName')
        },
    
    }
</script>
```
```vue
//Student.vue
<script>
    export default {
        data(){
            return{
                name:'Jack',
                age:18,
                number:0
            }
        },
        methods:{
            show(){
                //通过$bus.$emit触发自定义事件发送数据
                this.$bus.$emit('showName',this.name)
            }
        }
    }
</script>
```
4. 最好在`beforeDestroy()`钩子中，用`$off`去解绑当前组件所用到的事件。

### 消息订阅与发布（pubsub)
1. 一种组件间通信的方式，适用于任意组件间通信。
2. 使用步骤：
	1. 安装：`npm i pubsub-js`
	2. 引入：`import pubsub from 'pubsub-js'`
	3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
```js
mounted(){
	//订阅消息
    this.pubId = pubsub.subscribe('hello',(msgName,value)=>{
        console.log('有人发布了hello消息')
        this.studentName = value
    })
},
beforeDestroy(){
	//组件销毁前取消订阅
    pubsub.unsubscribe(this.pubId)
},
```
	4. 提供数据：`pubsub.publish('hello',数据)
```js
 methods:{
    show(){
    	//发布消息
        pubsub.publish('hello',this.name)
    }
}
```

### nextTick生命周期钩子
1. 语法：`this.$nextTick(callback)`
2. 作用：在下一次DOM更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在`nextTick`所指定的回调函数中执行。
```vue
//Item.vue
<template>
    <li  @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
        <label>
            <input type="checkbox" :checked="item.done" @change="update"/>
            <span v-show="!isEdit">{{ item.name }}</span>
            <input type="text" v-show="isEdit" v-model='item.name' 
                    @keyup.enter="editFinish" 
                    placeholder="按回车确认" 
                    ref="editItemInput"
            />
        </label>
        <button class="btn btn-danger" v-show="mouseIn" @click="remove">删除</button>
        <button class="btn btn-safe" v-show="mouseIn" @click="editing">编辑</button>
    </li>
</template>

<script>
    export default {
        name:'Item',
        props:['item'],
        data(){
            return{
                mouseIn:false,
                isEdit:false
            }
        },
        methods:{
            update(e){
                this.$bus.$emit('updateItem',this.item.id,e.target.checked)
            },
            remove(){
                this.$bus.$emit('clearOne',this.item.id)
            },
            editing(){
                this.isEdit = true
                //更新状态后，重新渲染页面后再获取焦点，使用$nextTick
                this.$nextTick(()=>{
                    this.$refs.editItemInput.focus()
                })
            },
            editFinish(){
                this.isEdit = false
            }
        }
    }
</script>
```

### Vue动画
- `<transition></transition>`的使用
```vue
<template>
  <div>
      <button @click="show = !show">click</button>
      <!-- 如果设定了name属性，则类名也要对应修改，默认类名是v-enter-active -->
      <!-- appear属性让元素一开始就有入场动画 -->
      <transition name="hello" appear>
          <h3 v-show="show">你好啊</h3>
      </transition>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:true
        }
    }
}
</script>

<style>
    h3{
        background-color: lawngreen;
        width: 300px;
    }
    /* .v-enter-active{
        animation: Fadein 1s;
    } */
    .hello-enter-active{
        animation: Fadein 1s;
    }
    .hello-leave-active{
        animation: Fadein 1s reverse; /* 离场动画用reverse反方向执行即可 */
    }
    @keyframes Fadein {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0);
        }
    }
</style>
```

### Vue过渡
```vue
<template>
  <div>
      <button @click="show = !show">click</button>
      <transition name="hello" appear>
          <h3 v-show="show">你好啊</h3>
      </transition>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:true
        }
    }
}
</script>

<style>
    h3{
        background-color: lawngreen;
        width: 300px;
    }
    /* 进入的起点,离开的终点 */
    .hello-enter,.hello-leave-to{
        transform: translateX(-100%);
    }
    /* 进入和离开的过程 */
    .hello-enter-active,.hello-leave-active{
        transition: all .6s;
    }
    /* 进入的终点，离开的起点 */
    .hello-enter-to,.hello-leave{
        transform: translateX(0);
    }
</style>
```
### 多个元素同时应用动画或过度
用`<transition-group></transition-group>`

### 第三方动画库---animate.css
-	官网：https://animate.style/
1. 安装：npm install animate.css --save
2. 引入：import 'animate.css';
3. 使用：
	- 进场动画放`enter-active-class`
	- 离场动画放`leave-active-class`
```vue
<template>
  <div>
      <button @click="show = !show">click</button>
      <transition-group appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__flip"
        leave-active-class="animate__flipOutY"
      >
          <h3 v-show="show" :key="1" >你好啊</h3>
          <h3 v-show="show" :key="2" >你好啊</h3>
      </transition-group>
  </div>
</template>
<script>
    import 'animate.css'

    export default {
        data(){
            return{
                show:true
            }
        }
    }
</script>
<style>
    h3{
        background-color: lawngreen;
        width: 300px;
    }
</style>
```

### 配置代理方式一
- 只能配置一个
- 官网https://cli.vuejs.org/zh/config/#devserver-proxy
- 通过根目录下的 vue.config.js 中的 devServer.proxy 选项来配置
```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000' //目标服务器及端口
  }
}
```
```vue
<template>
  <div>
      <h2>跨域请求</h2>
      <button @click="getStudent">获取学生信息</button>
      <ul>
          <li v-for="s in studentMsg" :key="s.id">
              {{s.name}} --- {{s.age}}
          </li>
      </ul>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                studentMsg:[]
            }
        },
        methods:{
            getStudent(){
                axios.get('http://localhost:8081/students')
                .then((res)=>{
                    console.log('请求成功')
                    this.studentMsg = res.data
                },(err)=>{
                    console.log('获取出错了！',err.message)
                })
            }
        }
    }
</script>
```

### 配置代理方式二
- 可以配置多个代理
```js
module.exports = {
    devServer: {
        proxy: {
          '/api': { //自定义前缀，请求前缀是这个的都会用代理转发
            target: 'http://localhost:5000', //目标路径
            pathRewrite:{'^/api':''}, //重新路径，将前缀去掉
            ws: true, //用于支持websocket
            changeOrigin: true //用于控制请求头中的host值
          },
          '/foo': {
            target: 'http://localhost:5001',
            pathRewrite:{'^/foo':''},
            changeOrigin: true,
            ws:true
          }
        }
      }
  }
```
```vue
<template>
  <div>
      <h2>跨域请求</h2>
      <button @click="getStudent">获取学生信息</button>
      <button @click="getCars">获取汽车信息</button>
      <ul>
          <li v-for="s in studentMsg" :key="s.id">
              {{s.name}} --- {{s.age}}
          </li>
      </ul>
      <ul>
          <li v-for="c in cars" :key="c.id">
              {{c.name}} --- {{c.price}}
          </li>
      </ul>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                studentMsg:[],
                cars:[]
            }
        },
        methods:{
            getStudent(){
            	//请求路径加对应代理的前缀，才会走代理
                axios.get('http://localhost:8081/api/students')
                .then((res)=>{
                    console.log('请求成功')
                    this.studentMsg = res.data
                },(err)=>{
                    console.log('获取出错了！',err.message)
                })
            },
            getCars(){
                axios.get('http://localhost:8081/foo/cars')
                .then((res)=>{
                    console.log('请求成功')
                    this.cars = res.data
                },(err)=>{
                    console.log('获取出错了！',err.message)
                })
            }
        }
    }
</script>
```

### github案例
- es6 对象的字面量的替换：
	`this.infoObj = {...this.infoObj,...Obj}`
	当参数是一个obj，一次性根据里面重名的属性替换，不重名的保留

### 默认插槽
- 父组件：`<子组件>这里的内容将会展示在子组件的插槽中</子组件>`
- 子组件：**定义一个插槽，展示标签体内容 **
	`<slot>这里的内容为默认内容，如果没有往插槽中传入数据就会展示</slot>`
  
### 具名插槽
- 多个插槽结构的时候可以使用
- `<slot name="center"></slot>`
- 传入数据时：`<ul slot="center">...</ul>` 或 `<template v-slot:center></template>`

### 作用域插槽
- 数据在子组件中，通过`<slot :games="games"></slot>`将数据传递给组件的使用者。
```vue
<template>
  <div class="box">
    <h3>{{title}}</h3>
    <slot :games="games"></slot>
  </div>
</template>
```
- 由父组件提供结构，使同一份数据，可以以不同结构展示，使用时：
```vue
<template>
  <div>
    <h1>Vue</h1>  
    <div class="container">
      <Category :title="'游戏'">
        <template scope="gameData">
          <ul>
              <li v-for="(item,i) in gameData.games" :key="i">{{item}}</li>
          </ul>
        </template>
      </Category>
      <Category :title="'游戏'">
        <template scope="gameData">
          <ol>
            <li v-for="(item,i) in gameData.games" :key="i">{{item}}</li>
          </ol>
        </template>
      </Category>
      <Category :title="'游戏'">
        <template scope="gameData">
          <h4 v-for="(item,i) in gameData.games" :key="i">{{item}}</h4>
        </template>
      </Category>
    </div>
  </div>
</template>
```

## <span id="Vuex">Vuex</span>
- 理解：专门在Vue中实现集中式状态（数据）管理的一个Vue插件。
- 什么时候用？
	1. 多个组件依赖同一状态（即数据data）
	2. 来自不同组件的行为需要变更同一状态。

### 搭建vuex环境
- 安装：`npm i vuex`
1. 创建文件：src/store/index.js
```js
// 该文件用于创建vuex中最为核心的store

//引入Vuex
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象--用于响应组件中的动作
const actions = {}
//准备mutations对象--用于操作数据（state）
const mutations = {}
//准备state对象--用于存储数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```
```js
//main.js
import Vue from 'vue'
import App from './App'
//引入store
import store from './store'

new Vue({
    el:'#app',
    store,
    render:h => h(App),
})
```

### vuex基本使用--求和案例
```js
//store/index.js
// 该文件用于创建vuex中最为核心的store

//引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//准备actions--用于响应组件中的动作
const actions = {
    // jia(context,value){
    //     context.commit('JIA',value)
    // },
    // jian(context,value){
    //     context.commit('JIAN',value)
    // },
    jiaOdd(context,value){
        if(context.state.count % 2){
            context.commit('JIA',value)
        }
    },
    jiaLater(context,value){
        setTimeout(() => {
            context.commit('JIA',value)
        }, 1000);
    }
}
//准备mutations--用于操作数据（state）一般mutations中的方法用大写
const mutations = {
    JIA(state,value){
        state.count += value
    },
    JIAN(state,value){
        state.count -= value
    }
}
//准备state--用于存储数据
const state = {
    count:8
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```
```vue
//count.vue
<template>
  <div>
      <h2>当前的求和为：{{ count }}</h2>
      <select v-model.number='n'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
      <button @click="jia">+</button>
      <button @click="jian">-</button>
      <button @click="addWhenOdd">奇数加</button>
      <button @click="addLater">等等加</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            n:1
        }
    },
    computed:{
        count(){
            //从store获取数据
            return this.$store.state.count
        }
    },
    methods:{
        jia(){
            //逻辑比较简单的时候，调用commit跳过actions直接与mutations交流
            this.$store.commit('JIA',this.n)
        },
        jian(){
            //逻辑比较简单的时候，调用commit跳过actions直接与mutations交流
            this.$store.commit('JIAN',this.n)
        },
        addWhenOdd(){
            this.$store.dispatch('jiaOdd',this.n)
        },
        addLater(){
            this.$store.dispatch('jiaLater',this.n)  
        }
    }
}
</script>
```

### `getters`的使用
- 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。类似data和computed的关系。
- 在`store`中追加`getters`配置：
```js
const getters = {
    bigSum(state){
        return state.count * 10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```
- 组件中读取数据：`$store.getters.bigSum`

### 四个map方法的使用
- 方便从`store`读取数据和操作方法
	1. `mapState`
	2. `mapGetters`
	3. `mapMutations`
	4. `mapActions`
- 引入：`import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'`
```js
computed:{
        //传统读取store数据
        // count(){
        //     //从store获取数据
        //     return this.$store.state.count
        // },
        // school(){
        //     //从store获取数据
        //     return this.$store.state.school
        // },
        // subject(){
        //     //从store获取数据
        //     return this.$store.state.subject
        // },
        //借助mapState批量读取store数据并生成计算属性（对象写法）。
        ...mapState({count:'count',xuexiao:'school',xueke:'subject'}),
        //生成的计算属性名与state数据的名一样时，可以用数组写法。
        ...mapState(['count','school','subject']),
        //同理使用mapGetters
        ...mapGetters(['bigSum'])
        // bigSum(){
        //     //从store获取数据
        //     return this.$store.getters.bigSum
        // },
    },
```
```js
methods:{
        //传统方式写的方法进行commit
        // jia(){
        //     //逻辑比较简单的时候，调用commit跳过actions直接去联系mutations
        //     this.$store.commit('JIA',this.n)
        // },
        // jian(){
        //     //逻辑比较简单的时候，调用commit跳过actions直接去联系mutations
        //     this.$store.commit('JIAN',this.n)
        // },
        //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
        ...mapMutations({jia:'JIA',jian:'JIAN'}),
        //数组写法,对应方法也要写成大写
        ...mapMutations(['JIA','JIAN']),
        //传统写的方法进行dispatch
        // addWhenOdd(){
        //     this.$store.dispatch('jiaOdd',this.n)
        // },
        // addLater(){
        //     this.$store.dispatch('jiaLater',this.n)  
        // }
        ...mapActions({addWhenOdd:'jiaOdd',addLater:'jiaLater'}),
        //数组写法
        ...mapActions(['jiaOdd','jiaLater'])
    }
```

### vuex模块化
- 目的：让代码更好维护，让多种数据分类更加明确
- 修改：`store.js`
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//vuex模块化
const countOptions = {
    //需要配置namespaced配置项
    namespaced:true,
    actions:{
        jiaOdd(context,value){
            if(context.state.count % 2){
                context.commit('JIA',value)
            }
        },
        jiaLater(context,value){
            setTimeout(() => {
                context.commit('JIA',value)
            }, 1000);
        }
    },
    mutations:{
        JIA(state,value){
            state.count += value
        },
        JIAN(state,value){
            state.count -= value
        },
    },
    state:{
        count:8,
    school:'深职院',
    subject:'前端',
    },
    getters:{
        bigSum(state){
            return state.count * 10
        }
    },
}
const personsOptions = {
    //需要配置namespaced配置项
    namespaced:true,
    actions:{
    },
    mutations:{
        ADD_PERSON(state,value){
            state.personList.unshift(value)
        }
    },
    state:{
        personList:[
            {id:'001',name:'Jack'},
            {id:'002',name:'Tom'},
        ]
    },
    getters:{},
}

export default new Vuex.Store({
    modules:{
        countOptions,
        personsOptions
    }
})
```
- 开启namespaced命名空间后，在组件中读取数据：
```js
    computed:{
    //如果是mapXXX方法，在前面多添加一个分类名称的参数即可
        ...mapState('countOptions',['count','school','subject',]),
        ...mapState('personsOptions',['personList',]),
        ...mapGetters('countOptions',['bigSum'])
    },
    methods:{
        ...mapMutations('countOptions',{jia:'JIA',jian:'JIAN'}),
        ...mapActions('countOptions',['jiaOdd','jiaLater'])
    }
```
```js
    computed:{
        personList(){
            //直接读取state中的数据，前面加上分类名称
            return this.$store.state.personsOptions.personList
            //如果读取的是getters中的数据
            // return this.$store.getters['personsOptions/personList']
        },
        count(){
            return this.$store.state.countOptions.count
        },
    },
    methods:{
        add(){
            const obj = {id:nanoid(),name:this.name}
            //直接与mutations交流，前面加上分类名称
            this.$store.commit('personsOptions/ADD_PERSON',obj)
            //如果是使用dispatch与actions交流
            // this.$store.dispatch('personsOptions/ADD_PERSON',obj)
            this.name = ''
        },
    }
```


## <span id="vue-router">vue-router路由</span>
- 理解：vue的一个插件库，专门用来实现SPA应用
- 安装：`npm i vue-router`
- 编写`router`配置项：创建`src/router/index.js`
```js
//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";

//引入组件
import About from '../components/About'
import Home from '../components/Home'

//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {path:'/about',component:About},
        {path:'/home',component:Home}
    ]
})
```
```js
//main.js
import Vue from 'vue'
import App from './App'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)

new Vue({
    el:'#app',
    render:h => h(App),
    router  //配置路由选项
})
```
- 实现切换（`active-class`可配置高亮样式)
```html
<!-- 用router-link代替a标签 -->
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>


<!-- 指定组件的呈现位置 -->
<router-view></router-view>
```
### 路由几个注意点
1. 路由组件通常存放在`pages`文件夹中，一般组件通常存放在`components`文件夹中。
2. 通过切换，隐藏了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有组件的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到。

### 多级路由（嵌套路由）
1. 配置规则：
```js
import VueRouter from "vue-router";

import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'

export default new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            //二级路由配置在children选项中
            children:[
                {
                    path:'news', //此处一定不要写‘/news’
                    component:News,
                },
                {
                    path:'message', //此处一定不要写‘/message’
                    component:Message,
                },
            ]
        }
    ]
})
```
2. 跳转（要写完整路径）：
```html
<router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
<router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
```

### 路由的query参数
1. 传递参数
```vue
<ul>
    <li v-for="m in msgList" :key="m.id">
        <!-- 跳转路由并携带query参数，to的模板字符串写法 -->
        <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>

        <!-- 跳转路由并携带query参数，to的对象写法 -->
        <router-link :to="{
            path:'/home/message/detail',
            query:{
                id:m.id,
                title:m.title
            }
        }">
            {{m.title}}</router-link>
    </li>
</ul>
```
2. 接收参数：
```js
$route.query.id
$route.query.title
```

### 为路由命名
- 作用：可以简化跳转路径的编写
- 使用：
- 1. 命名：
```js
export default new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                    path:'news',
                    component:News,
                },
                {
                    path:'message',
                    component:Message,
                    children:[
                        {
                            name:'xijie', //为路由命名，适合在多级路由中
                            path:'detail',
                            component:Detail
                        }
                    ]
                },
            ]
        }
    ]
})
```
- 2. 跳转路径简化
```vue
<!-- 这里不再配置path，而是配置name -->
<router-link :to="{
    name:'xijie',
    query:{
        id:m.id,
        title:m.title
    }
}">跳转</router-link>
```

### 路由的params参数
1. 配置路由，声明接收params参数
```js
{
    path:'/home',
    component:Home,
    children:[
        {
            path:'news',
            component:News,
        },
        {
            path:'message',
            component:Message,
            children:[
                {
                    name:'xijie', 
                    path:'detail/:id/:title', //声明接收params参数
                    component:Detail
                }
            ]
        },
    ]
}
```
2. 传递参数
```vue
<!-- 跳转路由并携带params参数，to的模板字符串写法 -->
<router-link :to="`/home/message/detail/${m.id}/${m.title}`">跳转</router-link>
            
<!-- 跳转路由并携带params参数，to的对象写法,此处不能配置path，只能使用name -->
<router-link :to="{
    name:'xijie',
    params:{
        id:m.id,
        title:m.title
    }
}">跳转</router-link>
```

### 路由的props配置
- 作用：让路由组件更方便的收到参数
```js
{
    name:'xijie',
    path:'detail',
    component:Detail,
    //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件
    props:{a:100,b:'hello'}

    //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件
    props:true

    //props的第三种写法，值为函数,会接收$route作为参数，该函数返回的对象中每一组key-value都会通过props传给Detail组件，通过$route可以应用在接收params参数或query参数上
    props($route){
        return {id:$route.query.id,title:$route.query.title}
    }
}
```

### `<router-link>`的`replace`属性
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史纪录有两种写入方式:分别时`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时默认为`push`。
3. 如何开启`replace`模式：`<router-link replace ...>跳转</router-link>`

### 编程式路由导航
1. 作用：不借助`<router-link`实现路由跳转，让路由跳转更加灵活
2. 具体编码：
```js
//$router的两个API
this.$router.push({
	name:'detail',
	paramas:{
		id:xxx,
		title:xxx
	}
})
this.$router.replace({
	name:'detail',
	paramas:{
		id:xxx,
		title:xxx
	}
})
//前进
this.$router.forward()
//后退
this.$router.back()
//可前进可后台，根据参数（正数或负数）
this.$router.go()
```

### 缓存路由组件
- 作用：让不展示的路由组件保持挂载，不被销毁。
- 使用：
```vue
<!-- 注明只缓存News组件，此处的名字是组件名 -->
<!-- 如果要缓存多个则写成数组形式 :include="['News','Message']" ,全部都缓存则不配置include即可 -->
<keep-alive include="News">
    <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子
- 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态，缓存之后就不会销毁，此时可以用这两个钩子取消一些定时器。
1. `activated`路由组件被激活时触发。
2. `deactivated`路由组件失活时触发。

### 路由守卫
- 作用：对路由进行权限控制
- 分类：全局守卫、独享守卫、组件内守卫
- 全局守卫：
```js
const routes = [
    {
        name:'guanyu',
        path:'/about',
        component:About,
        meta:{title:'关于'}
    },
    {
        name:'zhuye',
        path:'/home',
        component:Home,
        meta:{title:'主页'},
        children:[
            {   
                name:'xinwen',
                path:'news',
                component:News,
                meta:{isAuth:true,title:'新闻'}
            },
            {
                name:'xiaoxi',
                path:'message',
                component:Message,
                meta:{isAuth:true,title:'消息'},
                children:[
                    {
                        name:'xijie',
                        path:'detail',
                        component:Detail,
                        meta:{title:'细节'},
                        props({query:{id,title}}){
                            return {id,title}
                        }
                    }
                ]
            },
        ]
    }
]
const router = new VueRouter({
    routes
})

//全局前置路由守卫，初始化的时候、每次路由切换之前调用
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
        if(localStorage.getItem('school') === '深职院'){ //具体规则
            next() //放行
        }else{
            alert('无权访问')
        }
    }else{
        next() //放行
    }
    
})

//全局后置路由守卫，初始化的时候被调用、每次路由切换之后调用
router.afterEach((to,from)=>{
    document.title = to.meta.title || '学习Vue' //修改网页的title
})


export default router
```

### 独享路由守卫
- 单独在某个需要的路由中配置`beforeEnter`
```js
{   
    name:'xinwen',
    path:'news',
    component:News,
    meta:{isAuth:true,title:'新闻'},
    beforeEnter(to, from, next){
        if(to.meta.isAuth){
            if(localStorage.getItem('school') === '深职院'){
                next()
            }else{
                alert('无权访问')
            }
        }

    }
}
```

### 组件内守卫：
```vue
<script>
    export default {
        name:'About',
        mounted(){
            // console.log(this.$route)
        },
        //通过路由规则，进入该组件时被调用
        beforeRouteEnter (to, from, next) {
            if(to.meta.isAuth){
                if(localStorage.getItem('school') === '深职院'){
                    next()
                }else{
                    alert('无权访问')
                }
            }
        },
        //通过路由规则，离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            console.log('beforeRouteLeave')
            next()
        }
    }
</script>
```

### 路由器的两种工作模式
1. 对于一个url来说，什么是hash值？---#及其后面的内容就是hash值。
2. hash值不会包含在http请求中，即：hash值不会带给服务器。
3. hash模式：
	1. 地址中永远带着#号，不美观。
	2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
	3. 兼容性较好。
4. history模式：
	1. 地址干净，美观。
	2. 兼容性和hash模式相比略差。
	3. 应用部署上线需要后端人员支持，解决刷新页面服务器端404的问题。

## <span id="element-ui">element-ui</span>
- 移动端常用UI组件库
	1. Vant
	2. Cube UI
	3. Mint UI
- PC端常用UI组件库
	1. Element UI
	2. IView UI

## <span id="vue3">Vue 3</span>
### 分析初始化工程
```js
//main.js
//引入的不再是Vue构造函数，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象--app(类似于之前Vue2中的vm，但app比vm更轻)
const app = createApp(App)
//挂载
app.mount('#app')
```

### 拉开序幕的setup
1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
```vue
<template>
  //根标签不是必须的
  <h1>Hello Vue 3,我是App组件</h1>
  <hr>
  <h2>Name: {{name}}</h2>
  <h2>Age: {{age}}</h2>
  <h2>Sex: {{sex}}</h2>
  <button @click="sayHello">hi</button>
</template>

<script>
import {h} from 'vue'

export default {
  name: 'App',
  data(){
    return{
      sex:'M'
    }
  },
  setup(){
    let name = 'Jack'
    let age = 18

    function sayHello(){
      alert(`my name is ${name} , i am ${age} years old.`)
    }

    //返回一个对象（常用）
    return {
      name,
      age,
      sayHello
    }

    //返回一个函数（渲染函数）
    // return ()=> h('h1','使用渲染函数')
  }
}
</script>
```
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

### ref函数
- 作用: 定义一个响应式的数据
- 语法:`const xxx = ref(initValue)`
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— `reactive`函数。
```html
<script>
import {ref} from 'vue'
export default {
  name: 'App',
  setup(){
    let name = ref('Jack')
    let age = ref(18)

    function change(){
      name.value = 'Tom'
      age.value = 28
    }

    return {
      name,
      age,
      change
    }
  }
}
</script>
```

### reactive函数
- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用`ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。
```js
import {ref,reactive} from 'vue'
export default {
  name: 'App',
  setup(){
    let name = ref('Jack')
    let age = ref(18)
    let job = reactive({
      type:'前端工程师',
      salary:'30K'
    })

    function change(){
      name.value = 'Tom'
      age.value = 28
      job.type = 'Ui'
      job.salary = "50K"
    }

    return {
      name,
      age,
      change,
      job
    
    }
  }
}
```

### Vue3.0中的响应式原理

- 实现原理: 
  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过Reflect（反射）:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    
    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
    
```js
new Proxy(data, {
// 拦截读取属性值
  get (target, prop) {
    return Reflect.get(target, prop)
  },
  // 拦截设置属性值或添加新属性
  set (target, prop, value) {
    return Reflect.set(target, prop, value)
  },
  // 拦截删除属性
  deleteProperty (target, prop) {
    return Reflect.deleteProperty(target, prop)
  }
})

proxy.name = 'tom'   
```

### reactive对比ref
-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过`reactive`转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>`.value`，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>`.value`。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>`.value`。

### setup的两个注意点
- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。

### 计算属性：computed函数
- 与Vue2.x中computed配置功能一致
- 写法
```js
import {computed} from 'vue'

setup(){
  ...
//计算属性——简写
  let fullName = computed(()=>{
      return person.firstName + '-' + person.lastName
  })
  //计算属性——完整
  let fullName = computed({
      get(){
          return person.firstName + '-' + person.lastName
      },
      set(value){
          const nameArr = value.split('-')
          person.firstName = nameArr[0]
          person.lastName = nameArr[1]
      }
  })
}
```

### watch函数
- 与Vue2.x中watch配置功能一致
- 两个小“坑”：
  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。
```js
import {ref,reactive,watch} from 'vue'
export default {
    setup(){
		let sum = ref(0)
		let msg = ref('Hello')
		let person = reactive({
			name:'Jack',
			age:18,
			job:{
				j1:{
					salary:20
				}
			}
		})
		
        //情况一：监视ref定义的响应式数据
        watch(sum,(newValue,oldValue)=>{
        console.log('sum变化了',newValue,oldValue)
        },{immediate:true})

        //情况二：监视多个ref定义的响应式数据
        watch([sum,msg],(newValue,oldValue)=>{
        console.log('sum或msg变化了',newValue,oldValue)
        }) 

        /* 情况三：监视reactive定义的响应式数据
                若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
                若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
        */
        watch(person,(newValue,oldValue)=>{
        console.log('person变化了',newValue,oldValue)
        },{immediate:true,deep:false}) //此处的deep配置不再奏效

        //情况四：监视reactive定义的响应式数据中的某个属性
        watch(()=>person.job,(newValue,oldValue)=>{
        console.log('person的job变化了',newValue,oldValue)
        },{immediate:true,deep:true}) 

        //情况五：监视reactive定义的响应式数据中的某些属性
        watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
        console.log('person的job变化了',newValue,oldValue)
        },{immediate:true,deep:true})

        //特殊情况
        watch(()=>person.job,(newValue,oldValue)=>{
          console.log('person的job变化了',newValue,oldValue)
        },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
        return {sum,msg,person}
    }
}
```

### watchEffect函数
- watch的套路是：既要指明监视的属性，也要指明监视的回调。
- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- watchEffect有点像computed：
  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。
  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```
  
  ### Vue3中的生命周期
- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
- ```beforeDestroy```改名为 ```beforeUnmount```
- ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
- `beforeCreate`===>`setup()`
- `created`=======>`setup()`
- `beforeMount` ===>`onBeforeMount`
- `mounted`=======>`onMounted`
- `beforeUpdate`===>`onBeforeUpdate`
- `updated` =======>`onUpdated`
- `beforeUnmount` ==>`onBeforeUnmount`
- `unmounted` =====>`onUnmounted`

### 自定义hook函数
- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

### toRef
- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`
```js
setup(){
	.......
	return{name:toRef(person,'name')}   //单个
	return ...toRefs(person) //整个person对象
}
```

### 其它 Composition API
1. shallowReactive 与 shallowRef
- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换 ===> shallowRef。

2. readonly 与 shallowReadonly
- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

### toRaw 与 markRaw
- toRaw：
  - 作用：将一个由`reactive`生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### customRef
- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：
```vue
<template>
<input type="text" v-model="keyword">
<h3>{{keyword}}</h3>
</template>
<script>
import {ref,customRef} from 'vue'
export default {
    name:'Demo',
    setup(){
        // let keyword = ref('hello') //使用Vue准备好的内置ref
        //自定义一个myRef
        function myRef(value,delay){
            let timer
            //通过customRef去实现自定义
            return customRef((track,trigger)=>{
                return{
                    get(){
                        track() //告诉Vue这个value值是需要被“追踪”的
                        return value
                    },
                    set(newValue){
                        clearTimeout(timer)
                        timer = setTimeout(()=>{
                            value = newValue
                            trigger() //告诉Vue去更新界面
                        },delay)
                    }
                }
            })
        }
        let keyword = myRef('hello',500) //使用程序员自定义的ref
        return {
            keyword
        }
    }
}
</script>
```

### provide 与 inject
- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信
- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据
- 具体写法：
  1. 祖组件中：
 ```js
 setup(){
    ......
     let car = reactive({name:'奔驰',price:'40万'})
     provide('car',car)
     ......
 }
 ```
  2. 后代组件中：
 ```js
 setup(props,context){
    ......
     const car = inject('car')
     return {car}
    ......
 }
 ```

### 响应式数据的判断
- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

### 新的组件
1. Fragment
- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用、
2. Teleport
- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。
- to——移动的位置，用css选择器获取元素
```vue
<teleport to="#footer">
<div v-if="isShow" class="mask">
    <div class="dialog">
        <h3>我是一个弹窗</h3>
        <button @click="isShow = false">关闭弹窗</button>
    </div>
</div>
</teleport>
```

### Suspense
- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 使用步骤：
   - 异步引入组件
```js
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
```
   - 使用`Suspense`包裹组件，并配置好`default` 与 `fallback`
```vue
<template>
    <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
            <template v-slot:default>
                <Child/>
            </template>
            <template v-slot:fallback>
                <h3>加载中.....</h3>
            </template>
        </Suspense>
    </div>
</template>
```

### 其他

全局API的转移
- Vue 2.x 有许多全局 API 和配置。
  - 例如：注册全局组件、注册全局指令等。
```js
//注册全局组件
Vue.component('MyButton', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

//注册全局指令
Vue.directive('focus', {
  inserted: el => el.focus()
}
```

- Vue3.0中对这些API做出了调整：
  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上
    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |
  

### 其他改变
- data选项应始终被声明为一个函数。
- 过度类名的更改：
  - Vue2.x写法
```css
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-leave,
.v-enter-to {
  opacity: 1;
}
```
  - Vue3.x写法
```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```
- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```
- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符
  - 父组件中绑定事件
```vue
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```
  - 子组件中声明自定义事件
```vue
<script>
  export default {
    emits: ['close']
  }
</script>
```
- <strong style="color:#DD5145">移除</strong>过滤器（filter）
  
  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。
- ......

### 单文件组件`<script setup>`

详情：https://v3.cn.vuejs.org/api/sfc-script-setup.html

```vue
<template>
  <h1>测试反应时间</h1>
  <button @click="start" :disabled="isPlay">开始</button>
  <Block v-if="isPlay" :delay="delay" @gameOver="showResult" />
  <Result :result="result" v-if="!isPlay && result"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Block from './components/Block.vue';
import Result from './components/Result.vue';

  const isPlay = ref(false)
  const delay = ref(null)
  const result = ref('')

  function start(){
    delay.value = 2000 + Math.random() * 5000
    isPlay.value = true
  }

  function showResult(v){
    isPlay.value = false
    result.value = v
    // console.log('gameOver',v)
  }

  onMounted(()=>{
    // console.log('挂载了。',delay.value)
  })

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```




************************************
# <span id="tools">工具收藏夹</span>
- 滚动时元素动画载入
https://motion.vueuse.org/presets.html
@vueuse/motion

- 剪贴板插件
https://www.npmjs.com/package/vue-clipboard2



# 元素的尺寸
`clientWidth`和`clientHeight`
元素的可见宽度和可见高度，不带单位，返回一个数字，可直接进行结算;包括内容区和`padding`，只读属性。
`offsetWidth`和`offsetHeight`
元素整体宽高，包括内容区，`padding`,`border`。
`offsetParent`
用来获取当前元素的定位父元素，会获取到离当前元素最近的开启了定位的祖先元素。
`offsetLeft`和`offsetTop`
当前元素相对于其定位父元素的水平、垂直偏移量。
`scrollHeight`和`scrollWidth`
获取元素的整体宽高，包含滚动区域。
`scrollLeft`和`scrollTop`
获取滚动条已滚动的距离。

> 别名：`window.pageXOffset` 或 `window.scrollX`
> 别名：`window.pageYOffset` 或 `window.scrollY`
```js
//当满足以下等式表示滚动条已经到头
scrollHeight - scrollTop == clientHeight
scrollWidth - scrollLeft == clientWidth
```
