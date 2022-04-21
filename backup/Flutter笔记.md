

# Flutter

官方中文文档：https://flutter.cn/docs/get-started/install
国内文档：https://flutterchina.club/get-started/install/

学习资料：https://book.flutterchina.club/chapter1/install_flutter.html

## 常用插件
- Flutter, Dart（语法）, Flutter Widget Snippets（代码片段）, Awesome Flutter Snippets（代码片段）
- Code Runner
- 代码块竖线提示：vscode设置-Guides: Bracket Pairs控制是否启用括号对指南。
- 启用括号着色：vscode设置-Bracket Pair Colorization: Enabled

## 配置flutter环境

- 打开ios模拟器
  open -a Simulator

- Flutter SDK路径
  export PATH=$PATH:/Users/kingroger/sdk/flutter/bin

- 将路径添加到path

> 单个用户设置
> cd ~
>
> vim ~/.bash_profile （任意一个文件中添加用户级环境变量，i进入编辑模式）
>
> export PATH=/opt/local/bin:/opt/local/sbin:$PATH
> 把上述代码添加到~/.bash_profile上。
>
> source 相应的文件 生效配置环境
> source ～/.bash_profile
>
> 查看PATH
> echo $PATH
>
> mac默认使用zsh，所以配置的.bash_profile不能生效，需要再配置.zshrc（新建.zshrc）
> 配置内容：
> if [ -f ~/.bash_profile ]; then
> source ~/.bash_profile
> fimac默认使用zsh，所以配置的.bash_profile不能生效，需要再配置.zshrc（新建.zshrc）
> 配置内容：
> if [ -f ~/.bash_profile ]; then
> source ~/.bash_profile
> fi





## 创建

命令：flutter create <output directory>

打开ios模拟器
open -a Simulator

运行(提前打开模拟器)：flutter run

文件结构：

- 主要目录 lib -- main.dart
- 项目详情及依赖 pubspec.yaml

## 介绍

Flutter Widget采用现代响应式框架构建，这是从 [React](http://facebook.github.io/react/) 中获得的灵感，中心思想是用widget构建你的UI。 Widget描述了他们的视图在给定其当前配置和状态时应该看起来像什么。当widget的状态发生变化时，widget会重新构建UI，Flutter会对比前后变化的不同， 以确定底层渲染树从一个状态转换到下一个状态所需的最小更改（译者语：类似于React/Vue中虚拟DOM的diff算法）。

**Flutter中一切都是Widget（小部件），包括文字、图片、容器**

## Hello World

一个最简单的Flutter应用程序，只需一个widget即可！如下面示例：将一个widget传给[`runApp`](https://docs.flutter.io/flutter/widgets/runApp.html)函数即可：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    new Center(
      child: new Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

该[`runApp`](https://docs.flutter.io/flutter/widgets/runApp.html)函数接受给定的[`Widget`](https://docs.flutter.io/flutter/widgets/Widget-class.html)并使其成为widget树的根。 在此示例中，widget树由两个widget:Center(及其子widget)和Text组成。框架强制根widget覆盖整个屏幕，这意味着文本“Hello, world”会居中显示在屏幕上。文本显示的方向需要在Text实例中指定，当使用MaterialApp时，文本的方向将自动设定，稍后将进行演示。

在编写应用程序时，通常会创建新的widget，这些widget是无状态的[`StatelessWidget`](https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html)或者是有状态的[`StatefulWidget`](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html)， 具体的选择取决于您的widget是否需要管理一些状态。widget的主要工作是实现一个[`build`](https://docs.flutter.io/flutter/widgets/StatelessWidget/build.html)函数，用以构建自身。一个widget通常由一些较低级别widget组成。Flutter框架将依次构建这些widget，直到构建到最底层的子widget时，这些最低层的widget通常为[`RenderObject`](https://docs.flutter.io/flutter/rendering/RenderObject-class.html)，它会计算并描述widget的几何形状。

## 使用 Material 组件

主要文章: [Widgets 总览 - Material 组件](https://flutterchina.club/widgets/material)

Flutter提供了许多widgets，可帮助您构建遵循Material Design的应用程序。Material应用程序以[`MaterialApp`](https://docs.flutter.io/flutter/material/MaterialApp-class.html) widget开始， 该widget在应用程序的根部创建了一些有用的widget。

> 其中包括一个[`Navigator`](https://docs.flutter.io/flutter/widgets/Navigator-class.html)， 它管理由字符串标识的Widget栈（即页面路由栈）。[`Navigator`](https://docs.flutter.io/flutter/widgets/Navigator-class.html)可以让您的应用程序在页面之间的平滑的过渡。 是否使用[`MaterialApp`](https://docs.flutter.io/flutter/material/MaterialApp-class.html)完全是可选的，但是使用它是一个很好的做法。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Text('Flutter旋风'),//home属性表示首页展示的内容，这里展示了一个简单的Text部件
  ));
}
```

### Scaffold

Material Design布局结构的基本实现。此类提供了用于显示drawer、snackbar和底部sheet的API。他包含一些基本的布局属性，比如头部appbar、主体body、浮动的按钮floatingActionButton。

```dart
void main() {
  runApp(MaterialApp(//根widget
    home: Scaffold(//用于包装的widget
      appBar: AppBar(//头部widget
        title: Text('Flutter旋风'),//文字widget
        centerTitle: true,//可选属性，是否标题居中
        elevation: 0.0,//翻译为海拔、提高、标高，设置阴影使看起来立体
      ),
      body: Center(//居中widget，所有内部的内容都会居中显示
        child: Text('Hello world!'),//子组件都需要放在child属性里，又一个文字widget
      ),
      floatingActionButton: FloatingActionButton(//浮动的按钮widget
        mini: true,//可选属性，是否mini型按钮
        child: Text('Click'),//子组件：又一个文字widget
        onPressed: () {//对于按钮组件onPressed属性，为必需的，定义按下的行为
          print('be Click');
        },
      ),
    ),
  ));
}
```

### Colours & Fonts颜色和字体

[Material Design官网颜色库](https://material.io/design/color/the-color-system.html#tools-for-picking-colors)

颜色：通过Colors对象设置

字体：

1. 下载字体并添加到根目录，新建fonts文件夹中

2. 修改pubspec.yaml文件,注意子属性必须在第二行且要保持缩进，以此类推。使用的时候使用字体名称的字符串即可。

   ```
   fonts:
     - family: SyneMono
       fonts:
         - asset: fonts/SyneMono-Regular.ttf
   ```

   

```dart
void main(){
  runApp(MaterialApp(
    home:Scaffold(
        appBar:AppBar(
            title:Text('Hello World'),
            backgroundColor:Colors.teal[600],//配置背景颜色属性，调用Colors对象来设置指定颜色
          ),
        body:Center(
          child: Text(//对于Text组件不能直接设置颜色，要通过style属性配置TextStyle()组件来设置各种属性
            'Welcome!',
            style:TextStyle(//TextStyle()组件
              color:Colors.teal[600],//调用Colors对象
              fontSize:32.0,//字体大小
              letterSpacing:5.0,//字符间距
              fontWeight:FontWeight.w600,//字体粗细需要通过调用FontWeight对象来设置
              fontFamily: 'SyneMono',//设置字体
            )
          ),
        ),
        floatingActionButton: FloatingActionButton(
          child:Text('click'),
          onPressed: (){},
          backgroundColor:Colors.teal[600],
        ),
      )
  ));
}
```

### Stateless Widgets & Hot Reload

flutter中每一个组件就是一个class。

`StatelessWidget`无状态组件，组件的状态在初始化之后不能被改变。

`StatefulWidget`有状态组件，组件的状态可以随时改变，并会重新渲染页面。

Hot Reload热重载，每次代码修改保存后都会调用`build`，实现热重载。

```dart
import 'package:flutter/material.dart';

void main(){
  runApp(MaterialApp(
    home:Home()
  ));
}

class Home extends StatelessWidget {//通过拓展StatelessWidget创建自己的无状态组件，此代码是上面代码迁移出来单独的组件
  Home({Key? key}) : super(key: key);
  
  @override//声明重写类的成员，这里重写了StatelessWidget的build方法
  Widget build(BuildContext context) {//组件通过调用build方法返回一个组件（类型就是Widget）
    return Scaffold(
        appBar:AppBar(
            title:Text(
              'Hello World',
            ),
            backgroundColor:Colors.teal[600],
          ),
        body:Center(
          child: Text(
            'Welcome everyone',
            style:TextStyle(
              color:Colors.teal[600],
              fontSize:32.0,
              letterSpacing:5.0,
              fontWeight:FontWeight.w600,
              fontFamily: 'SyneMono',
            )
          ),
        ),
        floatingActionButton: FloatingActionButton(
          child:Text('click'),
          onPressed: (){print('Be Clicked');},
          backgroundColor:Colors.teal[600],
        ),
      );
  }
}
```

### Images & Assets

插入图片

1. 在根目录新建`images`或`assets`文件夹，用以保存要用的图片

2. 修改`pubspec.yaml`文件,声明启用的文件路径，到文件夹即可

   ```dar
   assets:
       - assets/
   ```

在组件中插入图片：

```dart
//方法1
body:Center(
  child: Image(//使用Image组件，并配置image属性
    // image: NetworkImage('https://imgs.cwgv.com.tw/pic/2021-04-21-1618994106.jpg'),//此为使用网络图片组件
    image: AssetImage('assets/star.jpeg'),//使用本地图片组件
  )
),

//方法2,简写模式
body:Center(
  //child: Image.network('https://imgs.cwgv.com.tw/pic/2021-04-21-1618994106.jpg')
  child: Image.asset('assets/star.jpeg')
),
```

### Buttons & Icons

使用Icons

icons库：https://fonts.google.com/icons?selected=Material+Icons

```dart
body:Center(
    child: Icon(//使用Icon组件
      Icons.shop,//调用Icons对象来制定使用哪一个icon
      color: Colors.red,
      size: 100,
    )
  ),
```

Buttons：

1. `ElevatedButton()`--高架按钮，有填充色，有阴影
2. `TextButton()`--文字按钮，只展示文字，点击时能看到按钮过渡动画
3. `OutlinedButton()`--边框按钮，展示文字和边框，没有填充色，点击时能看到过渡动画
4. `IconButton()`--可点击的icon

使用：

```dart
//带文字的按钮
body:Center(
  child: ElevatedButton(//按钮组件
    onPressed: (){},//点击处理程序，*必须
    child: Text('click'),//子组件
  )
),
//带文字和icon的按钮
body:Center(
  child: ElevatedButton.icon(//调用ElevatedButton组件的icon方法
    onPressed: (){}, 
    icon: Icon(Icons.mail), //配置icon属性，使用Icon组件并调用Icons对象来设置icon
    label: Text('Mail me')//label部分
  )
),
//icon按钮
body:Center(
  child: IconButton(
    onPressed: (){},
    icon: Icon(Icons.verified),
    color: Colors.red[200],
  )
),
```

#### 关于MaterialStateProperty

配置`ButtonStyle`，`MaterialStateProperty`的目的是使按钮可以在不同状态下可以有不同的style

```dart
ElevatedButton(
  onPressed: (() {}),
  child: Text('click'),
  style: ButtonStyle(
    backgroundColor:MaterialStateProperty.all(Colors.red[200])//MaterialStateProperty.all()所有状态
  )
)

//MaterialStateProperty.resolveWith()区分状态返回不同的style
ElevatedButton(
  style: ButtonStyle(
    backgroundColor: MaterialStateProperty.resolveWith((states) {
      // If the button is pressed, return green, otherwise blue
      if (states.contains(MaterialState.pressed)) {
        return Colors.green;
      }
      return Colors.blue;
    }),
    textStyle: MaterialStateProperty.resolveWith((states) {
      // If the button is pressed, return size 40, otherwise 20
      if (states.contains(MaterialState.pressed)) {
        return TextStyle(fontSize: 40);
      }
      return TextStyle(fontSize: 20);
    }),
  ),
  child: Text("Changing Button"),
  onPressed: () {},
)

```

MaterialStateProperty的状态还包括：

- disabled禁用

- dragged拖动

- error错误

- focused

- hovered鼠标移入

- pressed鼠标按下未放开

- scrolledUnder

- selected

并且可以同时设置多个状态，比如按钮可以同时被禁用disabled和鼠标移入hovered

> 禁用按钮，将onPressed属性的回调设为null即可：onPressed: null,

#### 简单的设置按钮的style

使用`ElevatedButton.styleFrom()`，如果是`TextButton`就是`TextButton.styleFrom()`，它会使用默认值自动处理不同的状态。

```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(primary: Colors.red),
  child: Text("Red Button"),
  onPressed: () {},
)
```

### Containers & Padding

Container组件即容器。需要为子组件提供一些包裹、背景颜色、margin、padding的时候使用。如果没有设置**子组件**，则它会默认获得最大的尺寸，下面的例子中它的大小是整个body。

```dart
body: Container(
  color: Colors.grey[400],//默认没有颜色，配置color属性可以准确看到他的大小。
),
```

![image-20220315185502304](/Users/kingroger/Library/Application Support/typora-user-images/image-20220315185502304.png)

如果设置了**子组件**，则Container的大小是子组件的大小；

下面的例子可以看到只有文字的部分才有背景颜色，此时Container的大小就是文字组件的大小。

```dart
body: Container(
  color: Colors.grey[400],//默认没有颜色，配置color属性可以准确看到他的大小。
  child: Text('旱地禾下土'),
),
```

![image-20220315185334627](/Users/kingroger/Library/Application Support/typora-user-images/image-20220315185334627.png)

#### Padding

设置padding属性不能直接输入数字。需要调用EdgeInsets（翻译为边缘插图）对象，它包含一些方法来为不同需求设置padding;同样可以设置在margin上。

- `all()`全部，即上下左右同时设置

- `symmetric()`对称设置，horizontal水平，即左右；vertical垂直，即上下。

- `zeo`上下左右均为0

- `fromLTRB`分别设置左上右下

- `only`仅设置制定位置

  ```dart
  padding：EdgeInsets.all(30) 
  padding：EdgeInsets.symmetric(horizontal: 50,vertical: 30) 
  padding：EdgeInsets.fromLTRB(30,20,30,40),
  padding：EdgeInsets.only(top:40),
  padding：EdgeInsets.zeo
  ```

如果不需要margin也不需要背景颜色，只想要在自组件周围设定padding的话，可以直接使用Padding组件。

```dart
Padding(
  child: Text('谁知盘中餐'),
  padding: EdgeInsets.all(30.0),//Padding组件中的padding熟悉是必需的
),
```

### Row

行组件，将所有子组件放在同一行中。

mainAxisAlignment属性设置flex方向的对齐方式以及空白位置的分配，与css中的flex一样

crossAxisAlignment属性设置与flex方向垂直的方向的对齐方式以及空白位置的分配，如flex方向是水平，那crossAxisAlignment设置的方向就是垂直方向的，反之亦然。

MainAxisAlignment对象的属性：

- center
- end
- start（默认）
- spaceAround
- spaceBetween
- spaceEvenly

CrossAxisAlignment对象的属性：

- start
- end
- center（默认）
- stretch（延伸）
- baseline

如果要设置CrossAxisAlignment.baseline属性，则必须设置textBaseline属性。

TextBaseline对象的属性：

- alphabetic
- ideographic

```dart
Row(
  mainAxisAlignment:MainAxisAlignment.spaceAround,
  crossAxisAlignment: CrossAxisAlignment.baseline,
  textBaseline:TextBaseline.alphabetic ,
  children: [
    Text('窗前明月光'),
    Icon(
      Icons.help,
      color: Colors.amber[300],
      size: 80.0,
    ),
    ElevatedButton(
      onPressed: (){},
      child: Text('+'),
    ),
  ],
),
```

### Column

列組件，将所有子组件放在同一列中，用法与Row组件一样，不同处在于它的主方向是垂直方向。

Column中可以嵌套Row，Row中也可以嵌套Column。

### Flutter Outline & Shortcuts

点击组件名称，在左侧的灯泡可以使用快捷功能，如移动组件或者给组件添加包裹等。

![image-20220316121050693](/Users/kingroger/Library/Application Support/typora-user-images/image-20220316121050693.png)

通过Flutter大纲也可以使用一些快捷功能，右键或右上角的功能菜单。

![image-20220316121755439](/Users/kingroger/Library/Application Support/typora-user-images/image-20220316121755439.png)

### Expanded组件

展开组件，功能类似于flex-grow，如果不设置flex属性，默认会获得所有的父组件的空白位置。

下面例子展示了在一个Row中，原本同样大小的三个Container组件在包括了Expaned组件并设置不同的flex属性值时大小的变化。

```dart
Row(
  children: [
    Expanded(
      flex: 3,
      child: Container(
        padding: EdgeInsets.all(30.0),
        color: Colors.red[300],
        child: Text('1'),
      ),
    ),
    Expanded(
      flex: 2,
      child: Container(
        padding: EdgeInsets.all(30.0),
        color: Colors.cyan[300],
        child: Text('1'),
      ),
    ),
    Expanded(
      flex: 1,
      child: Container(
        padding: EdgeInsets.all(30.0),
        color: Colors.purple[300],
        child: Text('1'),
      ),
    ),
  ],
),
```

![image-20220316131147582](/Users/kingroger/Library/Application Support/typora-user-images/image-20220316131147582.png)



如果在同一行中放入一个尺寸较大的图片，默认情况下图片会展示它的原始尺寸，此时其他的三个组件将会被挤到屏幕外而不可见，此时可以使用Expanded组件进行尺寸调整，根据需要设定比例。

```dart
Expanded(child: Image.asset('assets/star.jpeg'),flex: 1,),
```

![image-20220316131929160](/Users/kingroger/Library/Application Support/typora-user-images/image-20220316131929160.png)

## Ninja ID练习

使用到的新组件：

- CircleAvatar --圆形头像组件
- Divider --分割线，设置height属性会平均分配到横线的上下。
- SizedBox --创建一个固定大小的盒子。 [width] 和 [height] 参数可以为空，表示盒子的大小不应该被限制在对应的维度中。此案例中不配置背景颜色，用作占位、区隔其他组件的作用。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: NinjiaCard(),
  ));
}

class NinjiaCard extends StatelessWidget {
  const NinjiaCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text('Ninjia ID Card'),
        centerTitle: true,
        backgroundColor: Colors.grey[850],
        elevation: 0.0,//去掉阴影
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(//圆形头像组件
                backgroundImage: AssetImage('assets/a1.jpeg'),
                radius: 40.0,//radius属性设置头像的大小
              ),
            ),
            Divider(//一条分割线
              height: 90.0,
              color: Colors.grey[800],
            ),
            Text(
              'NAME',
              style: TextStyle(color: Colors.grey, letterSpacing: 2.0),
            ),
            SizedBox(//空盒子
              height: 10.0,//仅设置高度，用作区隔上下两个文字组件
            ),
            Text(
              'Gol D Roger',
              style: TextStyle(
                color: Colors.amber[200],
                letterSpacing: 2.0,
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 30.0,
            ),
            Text(
              'CURRENT NINJIA LEVEL',
              style: TextStyle(color: Colors.grey, letterSpacing: 2.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              '8',
              style: TextStyle(
                color: Colors.amber[200],
                letterSpacing: 2.0,
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 30.0,
            ),
            Row(
              children: [
                Icon(Icons.mail, color: Colors.grey[400]),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  'Gld_D_Roger@gmail.com',
                  style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 18.0,
                      letterSpacing: 1.0),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
```

![image-20220316185506636](/Users/kingroger/Library/Application Support/typora-user-images/image-20220316185506636.png)

### StatefulWidget

有状态的组件，组件的状态可以随时改变，并会重新渲染页面。

- 要创建一个自定义有状态StatefulWidget，需创建两个类：StatefulWidget和State

- widget的状态保存在一个State对象中, 它和widget的布局显示分离。
- 当widget状态改变时, State 对象调用`setState()`, 告诉框架去重绘widget.

```dart
class Test extends StatefulWidget {
  Test({Key? key}) : super(key: key);

  @override
  State<Test> createState() => _TestState();
}

class _TestState extends State<Test> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

#### Ninjia ID练习--可以更改状态

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: NinjiaCard(),
  ));
}

class NinjiaCard extends StatefulWidget {
  const NinjiaCard({Key? key}) : super(key: key);

  @override
  State<NinjiaCard> createState() => _NinjiaCardState();
}

class _NinjiaCardState extends State<NinjiaCard> {
  int ninjiaLevel = 0;//命名一个变量用来保存需要动态改变的状态

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text('Ninjia ID Card'),
        centerTitle: true,
        backgroundColor: Colors.grey[850],
        elevation: 0.0,
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                backgroundImage: AssetImage('assets/a1.jpeg'),
                radius: 40.0,
              ),
            ),
            Divider(
              height: 90.0,
              color: Colors.grey[800],
            ),
            Text(
              'NAME',
              style: TextStyle(color: Colors.grey, letterSpacing: 2.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              'Gol D Roger',
              style: TextStyle(
                color: Colors.amber[200],
                letterSpacing: 2.0,
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 30.0,
            ),
            Text(
              'CURRENT NINJIA LEVEL',
              style: TextStyle(color: Colors.grey, letterSpacing: 2.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              '$ninjiaLevel',//在字符串中插入变量，用$前缀
              style: TextStyle(
                color: Colors.amber[200],
                letterSpacing: 2.0,
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 30.0,
            ),
            Row(
              children: [
                Icon(Icons.mail, color: Colors.grey[400]),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  'Gld_D_Roger@gmail.com',
                  style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 18.0,
                      letterSpacing: 1.0),
                )
              ],
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(//新增一个按钮组件，用来触发状态的改变
          backgroundColor:Colors.red,
          onPressed: () {
            setState(() {//按钮按下时调用setState方法,将具体操作的函数作为参数传入
              ninjiaLevel += 1;
            });
          },
          child: Icon(
            Icons.arrow_upward,
          )),
    );
  }
}

```

## Lists of Data

遍历数据，使用`map`方法，和React一样返回组件，不同的是最后需要调用`toList`方法将所有组件存放到一个List（即数组）中，因为容器组件的children属性接收的是List类型的数据。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(home: QuoteList()));
}

class QuoteList extends StatefulWidget {
  QuoteList({Key? key}) : super(key: key);

  @override
  State<QuoteList> createState() => _QuoteListState();
}

class _QuoteListState extends State<QuoteList> {

  List<String> quotes = [
    '窗前明月光',
    '疑似地上霜',
    '举头望明月',
    '低头思故乡',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('Awesome Quotes'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: Column(
        children:quotes.map((quote){//调用List的map方法为每一个数据返回一个组件
          return Text(quote);
        }).toList(),//最后使用toList方法将所有返回的组件放到一个List中
        //只有一行返回语句的时候可以使用函数的简写形式,即箭头函数
        //quotes.map((quote) => Text(quote)).toList()
      ),
    );
  }
}
```

### 自定义组件

使用自定义类来保存数据

```dart
class Quote {

  String text;
  String author;
	
  //因为后续使用在Text组件上，Text的组件字符串类型是String不能为空，在不设置默认值的情况下，这里需要使用required关键字保证使用此类时，两个变量均不为空,这里使用{}将参数包起来为命名式函数参数，传入时就需要对应哪个名字传入值，可以看到传入时可以不按顺序，应为名字是一一对应的
  Quote({required this.text,required this.author});

}
```

使用时：

```dart
//这里List的类型需要改为Quote，因为现在通过Quote类创建了实例，类型就是‘类名’
List<Quote> quotes = [
  Quote(author: '李白',text: '轻舟已过万重山'),
  Quote(author: '杜甫',text: '两个黄鹂鸣翠柳'),
  Quote(author: '白居易',text: '一行白鹭上青天'),
];
```

遍历时：

```dart
body: Column(
  //字符串中使用${}插入
  children:quotes.map((quote) => Text('${quote.author} -- ${quote.text}')).toList(),
),
```

### 卡片组件

新组件：

- Card -- 材料设计卡：带有略微圆角和高程阴影的面板。

  卡片是一张用来表示一些相关信息材料，例如相册、地理位置、用餐、联系方式等。

```dart
import 'package:flutter/material.dart';
// import 'quote.dart';取消引入额外文件，直接将这个类写在最下方

void main() {
  runApp(MaterialApp(home: QuoteList()));
}

class QuoteList extends StatefulWidget {
  QuoteList({Key? key}) : super(key: key);

  @override
  State<QuoteList> createState() => _QuoteListState();
}

class _QuoteListState extends State<QuoteList> {

  List<Quote> quotes = [
    Quote(author: '李白',text: '轻舟已过万重山'),
    Quote(author: '杜甫',text: '两个黄鹂鸣翠柳'),
    Quote(author: '白居易',text: '一行白鹭上青天'),
  ];

  Widget quoteTemplate(quote){//创建一个函数，返回自定义的组件，重新包裹上一个案例中的Text组件
    return Card(//使用Card组件作为包裹
      margin: EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 0),
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,//因为文字比较短，所以拉伸至满屏较美观
          children: [
            Text(
              quote.text,
              style: TextStyle(fontSize: 18.0,color: Colors.grey[600],),
            ),
            SizedBox(height: 6.0,),//两个Text组件之间间隔
            Text(
              quote.author,
              textAlign:TextAlign.right,//配置textAlign属性，使文字右对齐
              style: TextStyle(fontSize: 14.0,color: Colors.grey[800]),
            ),
          ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('Awesome Quotes'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: Column(//遍历时调用自定义的函数
        children:quotes.map((quote) => quoteTemplate(quote)).toList(),
      ),
    );
  }
}

class Quote {

  String text;
  String author;

  Quote({required this.text,required this.author});

}
```

![image-20220317163247200](/Users/kingroger/Library/Application Support/typora-user-images/image-20220317163247200.png)

### 提取组件

将自定义组件提取为单独的dart文件，以便其它组件也可以引入使用，提高代码复用。

main.dart

```dart
import 'package:flutter/material.dart';
import 'quote.dart';//引入自定义Quote组件
import 'quote_card.dart';//引入自定义的QuoteCard组件

void main() {
  runApp(MaterialApp(home: QuoteList()));
}

class QuoteList extends StatefulWidget {
  QuoteList({Key? key}) : super(key: key);

  @override
  State<QuoteList> createState() => _QuoteListState();
}

class _QuoteListState extends State<QuoteList> {

  List<Quote> quotes = [//使用Quote组件
    Quote(author: '李白',text: '轻舟已过万重山'),
    Quote(author: '杜甫',text: '两个黄鹂鸣翠柳'),
    Quote(author: '白居易',text: '一行白鹭上青天'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('Awesome Quotes'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: Column(
        children:quotes.map((quote) => QuoteCard(quote:quote)).toList(),//使用QuoteCard组件，并传入命名式参数
      ),
    );
  }
}


```

quote.dart

```dart
class Quote {

  String text;
  String author;

  Quote({required this.text,required this.author});

}
```

quote_card.dart

```dart
import 'package:flutter/material.dart';//引入flutter的material库
import 'quote.dart';//引入quote自定义组件


class QuoteCard extends StatelessWidget {
  
  //StatelessWidget中不能使用数据，因为它是不能动态改变的组件，如果要使用数据，需要使用final关键字，表示值不会被改变
  final Quote quote;
  //这里同样使用的是命名式参数，只有一个参数，用位置参数也可以
  QuoteCard({required this.quote});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 0),
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              quote.text,
              style: TextStyle(fontSize: 18.0,color: Colors.grey[600],),
            ),
            SizedBox(height: 6.0,),
            Text(
              quote.author,
              textAlign:TextAlign.right,
              style: TextStyle(fontSize: 14.0,color: Colors.grey[800]),
            ),
          ]),
      ),
    );
  }
}
```

### 将函数作为参数

上述案例中加入删除功能。

```dart
Column(
  children:quotes.map((quote) => QuoteCard(quote:quote,delete:(){//传入一个控制删除的函数
    setState(() {//要更改状态，需要调用setState
      quotes.remove(quote);//调用List的remove方法进行删除
    });
  })).toList(),
),

//QuoteCard组件中：
	final Quote quote;
  final Function delete;//声明一个类型为Function的实例变量来接收

  //delete变量因为明确了是Function类型，所以不能为空，所以这里需要使用required关键字
  QuoteCard({required this.quote,required this.delete});

TextButton.icon(
  onPressed:(){delete();},//新加一个带icon和文字的按钮来触发删除
  icon: Icon(Icons.delete),
  label: Text('delete quote')
)
```

![image-20220318143534284](/Users/kingroger/Library/Application Support/typora-user-images/image-20220318143534284.png)

## 开始构建世界时间APP

需要用到3个不同的页面，所以需要创建另外三个页面的dart文件。

创建pages文件夹，并创建：

- home.dart --首页
- choose_location.dart --选择国家或地区页面
- loading.dart --加载页

新组件：

- SafeArea --让内容展示在手机状态栏以下。（前面的练习因为使用了AppBar组件在最上方，所以内容不会被手机状态栏挡住。）

```dart
//home.dart
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: Text('Home Screen')),//使用了SafeArea组件
    );
  }
}
```

```dart
//choose_location.dart
import 'package:flutter/material.dart';

class ChooseLocation extends StatefulWidget {
  ChooseLocation({Key? key}) : super(key: key);

  @override
  State<ChooseLocation> createState() => _ChooseLocationState();
}

class _ChooseLocationState extends State<ChooseLocation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Choose Location Screen'),
    );
  }
}
```

```dart
//loading.dart
import 'package:flutter/material.dart';

class Loading extends StatefulWidget {
  Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Loading Screen'),
    );
  }
}
```

### Map类型与路由管理

通过路由实现不同页面的切换

定义路由：配置MaterialApp组件的routes属性，值是一个Map<String, Widget Function(BuildContext)>

```dart
import 'package:flutter/material.dart';
import 'package:world_time/pages/home.dart';
import 'package:world_time/pages/loading.dart';
import 'package:world_time/pages/choose_location.dart';

void main() {
  runApp(MaterialApp(
    //home:Home(),
    initialRoute: '/home',//可以通过initialRoute配置第一个页面，即初始路由
    routes:{
      '/':(context) => Loading(),//'/'是根路由，就是app打开的第一个页面，这个时候如果配置了home属性则会发生冲突
      '/home':(context) => Home(),//首页
      '/location':(context) => ChooseLocation(),//选择地区页面
    }
  ));
}


```

切换路由：可以调用Navigator的pushNamed方法

```dart
ElevatedButton.icon(//这里用了一个按钮来触发路由切换
  onPressed: () {
    Navigator.pushNamed(context, '/location');//下一个路由用push
  },
  icon: Icon(Icons.edit_location),
  label: Text('Edit Location')
)
```

返回上一页：AppBar组件会自带返回按钮，返回上一个路由页面。

```dart
Scaffold(
  backgroundColor: Colors.grey[200],
  appBar: AppBar(//这里不需要设置返回按钮，非首页会自动显示
    backgroundColor: Colors.blue[900],
    title: Text('Choose a Location'),
    centerTitle: true,
    elevation: 0,
  ),
);
```

![image-20220318155750459](/Users/kingroger/Library/Application Support/typora-user-images/image-20220318155750459.png)

### 组件生命周期

组件生命周期： 在StatefulWidget调用`createState`之后，框架将新的状态对象插入树中，然后调用状态对象的[`initState`](https://docs.flutter.io/flutter/widgets/State-class.html#initState)。 子类化State可以重写[`initState`](https://docs.flutter.io/flutter/widgets/State-class.html#initState)，以完成仅需要执行一次的工作。 例如，您可以重写`initState`以配置动画或订阅platform services。`initState`的实现中需要调用`super.initState`。

当一个状态对象不再需要时，框架调用状态对象的[`dispose`](https://docs.flutter.io/flutter/widgets/State-class.html#dispose)。 您可以覆盖该[`dispose`](https://docs.flutter.io/flutter/widgets/State-class.html#dispose)方法来执行清理工作。例如，您可以覆盖[`dispose`](https://docs.flutter.io/flutter/widgets/State-class.html#dispose)取消定时器或取消订阅platform services。 `dispose`典型的实现是直接调用[`super.dispose`](https://docs.flutter.io/flutter/widgets/State-class.html#dispose)。

1. initState()

   组件创建的时候调用一次，订阅流或任何可能更改我们widget data的对象。

2. build()

   建立组件树，每一次调用setState的时候都会重新调用build

3. dispose()

   当状态对象或者组件已经移除。

### 异步编程

关键字async await

调用Futured对象的delayed方法创建计时器，类似setTimeOut，Duration函数定义延迟具体时间，第二个回调为具体执行函数。

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class ChooseLocation extends StatefulWidget {
  ChooseLocation({Key? key}) : super(key: key);
  @override
  State<ChooseLocation> createState() => _ChooseLocationState();
}

class _ChooseLocationState extends State<ChooseLocation> {

  void getData() async {//使用async关键字使这个函数成为异步函数

    //模拟网络请求3秒之后返回罗杰的名字
    String king = await Future.delayed(Duration(seconds: 3),(){//await关键会使后面的代码暂停，等待这一行执行结果之后才执行
      return '哥尔 D 罗杰';
    });

    //模拟网络请求2获取白胡子的名字
    String white_bread =  await Future.delayed(Duration(seconds: 2),(){
      return '纽 盖特';
    });

    print('$king --- $white_bread');//这行代码会在两个await执行完之后才会执行
  }

  @override
  void initState() {
    // TODO: implement initState （android studio的一个调试功能）
    super.initState();
    getData();
    print('one-piece');//不会受到getData的影响，直接执行
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        title: Text('Choose a Location'),
        centerTitle: true,
        elevation: 0,
      ),
    );
  }
}
```

### Flutter Packages (http)

- 使用第三方库http进行网络请求

- 安装：flutter pub add http
- 引入：`import 'package:http/http.dart';`

虚拟api网站：https://jsonplaceholder.typicode.com/

使用：

```dart
import 'package:flutter/material.dart';
import 'package:http/http.dart';//引入http库
import 'dart:convert';//引入convert用于解析json字符串

class Loading extends StatefulWidget {
  Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  void getData() async {
    //使用Uri.parse将String类型转换为Uri类型
    //Response类型是http库提供的
    Response res = await get(Uri.parse('https://jsonplaceholder.typicode.com/todos/1'));//get方法是http提供的
    Map result = jsonDecode(res.body);//使用jsonDecode将json转换为Map
    print(result);
    print(result['userId']);
  }

  @override
  void initState() {
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Loading Screen'),
    );
  }
}
```

### 世界时间API

https://worldtimeapi.org/

```dart
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'dart:convert';

class Loading extends StatefulWidget {
  Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  void getTime() async {
    //发送请求
    Uri url = Uri.parse('http://worldtimeapi.org/api/timezone/Asia/Taipei');//转换类型
    Response response = await get(url);//发送请求并保存返回数据
    Map timeData = jsonDecode(response.body);//json转换为Map
    // print(timeData);
    
    //整理需要的数据
    String dateTime = timeData['datetime'];
    String offset = timeData['utc_offset'].substring(0,3);//‘+08.00’截取+08三位
    // print(dateTime);
    // print(offset);

    //create DatetTime object
    DateTime now = DateTime.parse(dateTime);//使用DateTime.parse转换格式和类型为标准时间，需要重新加上时区
    now = now.add(Duration(hours: int.parse(offset)));//int.parse将String类型转换为int，加上相差的时区
    print(now);
  }

  @override
  void initState() {
    super.initState();
    getTime();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Loading Screen'),
    );
  }
}
```

### 自定义世界时间组件

创建services/world_time.dart

```dart
import 'package:http/http.dart';
import 'dart:convert';

class WorldTime {

  String location; //地区
  late String time; //该地区的时间
  String flag; //国旗icon的路径
  String url; //地区后缀

  WorldTime({required this.location,required this.flag,required this.url});

  Future<void> getTime() async {//外面使用了await所以此函数必须返回Future类型的数据
    //发送请求
    Response response = await get(Uri.parse('http://worldtimeapi.org/api/timezone/$url'));
    Map timeData = jsonDecode(response.body);
    
    //整理需要的数据
    String dateTime = timeData['datetime'];
    String offset = timeData['utc_offset'].substring(1,3);

    //create DatetTime object
    DateTime now = DateTime.parse(dateTime);
    now = now.add(Duration(hours: int.parse(offset)));

    //设置时间
    time = now.toString();
    //设置icon路径
    flag = 'images/$flag.png';
  }

}


```

在loading.dart中使用world_time.dart

```dart
import 'package:flutter/material.dart';
import 'package:world_time/services/world_time.dart';//引入

class Loading extends StatefulWidget {
  Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  String time = 'Loading...';//初始化界面展示的时间信息

  void setupWorldTime() async {
    WorldTime instance = WorldTime(location: 'HongKong', flag: 'hongkong', url: 'Asia/Hong_Kong');
    await instance.getTime();//因为需要等待请求，所以这里必须使用异步编程
    // print(instance.flag);
    setState(() {
      time = instance.time;//请求完成后更新界面展示的时间信心
    });
  }

  @override
  void initState() {
    super.initState();
    setupWorldTime();//调用请求系列函数
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(50.0),
        child: Text('当地时间：$time'),//展示时间信息
      ),
    );
  }
}
```

### 错误处理

```dart
 Future<void> getTime() async {

    //错误处理
    try {
      //发送请求
      Response response = await get(Uri.parse('http://worldtimeapi.org/api/timezone/$url'));
      Map timeData = jsonDecode(response.body);
      
      //整理需要的数据
      String dateTime = timeData['datetime'];
      String offset = timeData['utc_offset'].substring(1,3);

      //create DatetTime object
      DateTime now = DateTime.parse(dateTime);
      now = now.add(Duration(hours: int.parse(offset)));

      //设置时间
      time = now.toString();
      flag = 'images/$flag.png';
    } catch (e) {//捕获错误
      print('错误：$e');
      time = '获取时间数据失败！';//处理错误情况
    }
  }

}
```

### 传递路由数据

- Navigator.pushReplacementNamed --跳转并替换路由，使不能再返回上一个路由
- ModalRoute.of(context)?.settings.arguments --接受路由数据，问号表示可以为空。

```dart
//传递路由参数
void setupWorldTime() async {
  WorldTime instance = WorldTime(location: 'HongKong', flag: 'hongkong', url: 'Asia/Hong_Kong');
  await instance.getTime();
  //请求完成后跳转至home页面并通过配置第三个参数arguments来传递数据。
  Navigator.pushReplacementNamed(context, '/home',arguments: {
    'location':instance.location,
    'time':instance.time,
    'flag':instance.flag,
  });
}

//接收路由数据
class _HomeState extends State<Home> {

  Map data = {};//创建一个变量来接收路由数据

  @override
  Widget build(BuildContext context) {

    data = ModalRoute.of(context)?.settings.arguments as Map;//接收路由数据并将类型由Object?转换为Map类型
    print(data);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10.0,10.0,10.0,0),
          child: Column(
            children: [
              ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pushNamed(context, '/location');
                  },
                  icon: Icon(Icons.edit_location),
                  label: Text('Edit Location')
                )
            ],
          ),
        ),
      ),
    );
  }
}
```

### 格式化时间并展示

- intl --用于格式化时间的第三方库https://pub.flutter-io.cn/documentation/intl/latest/intl/DateFormat-class.html
- 安装：flutter pub add intl
- 引入：`import 'package:intl/intl.dart';`

world_time.dart

```dart
import 'package:intl/intl.dart';//引入第三方库

//设置时间
// time = now.toString();
time = DateFormat.jm().format(now);//格式化之后 1:52 PM
```

home.dart

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text(data['location'],//从data中读取地区数据
        style: TextStyle(
          fontSize: 28.0,
          letterSpacing: 2.0,
        ))
  ],
),
SizedBox(
  height: 20.0,
),
Text(data['time'],style: TextStyle(fontSize: 66.0),)//从data中读取时间数据
```

### 加载动画

- flutter_spinkit --https://pub.flutter-io.cn/packages/flutter_spinkit
- 安装：flutter pub add flutter_spinkit
- 引入：`import 'package:flutter_spinkit/flutter_spinkit.dart';`
- 各种加载动画参考文档。

```dart
Center(
  child:SpinKitWave(color: Colors.white, type: SpinKitWaveType.start),
),
```

### 三元运算符

案例中使用三元运算进行判断是白天还是黑夜，进行背景图片的切换已经背景颜色的切换。

```dart
//world_time.dart
late bool isDaytime; //判断白天黑夜

//设置时间
isDaytime = now.hour > 6 && now.hour < 19 ? true : false ;

//loading.dart
'isDaytime':instance.isDaytime,

//home.dart
String bgImage = data['isDaytime'] ? 'day.png' : 'night.png';//根据判断结果决定使用哪个图片
Color? bgColor = data['isDaytime'] ? Color(0xFF1288C8) : Color(0xFF272760);//根据判断结果决定使用哪个颜色

Scaffold(
  backgroundColor: bgColor,//背景颜色
  body: SafeArea(//默认会为上下左右均提供安全区域，这里导致背景图片无法填充底部，所以将bottom属性设置为false
    bottom:false,//解决因安全区域导致背景图片填不满底部的问题
    child: Container(//用Container组件来使用背景图片属性
      decoration: BoxDecoration(//配置decoration属性，意为装饰
          image: DecorationImage(
              image: AssetImage('images/$bgImage'), //背景图片
              fit: BoxFit.cover,//填充模式
            )
        ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 120.0, 0, 0),
        child: Column(
          children: [
            TextButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/location');
                },
                icon: Icon(Icons.edit_location,color: Colors.grey[200],),
                label: Text('Edit Location',style: TextStyle(color: Colors.grey[200],),)),
            SizedBox(
              height: 20.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(data['location'],
                    style: TextStyle(
                      fontSize: 28.0,
                      letterSpacing: 2.0,
                      color: Colors.white,
                    ))
              ],
            ),
            SizedBox(
              height: 20.0,
            ),
            Text(
              data['time'],
              style: TextStyle(fontSize: 66.0,color: Colors.white,),
            )
          ],
        ),
      ),
    ),
  ),
);
```

### List View Builder

新组件：

- ListView --列表视图生成器

- ListTile --列表图块包含一到三行文本，可选地两侧有图标或其他小部件，例如复选框。磁贴的图标（或其他小部件）使用[前导](https://api.flutter.dev/flutter/material/ListTile/leading.html)和[尾随](https://api.flutter.dev/flutter/material/ListTile/trailing.html)参数定义。第一行文本不是可选的，由[title](https://api.flutter.dev/flutter/material/ListTile/title.html)指定。[subtitle](https://api.flutter.dev/flutter/material/ListTile/subtitle.html)的值 *是*可选的，它将占用为额外的文本行分配的空间，如果[isThreeLine](https://api.flutter.dev/flutter/material/ListTile/isThreeLine.html)为 true，则占用两行。如果[dense](https://api.flutter.dev/flutter/material/ListTile/dense.html) 为真，则该图块的整体高度以及 包装[标题](https://api.flutter.dev/flutter/material/ListTile/title.html)和[副标题小部件的](https://api.flutter.dev/flutter/material/ListTile/subtitle.html)[DefaultTextStyle](https://api.flutter.dev/flutter/widgets/DefaultTextStyle-class.html)的大小会减小。

  调用者有责任确保[title](https://api.flutter.dev/flutter/material/ListTile/title.html)不换行，并确保[subtitle](https://api.flutter.dev/flutter/material/ListTile/subtitle.html)不换行（如果[isThreeLine](https://api.flutter.dev/flutter/material/ListTile/isThreeLine.html)为 false）或换行至两行（如果为 true）。

choose_location.dart

```dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:world_time/services/world_time.dart';//引入world_time.dart

class ChooseLocation extends StatefulWidget {
  ChooseLocation({Key? key}) : super(key: key);
  @override
  State<ChooseLocation> createState() => _ChooseLocationState();
}

class _ChooseLocationState extends State<ChooseLocation> {

  List<WorldTime> locations = [//将要展示的数据用WorldTime实例的组成List
    WorldTime(url: 'Europe/London', location: 'London', flag: 'uk.png'),
    WorldTime(url: 'Europe/Berlin', location: 'Athens', flag: 'greece.png'),
    WorldTime(url: 'Africa/Cairo', location: 'Cairo', flag: 'egypt.png'),
    WorldTime(url: 'Africa/Nairobi', location: 'Nairobi', flag: 'kenya.png'),
    WorldTime(url: 'America/Chicago', location: 'Chicago', flag: 'usa.png'),
    WorldTime(url: 'America/New_York', location: 'New York', flag: 'usa.png'),
    WorldTime(url: 'Asia/Seoul', location: 'Seoul', flag: 'south_korea.png'),
    WorldTime(url: 'Asia/Jakarta', location: 'Jakarta', flag: 'indonesia.png'),
    WorldTime(url: 'Asia/Hong_Kong', location: 'HongKong', flag: 'hongkong.png'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Color(0xFF1288C8),
        title: Text('Choose a Location'),
        centerTitle: true,
        elevation: 0,
      ),
      body:ListView.builder(//通过调用ListView的builder方法遍历生成多个组件
        itemCount:locations.length,//有多少个子组件
        itemBuilder: (context,index){//builder函数
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 1.0,horizontal: 4.0),
            child: Card(//卡片组件
              child: ListTile(//ListTile组件
                onTap:(){},
                title: Text(locations[index].location),//第一行标题
                leading:CircleAvatar(backgroundImage: AssetImage('images/${locations[index].flag}')),//图标
              ),
            ),
          );
        },
      )
    );
  }
}
```

### 更新时间

choose_location.dart

```dart
//创建一个处理函数
void updateTime (data) async {
  await data.getTime();
  Navigator.pop(context,{//这里使用的方式是移除路由，因为是从首页点击选择地区，选择完回到首页，这样不会增加路由栈中内容，但因为这样需要更改接收时的方式
    'location': data.location,
    'time': data.time,
    'flag': data.flag,
    'isDaytime':data.isDaytime,
  });
}

//点击事件中触发
onTap:(){
  updateTime(locations[index]);
},
```

home.dart

```dart
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Map data = {};

  @override
  Widget build(BuildContext context) {
//因每次更新data之后会调用build，这里需要做判断data是否为空，这样这里就只有第一次打开的时候会赋值给data，而不会每次都覆盖选择完地区传过来的数据。
    data = data.isNotEmpty ? data : ModalRoute.of(context)?.settings.arguments as Map;

    String bgImage = data['isDaytime'] ? 'day.png' : 'night.png';
    Color? bgColor = data['isDaytime'] ? Color(0xFF1288C8) : Color(0xFF272760);

    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea(
        bottom:false,
        child: Container(
          decoration: BoxDecoration(
              image: DecorationImage(
                  image: AssetImage('images/$bgImage'), 
                  fit: BoxFit.cover,
                )
            ),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(0, 120.0, 0, 0),
            child: Column(
              children: [
                TextButton.icon(
                    onPressed: () async {
                      //因为选择地区之后采取移除路由回到home的方式，数据需要通过异步编程接收结果的方式接收。
                      dynamic result = await Navigator.pushNamed(context, '/location');
                      setState(() {//修改状态
                        data = result;
                      });
                    },
                    icon: Icon(Icons.edit_location,color: Colors.grey[200],),
                    label: Text('Edit Location',style: TextStyle(color: Colors.grey[200],),)),
                SizedBox(
                  height: 20.0,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      backgroundImage:AssetImage(data['flag'])
                    ),
                    SizedBox(width: 10.0,),
                    Text(data['location'],
                        style: TextStyle(
                          fontSize: 28.0,
                          letterSpacing: 2.0,
                          color: Colors.white,
                        ))
                  ],
                ),
                SizedBox(
                  height: 20.0,
                ),
                Text(
                  data['time'],
                  style: TextStyle(fontSize: 66.0,color: Colors.white,),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

```

# [《Flutter实战·第二版》](https://book.flutterchina.club/)

## 1.4.4 异步支持

Dart类库有非常多的返回`Future`或者`Stream`对象的函数。 这些函数被称为**异步函数**：它们只会在设置好一些耗时操作之后返回，比如像 IO操作。而不是等到这个操作完成。

`async`和`await`关键词支持了异步编程，允许您写出和同步代码很像的异步代码。

### [#](https://book.flutterchina.club/chapter1/dart.html#future)Future

`Future`与JavaScript中的`Promise`非常相似，表示一个异步操作的最终完成（或失败）及其结果值的表示。简单来说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。一个Future只会对应一个结果，要么成功，要么失败。

由于本身功能较多，这里我们只介绍其常用的API及特性。还有，请记住，`Future` 的所有API的返回值仍然是一个`Future`对象，所以可以很方便的进行链式调用。

#### [#](https://book.flutterchina.club/chapter1/dart.html#future-then)Future.then

为了方便示例，在本例中我们使用`Future.delayed` 创建了一个延时任务（实际场景会是一个真正的耗时任务，比如一次网络请求），即2秒后返回结果字符串"hi world!"，然后我们在`then`中接收异步结果并打印结果，代码如下：

```dart
Future.delayed(Duration(seconds: 2),(){
   return "hi world!";
}).then((data){
   print(data);
});
```

#### [#](https://book.flutterchina.club/chapter1/dart.html#future-catcherror)Future.catchError

如果异步任务发生错误，我们可以在`catchError`中捕获错误，我们将上面示例改为：

```dart
Future.delayed(Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");  
}).then((data){
   //执行成功会走到这里  
   print("success");
}).catchError((e){
   //执行失败会走到这里  
   print(e);
});
```

在本示例中，我们在异步任务中抛出了一个异常，`then`的回调函数将不会被执行，取而代之的是 `catchError`回调函数将被调用；但是，并不是只有 `catchError`回调才能捕获错误，`then`方法还有一个可选参数`onError`，我们也可以用它来捕获异常：

```dart
Future.delayed(Duration(seconds: 2), () {
	//return "hi world!";
	throw AssertionError("Error");
}).then((data) {
	print("success");
}, onError: (e) {
	print(e);
});
```

#### [#](https://book.flutterchina.club/chapter1/dart.html#future-whencomplete)Future.whenComplete

有些时候，我们会遇到无论异步任务执行成功或失败都需要做一些事的场景，比如在网络请求前弹出加载对话框，在请求结束后关闭对话框。这种场景，有两种方法，第一种是分别在`then`或`catch`中关闭一下对话框，第二种就是使用`Future`的`whenComplete`回调，我们将上面示例改一下：

```dart
Future.delayed(Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");
}).then((data){
   //执行成功会走到这里 
   print(data);
}).catchError((e){
   //执行失败会走到这里   
   print(e);
}).whenComplete((){
   //无论成功或失败都会走到这里
});
```

#### [#](https://book.flutterchina.club/chapter1/dart.html#future-wait)Future.wait

有些时候，我们需要等待多个异步任务都执行结束后才进行一些操作，比如我们有一个界面，需要先分别从两个网络接口获取数据，获取成功后，我们需要将两个接口数据进行特定的处理后再显示到UI界面上，应该怎么做？答案是`Future.wait`，它接受一个`Future`数组参数，只有数组中所有`Future`都执行成功后，才会触发`then`的成功回调，只要有一个`Future`执行失败，就会触发错误回调。下面，我们通过模拟`Future.delayed` 来模拟两个数据获取的异步任务，等两个异步任务都执行成功时，将两个异步任务的结果拼接打印出来，代码如下：

```dart
Future.wait([
  // 2秒后返回结果  
  Future.delayed(Duration(seconds: 2), () {
    return "hello";
  }),
  // 4秒后返回结果  
  Future.delayed(Duration(seconds: 4), () {
    return " world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError((e){
  print(e);
});
```

执行上面代码，4秒后你会在控制台中看到“hello world”。

### [#](https://book.flutterchina.club/chapter1/dart.html#async-await)Async/await

Dart中的`async/await` 和JavaScript中的`async/await`功能和用法是一模一样的，如果你已经了解JavaScript中的`async/await`的用法，可以直接跳过本节。

#### [#](https://book.flutterchina.club/chapter1/dart.html#回调地狱-callback-hell)回调地狱(Callback Hell)

如果代码中有大量异步逻辑，并且出现大量异步任务依赖其它异步任务的结果时，必然会出现`Future.then`回调中套回调情况。举个例子，比如现在有个需求场景是用户先登录，登录成功后会获得用户ID，然后通过用户ID，再去请求用户个人信息，获取到用户个人信息后，为了使用方便，我们需要将其缓存在本地文件系统，代码如下：

```dart
//先分别定义各个异步任务
Future<String> login(String userName, String pwd){
	...
    //用户登录
};
Future<String> getUserInfo(String id){
	...
    //获取用户信息 
};
Future saveUserInfo(String userInfo){
	...
	// 保存用户信息 
}; 
```

接下来，执行整个任务流：

```dart
login("alice","******").then((id){
 //登录成功后通过，id获取用户信息    
 getUserInfo(id).then((userInfo){
    //获取用户信息后保存 
    saveUserInfo(userInfo).then((){
       //保存用户信息，接下来执行其它操作
        ...
    });
  });
})
```

可以感受一下，如果业务逻辑中有大量异步依赖的情况，将会出现上面这种在回调里面套回调的情况，过多的嵌套会导致的代码可读性下降以及出错率提高，并且非常难维护，这个问题被形象的称为**回调地狱（Callback Hell）**。回调地狱问题在之前 JavaScript 中非常突出，也是 JavaScript 被吐槽最多的点，但随着 ECMAScript 标准发布后，这个问题得到了非常好的解决，而解决回调地狱的两大神器正是 ECMAScript6 引入了`Promise`，以及ECMAScript7 中引入的`async/await`。 而在 Dart 中几乎是完全平移了 JavaScript 中的这两者：`Future`相当于`Promise`，而`async/await`连名字都没改。接下来我们看看通过`Future`和`async/await`如何消除上面示例中的嵌套问题。

##### [#](https://book.flutterchina.club/chapter1/dart.html#使用future消除callback-hell)使用Future消除Callback Hell

```dart
login("alice","******").then((id){
  	return getUserInfo(id);
}).then((userInfo){
    return saveUserInfo(userInfo);
}).then((e){
   //执行接下来的操作 
}).catchError((e){
  //错误处理  
  print(e);
});
```

正如上文所述， *“`Future` 的所有API的返回值仍然是一个`Future`对象，所以可以很方便的进行链式调用”* ，如果在then 中返回的是一个`Future`的话，该`future`会执行，执行结束后会触发后面的`then`回调，这样依次向下，就避免了层层嵌套。

##### [#](https://book.flutterchina.club/chapter1/dart.html#使用-async-await-消除-callback-hell)使用 async/await 消除 callback hell

通过`Future`回调中再返回`Future`的方式虽然能避免层层嵌套，但是还是有一层回调，有没有一种方式能够让我们可以像写同步代码那样来执行异步任务而不使用回调的方式？答案是肯定的，这就要使用`async/await`了，下面我们先直接看代码，然后再解释，代码如下：

```dart
task() async {
   try{
    String id = await login("alice","******");
    String userInfo = await getUserInfo(id);
    await saveUserInfo(userInfo);
    //执行接下来的操作   
   } catch(e){
    //错误处理   
    print(e);   
   }  
}
```

- `async`用来表示函数是异步的，定义的函数会返回一个`Future`对象，可以使用 then 方法添加回调函数。
- `await` 后面是一个`Future`，表示等待该异步任务完成，异步完成后才会往下走；`await`必须出现在 `async` 函数内部。

可以看到，我们通过`async/await`将一个异步流用同步的代码表示出来了。

> 其实，无论是在 JavaScript 还是 Dart 中，`async/await` 都只是一个语法糖，编译器或解释器最终都会将其转化为一个 Promise（Future）的调用链。

## [#](https://book.flutterchina.club/chapter1/dart.html#_1-4-5-stream)1.4.5 Stream

`Stream` 也是用于接收异步事件数据，和 `Future` 不同的是，它可以接收多个异步操作的结果（成功或失败）。 也就是说，在执行异步任务时，可以通过多次触发成功或失败事件来传递结果数据或错误异常。 `Stream` 常用于会多次读取数据的异步任务场景，如网络内容下载、文件读写等。举个例子：

```dart
Stream.fromFutures([
  // 1秒后返回结果
  Future.delayed(Duration(seconds: 1), () {
    return "hello 1";
  }),
  // 抛出一个异常
  Future.delayed(Duration(seconds: 2),(){
    throw AssertionError("Error");
  }),
  // 3秒后返回结果
  Future.delayed(Duration(seconds: 3), () {
    return "hello 3";
  })
]).listen((data){
   print(data);
}, onError: (e){
   print(e.message);
},onDone: (){

});
```

上面的代码依次会输出：

```text
I/flutter (17666): hello 1
I/flutter (17666): Error
I/flutter (17666): hello 3
```

代码很简单，就不赘述了。

## Widget相关

按照惯例，widget 的构造函数参数应使用命名参数，命名参数中的必需要传的参数要添加`required`关键字，这样有利于静态代码分析器进行检查；在继承 widget 时，第一个参数通常应该是`Key`。另外，如果 widget 需要接收子 widget ，那么`child`或`children`参数通常应被放在参数列表的最后。同样是按照惯例， widget 的属性应尽可能的被声明为`final`，防止被意外改变。

### Context

`build`方法有一个`context`参数，它是`BuildContext`类的一个实例，表示当前 widget 在 widget 树中的上下文，每一个 widget 都会对应一个 context 对象（因为每一个 widget 都是 widget 树上的一个节点）。实际上，`context`是当前 widget 在 widget 树中位置中执行”相关操作“的一个句柄(handle)，比如它提供了从当前 widget 开始向上遍历 widget 树以及按照 widget 类型查找父级 widget 的方法。下面是在子树中获取父级 widget 的一个示例：

```dart
class ContextRoute extends StatelessWidget  {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Context测试"),
      ),
      body: Container(
        child: Builder(builder: (context) {
          // 在 widget 树中向上查找最近的父级`Scaffold`  widget 
          Scaffold scaffold = context.findAncestorWidgetOfExactType<Scaffold>();
          // 直接返回 AppBar的title， 此处实际上是Text("Context测试")
          return (scaffold.appBar as AppBar).title;
        }),
      ),
    );
  }
}
```

## StatefulWidget

### State

一个 StatefulWidget 类会对应一个 State 类，State表示与其对应的 StatefulWidget 要维护的状态，State 中的保存的状态信息可以：

1. 在 widget 构建时可以被同步读取。
2. 在 widget 生命周期中可以被改变，当State被改变时，可以手动调用其`setState()`方法通知Flutter 框架状态发生改变，Flutter 框架在收到消息后，会重新调用其`build`方法重新构建 widget 树，从而达到更新UI的目的。

State 中有两个常用属性：

1. `widget`，它表示与该 State 实例关联的 widget 实例，由Flutter 框架动态设置。注意，这种关联并非永久的，因为在应用生命周期中，UI树上的某一个节点的 widget 实例在重新构建时可能会变化，但State实例只会在第一次插入到树中时被创建，当在重新构建时，如果 widget 被修改了，Flutter 框架会动态设置State. widget 为新的 widget 实例。
2. `context`。StatefulWidget对应的 BuildContext，作用同StatelessWidget 的BuildContext。

### StatefulWidget 生命周期

![2-5.a59bef97](/Users/kingroger/Downloads/2-5.a59bef97.jpg)

- `initState`：当 widget 第一次插入到 widget 树时会被调用，对于每一个State对象，Flutter 框架只会调用一次该回调，所以，通常在该回调中做一些一次性的操作，如状态初始化、订阅子树的事件通知等。不能在该回调中调用`BuildContext.dependOnInheritedWidgetOfExactType`（该方法用于在 widget 树上获取离当前 widget 最近的一个父级`InheritedWidget`，关于`InheritedWidget`我们将在后面章节介绍），原因是在初始化完成后， widget 树中的`InheritFrom widget`也可能会发生变化，所以正确的做法应该在在`build（）`方法或`didChangeDependencies()`中调用它。
- `didChangeDependencies()`：当State对象的依赖发生变化时会被调用；例如：在之前`build()` 中包含了一个`InheritedWidget` （第七章介绍），然后在之后的`build()` 中`Inherited widget`发生了变化，那么此时`InheritedWidget`的子 widget 的`didChangeDependencies()`回调都会被调用。典型的场景是当系统语言 Locale 或应用主题改变时，Flutter 框架会通知 widget 调用此回调。需要注意，组件第一次被创建后挂载的时候（包括重创建）对应的`didChangeDependencies`也会被调用。
- `build()`：此回调读者现在应该已经相当熟悉了，它主要是用于构建 widget 子树的，会在如下场景被调用：
  1. 在调用`initState()`之后。
  2. 在调用`didUpdateWidget()`之后。
  3. 在调用`setState()`之后。
  4. 在调用`didChangeDependencies()`之后。
  5. 在State对象从树中一个位置移除后（会调用deactivate）又重新插入到树的其它位置之后。
- `reassemble()`：此回调是专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用。
- `didUpdateWidget ()`：在 widget 重新构建时，Flutter 框架会调用`widget.canUpdate`来检测 widget 树中同一位置的新旧节点，然后决定是否需要更新，如果`widget.canUpdate`返回`true`则会调用此回调。正如之前所述，`widget.canUpdate`会在新旧 widget 的 `key` 和 `runtimeType` 同时相等时会返回true，也就是说在在新旧 widget 的key和runtimeType同时相等时`didUpdateWidget()`就会被调用。
- `deactivate()`：当 State 对象从树中被移除时，会调用此回调。在一些场景下，Flutter 框架会将 State 对象重新插到树中，如包含此 State 对象的子树在树的一个位置移动到另一个位置时（可以通过GlobalKey 来实现）。如果移除后没有重新插入到树中则紧接着会调用`dispose()`方法。
- `dispose()`：当 State 对象从树中被永久移除时调用；通常在此回调中释放资源。

### 2.2.7 在 widget 树中获取State对象

由于 StatefulWidget 的的具体逻辑都在其 State 中，所以很多时候，我们需要获取 StatefulWidget 对应的State 对象来调用一些方法，比如`Scaffold`组件对应的状态类`ScaffoldState`中就定义了打开 SnackBar（路由页底部提示条）的方法。我们有两种方法在子 widget 树中获取父级 StatefulWidget 的State 对象。

#### 通过Context获取

`context`对象有一个`findAncestorStateOfType()`方法，该方法可以从当前节点沿着 widget 树向上查找指定类型的 StatefulWidget 对应的 State 对象。下面是实现打开 SnackBar 的示例：

```dart
class GetStateObjectRoute extends StatefulWidget {
  const GetStateObjectRoute({Key? key}) : super(key: key);

  @override
  State<GetStateObjectRoute> createState() => _GetStateObjectRouteState();
}

class _GetStateObjectRouteState extends State<GetStateObjectRoute> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("子树中获取State对象"),
      ),
      body: Center(
        child: Column(
          children: [
            Builder(builder: (context) {
              return ElevatedButton(
                onPressed: () {
                  // 查找父级最近的Scaffold对应的ScaffoldState对象
                  ScaffoldState _state = context.findAncestorStateOfType<ScaffoldState>()!;
                  // 打开抽屉菜单
                  _state.openDrawer();
                },
                child: Text('打开抽屉菜单1'),
              );
            }),
          ],
        ),
      ),
      drawer: Drawer(),
    );
  }
}
```

一般来说，如果 StatefulWidget 的状态是私有的（不应该向外部暴露），那么我们代码中就不应该去直接获取其 State 对象；如果StatefulWidget的状态是希望暴露出的（通常还有一些组件的操作方法），我们则可以去直接获取其State对象。但是通过 `context.findAncestorStateOfType` 获取 StatefulWidget 的状态的方法是通用的，我们并不能在语法层面指定 StatefulWidget 的状态是否私有，所以在 Flutter 开发中便有了一个默认的约定：如果 StatefulWidget 的状态是希望暴露出的，应当在 StatefulWidget 中提供一个`of` 静态方法来获取其 State 对象，开发者便可直接通过该方法来获取；如果 State不希望暴露，则不提供`of`方法。这个约定在 Flutter SDK 里随处可见。所以，上面示例中的`Scaffold`也提供了一个`of`方法，我们其实是可以直接调用它的：

```dart
Builder(builder: (context) {
  return ElevatedButton(
    onPressed: () {
      // 直接通过of静态方法来获取ScaffoldState
      ScaffoldState _state=Scaffold.of(context);
      // 打开抽屉菜单
      _state.openDrawer();
    },
    child: Text('打开抽屉菜单2'),
  );
}),
```

又比如我们想显示 snack bar 的话可以通过下面代码调用：

```dart
Builder(builder: (context) {
  return ElevatedButton(
    onPressed: () {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("我是SnackBar")),
      );
    },
    child: Text('显示SnackBar'),
  );
}),
```

![2-6.913db569](/Users/kingroger/Downloads/2-6.913db569.png)

#### 通过GlobalKey

Flutter还有一种通用的获取`State`对象的方法——通过GlobalKey来获取！ 步骤分两步：

1. 给目标`StatefulWidget`添加`GlobalKey`。

   ```dart
   //定义一个globalKey, 由于GlobalKey要保持全局唯一性，我们使用静态变量存储
   static GlobalKey<ScaffoldState> _globalKey= GlobalKey();
   ...
   Scaffold(
       key: _globalKey , //设置key
       ...  
   )
   ```

2. 通过`GlobalKey`来获取`State`对象

   ```dart
   _globalKey.currentState.openDrawer()
   ```

GlobalKey 是 Flutter 提供的一种在整个 App 中引用 element 的机制。如果一个 widget 设置了`GlobalKey`，那么我们便可以通过`globalKey.currentWidget`获得该 widget 对象、`globalKey.currentElement`来获得 widget 对应的element对象，如果当前 widget 是`StatefulWidget`，则可以通过`globalKey.currentState`来获得该 widget 对应的state对象。

> 注意：使用 GlobalKey 开销较大，如果有其他可选方案，应尽量避免使用它。另外，同一个 GlobalKey 在整个 widget 树中必须是唯一的，不能重复。

## 2.2.8 通过 RenderObject 自定义 Widget

`StatelessWidget` 和 `StatefulWidget` 都是用于组合其它组件的，它们本身没有对应的 RenderObject。Flutter 组件库中的很多基础组件都不是通过`StatelessWidget` 和 `StatefulWidget` 来实现的，比如 Text 、Column、Align等，就好比搭积木，`StatelessWidget` 和 `StatefulWidget` 可以将积木搭成不同的样子，但前提是得有积木，而这些积木都是通过自定义 RenderObject 来实现的。实际上Flutter 最原始的定义组件的方式就是通过定义RenderObject 来实现，而`StatelessWidget` 和 `StatefulWidget` 只是提供的两个帮助类。下面我们简单演示一下通过RenderObject定义组件的方式：

```dart
class CustomWidget extends LeafRenderObjectWidget{
  @override
  RenderObject createRenderObject(BuildContext context) {
    // 创建 RenderObject
    return RenderCustomObject();
  }
  @override
  void updateRenderObject(BuildContext context, RenderCustomObject  renderObject) {
    // 更新 RenderObject
    super.updateRenderObject(context, renderObject);
  }
}

class RenderCustomObject extends RenderBox{

  @override
  void performLayout() {
    // 实现布局逻辑
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    // 实现绘制
  }
}
```

如果组件不会包含子组件，则我们可以直接继承自 LeafRenderObjectWidget ，它是 RenderObjectWidget 的子类，而 RenderObjectWidget 继承自 Widget ，我们可以看一下它的实现：

```dart
abstract class LeafRenderObjectWidget extends RenderObjectWidget {
  const LeafRenderObjectWidget({ Key? key }) : super(key: key);

  @override
  LeafRenderObjectElement createElement() => LeafRenderObjectElement(this);
}
```

很简单，就是帮 widget 实现了createElement 方法，它会为组件创建一个 类型为 LeafRenderObjectElement 的 Element对象。如果自定义的 widget 可以包含子组件，则可以根据子组件的数量来选择继承SingleChildRenderObjectWidget 或 MultiChildRenderObjectWidget，它们也实现了createElement() 方法，返回不同类型的 Element 对象。

然后我们重写了 createRenderObject 方法，它是 RenderObjectWidget 中定义方法，该方法被组件对应的 Element 调用（构建渲染树时）用于生成渲染对象。我们的主要任务就是来实现 createRenderObject 返回的渲染对象类，本例中是 RenderCustomObject 。updateRenderObject 方法是用于在组件树状态发生变化但不需要重新创建 RenderObject 时用于更新组件渲染对象的回调。

RenderCustomObject 类是继承自 RenderBox，而 RenderBox 继承自 RenderObject，我们需要在 RenderCustomObject 中实现布局、绘制、事件响应等逻辑，关于如何实现这些逻辑，涉及到的知识点会贯穿本书，现在先不要着急，我们会在后面的章节中逐步介绍。

##  2.2.9 Flutter SDK内置组件库介绍

Flutter 提供了一套丰富、强大的基础组件，在基础组件库之上 Flutter 又提供了一套 Material 风格（ Android 默认的视觉风格）和一套 Cupertino 风格（iOS视觉风格）的组件库。要使用基础组件库，需要先导入：

```dart
import 'package:flutter/widgets.dart';
```

下面我们介绍一下常用的组件。

#### 基础组件

- Text：该组件可让您创建一个带格式的文本。
- Row、Column：这些具有弹性空间的布局类 widget 可让您在水平（Row）和垂直（Column）方向上创建灵活的布局。其设计是基于 Web 开发中的 Flexbox 布局模型。
- Stack： 取代线性布局 (译者语：和 Android 中的`FrameLayout`相似)，[`Stack`](https://docs.flutter.io/flutter/ widgets/Stack-class.html)允许子 widget 堆叠， 你可以使用Positioned来定位他们相对于`Stack`的上下左右四条边的位置。Stacks是基于Web开发中的绝对定位（absolute positioning )布局模型设计的。
- Container：可让您创建矩形视觉元素。Container 可以装饰一个BoxDecoration, 如 background、一个边框、或者一个阴影。 Container也可以具有边距（margins）、填充(padding)和应用于其大小的约束(constraints)。另外，Container使用矩阵在三维空间中对其进行变换。

####  Material组件

Flutter 提供了一套丰富 的Material 组件，它可以帮助我们构建遵循 Material Design 设计规范的应用程序。Material 应用程序以[`MaterialApp` (opens new window)](https://docs.flutter.io/flutter/material/MaterialApp-class.html) 组件开始， 该组件在应用程序的根部创建了一些必要的组件，比如`Theme`组件，它用于配置应用的主题。 是否使用[`MaterialApp` (opens new window)](https://docs.flutter.io/flutter/material/MaterialApp-class.html)完全是可选的，但是使用它是一个很好的做法。在之前的示例中，我们已经使用过多个 Material 组件了，如：`Scaffold`、`AppBar`、`TextButton`等。要使用 Material 组件，需要先引入它：

```dart
import 'package:flutter/material.dart';
```

#### Cupertino组件

Flutter 也提供了一套丰富的 Cupertino 风格的组件，尽管目前还没有 Material 组件那么丰富，但是它仍在不断的完善中。值得一提的是在 Material 组件库中有一些组件可以根据实际运行平台来切换表现风格，比如`MaterialPageRoute`，在路由切换时，如果是 Android 系统，它将会使用 Android 系统默认的页面切换动画(从底向上)；如果是 iOS 系统，它会使用 iOS 系统默认的页面切换动画（从右向左）。由于在前面的示例中还没有Cupertino组件的示例，下面我们实现一个简单的 Cupertino 组件风格的页面：

```dart
//导入cupertino  widget 库
import 'package:flutter/cupertino.dart';

class CupertinoTestRoute extends StatelessWidget  {
  @override
  widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text("Cupertino Demo"),
      ),
      child: Center(
        child: CupertinoButton(
            color: CupertinoColors.activeBlue,
            child: Text("Press"),
            onPressed: () {}
        ),
      ),
    );
  }
}
```

![2-7.dbd6084c](/Users/kingroger/Downloads/2-7.dbd6084c.png)

> Flutter 提供了丰富的组件，在实际的开发中我们可以根据需要随意使用它们，而不必担心引入过多组件库会让你的应用安装包变大，这不是 web 开发，dart 在编译时只会编译你使用了的代码。由于 Material 和Cupertino 都是在基础组件库之上的，所以如果我们的应用中引入了这两者之一，则不需要再引入`flutter/ widgets.dart`了，因为它们内部已经引入过了。

## 2.3 状态管理

响应式的编程框架中都会有一个永恒的主题——“状态(State)管理”，无论是在 React/Vue（两者都是支持响应式编程的 Web 开发框架）还是 Flutter 中，他们讨论的问题和解决的思想都是一致的。所以，如果你对React/Vue的状态管理有了解，可以跳过本节。言归正传，我们想一个问题，`StatefulWidget`的状态应该被谁管理？Widget本身？父 Widget ？都会？还是另一个对象？答案是取决于实际情况！以下是管理状态的最常见的方法：

- Widget 管理自己的状态。
- Widget 管理子 Widget 状态。
- 混合管理（父 Widget 和子 Widget 都管理状态）。

如何决定使用哪种管理方法？下面是官方给出的一些原则可以帮助你做决定：

- 如果状态是用户数据，如复选框的选中状态、滑块的位置，则该状态最好由父 Widget 管理。
- 如果状态是有关界面外观效果的，例如颜色、动画，那么状态最好由 Widget 本身来管理。
- 如果某一个状态是不同 Widget 共享的则最好由它们共同的父 Widget 管理。

在 Widget 内部管理状态封装性会好一些，而在父 Widget 中管理会比较灵活。有些时候，如果不确定到底该怎么管理状态，那么推荐的首选是在父 Widget 中管理（灵活会显得更重要一些）。

接下来，我们将通过创建三个简单示例TapboxA、TapboxB和TapboxC来说明管理状态的不同方式。 这些例子功能是相似的 ——创建一个盒子，当点击它时，盒子背景会在绿色与灰色之间切换。状态 `_active`确定颜色：绿色为`true` ，灰色为`false`，如图2-8所示：

![图2-8](https://book.flutterchina.club/assets/img/2-8.8e70e140.png)

下面的例子将使用`GestureDetector`来识别点击事件，关于该`GestureDetector`的详细内容我们将在后面“事件处理”一章中介绍。

### [#](https://book.flutterchina.club/chapter2/state_manage.html#_2-3-1-widget管理自身状态)2.3.1 Widget管理自身状态

_TapboxAState 类:

- 管理TapboxA的状态。
- 定义`_active`：确定盒子的当前颜色的布尔值。
- 定义`_handleTap()`函数，该函数在点击该盒子时更新`_active`，并调用`setState()`更新UI。
- 实现widget的所有交互式行为。

```dart
// TapboxA 管理自身状态.

//------------------------- TapboxA ----------------------------------

class TapboxA extends StatefulWidget {
  TapboxA({Key? key}) : super(key: key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
```

### [#](https://book.flutterchina.club/chapter2/state_manage.html#_2-3-2-父widget管理子widget的状态)2.3.2 父Widget管理子Widget的状态

对于父Widget来说，管理状态并告诉其子Widget何时更新通常是比较好的方式。 例如，`IconButton`是一个图标按钮，但它是一个无状态的Widget，因为我们认为父Widget需要知道该按钮是否被点击来采取相应的处理。

在以下示例中，TapboxB通过回调将其状态导出到其父组件，状态由父组件管理，因此它的父组件为`StatefulWidget`。但是由于TapboxB不管理任何状态，所以`TapboxB`为`StatelessWidget`。

`ParentWidgetState` 类:

- 为TapboxB 管理`_active`状态。
- 实现`_handleTapboxChanged()`，当盒子被点击时调用的方法。
- 当状态改变时，调用`setState()`更新UI。

TapboxB 类:

- 继承`StatelessWidget`类，因为所有状态都由其父组件处理。
- 当检测到点击时，它会通知父组件。

```dart
// ParentWidget 为 TapboxB 管理状态.

//------------------------ ParentWidget --------------------------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//------------------------- TapboxB ----------------------------------

class TapboxB extends StatelessWidget {
  TapboxB({Key? key, this.active: false, required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
```

### [#](https://book.flutterchina.club/chapter2/state_manage.html#_2-3-3-混合状态管理)2.3.3 混合状态管理

对于一些组件来说，混合管理的方式会非常有用。在这种情况下，组件自身管理一些内部状态，而父组件管理一些其他外部状态。

在下面 TapboxC 示例中，手指按下时，盒子的周围会出现一个深绿色的边框，抬起时，边框消失。点击完成后，盒子的颜色改变。 TapboxC 将其`_active`状态导出到其父组件中，但在内部管理其`_highlight`状态。这个例子有两个状态对象`_ParentWidgetState`和`_TapboxCState`。

`_ParentWidgetStateC`类:

- 管理`_active` 状态。
- 实现 `_handleTapboxChanged()` ，当盒子被点击时调用。
- 当点击盒子并且`_active`状态改变时调用`setState()`更新UI。

`_TapboxCState` 对象:

- 管理`_highlight` 状态。
- `GestureDetector`监听所有tap事件。当用户点下时，它添加高亮（深绿色边框）；当用户释放时，会移除高亮。
- 当按下、抬起、或者取消点击时更新`_highlight`状态，调用`setState()`更新UI。
- 当点击时，将状态的改变传递给父组件。

```dart
//---------------------------- ParentWidget ----------------------------

class ParentWidgetC extends StatefulWidget {
  @override
  _ParentWidgetCState createState() => _ParentWidgetCState();
}

class _ParentWidgetCState extends State<ParentWidgetC> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxC(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//----------------------------- TapboxC ------------------------------

class TapboxC extends StatefulWidget {
  TapboxC({Key? key, this.active: false, required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;
  
  @override
  _TapboxCState createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  @override
  Widget build(BuildContext context) {
    // 在按下时添加绿色边框，当抬起时，取消高亮  
    return GestureDetector(
      onTapDown: _handleTapDown, // 处理按下事件
      onTapUp: _handleTapUp, // 处理抬起事件
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        child: Center(
          child: Text(
            widget.active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: widget.active ? Colors.lightGreen[700] : Colors.grey[600],
          border: _highlight
              ? Border.all(
                  color: Colors.teal[700],
                  width: 10.0,
                )
              : null,
        ),
      ),
    );
  }
}
```

另一种实现可能会将高亮状态导出到父组件，但同时保持`_active`状态为内部状态，但如果你要将该TapBox 给其它人使用，可能没有什么意义。 开发人员只会关心该框是否处于 Active 状态，而不在乎高亮显示是如何管理的，所以应该让 TapBox 内部处理这些细节。

### [#](https://book.flutterchina.club/chapter2/state_manage.html#_2-3-4-全局状态管理)2.3.4 全局状态管理

当应用中需要一些跨组件（包括跨路由）的状态需要同步时，上面介绍的方法便很难胜任了。比如，我们有一个设置页，里面可以设置应用的语言，我们为了让设置实时生效，我们期望在语言状态发生改变时，App中依赖应用语言的组件能够重新 build 一下，但这些依赖应用语言的组件和设置页并不在一起，所以这种情况用上面的方法很难管理。这时，正确的做法是通过一个全局状态管理器来处理这种相距较远的组件之间的通信。目前主要有两种办法：

1. 实现一个全局的事件总线，将语言状态改变对应为一个事件，然后在APP中依赖应用语言的组件的`initState` 方法中订阅语言改变的事件。当用户在设置页切换语言后，我们发布语言改变事件，而订阅了此事件的组件就会收到通知，收到通知后调用`setState(...)`方法重新`build`一下自身即可。
2. 使用一些专门用于状态管理的包，如 Provider、Redux，读者可以在 pub 上查看其详细信息。

本书将在"功能型组件"一章中介绍 Provider 包的实现原理及用法，同时也将会在"事件处理与通知"一章中实现一个全局事件总线，读者有需要可以直接翻看。

## 2.4 路由管理

路由（Route）在移动开发中通常指页面（Page），这跟 Web 开发中单页应用的 Route 概念意义是相同的，Route 在 Android中 通常指一个 Activity，在 iOS 中指一个 ViewController。所谓路由管理，就是管理页面之间如何跳转，通常也可被称为导航管理。Flutter 中的路由管理和原生开发类似，无论是 Android 还是 iOS，导航管理都会维护一个路由栈，路由入栈（push）操作对应打开一个新页面，路由出栈（pop）操作对应页面关闭操作，而路由管理主要是指如何来管理路由栈。

### 2.4.1 一个简单示例

我们在上一节“计数器”示例的基础上，做如下修改：

1. 创建一个新路由，命名“NewRoute”

   ```dart
   class NewRoute extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: Text("New route"),
         ),
         body: Center(
           child: Text("This is new route"),
         ),
       );
     }
   }
   ```

   新路由继承自`StatelessWidget`，界面很简单，在页面中间显示一句"This is new route"。

2. 在`_MyHomePageState.build`方法中的`Column`的子widget中添加一个按钮（`TextButton`） :

   ```dart
   Column(
     mainAxisAlignment: MainAxisAlignment.center,
     children: <Widget>[
       ... //省略无关代码
       TextButton(
         child: Text("open new route"),
         textColor: Colors.blue,
         onPressed: () {
           //导航到新路由   
           Navigator.push( 
             context,
             MaterialPageRoute(builder: (context) {
               return NewRoute();
             }),
           );
         },
       ),
     ],
    )
   ```

### 2.4.2 MaterialPageRoute

`MaterialPageRoute`继承自`PageRoute`类，`PageRoute`类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，它还定义了路由构建及切换时过渡动画的相关接口及属性。`MaterialPageRoute` 是 Material组件库提供的组件，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画：

- 对于 Android，当打开新页面时，新的页面会从屏幕底部滑动到屏幕顶部；当关闭页面时，当前页面会从屏幕顶部滑动到屏幕底部后消失，同时上一个页面会显示到屏幕上。
- 对于 iOS，当打开页面时，新的页面会从屏幕右侧边缘一直滑动到屏幕左边，直到新页面全部显示到屏幕上，而上一个页面则会从当前屏幕滑动到屏幕左侧而消失；当关闭页面时，正好相反，当前页面会从屏幕右侧滑出，同时上一个页面会从屏幕左侧滑入。

下面我们介绍一下`MaterialPageRoute` 构造函数的各个参数的意义：

```dart
  MaterialPageRoute({
    WidgetBuilder builder,
    RouteSettings settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
  })
```

- `builder` 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个widget。我们通常要实现此回调，返回新路由的实例。
- `settings` 包含路由的配置信息，如路由名称、是否初始路由（首页）。
- `maintainState`：默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置`maintainState`为 `false`。
- `fullscreenDialog`表示新的路由页面是否是一个全屏的模态对话框，在 iOS 中，如果`fullscreenDialog`为`true`，新页面将会从屏幕底部滑入（而不是水平方向）。

> 如果想自定义路由切换动画，可以自己继承 PageRoute 来实现，我们将在后面介绍动画时，实现一个自定义的路由组件。

## 2.4.3 Navigator

`Navigator`是一个路由管理的组件，它提供了打开和退出路由页方法。`Navigator`通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。`Navigator`提供了一系列方法来管理路由栈，在此我们只介绍其最常用的两个方法：

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#future-push-buildcontext-context-route-route)Future push(BuildContext context, Route route)

将给定的路由入栈（即打开新的页面），返回值是一个`Future`对象，用以接收新路由出栈（即关闭）时的返回数据。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#bool-pop-buildcontext-context-result)bool pop(BuildContext context, [ result ])

将栈顶路由出栈，`result` 为页面关闭时返回给上一个页面的数据。

`Navigator` 还有很多其它方法，如`Navigator.replace`、`Navigator.popUntil`等，详情请参考API文档或SDK 源码注释，在此不再赘述。下面我们还需要介绍一下路由相关的另一个概念“命名路由”。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#实例方法)实例方法

Navigator类中第一个参数为context的**静态方法**都对应一个Navigator的**实例方法**， 比如`Navigator.push(BuildContext context, Route route)`等价于`Navigator.of(context).push(Route route)` ，下面命名路由相关的方法也是一样的。

## 2.4.4 路由传值

很多时候，在路由跳转时我们需要带一些参数，比如打开商品详情页时，我们需要带一个商品id，这样商品详情页才知道展示哪个商品信息；又比如我们在填写订单时需要选择收货地址，打开地址选择页并选择地址后，可以将用户选择的地址返回到订单页等等。下面我们通过一个简单的示例来演示新旧路由如何传参。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#示例)示例

我们创建一个`TipRoute`路由，它接受一个提示文本参数，负责将传入它的文本显示在页面上，另外`TipRoute`中我们添加一个“返回”按钮，点击后在返回上一个路由的同时会带上一个返回参数，下面我们看一下实现代码。

`TipRoute`实现代码：

```dart
class TipRoute extends StatelessWidget {
  TipRoute({
    Key key,
    @required this.text,  // 接收一个text参数
  }) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("提示"),
      ),
      body: Padding(
        padding: EdgeInsets.all(18),
        child: Center(
          child: Column(
            children: <Widget>[
              Text(text),
              ElevatedButton(
                onPressed: () => Navigator.pop(context, "我是返回值"),
                child: Text("返回"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

下面是打开新路由`TipRoute`的代码：

```dart
class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () async {
          // 打开`TipRoute`，并等待返回结果
          var result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // 路由参数
                  text: "我是提示xxxx",
                );
              },
            ),
          );
          //输出`TipRoute`路由返回结果
          print("路由返回值: $result");
        },
        child: Text("打开提示页"),
      ),
    );
  }
}
```

需要说明：

1. 提示文案“我是提示xxxx”是通过`TipRoute`的`text`参数传递给新路由页的。我们可以通过等待`Navigator.push(…)`返回的`Future`来获取新路由的返回数据。

2. 在`TipRoute`页中有两种方式可以返回到上一页；第一种方式是直接点击导航栏返回箭头，第二种方式是点击页面中的“返回”按钮。这两种返回方式的区别是前者不会返回数据给上一个路由，而后者会。下面是分别点击页面中的返回按钮和导航栏返回箭头后，`RouterTestRoute`页中`print`方法在控制台输出的内容：

   ```text
   I/flutter (27896): 路由返回值: 我是返回值
   I/flutter (27896): 路由返回值: null
   ```

上面介绍的是非命名路由的传值方式，命名路由的传值方式会有所不同，我们会在下面介绍命名路由时介绍。

## 2.4.5 命名路由

所谓“命名路由”（Named Route）即有名字的路由，我们可以先给路由起一个名字，然后就可以通过路由名字直接打开新的路由了，这为路由管理带来了一种直观、简单的方式。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#路由表)路由表

要想使用命名路由，我们必须先提供并注册一个路由表（routing table），这样应用程序才知道哪个名字与哪个路由组件相对应。其实注册路由表就是给路由起名字，路由表的定义如下：

```dart
Map<String, WidgetBuilder> routes;
```

1

它是一个`Map`，key为路由的名字，是个字符串；value是个`builder`回调函数，用于生成相应的路由widget。我们在通过路由名字打开新路由时，应用会根据路由名字在路由表中查找到对应的`WidgetBuilder`回调函数，然后调用该回调函数生成路由widget并返回。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#注册路由表)注册路由表

路由表的注册方式很简单，我们回到之前“计数器”的示例，然后在`MyApp`类的`build`方法中找到`MaterialApp`，添加`routes`属性，代码如下：

```dart
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context) => NewRoute(),
    ... // 省略其它路由注册信息
  } ,
  home: MyHomePage(title: 'Flutter Demo Home Page'),
);
```

现在我们就完成了路由表的注册。上面的代码中`home`路由并没有使用命名路由，如果我们也想将`home`注册为命名路由应该怎么做呢？其实很简单，直接看代码：

```dart
MaterialApp(
  title: 'Flutter Demo',
  initialRoute:"/", //名为"/"的路由作为应用的home(首页)
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context) => NewRoute(),
   "/":(context) => MyHomePage(title: 'Flutter Demo Home Page'), //注册首页路由
  } 
);
```

可以看到，我们只需在路由表中注册一下`MyHomePage`路由，然后将其名字作为`MaterialApp`的`initialRoute`属性值即可，该属性决定应用的初始路由页是哪一个命名路由。

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#通过路由名打开新路由页)通过路由名打开新路由页

要通过路由名称来打开新路由，可以使用`Navigator` 的`pushNamed`方法：

```dart
Future pushNamed(BuildContext context, String routeName,{Object arguments})
```

`Navigator` 除了`pushNamed`方法，还有`pushReplacementNamed`等其他管理命名路由的方法，读者可以自行查看API文档。接下来我们通过路由名来打开新的路由页，修改`TextButton`的`onPressed`回调代码，改为：

```dart
onPressed: () {
  Navigator.pushNamed(context, "new_page");
  //Navigator.push(context,
  //  MaterialPageRoute(builder: (context) {
  //  return NewRoute();
  //}));  
},
```

热重载应用，再次点击“open new route”按钮，依然可以打开新的路由页。

###  命名路由参数传递

在Flutter最初的版本中，命名路由是不能传递参数的，后来才支持了参数；下面展示命名路由如何传递并获取路由参数：

我们先注册一个路由：

```dart
 routes:{
   "new_page":(context) => EchoRoute(),
  } ,
```

在路由页通过`RouteSetting`对象获取路由参数：

```dart
class EchoRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    //获取路由参数  
    var args=ModalRoute.of(context).settings.arguments;
    //...省略无关代码
  }
}
```

在打开路由时传递参数

```dart
Navigator.of(context).pushNamed("new_page", arguments: "hi");
```

### [#](https://book.flutterchina.club/chapter2/flutter_router.html#适配)适配

假设我们也想将上面路由传参示例中的`TipRoute`路由页注册到路由表中，以便也可以通过路由名来打开它。但是，由于`TipRoute`接受一个`text` 参数，我们如何在不改变`TipRoute`源码的前提下适配这种情况？其实很简单：

```dart
MaterialApp(
  ... //省略无关代码
  routes: {
   "tip2": (context){
     return TipRoute(text: ModalRoute.of(context)!.settings.arguments);
   },
 }, 
);
```

## 2.4.6 路由生成钩子

假设我们要开发一个电商App，当用户没有登录时可以看店铺、商品等信息，但交易记录、购物车、用户个人信息等页面需要登录后才能看。为了实现上述功能，我们需要在打开每一个路由页前判断用户登录状态！如果每次打开路由前我们都需要去判断一下将会非常麻烦，那有什么更好的办法吗？答案是有！

`MaterialApp`有一个`onGenerateRoute`属性，它在打开命名路由时可能会被调用，之所以说可能，是因为当调用`Navigator.pushNamed(...)`打开命名路由时，如果指定的路由名在路由表中已注册，则会调用路由表中的`builder`函数来生成路由组件；如果路由表中没有注册，才会调用`onGenerateRoute`来生成路由。`onGenerateRoute`回调签名如下：

```dart
Route<dynamic> Function(RouteSettings settings)
```

有了`onGenerateRoute`回调，要实现上面控制页面权限的功能就非常容易：**我们放弃使用路由表**，取而代之的是提供一个`onGenerateRoute`回调，然后在该回调中进行统一的权限控制，如：

```dart
MaterialApp(
  ... //省略无关代码
  onGenerateRoute:(RouteSettings settings){
	  return MaterialPageRoute(builder: (context){
		   String routeName = settings.name;
       // 如果访问的路由页需要登录，但当前未登录，则直接返回登录页路由，
       // 引导用户登录；其它情况则正常打开路由。
     }
   );
  }
);
```

> 注意，`onGenerateRoute` 只会对命名路由生效。

## [#](https://book.flutterchina.club/chapter2/flutter_router.html#_2-4-7-总结)2.4.7 总结

本章先介绍了Flutter中路由管理、传参的方式，然后又着重介绍了命名路由相关内容。在此需要说明一点，由于命名路由只是一种可选的路由管理方式，在实际开发中，读者可能心中会犹豫到底使用哪种路由管理方式。在此，根据笔者经验，建议读者最好统一使用命名路由的管理方式，这将会带来如下好处：

1. 语义化更明确。
2. 代码更好维护；如果使用匿名路由，则必须在调用`Navigator.push`的地方创建新路由页，这样不仅需要import新路由页的dart文件，而且这样的代码将会非常分散。
3. 可以通过`onGenerateRoute`做一些全局的路由跳转前置处理逻辑。

综上所述，笔者比较建议使用命名路由，当然这并不是什么金科玉律，读者可以根据自己偏好或实际情况来决定。

另外，还有一些关于路由管理的内容我们没有介绍，比如路由MaterialApp中还有`navigatorObservers`和`onUnknownRoute`两个回调属性，前者可以监听所有路由跳转动作，后者在打开一个不存在的命名路由时会被调用，由于这些功能并不常用，而且也比较简单，我们便不再花费篇幅来介绍了，读者可以自行查看API文档。

## 资源管理

Flutter APP 安装包中会包含代码和 assets（资源）两部分。Assets 是会打包到程序安装包中的，可在运行时访问。常见类型的 assets 包括静态数据（例如JSON文件）、配置文件、图标和图片等。

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#指定-assets)指定 assets

和包管理一样，Flutter 也使用[`pubspec.yaml` (opens new window)](https://www.dartlang.org/tools/pub/pubspec)文件来管理应用程序所需的资源，举个例子:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

`assets`指定应包含在应用程序中的文件， 每个 asset 都通过相对于`pubspec.yaml`文件所在的文件系统路径来标识自身的路径。asset 的声明顺序是无关紧要的，asset的实际目录可以是任意文件夹（在本示例中是assets 文件夹）。

在构建期间，Flutter 将 asset 放置到称为 *asset bundle* 的特殊存档中，应用程序可以在运行时读取它们（但不能修改）。

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#asset-变体-variant)Asset 变体（variant）

构建过程支持“asset变体”的概念：不同版本的 asset 可能会显示在不同的上下文中。 在`pubspec.yaml`的assets 部分中指定 asset 路径时，构建过程中，会在相邻子目录中查找具有相同名称的任何文件。这些文件随后会与指定的 asset 一起被包含在 asset bundle 中。

例如，如果应用程序目录中有以下文件:

- …/pubspec.yaml
- …/graphics/my_icon.png
- …/graphics/background.png
- …/graphics/dark/background.png
- …etc.

然后`pubspec.yaml`文件中只需包含:

```yaml
flutter:
  assets:
    - graphics/background.png
```

那么这两个`graphics/background.png`和`graphics/dark/background.png` 都将包含在您的 asset bundle中。前者被认为是_main asset_ （主资源），后者被认为是一种变体（variant）。

在选择匹配当前设备分辨率的图片时，Flutter会使用到 asset 变体（见下文）。

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#加载-assets)加载 assets

您的应用可以通过[`AssetBundle` (opens new window)](https://docs.flutter.io/flutter/services/AssetBundle-class.html)对象访问其 asset 。有两种主要方法允许从 Asset bundle 中加载字符串或图片（二进制）文件。

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#加载文本assets)加载文本assets

- 通过[`rootBundle` (opens new window)](https://docs.flutter.io/flutter/services/rootBundle.html)对象加载：每个Flutter应用程序都有一个[`rootBundle` (opens new window)](https://docs.flutter.io/flutter/services/rootBundle.html)对象， 通过它可以轻松访问主资源包，直接使用`package:flutter/services.dart`中全局静态的`rootBundle`对象来加载asset即可。
- 通过 [`DefaultAssetBundle` (opens new window)](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html)加载：建议使用 [`DefaultAssetBundle` (opens new window)](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html)来获取当前 BuildContext 的AssetBundle。 这种方法不是使用应用程序构建的默认 asset bundle，而是使父级 widget 在运行时动态替换的不同的 AssetBundle，这对于本地化或测试场景很有用。

通常，可以使用`DefaultAssetBundle.of()`在应用运行时来间接加载 asset（例如JSON文件），而在widget 上下文之外，或其它`AssetBundle`句柄不可用时，可以使用`rootBundle`直接加载这些 asset，例如：

```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#加载图片)加载图片

类似于原生开发，Flutter也可以为当前设备加载适合其分辨率的图像。

#### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#声明分辨率相关的图片-assets)声明分辨率相关的图片 assets

[`AssetImage` (opens new window)](https://docs.flutter.io/flutter/painting/AssetImage-class.html)可以将asset的请求逻辑映射到最接近当前设备像素比例（dpi）的asset。为了使这种映射起作用，必须根据特定的目录结构来保存asset：

- …/image.png
- …/**M**x/image.png
- …/**N**x/image.png
- …etc.

其中 M 和 N 是数字标识符，对应于其中包含的图像的分辨率，也就是说，它们指定不同设备像素比例的图片。

主资源默认对应于1.0倍的分辨率图片。看一个例子：

- …/my_icon.png
- …/2.0x/my_icon.png
- …/3.0x/my_icon.png

在设备像素比率为1.8的设备上，`.../2.0x/my_icon.png` 将被选择。对于2.7的设备像素比率，`.../3.0x/my_icon.png`将被选择。

如果未在`Image` widget上指定渲染图像的宽度和高度，那么`Image` widget将占用与主资源相同的屏幕空间大小。 也就是说，如果`.../my_icon.png`是72px乘72px，那么`.../3.0x/my_icon.png`应该是216px乘216px; 但如果未指定宽度和高度，它们都将渲染为72像素×72像素（以逻辑像素为单位）。

`pubspec.yaml`中asset部分中的每一项都应与实际文件相对应，但主资源项除外。当主资源缺少某个资源时，会按分辨率从低到高的顺序去选择 ，也就是说1x中没有的话会在2x中找，2x中还没有的话就在3x中找。

#### 加载图片

要加载图片，可以使用 [`AssetImage` (opens new window)](https://docs.flutter.io/flutter/painting/AssetImage-class.html)类。例如，我们可以从上面的asset声明中加载背景图片：

```dart
Widget build(BuildContext context) {
  return DecoratedBox(
    decoration: BoxDecoration(
      image: DecorationImage(
        image: AssetImage('graphics/background.png'),
      ),
    ),
  );
}
```

注意，`AssetImage` 并非是一个widget， 它实际上是一个`ImageProvider`，有些时候你可能期望直接得到一个显示图片的widget，那么你可以使用`Image.asset()`方法，如：

```dart
Widget build(BuildContext context) {
  return Image.asset('graphics/background.png');
}
```

使用默认的 asset bundle 加载资源时，内部会自动处理分辨率等，这些处理对开发者来说是无感知的。 (如果使用一些更低级别的类，如 [`ImageStream` (opens new window)](https://docs.flutter.io/flutter/painting/ImageStream-class.html)或 [`ImageCache` (opens new window)](https://docs.flutter.io/flutter/painting/ImageCache-class.html)时你会注意到有与缩放相关的参数)

#### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#依赖包中的资源图片)依赖包中的资源图片

要加载依赖包中的图像，必须给`AssetImage`提供`package`参数。

例如，假设您的应用程序依赖于一个名为“my_icons”的包，它具有如下目录结构：

- …/pubspec.yaml
- …/icons/heart.png
- …/icons/1.5x/heart.png
- …/icons/2.0x/heart.png
- …etc.

然后加载图像，使用:

```dart
AssetImage('icons/heart.png', package: 'my_icons')
```

或

```dart
Image.asset('icons/heart.png', package: 'my_icons')
```

**注意：包在使用本身的资源时也应该加上`package`参数来获取**。

#### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#打包包中的-assets)打包包中的 assets

如果在`pubspec.yaml`文件中声明了期望的资源，它将会打包到相应的package中。特别是，包本身使用的资源必须在`pubspec.yaml`中指定。

包也可以选择在其`lib/`文件夹中包含未在其`pubspec.yaml`文件中声明的资源。在这种情况下，对于要打包的图片，应用程序必须在`pubspec.yaml`中指定包含哪些图像。 例如，一个名为“fancy_backgrounds”的包，可能包含以下文件：

- …/lib/backgrounds/background1.png
- …/lib/backgrounds/background2.png
- …/lib/backgrounds/background3.png

要包含第一张图像，必须在`pubspec.yaml`的assets部分中声明它：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

`lib/`是隐含的，所以它不应该包含在资产路径中。

### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#特定平台-assets)特定平台 assets

上面的资源都是flutter应用中的，这些资源只有在Flutter框架运行之后才能使用，如果要给我们的应用设置APP图标或者添加启动图，那我们必须使用特定平台的assets。

#### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#设置app图标)设置APP图标

更新Flutter应用程序启动图标的方式与在本机Android或iOS应用程序中更新启动图标的方式相同。

- Android

  在 Flutter 项目的根目录中，导航到`.../android/app/src/main/res`目录，里面包含了各种资源文件夹（如`mipmap-hdpi`已包含占位符图像 “ic_launcher.png”，见图2-15）。 只需按照[Android开发人员指南 (opens new window)](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html#size)中的说明， 将其替换为所需的资源，并遵守每种屏幕密度（dpi）的建议图标大小标准。

![1](/Users/kingroger/Downloads/1.png)

>  **注意:** 如果您重命名.png文件，则还必须在您`AndroidManifest.xml`的`<application>`标签的`android:icon`属性中更新名称。

iOS

在Flutter项目的根目录中，导航到`.../ios/Runner`。该目录中`Assets.xcassets/AppIcon.appiconset`已经包含占位符图片（见图2-16）， 只需将它们替换为适当大小的图片，保留原始文件名称。

![](/Users/kingroger/Downloads/2.png)

#### 更新启动页

![](/Users/kingroger/Downloads/3.png)

在 Flutter 框架加载时，Flutter 会使用本地平台机制绘制启动页。此启动页将持续到Flutter渲染应用程序的第一帧时。

> **注意:** 这意味着如果您不在应用程序的`main()`方法中调用[runApp (opens new window)](https://docs.flutter.io/flutter/widgets/runApp.html)函数 （或者更具体地说，如果您不调用[`window.render` (opens new window)](https://docs.flutter.io/flutter/dart-ui/Window/render.html)去响应[`window.onDrawFrame` (opens new window)](https://docs.flutter.io/flutter/dart-ui/Window/onDrawFrame.html)）的话， 启动屏幕将永远持续显示。

##### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#android)Android

要将启动屏幕（splash screen）添加到您的Flutter应用程序， 请导航至`.../android/app/src/main`。在`res/drawable/launch_background.xml`，通过自定义drawable来实现自定义启动界面（你也可以直接换一张图片）。

##### [#](https://book.flutterchina.club/chapter2/flutter_assets_mgr.html#ios)iOS

要将图片添加到启动屏幕（splash screen）的中心，请导航至`.../ios/Runner`。在`Assets.xcassets/LaunchImage.imageset`， 拖入图片，并命名为`LaunchImage.png`、`LaunchImage@2x.png`、`LaunchImage@3x.png`。 如果你使用不同的文件名，那您还必须更新同一目录中的`Contents.json`文件，图片的具体尺寸可以查看苹果官方的标准。

您也可以通过打开Xcode完全自定义storyboard。在Project Navigator中导航到`Runner/Runner`然后通过打开`Assets.xcassets`拖入图片，或者通过在LaunchScreen.storyboard中使用Interface Builder进行自定义，

![](/Users/kingroger/Downloads/4.png)

## 3.4 单选开关和复选框

Material 组件库中提供了 Material 风格的单选开关`Switch`和复选框`Checkbox`，虽然它们都是继承自`StatefulWidget`，但它们本身不会保存当前选中状态，选中状态都是由父组件来管理的。当`Switch`或`Checkbox`被点击时，会触发它们的`onChanged`回调，我们可以在此回调中处理选中状态改变逻辑。下面看一个简单的例子：

```dart
class SwitchAndCheckBoxTestRoute extends StatefulWidget {
  @override
  _SwitchAndCheckBoxTestRouteState createState() => _SwitchAndCheckBoxTestRouteState();
}

class _SwitchAndCheckBoxTestRouteState extends State<SwitchAndCheckBoxTestRoute> {
  bool _switchSelected=true; //维护单选开关状态
  bool _checkboxSelected=true;//维护复选框状态
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Switch(
          value: _switchSelected,//当前状态
          onChanged:(value){
            //重新构建页面  
            setState(() {
              _switchSelected=value;
            });
          },
        ),
        Checkbox(
          value: _checkboxSelected,
          activeColor: Colors.red, //选中时的颜色
          onChanged:(value){
            setState(() {
              _checkboxSelected=value;
            });
          } ,
        )
      ],
    );
  }
}
```

上面代码中，由于需要维护`Switch`和`Checkbox`的选中状态，所以`SwitchAndCheckBoxTestRoute`继承自`StatefulWidget` 。在其`build`方法中分别构建了一个`Switch`和`Checkbox`，初始状态都为选中状态，当用户点击时，会将状态置反，然后回调用`setState()`通知 Flutter 框架重新构建UI，效果如图3-17所示：

![图3-17](https://book.flutterchina.club/assets/img/3-17.a249df4c.png)

### [#](https://book.flutterchina.club/chapter3/radio_and_checkbox.html#属性及外观)属性及外观

`Switch`和`Checkbox`属性比较简单，读者可以查看API文档，它们都有一个`activeColor`属性，用于设置激活态的颜色。至于大小，到目前为止，`Checkbox`的大小是固定的，无法自定义，而`Switch`只能定义宽度，高度也是固定的。值得一提的是`Checkbox`有一个属性`tristate` ，表示是否为三态，其默认值为`false` ，这时 Checkbox 有两种状态即“选中”和“不选中”，对应的 value 值为`true`和`false` ；如果`tristate`值为`true`时，value 的值会增加一个状态`null`，读者可以自行测试。

### [#](https://book.flutterchina.club/chapter3/radio_and_checkbox.html#注意)注意

通过`Switch`和`Checkbox`我们可以看到，虽然它们本身是与状态（是否选中）关联的，但它们却不是自己来维护状态，而是需要父组件来管理状态，然后当用户点击时，再通过事件通知给父组件，这样是合理的，因为`Switch`和`Checkbox`是否选中本就和用户数据关联，而这些用户数据也不可能是它们的私有状态。我们在自定义组件时也应该思考一下哪种状态的管理方式最为合理。

## 3.5 输入框及表单

Material 组件库中提供了输入框组件`TextField`和表单组件`Form`。下面我们分别介绍一下。

### [#](https://book.flutterchina.club/chapter3/input_and_form.html#_3-5-1-textfield)3.5.1 TextField

`TextField`用于文本输入，它提供了很多属性，我们先简单介绍一下主要属性的作用，然后通过几个示例来演示一下关键属性的用法。

```dart
const TextField({
  ...
  TextEditingController controller, 
  FocusNode focusNode,
  InputDecoration decoration = const InputDecoration(),
  TextInputType keyboardType,
  TextInputAction textInputAction,
  TextStyle style,
  TextAlign textAlign = TextAlign.start,
  bool autofocus = false,
  bool obscureText = false,
  int maxLines = 1,
  int maxLength,
  this.maxLengthEnforcement,
  ToolbarOptions? toolbarOptions,
  ValueChanged<String> onChanged,
  VoidCallback onEditingComplete,
  ValueChanged<String> onSubmitted,
  List<TextInputFormatter> inputFormatters,
  bool enabled,
  this.cursorWidth = 2.0,
  this.cursorRadius,
  this.cursorColor,
  this.onTap,
  ...
})
```

- `controller`：编辑框的控制器，通过它可以设置/获取编辑框的内容、选择编辑内容、监听编辑文本改变事件。大多数情况下我们都需要显式提供一个`controller`来与文本框交互。如果没有提供`controller`，则`TextField`内部会自动创建一个。

- `focusNode`：用于控制`TextField`是否占有当前键盘的输入焦点。它是我们和键盘交互的一个句柄（handle）。

- `InputDecoration`：用于控制`TextField`的外观显示，如提示文本、背景颜色、边框等。

- `keyboardType`：用于设置该输入框默认的键盘输入类型，取值如下：

  | TextInputType枚举值 | 含义                                                |
  | ------------------- | --------------------------------------------------- |
  | text                | 文本输入键盘                                        |
  | multiline           | 多行文本，需和maxLines配合使用(设为null或大于1)     |
  | number              | 数字；会弹出数字键盘                                |
  | phone               | 优化后的电话号码输入键盘；会弹出数字键盘并显示“* #” |
  | datetime            | 优化后的日期输入键盘；Android上会显示“: -”          |
  | emailAddress        | 优化后的电子邮件地址；会显示“@ .”                   |
  | url                 | 优化后的url输入键盘； 会显示“/ .”                   |

- `textInputAction`：键盘动作按钮图标(即回车键位图标)，它是一个枚举值，有多个可选值，全部的取值列表读者可以查看API文档，下面是当值为`TextInputAction.search`时，原生Android系统下键盘样式如图3-18所示：

  ![图3-18](https://book.flutterchina.club/assets/img/3-18.68d03561.png)

- `style`：正在编辑的文本样式。

- `textAlign`: 输入框内编辑文本在水平方向的对齐方式。

- `autofocus`: 是否自动获取焦点。

- `obscureText`：是否隐藏正在编辑的文本，如用于输入密码的场景等，文本内容会用“•”替换。

- `maxLines`：输入框的最大行数，默认为1；如果为`null`，则无行数限制。

- `maxLength`和`maxLengthEnforcement` ：`maxLength`代表输入框文本的最大长度，设置后输入框右下角会显示输入的文本计数。`maxLengthEnforcement`决定当输入文本长度超过`maxLength`时如何处理，如截断、超出等。

- `toolbarOptions`：长按或鼠标右击时出现的菜单，包括 copy、cut、paste 以及 selectAll。

- `onChange`：输入框内容改变时的回调函数；注：内容改变事件也可以通过`controller`来监听。

- `onEditingComplete`和`onSubmitted`：这两个回调都是在输入框输入完成时触发，比如按了键盘的完成键（对号图标）或搜索键（🔍图标）。不同的是两个回调签名不同，`onSubmitted`回调是`ValueChanged<String>`类型，它接收当前输入内容做为参数，而`onEditingComplete`不接收参数。

- `inputFormatters`：用于指定输入格式；当用户输入内容改变时，会根据指定的格式来校验。

- `enable`：如果为`false`，则输入框会被禁用，禁用状态不接收输入和事件，同时显示禁用态样式（在其`decoration`中定义）。

- `cursorWidth`、`cursorRadius`和`cursorColor`：这三个属性是用于自定义输入框光标宽度、圆角和颜色的。

#### [#](https://book.flutterchina.club/chapter3/input_and_form.html#示例-登录输入框)示例：登录输入框

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#布局)布局

```dart
Column(
  children: <Widget>[
    TextField(
      autofocus: true,
      decoration: InputDecoration(
        labelText: "用户名",
        hintText: "用户名或邮箱",
        prefixIcon: Icon(Icons.person)
      ),
    ),
    TextField(
      decoration: InputDecoration(
        labelText: "密码",
        hintText: "您的登录密码",
        prefixIcon: Icon(Icons.lock)
      ),
      obscureText: true,
    ),
  ],
);
```

运行后，效果如图3-19所示：

![图3-19](https://book.flutterchina.club/assets/img/3-19.18d09233.png)

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#获取输入内容)获取输入内容

获取输入内容有两种方式：

1. 定义两个变量，用于保存用户名和密码，然后在`onChange`触发时，各自保存一下输入内容。
2. 通过`controller`直接获取。

第一种方式比较简单，不在举例，我们来重点看一下第二种方式，我们以用户名输入框举例：

定义一个`controller`：

```dart
//定义一个controller
TextEditingController _unameController = TextEditingController();
```



然后设置输入框controller：

```dart
TextField(
    autofocus: true,
    controller: _unameController, //设置controller
    ...
)
```

通过controller获取输入框内容

```dart
print(_unameController.text)
```

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#监听文本变化)监听文本变化

监听文本变化也有两种方式：

1. 设置`onChange`回调，如：

   ```dart
   TextField(
       autofocus: true,
       onChanged: (v) {
         print("onChange: $v");
       }
   )
   ```

2. 通过`controller`监听，如：

   ```dart
   @override
   void initState() {
     //监听输入改变  
     _unameController.addListener((){
       print(_unameController.text);
     });
   }
   ```

两种方式相比，`onChanged`是专门用于监听文本变化，而`controller`的功能却多一些，除了能监听文本变化外，它还可以设置默认值、选择文本，下面我们看一个例子：

创建一个`controller`:

```dart
TextEditingController _selectionController =  TextEditingController();
```

设置默认值，并从第三个字符开始选中后面的字符

```dart
_selectionController.text="hello world!";
_selectionController.selection=TextSelection(
    baseOffset: 2,
    extentOffset: _selectionController.text.length
);
```

设置`controlle`r:

```dart
TextField(
  controller: _selectionController,
)
```

运行效果如图3-20所示：

![图3-20](data:image/png;base64,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)

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#控制焦点)控制焦点

焦点可以通过`FocusNode`和`FocusScopeNode`来控制，默认情况下，焦点由`FocusScope`来管理，它代表焦点控制范围，可以在这个范围内可以通过`FocusScopeNode`在输入框之间移动焦点、设置默认焦点等。我们可以通过`FocusScope.of(context)` 来获取Widget树中默认的`FocusScopeNode`。下面看一个示例，在此示例中创建两个`TextField`，第一个自动获取焦点，然后创建两个按钮：

- 点击第一个按钮可以将焦点从第一个`TextField`挪到第二个`TextField`。
- 点击第二个按钮可以关闭键盘。

我们要实现的效果如图3-21所示：

![图3-21](https://book.flutterchina.club/assets/img/3-21.6ff2b58c.png)

代码如下：

```dart
class FocusTestRoute extends StatefulWidget {
  @override
  _FocusTestRouteState createState() => _FocusTestRouteState();
}

class _FocusTestRouteState extends State<FocusTestRoute> {
  FocusNode focusNode1 = FocusNode();
  FocusNode focusNode2 = FocusNode();
  FocusScopeNode? focusScopeNode;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: <Widget>[
          TextField(
            autofocus: true, 
            focusNode: focusNode1,//关联focusNode1
            decoration: InputDecoration(
                labelText: "input1"
            ),
          ),
          TextField(
            focusNode: focusNode2,//关联focusNode2
            decoration: InputDecoration(
                labelText: "input2"
            ),
          ),
          Builder(builder: (ctx) {
            return Column(
              children: <Widget>[
                ElevatedButton(
                  child: Text("移动焦点"),
                  onPressed: () {
                    //将焦点从第一个TextField移到第二个TextField
                    // 这是一种写法 FocusScope.of(context).requestFocus(focusNode2);
                    // 这是第二种写法
                    if(null == focusScopeNode){
                      focusScopeNode = FocusScope.of(context);
                    }
                    focusScopeNode.requestFocus(focusNode2);
                  },
                ),
                ElevatedButton(
                  child: Text("隐藏键盘"),
                  onPressed: () {
                    // 当所有编辑框都失去焦点时键盘就会收起  
                    focusNode1.unfocus();
                    focusNode2.unfocus();
                  },
                ),
              ],
            );
          },
          ),
        ],
      ),
    );
  }

}
```

`FocusNode`和`FocusScopeNode`还有一些其它的方法，详情可以查看API文档。

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#监听焦点状态改变事件)监听焦点状态改变事件

`FocusNode`继承自`ChangeNotifier`，通过`FocusNode`可以监听焦点的改变事件，如：

```dart
...
// 创建 focusNode   
FocusNode focusNode = FocusNode();
...
// focusNode绑定输入框   
TextField(focusNode: focusNode);
...
// 监听焦点变化    
focusNode.addListener((){
   print(focusNode.hasFocus);
});
```

获得焦点时`focusNode.hasFocus`值为`true`，失去焦点时为`false`。

##### [#](https://book.flutterchina.club/chapter3/input_and_form.html#自定义样式)自定义样式

虽然我们可以通过`decoration`属性来定义输入框样式，下面以自定义输入框下划线颜色为例来介绍一下：

```dart
TextField(
  decoration: InputDecoration(
    labelText: "请输入用户名",
    prefixIcon: Icon(Icons.person),
    // 未获得焦点下划线设为灰色
    enabledBorder: UnderlineInputBorder(
      borderSide: BorderSide(color: Colors.grey),
    ),
    //获得焦点下划线设为蓝色
    focusedBorder: UnderlineInputBorder(
      borderSide: BorderSide(color: Colors.blue),
    ),
  ),
),
```

上面代码我们直接通过InputDecoration的enabledBorder和focusedBorder来分别设置了输入框在未获取焦点和获得焦点后的下划线颜色。另外，我们也可以通过主题来自定义输入框的样式，下面我们探索一下如何在不使用enabledBorder和focusedBorder的情况下来自定义下滑线颜色。

由于`TextField`在绘制下划线时使用的颜色是主题色里面的`hintColor`，但提示文本颜色也是用的`hintColor`， 如果我们直接修改`hintColor`，那么下划线和提示文本的颜色都会变。值得高兴的是`decoration`中可以设置`hintStyle`，它可以覆盖`hintColor`，并且主题中可以通过`inputDecorationTheme`来设置输入框默认的`decoration`。所以我们可以通过主题来自定义，代码如下：

```dart
Theme(
  data: Theme.of(context).copyWith(
      hintColor: Colors.grey[200], //定义下划线颜色
      inputDecorationTheme: InputDecorationTheme(
          labelStyle: TextStyle(color: Colors.grey),//定义label字体样式
          hintStyle: TextStyle(color: Colors.grey, fontSize: 14.0)//定义提示文本样式
      )
  ),
  child: Column(
    children: <Widget>[
      TextField(
        decoration: InputDecoration(
            labelText: "用户名",
            hintText: "用户名或邮箱",
            prefixIcon: Icon(Icons.person)
        ),
      ),
      TextField(
        decoration: InputDecoration(
            prefixIcon: Icon(Icons.lock),
            labelText: "密码",
            hintText: "您的登录密码",
            hintStyle: TextStyle(color: Colors.grey, fontSize: 13.0)
        ),
        obscureText: true,
      )
    ],
  )
)
```

运行效果如图3-22所示：

![图3-22](https://book.flutterchina.club/assets/img/3-22.b6b9c9b2.png)

我们成功的自定义了下划线颜色和提问文字样式，细心的读者可能已经发现，通过这种方式自定义后，输入框在获取焦点时，`labelText`不会高亮显示了，正如上图中的"用户名"本应该显示蓝色，但现在却显示为灰色，并且我们还是无法定义下划线宽度。另一种灵活的方式是直接隐藏掉`TextField`本身的下划线，然后通过`Container`去嵌套定义样式，如:

```dart
Container(
  child: TextField(
    keyboardType: TextInputType.emailAddress,
    decoration: InputDecoration(
        labelText: "Email",
        hintText: "电子邮件地址",
        prefixIcon: Icon(Icons.email),
        border: InputBorder.none //隐藏下划线
    )
  ),
  decoration: BoxDecoration(
      // 下滑线浅灰色，宽度1像素
      border: Border(bottom: BorderSide(color: Colors.grey[200], width: 1.0))
  ),
)
```

运行效果如图3-23：

![3-23](data:image/png;base64,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)

通过这种组件组合的方式，也可以定义背景圆角等。一般来说，优先通过`decoration`来自定义样式，如果`decoration`实现不了，再用widget组合的方式。

### 3.5.2 表单Form

实际业务中，在正式向服务器提交数据前，都会对各个输入框数据进行合法性校验，但是对每一个`TextField`都分别进行校验将会是一件很麻烦的事。还有，如果用户想清除一组`TextField`的内容，除了一个一个清除有没有什么更好的办法呢？为此，Flutter提供了一个`Form` 组件，它可以对输入框进行分组，然后进行一些统一操作，如输入内容校验、输入框重置以及输入内容保存。

#### [#](https://book.flutterchina.club/chapter3/input_and_form.html#form)Form

`Form`继承自`StatefulWidget`对象，它对应的状态类为`FormState`。我们先看看`Form`类的定义：

```dart
Form({
  required Widget child,
  bool autovalidate = false,
  WillPopCallback onWillPop,
  VoidCallback onChanged,
})
```

- `autovalidate`：是否自动校验输入内容；当为`true`时，每一个子 FormField 内容发生变化时都会自动校验合法性，并直接显示错误信息。否则，需要通过调用`FormState.validate()`来手动校验。
- `onWillPop`：决定`Form`所在的路由是否可以直接返回（如点击返回按钮），该回调返回一个`Future`对象，如果 Future 的最终结果是`false`，则当前路由不会返回；如果为`true`，则会返回到上一个路由。此属性通常用于拦截返回按钮。
- `onChanged`：`Form`的任意一个子`FormField`内容发生变化时会触发此回调。

#### [#](https://book.flutterchina.club/chapter3/input_and_form.html#formfield)FormField

`Form`的子孙元素必须是`FormField`类型，`FormField`是一个抽象类，定义几个属性，`FormState`内部通过它们来完成操作，`FormField`部分定义如下：

```dart
const FormField({
  ...
  FormFieldSetter<T> onSaved, //保存回调
  FormFieldValidator<T>  validator, //验证回调
  T initialValue, //初始值
  bool autovalidate = false, //是否自动校验。
})
```

为了方便使用，Flutter 提供了一个`TextFormField`组件，它继承自`FormField`类，也是`TextField`的一个包装类，所以除了`FormField`定义的属性之外，它还包括`TextField`的属性。

#### [#](https://book.flutterchina.club/chapter3/input_and_form.html#formstate)FormState

`FormState`为`Form`的`State`类，可以通过`Form.of()`或`GlobalKey`获得。我们可以通过它来对`Form`的子孙`FormField`进行统一操作。我们看看其常用的三个方法：

- `FormState.validate()`：调用此方法后，会调用`Form`子孙`FormField的validate`回调，如果有一个校验失败，则返回false，所有校验失败项都会返回用户返回的错误提示。
- `FormState.save()`：调用此方法后，会调用`Form`子孙`FormField`的`save`回调，用于保存表单内容
- `FormState.reset()`：调用此方法后，会将子孙`FormField`的内容清空。

#### [#](https://book.flutterchina.club/chapter3/input_and_form.html#示例)示例

我们修改一下上面用户登录的示例，在提交之前校验：

1. 用户名不能为空，如果为空则提示“用户名不能为空”。
2. 密码不能小于 6 位，如果小于 6 为则提示“密码不能少于 6 位”。

完整代码：

```dart
import 'package:flutter/material.dart';

class FormTestRoute extends StatefulWidget {
  @override
  _FormTestRouteState createState() => _FormTestRouteState();
}

class _FormTestRouteState extends State<FormTestRoute> {
  TextEditingController _unameController = TextEditingController();
  TextEditingController _pwdController = TextEditingController();
  GlobalKey _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey, //设置globalKey，用于后面获取FormState
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(
        children: <Widget>[
          TextFormField(
            autofocus: true,
            controller: _unameController,
            decoration: InputDecoration(
              labelText: "用户名",
              hintText: "用户名或邮箱",
              icon: Icon(Icons.person),
            ),
            // 校验用户名
            validator: (v) {
              return v!.trim().isNotEmpty ? null : "用户名不能为空";
            },
          ),
          TextFormField(
            controller: _pwdController,
            decoration: InputDecoration(
              labelText: "密码",
              hintText: "您的登录密码",
              icon: Icon(Icons.lock),
            ),
            obscureText: true,
            //校验密码
            validator: (v) {
              return v!.trim().length > 5 ? null : "密码不能少于6位";
            },
          ),
          // 登录按钮
          Padding(
            padding: const EdgeInsets.only(top: 28.0),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: ElevatedButton(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text("登录"),
                    ),
                    onPressed: () {
                      // 通过_formKey.currentState 获取FormState后，
                      // 调用validate()方法校验用户名密码是否合法，校验
                      // 通过后再提交数据。
                      if ((_formKey.currentState as FormState).validate()) {
                        //验证通过提交数据
                      }
                    },
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
```

运行后效果如图3-24所示：

![图3-24](https://book.flutterchina.club/assets/img/3-24.ff4de036.png)

注意，登录按钮的`onPressed`方法中不能通过`Form.of(context)`来获取，原因是，此处的`context`为`FormTestRoute`的context，而`Form.of(context)`是根据所指定`context`向根去查找，而`FormState`是在`FormTestRoute`的子树中，所以不行。正确的做法是通过`Builder`来构建登录按钮，`Builder`会将`widget`节点的`context`作为回调参数：

```dart
Expanded(
 // 通过Builder来获取ElevatedButton所在widget树的真正context(Element) 
  child:Builder(builder: (context){
    return ElevatedButton(
      ...
      onPressed: () {
        //由于本widget也是Form的子代widget，所以可以通过下面方式获取FormState  
        if(Form.of(context).validate()){
          //验证通过提交数据
        }
      },
    );
  })
)
```

其实`context`正是操作Widget所对应的`Element`的一个接口，由于Widget树对应的`Element`都是不同的，所以`context`也都是不同的，有关`context`的更多内容会在后面高级部分详细讨论。Flutter中有很多“of(context)”这种方法，读者在使用时一定要注意`context`是否正确。

## 3.6 进度指示器

Material 组件库中提供了两种进度指示器：`LinearProgressIndicator`和`CircularProgressIndicator`，它们都可以同时用于精确的进度指示和模糊的进度指示。精确进度通常用于任务进度可以计算和预估的情况，比如文件下载；而模糊进度则用户任务进度无法准确获得的情况，如下拉刷新，数据提交等。

### [#](https://book.flutterchina.club/chapter3/progress.html#linearprogressindicator)LinearProgressIndicator

`LinearProgressIndicator`是一个线性、条状的进度条，定义如下：

```dart
LinearProgressIndicator({
  double value,
  Color backgroundColor,
  Animation<Color> valueColor,
  ...
})
```

- `value`：`value`表示当前的进度，取值范围为[0,1]；如果`value`为`null`时则指示器会执行一个循环动画（模糊进度）；当`value`不为`null`时，指示器为一个具体进度的进度条。
- `backgroundColor`：指示器的背景色。
- `valueColor`: 指示器的进度条颜色；值得注意的是，该值类型是`Animation<Color>`，这允许我们对进度条的颜色也可以指定动画。如果我们不需要对进度条颜色执行动画，换言之，我们想对进度条应用一种固定的颜色，此时我们可以通过`AlwaysStoppedAnimation`来指定。

### [#](https://book.flutterchina.club/chapter3/progress.html#示例)示例

```dart
// 模糊进度条(会执行一个动画)
LinearProgressIndicator(
  backgroundColor: Colors.grey[200],
  valueColor: AlwaysStoppedAnimation(Colors.blue),
),
//进度条显示50%
LinearProgressIndicator(
  backgroundColor: Colors.grey[200],
  valueColor: AlwaysStoppedAnimation(Colors.blue),
  value: .5, 
)
```

运行效果如图3-25所示：

![图3-25](data:image/png;base64,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)

第一个进度条在执行循环动画：蓝色条一直在移动，而第二个进度条是静止的，停在50%的位置。

### [#](https://book.flutterchina.club/chapter3/progress.html#circularprogressindicator)CircularProgressIndicator

`CircularProgressIndicator`是一个圆形进度条，定义如下：

```dart
 CircularProgressIndicator({
  double value,
  Color backgroundColor,
  Animation<Color> valueColor,
  this.strokeWidth = 4.0,
  ...   
}) 
```

前三个参数和`LinearProgressIndicator`相同，不再赘述。`strokeWidth` 表示圆形进度条的粗细。示例如下：

```dart
// 模糊进度条(会执行一个旋转动画)
CircularProgressIndicator(
  backgroundColor: Colors.grey[200],
  valueColor: AlwaysStoppedAnimation(Colors.blue),
),
//进度条显示50%，会显示一个半圆
CircularProgressIndicator(
  backgroundColor: Colors.grey[200],
  valueColor: AlwaysStoppedAnimation(Colors.blue),
  value: .5,
),
```

运行效果如图3-26所示：

![图3-26](data:image/png;base64,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)

第一个进度条会执行旋转动画，而第二个进度条是静止的，它停在50%的位置。

### [#](https://book.flutterchina.club/chapter3/progress.html#自定义尺寸)自定义尺寸

我们可以发现`LinearProgressIndicator`和`CircularProgressIndicator`，并没有提供设置圆形进度条尺寸的参数；如果我们希望`LinearProgressIndicator`的线细一些，或者希望`CircularProgressIndicator`的圆大一些该怎么做？

其实`LinearProgressIndicator`和`CircularProgressIndicator`都是取父容器的尺寸作为绘制的边界的。知道了这点，我们便可以通过尺寸限制类Widget，如`ConstrainedBox`、`SizedBox` （我们将在后面容器类组件一章中介绍）来指定尺寸，如：

```dart
// 线性进度条高度指定为3
SizedBox(
  height: 3,
  child: LinearProgressIndicator(
    backgroundColor: Colors.grey[200],
    valueColor: AlwaysStoppedAnimation(Colors.blue),
    value: .5,
  ),
),
// 圆形进度条直径指定为100
SizedBox(
  height: 100,
  width: 100,
  child: CircularProgressIndicator(
    backgroundColor: Colors.grey[200],
    valueColor: AlwaysStoppedAnimation(Colors.blue),
    value: .7,
  ),
),
```

运行效果如图3-27所示：

![图3-27](https://book.flutterchina.club/assets/img/3-27.11e62a02.png)

注意，如果`CircularProgressIndicator`显示空间的宽高不同，则会显示为椭圆。如：

```dart
// 宽高不等
SizedBox(
  height: 100,
  width: 130,
  child: CircularProgressIndicator(
    backgroundColor: Colors.grey[200],
    valueColor: AlwaysStoppedAnimation(Colors.blue),
    value: .7,
  ),
),
```

运行效果如图3-28所示：

![3-28](https://book.flutterchina.club/assets/img/3-28.4912d1a4.png)

### [#](https://book.flutterchina.club/chapter3/progress.html#进度色动画)进度色动画

前面说过可以通过`valueColor`对进度条颜色做动画，关于动画我们将在后面专门的章节详细介绍，这里先给出一个例子，读者在了解了Flutter动画一章后再回过头来看。

我们实现一个进度条在3秒内从灰色变成蓝色的动画：

```dart
import 'package:flutter/material.dart';

class ProgressRoute extends StatefulWidget {
  @override
  _ProgressRouteState createState() => _ProgressRouteState();
}

class _ProgressRouteState extends State<ProgressRoute>
    with SingleTickerProviderStateMixin {
  AnimationController _animationController;

  @override
  void initState() {
    //动画执行时间3秒  
    _animationController =
        AnimationController(vsync: this, duration: Duration(seconds: 3));
    _animationController.forward();
    _animationController.addListener(() => setState(() => {}));
    super.initState();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
            Padding(
            padding: EdgeInsets.all(16),
            child: LinearProgressIndicator(
              backgroundColor: Colors.grey[200],
              valueColor: ColorTween(begin: Colors.grey, end: Colors.blue)
                .animate(_animationController), // 从灰色变成蓝色
              value: _animationController.value,
            ),
          );
        ],
      ),
    );
  }
}
```

### [#](https://book.flutterchina.club/chapter3/progress.html#自定义进度指示器样式)自定义进度指示器样式

定制进度指示器风格样式，可以通过`CustomPainter` Widget 来自定义绘制逻辑，实际上`LinearProgressIndicator`和`CircularProgressIndicator`也正是通过`CustomPainter`来实现外观绘制的。关于`CustomPainter`，我们将在后面“自定义Widget”一章中详细介绍。

## 4.2 布局原理与约束（constraints）

尺寸限制类容器用于限制容器大小，Flutter中提供了多种这样的容器，如`ConstrainedBox`、`SizedBox`、`UnconstrainedBox`、`AspectRatio` 等，本节将介绍一些常用的。

Flutter 中有两种布局模型：

- 基于 RenderBox 的盒模型布局。
- 基于 Sliver ( RenderSliver ) 按需加载列表布局。

两种布局方式在细节上略有差异，但大体流程相同，布局流程如下：

1. 上层组件向下层组件传递约束（constraints）条件。
2. 下层组件确定自己的大小，然后告诉上层组件。注意下层组件的大小必须符合父组件的约束。
3. 上层组件确定下层组件相对于自身的偏移和确定自身的大小（大多数情况下会根据子组件的大小来确定自身的大小）。

比如，父组件传递给子组件的约束是“最大宽高不能超过100，最小宽高为0”，如果我们给子组件设置宽高都为200，则子组件最终的大小是100*100，**因为任何时候子组件都必须先遵守父组件的约束**，在此基础上再应用子组件约束（相当于父组件的约束和自身的大小求一个交集）。

本节我们主要看一下盒模型布局，然后会在可滚动组件一章中介绍 Sliver 布局模型。盒模型布局组件有两个特点：

1. 组件对应的渲染对象都继承自 RenderBox 类。在本书后面文章中如果提到某个组件是 RenderBox，则指它是基于盒模型布局的，而不是说组件是 RenderBox 类的实例。
2. 在布局过程中父级传递给子级的约束信息由 BoxConstraints 描述。

### [#](https://book.flutterchina.club/chapter4/constraints.html#_4-2-1-boxconstraints)4.2.1 BoxConstraints

BoxConstraints 是盒模型布局过程中父渲染对象传递给子渲染对象的约束信息，包含最大宽高信息，子组件大小需要在约束的范围内，BoxConstraints 默认的构造函数如下：

```dart
const BoxConstraints({
  this.minWidth = 0.0, //最小宽度
  this.maxWidth = double.infinity, //最大宽度
  this.minHeight = 0.0, //最小高度
  this.maxHeight = double.infinity //最大高度
})
```

它包含 4 个属性，BoxConstraints还定义了一些便捷的构造函数，用于快速生成特定限制规则的BoxConstraints，如`BoxConstraints.tight(Size size)`，它可以生成固定宽高的限制；`BoxConstraints.expand()`可以生成一个尽可能大的用以填充另一个容器的BoxConstraints。除此之外还有一些其它的便捷函数，读者可以查看类定义。另外我们会在后面深入介绍布局原理时还会讨论 Constraints，在这里，读者只需知道父级组件是通过 BoxConstraints 来描述对子组件可用的空间范围即可。

> 约定：为了描述方便，如果我们说一个组件不约束其子组件或者取消对子组件约束时是指对子组件约束的最大宽高为无限大，而最小宽高为0，相当于子组件完全可以自己根据需要的空间来确定自己的大小。

下面我们介绍一些常用的通过约束限制子组件大小的组件。

### 4.2.2 ConstrainedBox

`ConstrainedBox`用于对子组件添加额外的约束。例如，如果你想让子组件的最小高度是80像素，你可以使用`const BoxConstraints(minHeight: 80.0)`作为子组件的约束。

#### [#](https://book.flutterchina.club/chapter4/constraints.html#示例)示例

我们先定义一个`redBox`，它是一个背景颜色为红色的盒子，不指定它的宽度和高度：

```dart
Widget redBox = DecoratedBox(
  decoration: BoxDecoration(color: Colors.red),
);
```

我们实现一个最小高度为50，宽度尽可能大的红色容器。

```dart
ConstrainedBox(
  constraints: BoxConstraints(
    minWidth: double.infinity, //宽度尽可能大
    minHeight: 50.0 //最小高度为50像素
  ),
  child: Container(
    height: 5.0, 
    child: redBox ,
  ),
)
```

运行效果如图4-1所示：

![图4-1](https://book.flutterchina.club/assets/img/4-1.40b01667.png)

可以看到，我们虽然将Container的高度设置为5像素，但是最终却是50像素，这正是ConstrainedBox的最小高度限制生效了。如果将Container的高度设置为80像素，那么最终红色区域的高度也会是80像素，因为在此示例中，ConstrainedBox只限制了最小高度，并未限制最大高度。

### [#](https://book.flutterchina.club/chapter4/constraints.html#_4-2-3-sizedbox)4.2.3 SizedBox

`SizedBox`用于给子元素指定固定的宽高，如：

```dart
SizedBox(
  width: 80.0,
  height: 80.0,
  child: redBox
)
```

运行效果如图4-2所示：

![图4-2](data:image/png;base64,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)

实际上`SizedBox`只是`ConstrainedBox`的一个定制，上面代码等价于：

```dart
ConstrainedBox(
  constraints: BoxConstraints.tightFor(width: 80.0,height: 80.0),
  child: redBox, 
)
```

而`BoxConstraints.tightFor(width: 80.0,height: 80.0)`等价于：

```dart
BoxConstraints(minHeight: 80.0,maxHeight: 80.0,minWidth: 80.0,maxWidth: 80.0)
```

而实际上`ConstrainedBox`和`SizedBox`都是通过`RenderConstrainedBox`来渲染的，我们可以看到`ConstrainedBox`和`SizedBox`的`createRenderObject()`方法都返回的是一个`RenderConstrainedBox`对象：

```dart
@override
RenderConstrainedBox createRenderObject(BuildContext context) {
  return RenderConstrainedBox(
    additionalConstraints: ...,
  );
}
```

### 4.2.4 多重限制

如果某一个组件有多个父级`ConstrainedBox`限制，那么最终会是哪个生效？我们看一个例子：

```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: 60.0, minHeight: 60.0), //父
  child: ConstrainedBox(
    constraints: BoxConstraints(minWidth: 90.0, minHeight: 20.0),//子
    child: redBox,
  ),
)
```

上面我们有父子两个`ConstrainedBox`，他们的约束条件不同，运行后效果如图4-3所示：

![图4-3](data:image/png;base64,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)

最终显示效果是宽90，高60，也就是说是子`ConstrainedBox`的`minWidth`生效，而`minHeight`是父`ConstrainedBox`生效。单凭这个例子，我们还总结不出什么规律，我们将上例中父子约束条件换一下：

```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: 90.0, minHeight: 20.0),
  child: ConstrainedBox(
    constraints: BoxConstraints(minWidth: 60.0, minHeight: 60.0),
    child: redBox,
  )
)
```

运行效果如图4-4所示：

![图4-4](data:image/png;base64,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)

最终的显示效果仍然是90，高60，效果相同，但意义不同，因为此时`minWidth`生效的是父`ConstrainedBox`，而`minHeight`是子`ConstrainedBox`生效。

通过上面示例，我们发现有多重限制时，对于`minWidth`和`minHeight`来说，**是取父子中相应数值较大的**。实际上，只有这样才能保证父限制与子限制不冲突。

> 思考题：对于`maxWidth`和`maxHeight`，多重限制的策略是什么样的呢？**取父子中相应数值较小的**。

### 4.2.5 UnconstrainedBox

虽然任何时候子组件都必须遵守其父组件的约束，但前提条件是它们必须是父子关系，假如有一个组件 A，它的子组件是B，B 的子组件是 C，则 C 必须遵守 B 的约束，同时 B 必须遵守 A 的约束，但是 A 的约束不会直接约束到 C，除非B将A对它自己的约束透传给了C。 利用这个原理，就可以实现一个这样的 B 组件：

1. B 组件中在布局 C 时不约束C（可以为无限大）。
2. C 根据自身真实的空间占用来确定自身的大小。
3. B 在遵守 A 的约束前提下结合子组件的大小确定自身大小。

而这个 B组件就是 `UnconstrainedBox` 组件，也就是说`UnconstrainedBox` 的子组件将不再受到约束，大小完全取决于自己。一般情况下，我们会很少直接使用此组件，但在"去除"多重限制的时候也许会有帮助，我们看下下面的代码：

```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: 60.0, minHeight: 100.0),  //父
  child: UnconstrainedBox( //“去除”父级限制
    child: ConstrainedBox(
      constraints: BoxConstraints(minWidth: 90.0, minHeight: 20.0),//子
      child: redBox,
    ),
  )
)
```

上面代码中，如果没有中间的`UnconstrainedBox`，那么根据上面所述的多重限制规则，那么最终将显示一个90×100的红色框。但是由于`UnconstrainedBox` “去除”了父`ConstrainedBox`的限制，则最终会按照子`ConstrainedBox`的限制来绘制`redBox`，即90×20，如图4-5所示：

![图4-5](data:image/png;base64,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)

但是，读者请注意，`UnconstrainedBox`对父组件限制的“去除”并非是真正的去除：上面例子中虽然红色区域大小是90×20，但上方仍然有80的空白空间。也就是说父限制的`minHeight`(100.0)仍然是生效的，只不过它不影响最终子元素`redBox`的大小，但仍然还是占有相应的空间，可以认为此时的父`ConstrainedBox`是作用于子`UnconstrainedBox`上，而`redBox`只受子`ConstrainedBox`限制，这一点请读者务必注意。

那么有什么方法可以彻底去除父`ConstrainedBox`的限制吗？答案是否定的！请牢记，**任何时候子组件都必须遵守其父组件的约束**，所以在此提示读者，在定义一个通用的组件时，如果要对子组件指定约束，那么一定要注意，因为一旦指定约束条件，子组件自身就不能违反约束。

在实际开发中，当我们发现已经使用 `SizedBox` 或 `ConstrainedBox`给子元素指定了固定宽高，但是仍然没有效果时，几乎可以断定：已经有父组件指定了约束！举个例子，如 Material 组件库中的`AppBar`（导航栏）的右侧菜单中，我们使用`SizedBox`指定了 loading 按钮的大小，代码如下：

```dart
 AppBar(
   title: Text(title),
   actions: <Widget>[
     SizedBox(
       width: 20, 
       height: 20,
       child: CircularProgressIndicator(
         strokeWidth: 3,
         valueColor: AlwaysStoppedAnimation(Colors.white70),
       ),
     )
   ],
)
```

上面代码运行后，效果如图4-6所示：

![图4-6](https://book.flutterchina.club/assets/img/4-6.27479289.png)

我们会发现右侧loading按钮大小并没有发生变化！这正是因为`AppBar`中已经指定了`actions`按钮的约束条件，所以我们要自定义loading按钮大小，就必须通过`UnconstrainedBox`来 “去除” 父元素的限制，代码如下：

```dart
AppBar(
  title: Text(title),
  actions: <Widget>[
    UnconstrainedBox(
      child: SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(
          strokeWidth: 3,
          valueColor: AlwaysStoppedAnimation(Colors.white70),
        ),
      ),
    )
  ],
)
```

运行后效果如图4-7所示：

![图4-7](https://book.flutterchina.club/assets/img/4-7.5b913c51.png)

生效了！实际上将 UnconstrainedBox 换成 Center 或者 Align 也是可以的，至于为什么，我们会在本书后面布局原理相关的章节中解释。

另外，需要注意，UnconstrainedBox 虽然在其子组件布局时可以取消约束（子组件可以为无限大），但是 UnconstrainedBox 自身是受其父组件约束的，所以当 UnconstrainedBox 随着其子组件变大后，**如果UnconstrainedBox 的大小超过它父组件约束时，也会导致溢出报错**，比如：

```dart
Column(
  children: <Widget>[
    UnconstrainedBox(
      alignment: Alignment.topLeft,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(children: [Text('xx' * 30)]),
      ),
    ),
 ]
```

运行效果如图4-8：

![图4-8](https://book.flutterchina.club/assets/img/4-8.cf2d7176.png)

文本已经超过屏幕宽度，溢出了。

### 4.2.6 其它约束类容器

除了上面介绍的这些常用的尺寸限制类容器外，还有一些其他的尺寸限制类容器，比如`AspectRatio`，它可以指定子组件的长宽比、`LimitedBox` 用于指定最大宽高、`FractionallySizedBox` 可以根据父容器宽高的百分比来设置子组件宽高等，由于这些容器使用起来都比较简单，我们便不再赘述，读者可以自行了解。

## 5.2 装饰容器DecoratedBox

`DecoratedBox`可以在其子组件绘制前(或后)绘制一些装饰（Decoration），如背景、边框、渐变等。`DecoratedBox`定义如下：

```dart
const DecoratedBox({
  Decoration decoration,
  DecorationPosition position = DecorationPosition.background,
  Widget? child
})
```

- `decoration`：代表将要绘制的装饰，它的类型为`Decoration`。`Decoration`是一个抽象类，它定义了一个接口 `createBoxPainter()`，子类的主要职责是需要通过实现它来创建一个画笔，该画笔用于绘制装饰。
- position此属性决定在哪里绘制
- Decoration它接收DecorationPosition的枚举类型，该枚举类有两个值：
  - `background`：在子组件之后绘制，即背景装饰。
  - `foreground`：在子组件之上绘制，即前景。

### [#](https://book.flutterchina.club/chapter5/decoratedbox.html#boxdecoration)BoxDecoration

我们通常会直接使用`BoxDecoration`类，它是一个Decoration的子类，实现了常用的装饰元素的绘制。

```dart
BoxDecoration({
  Color color, //颜色
  DecorationImage image,//图片
  BoxBorder border, //边框
  BorderRadiusGeometry borderRadius, //圆角
  List<BoxShadow> boxShadow, //阴影,可以指定多个
  Gradient gradient, //渐变
  BlendMode backgroundBlendMode, //背景混合模式
  BoxShape shape = BoxShape.rectangle, //形状
})
```

各个属性名都是自解释的，详情读者可以查看API文档。下面我们实现一个带阴影的背景色渐变的按钮：

```dart
 DecoratedBox(
   decoration: BoxDecoration(
     gradient: LinearGradient(colors:[Colors.red,Colors.orange.shade700]), //背景渐变
     borderRadius: BorderRadius.circular(3.0), //3像素圆角
     boxShadow: [ //阴影
       BoxShadow(
         color:Colors.black54,
         offset: Offset(2.0,2.0),
         blurRadius: 4.0
       )
     ]
   ),
  child: Padding(
    padding: EdgeInsets.symmetric(horizontal: 80.0, vertical: 18.0),
    child: Text("Login", style: TextStyle(color: Colors.white),),
  )
)
```

运行后效果如图5-2所示：

![图5-2](https://book.flutterchina.club/assets/img/5-2.47017753.png)

通过`BoxDecoration`我们实现了一个渐变按钮的外观，但此示例还不是一个标准的按钮，因为它还不能响应点击事件，我们将在后面“自定义组件”一章中实现一个完整功能的`GradientButton`。另外，上面的例子中使用了`LinearGradient`类，它用于定义线性渐变的类，Flutter中还提供了其它渐变配置类，如`RadialGradient`、`SweepGradient`，读者若有需要可以自行查看API文档。

## 6.3.6 实例：无限加载列表

假设我们要从数据源异步分批拉取一些数据，然后用`ListView`展示，当我们滑动到列表末尾时，判断是否需要再去拉取数据，如果是，则去拉取，拉取过程中在表尾显示一个loading，拉取成功后将数据插入列表；如果不需要再去拉取，则在表尾提示"没有更多"。代码如下：

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'package:flutter/rendering.dart';

class InfiniteListView extends StatefulWidget {
  @override
  _InfiniteListViewState createState() => _InfiniteListViewState();
}

class _InfiniteListViewState extends State<InfiniteListView> {
  static const loadingTag = "##loading##"; //表尾标记
  var _words = <String>[loadingTag];

  @override
  void initState() {
    super.initState();
    _retrieveData();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: _words.length,
      itemBuilder: (context, index) {
        //如果到了表尾
        if (_words[index] == loadingTag) {
          //不足100条，继续获取数据
          if (_words.length - 1 < 100) {
            //获取数据
            _retrieveData();
            //加载时显示loading
            return Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.center,
              child: SizedBox(
                width: 24.0,
                height: 24.0,
                child: CircularProgressIndicator(strokeWidth: 2.0),
              ),
            );
          } else {
            //已经加载了100条数据，不再获取数据。
            return Container(
              alignment: Alignment.center,
              padding: EdgeInsets.all(16.0),
              child: Text(
                "没有更多了",
                style: TextStyle(color: Colors.grey),
              ),
            );
          }
        }
        //显示单词列表项
        return ListTile(title: Text(_words[index]));
      },
      separatorBuilder: (context, index) => Divider(height: .0),
    );
  }

  void _retrieveData() {
    Future.delayed(Duration(seconds: 2)).then((e) {
      setState(() {
        //重新构建列表
        _words.insertAll(
          _words.length - 1,
          //每次生成20个单词
          generateWordPairs().take(20).map((e) => e.asPascalCase).toList(),
        );
      });
    });
  }
}
```

运行后效果如图6-5、6-6所示：

![图6-5](https://book.flutterchina.club/assets/img/6-5.288d3ff1.png) ![图6-6](https://book.flutterchina.club/assets/img/6-6.2947b7f7.png)

代码比较简单，读者可以参照代码中的注释理解，故不再赘述。需要说明的是，`_retrieveData()`的功能是模拟从数据源异步获取数据，我们使用english_words包的`generateWordPairs()`方法每次生成20个单词。

### 添加固定列表头

很多时候我们需要给列表添加一个固定表头，比如我们想实现一个商品列表，需要在列表顶部添加一个“商品列表”标题，期望的效果如图 6-7 所示：

![图6-7](https://book.flutterchina.club/assets/img/6-7.e48bfae5.png)

我们按照之前经验，写出如下代码：

```dart
@override
Widget build(BuildContext context) {
  return Column(children: <Widget>[
    ListTile(title:Text("商品列表")),
    ListView.builder(itemBuilder: (BuildContext context, int index) {
        return ListTile(title: Text("$index"));
    }),
  ]);
}
```

然后运行，发现并没有出现我们期望的效果，相反触发了一个异常；

```text
Error caught by rendering library, thrown during performResize()。
Vertical viewport was given unbounded height ...
```

从异常信息中我们可以看到是因为`ListView`高度边界无法确定引起，所以解决的办法也很明显，我们需要给`ListView`指定边界，我们通过`SizedBox`指定一个列表高度看看是否生效：

```dart
... //省略无关代码
SizedBox(
  height: 400, //指定列表高度为400
  child: ListView.builder(
    itemBuilder: (BuildContext context, int index) {
      return ListTile(title: Text("$index"));
    },
  ),
),
...
```

运行效果如图6-8所示：

![图6-8](https://book.flutterchina.club/assets/img/6-8.c443522f.png)

可以看到，现在没有触发异常并且列表已经显示出来了，但是我们的手机屏幕高度要大于 400，所以底部会有一些空白。那如果我们要实现列表铺满除表头以外的屏幕空间应该怎么做？直观的方法是我们去动态计算，用屏幕高度减去状态栏、导航栏、表头的高度即为剩余屏幕高度，代码如下：

```dart
... //省略无关代码
SizedBox(
  //Material设计规范中状态栏、导航栏、ListTile高度分别为24、56、56 
  height: MediaQuery.of(context).size.height-24-56-56,
  child: ListView.builder(itemBuilder: (BuildContext context, int index) {
    return ListTile(title: Text("$index"));
  }),
)
...    
```

运行效果如下图6-9所示：

![图6-9](https://book.flutterchina.club/assets/img/6-9.e48bfae5.png)

可以看到，我们期望的效果实现了，但是这种方法并不优雅，如果页面布局发生变化，比如表头布局调整导致表头高度改变，那么剩余空间的高度就得重新计算。那么有什么方法可以自动拉伸`ListView`以填充屏幕剩余空间的方法吗？当然有！答案就是`Flex`。前面已经介绍过在弹性布局中，可以使用`Expanded`自动拉伸组件大小，并且我们也说过`Column`是继承自`Flex`的，所以我们可以直接使用`Column` + `Expanded`来实现，代码如下：

```dart
@override
Widget build(BuildContext context) {
  return Column(children: <Widget>[
    ListTile(title:Text("商品列表")),
    Expanded(
      child: ListView.builder(itemBuilder: (BuildContext context, int index) {
        return ListTile(title: Text("$index"));
      }),
    ),
  ]);
}
```

运行后，和上图一样，完美实现了！

## 6.4 滚动监听及控制

在前几节中，我们介绍了Flutter中常用的可滚动组件，也说过可以用`ScrollController`来控制可滚动组件的滚动位置，本节先介绍一下`ScrollController`，然后以`ListView`为例，展示一下`ScrollController`的具体用法。最后，再介绍一下路由切换时如何来保存滚动位置。

### [#](https://book.flutterchina.club/chapter6/scroll_controller.html#_6-4-1-scrollcontroller)6.4.1 ScrollController

`ScrollController`构造函数如下：

```dart
ScrollController({
  double initialScrollOffset = 0.0, //初始滚动位置
  this.keepScrollOffset = true,//是否保存滚动位置
  ...
})
```

我们介绍一下`ScrollController`常用的属性和方法：

- `offset`：可滚动组件当前的滚动位置。
- `jumpTo(double offset)`、`animateTo(double offset,...)`：这两个方法用于跳转到指定的位置，它们不同之处在于，后者在跳转时会执行一个动画，而前者不会。

`ScrollController`还有一些属性和方法，我们将在后面原理部分解释。

#### [#](https://book.flutterchina.club/chapter6/scroll_controller.html#滚动监听)滚动监听

`ScrollController`间接继承自`Listenable`，我们可以根据`ScrollController`来监听滚动事件，如：

```dart
controller.addListener(()=>print(controller.offset))
```

### [#](https://book.flutterchina.club/chapter6/scroll_controller.html#示例)示例

我们创建一个`ListView`，当滚动位置发生变化时，我们先打印出当前滚动位置，然后判断当前位置是否超过1000像素，如果超过则在屏幕右下角显示一个“返回顶部”的按钮，该按钮点击后可以使ListView恢复到初始位置；如果没有超过1000像素，则隐藏“返回顶部”按钮。代码如下：

```dart
class ScrollControllerTestRoute extends StatefulWidget {
  @override
  ScrollControllerTestRouteState createState() {
    return ScrollControllerTestRouteState();
  }
}

class ScrollControllerTestRouteState extends State<ScrollControllerTestRoute> {
  ScrollController _controller = ScrollController();
  bool showToTopBtn = false; //是否显示“返回到顶部”按钮

  @override
  void initState() {
    super.initState();
    //监听滚动事件，打印滚动位置
    _controller.addListener(() {
      print(_controller.offset); //打印滚动位置
      if (_controller.offset < 1000 && showToTopBtn) {
        setState(() {
          showToTopBtn = false;
        });
      } else if (_controller.offset >= 1000 && showToTopBtn == false) {
        setState(() {
          showToTopBtn = true;
        });
      }
    });
  }

  @override
  void dispose() {
    //为了避免内存泄露，需要调用_controller.dispose
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("滚动控制")),
      body: Scrollbar(
        child: ListView.builder(
          itemCount: 100,
          itemExtent: 50.0, //列表项高度固定时，显式指定高度是一个好习惯(性能消耗小)
          controller: _controller,
          itemBuilder: (context, index) {
            return ListTile(title: Text("$index"),);
          }
        ),
      ),
      floatingActionButton: !showToTopBtn ? null : FloatingActionButton(
        child: Icon(Icons.arrow_upward),
        onPressed: () {
          //返回到顶部时执行动画
          _controller.animateTo(
            .0,
            duration: Duration(milliseconds: 200),
            curve: Curves.ease,
          );
        }
      ),
    );
  }
}
```

代码说明已经包含在注释里，运行效果如图6-10、6-11所示：

![图6-10](https://book.flutterchina.club/assets/img/6-10.1b612437.png)![图6-11](https://book.flutterchina.club/assets/img/6-11.00ac68b6.png)

由于列表项高度为 50 像素，当滑动到第 20 个列表项后，右下角 “返回顶部” 按钮会显示，点击该按钮，ListView 会在返回顶部的过程中执行一个滚动动画，动画时间是 200 毫秒，动画曲线是 `Curves.ease`，关于动画的详细内容我们将在后面“动画”一章中详细介绍。

### 滚动位置恢复

`PageStorage`是一个用于保存页面(路由)相关数据的组件，它并不会影响子树的UI外观，其实，`PageStorage`是一个功能型组件，它拥有一个存储桶（bucket），子树中的Widget可以通过指定不同的`PageStorageKey`来存储各自的数据或状态。

每次滚动结束，可滚动组件都会将滚动位置`offset`存储到`PageStorage`中，当可滚动组件重新创建时再恢复。如果`ScrollController.keepScrollOffset`为`false`，则滚动位置将不会被存储，可滚动组件重新创建时会使用`ScrollController.initialScrollOffset`；`ScrollController.keepScrollOffset`为`true`时，可滚动组件在**第一次**创建时，会滚动到`initialScrollOffset`处，因为这时还没有存储过滚动位置。在接下来的滚动中就会存储、恢复滚动位置，而`initialScrollOffset`会被忽略。

当一个路由中包含多个可滚动组件时，如果你发现在进行一些跳转或切换操作后，滚动位置不能正确恢复，这时你可以通过显式指定`PageStorageKey`来分别跟踪不同的可滚动组件的位置，如：

```dart
ListView(key: PageStorageKey(1), ... );
...
ListView(key: PageStorageKey(2), ... );
```

不同的`PageStorageKey`，需要不同的值，这样才可以为不同可滚动组件保存其滚动位置。

> 注意：一个路由中包含多个可滚动组件时，如果要分别跟踪它们的滚动位置，并非一定就得给他们分别提供`PageStorageKey`。这是因为Scrollable本身是一个StatefulWidget，它的状态中也会保存当前滚动位置，所以，只要可滚动组件本身没有被从树上detach掉，那么其State就不会销毁(dispose)，滚动位置就不会丢失。只有当Widget发生结构变化，导致可滚动组件的State销毁或重新构建时才会丢失状态，这种情况就需要显式指定`PageStorageKey`，通过`PageStorage`来存储滚动位置，一个典型的场景是在使用`TabBarView`时，在Tab发生切换时，Tab页中的可滚动组件的State就会销毁，这时如果想恢复滚动位置就需要指定`PageStorageKey`。

### ScrollPosition

ScrollPosition是用来保存可滚动组件的滚动位置的。一个`ScrollController`对象可以同时被多个可滚动组件使用，`ScrollController`会为每一个可滚动组件创建一个`ScrollPosition`对象，这些`ScrollPosition`保存在`ScrollController`的`positions`属性中（`List<ScrollPosition>`）。`ScrollPosition`是真正保存滑动位置信息的对象，`offset`只是一个便捷属性：

```dart
double get offset => position.pixels;
```

一个`ScrollController`虽然可以对应多个可滚动组件，但是有一些操作，如读取滚动位置`offset`，则需要一对一！但是我们仍然可以在一对多的情况下，通过其它方法读取滚动位置，举个例子，假设一个`ScrollController`同时被两个可滚动组件使用，那么我们可以通过如下方式分别读取他们的滚动位置：

```dart
...
controller.positions.elementAt(0).pixels
controller.positions.elementAt(1).pixels
...    
```

我们可以通过`controller.positions.length`来确定`controller`被几个可滚动组件使用。

#### [#](https://book.flutterchina.club/chapter6/scroll_controller.html#scrollposition的方法)ScrollPosition的方法

`ScrollPosition`有两个常用方法：`animateTo()` 和 `jumpTo()`，它们是真正来控制跳转滚动位置的方法，`ScrollController`的这两个同名方法，内部最终都会调用`ScrollPosition`的。

### ScrollController控制原理

我们来介绍一下`ScrollController`的另外三个方法：

```dart
ScrollPosition createScrollPosition(
    ScrollPhysics physics,
    ScrollContext context,
    ScrollPosition oldPosition);
void attach(ScrollPosition position) ;
void detach(ScrollPosition position) ;
```

当`ScrollController`和可滚动组件关联时，可滚动组件首先会调用`ScrollController`的`createScrollPosition()`方法来创建一个`ScrollPosition`来存储滚动位置信息，接着，可滚动组件会调用`attach()`方法，将创建的`ScrollPosition`添加到`ScrollController`的`positions`属性中，这一步称为“注册位置”，只有注册后`animateTo()` 和 `jumpTo()`才可以被调用。

当可滚动组件销毁时，会调用`ScrollController`的`detach()`方法，将其`ScrollPosition`对象从`ScrollController`的`positions`属性中移除，这一步称为“注销位置”，注销后`animateTo()` 和 `jumpTo()` 将不能再被调用。

需要注意的是，`ScrollController`的`animateTo()` 和 `jumpTo()`内部会调用所有`ScrollPosition`的`animateTo()` 和 `jumpTo()`，以实现所有和该`ScrollController`关联的可滚动组件都滚动到指定的位置。

### 6.4.2 滚动监听

Flutter Widget树中子Widget可以通过发送通知（Notification）与父(包括祖先)Widget通信。父级组件可以通过`NotificationListener`组件来监听自己关注的通知，这种通信方式类似于Web开发中浏览器的事件冒泡，我们在Flutter中沿用“冒泡”这个术语，关于通知冒泡我们将在后面“事件处理与通知”一章中详细介绍。

可滚动组件在滚动时会发送`ScrollNotification`类型的通知，`ScrollBar`正是通过监听滚动通知来实现的。通过`NotificationListener`监听滚动事件和通过`ScrollController`有两个主要的不同：

1. 通过NotificationListener可以在从可滚动组件到widget树根之间任意位置都能监听。而`ScrollController`只能和具体的可滚动组件关联后才可以。
2. 收到滚动事件后获得的信息不同；`NotificationListener`在收到滚动事件时，通知中会携带当前滚动位置和ViewPort的一些信息，而`ScrollController`只能获取当前滚动位置。

### [#](https://book.flutterchina.club/chapter6/scroll_controller.html#示例-2)示例

下面，我们监听`ListView`的滚动通知，然后显示当前滚动进度百分比：

```dart
import 'package:flutter/material.dart';

class ScrollNotificationTestRoute extends StatefulWidget {
  @override
  _ScrollNotificationTestRouteState createState() =>
      _ScrollNotificationTestRouteState();
}

class _ScrollNotificationTestRouteState
    extends State<ScrollNotificationTestRoute> {
  String _progress = "0%"; //保存进度百分比

  @override
  Widget build(BuildContext context) {
    return Scrollbar(
      //进度条
      // 监听滚动通知
      child: NotificationListener<ScrollNotification>(
        onNotification: (ScrollNotification notification) {
          double progress = notification.metrics.pixels /
              notification.metrics.maxScrollExtent;
          //重新构建
          setState(() {
            _progress = "${(progress * 100).toInt()}%";
          });
          print("BottomEdge: ${notification.metrics.extentAfter == 0}");
          return false;
          //return true; //放开此行注释后，进度条将失效
        },
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            ListView.builder(
              itemCount: 100,
              itemExtent: 50.0,
              itemBuilder: (context, index) => ListTile(title: Text("$index")),
            ),
            CircleAvatar(
              //显示进度百分比
              radius: 30.0,
              child: Text(_progress),
              backgroundColor: Colors.black54,
            )
          ],
        ),
      ),
    );
  }
}
```

运行结果如图6-12所示：

![图6-12](https://book.flutterchina.club/assets/img/6-12.20d0839c.png)

在接收到滚动事件时，参数类型为`ScrollNotification`，它包括一个`metrics`属性，它的类型是`ScrollMetrics`，该属性包含当前ViewPort及滚动位置等信息：

- `pixels`：当前滚动位置。
- `maxScrollExtent`：最大可滚动长度。
- `extentBefore`：滑出ViewPort顶部的长度；此示例中相当于顶部滑出屏幕上方的列表长度。
- `extentInside`：ViewPort内部长度；此示例中屏幕显示的列表部分的长度。
- `extentAfter`：列表中未滑入ViewPort部分的长度；此示例中列表底部未显示到屏幕范围部分的长度。
- `atEdge`：是否滑到了可滚动组件的边界（此示例中相当于列表顶或底部）。

ScrollMetrics还有一些其它属性，读者可以自行查阅API文档。

## 6.5 AnimatedList

AnimatedList 和 ListView 的功能大体相似，不同的是， AnimatedList 可以在列表中插入或删除节点时执行一个动画，在需要添加或删除列表项的场景中会提高用户体验。

AnimatedList 是一个 StatefulWidget，它对应的 State 类型为 AnimatedListState，添加和删除元素的方法位于 AnimatedListState 中：

```dart
void insertItem(int index, { Duration duration = _kDuration });

void removeItem(int index, AnimatedListRemovedItemBuilder builder, { Duration duration = _kDuration }) ;
```

下面我们看一个示例：实现下面这样的一个列表，点击底部 + 按钮时向列表追加一个列表项；点击每个列表项后面的删除按钮时，删除该列表项，添加和删除时分别执行指定的动画，运行效果如图6-13所示：

![动图6-13](https://book.flutterchina.club/assets/img/6-13.66308a18.gif)

初始的时候有5个列表项，先点击了 + 号按钮，会添加一个 6，添加过程执行渐显动画。然后点击了 4 后面的删除按钮，删除的时候执行了一个渐隐+收缩的合成动画。

下面是实现代码：

```dart
class AnimatedListRoute extends StatefulWidget {
  const AnimatedListRoute({Key? key}) : super(key: key);

  @override
  _AnimatedListRouteState createState() => _AnimatedListRouteState();
}

class _AnimatedListRouteState extends State<AnimatedListRoute> {
  var data = <String>[];
  int counter = 5;

  final globalKey = GlobalKey<AnimatedListState>();

  @override
  void initState() {
    for (var i = 0; i < counter; i++) {
      data.add('${i + 1}');
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        AnimatedList(
          key: globalKey,
          initialItemCount: data.length,
          itemBuilder: (
            BuildContext context,
            int index,
            Animation<double> animation,
          ) {
            //添加列表项时会执行渐显动画
            return FadeTransition(
              opacity: animation,
              child: buildItem(context, index),
            );
          },
        ),
        buildAddBtn(),
      ],
    );
  }

  // 创建一个 “+” 按钮，点击后会向列表中插入一项
  Widget buildAddBtn() {
    return Positioned(
      child: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          // 添加一个列表项
          data.add('${++counter}');
          // 告诉列表项有新添加的列表项
          globalKey.currentState!.insertItem(data.length - 1);
          print('添加 $counter');
        },
      ),
      bottom: 30,
      left: 0,
      right: 0,
    );
  }

  // 构建列表项
  Widget buildItem(context, index) {
    String char = data[index];
    return ListTile(
      //数字不会重复，所以作为Key
      key: ValueKey(char),
      title: Text(char),
      trailing: IconButton(
        icon: Icon(Icons.delete),
        // 点击时删除
        onPressed: () => onDelete(context, index),
      ),
    );
  }

  void onDelete(context, index) {
    // 待实现
  }
}
```

删除的时候需要我们通过AnimatedListState 的 removeItem 方法来应用删除动画，具体逻辑在 onDelete 中：

```dart
setState(() {
  globalKey.currentState!.removeItem(
    index,
    (context, animation) {
      // 删除过程执行的是反向动画，animation.value 会从1变为0
      var item = buildItem(context, index);
      print('删除 ${data[index]}');
      data.removeAt(index);
      // 删除动画是一个合成动画：渐隐 + 缩小列表项告诉
      return FadeTransition(
        opacity: CurvedAnimation(
          parent: animation,
          //让透明度变化的更快一些
          curve: const Interval(0.5, 1.0),
        ),
        // 不断缩小列表项的高度
        child: SizeTransition(
          sizeFactor: animation,
          axisAlignment: 0.0,
          child: item,
        ),
      );
    },
    duration: Duration(milliseconds: 200), // 动画时间为 200 ms
  );
});
```

代码很简单，但我们需要注意，我们的数据是单独在 data 中维护的，调用 AnimatedListState 的插入和移除方法知识相当于一个通知：在什么位置执行插入或移除动画，仍然是数据驱动的（响应式并非命令式）。

## 6.6 GridView

### [#](https://book.flutterchina.club/chapter6/gridview.html#_6-6-1-默认构造函数)6.6.1 默认构造函数

`GridView`可以构建一个二维网格列表，其默认构造函数定义如下：

```dart
  GridView({
    Key? key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController? controller,
    bool? primary,
    ScrollPhysics? physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry? padding,
    required this.gridDelegate,  //下面解释
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    double? cacheExtent, 
    List<Widget> children = const <Widget>[],
    ...
  })
```

我们可以看到，`GridView`和`ListView`的大多数参数都是相同的，它们的含义也都相同的，如有疑惑读者可以翻阅ListView一节，在此不再赘述。我们唯一需要关注的是`gridDelegate`参数，类型是`SliverGridDelegate`，它的作用是控制`GridView`子组件如何排列(layout)。

`SliverGridDelegate`是一个抽象类，定义了`GridView` Layout相关接口，子类需要通过实现它们来实现具体的布局算法。Flutter中提供了两个`SliverGridDelegate`的子类`SliverGridDelegateWithFixedCrossAxisCount`和`SliverGridDelegateWithMaxCrossAxisExtent`，我们可以直接使用，下面我们分别来介绍一下它们。

### [#](https://book.flutterchina.club/chapter6/gridview.html#slivergriddelegatewithfixedcrossaxiscount)SliverGridDelegateWithFixedCrossAxisCount

该子类实现了一个横轴为固定数量子元素的layout算法，其构造函数为：

```dart
SliverGridDelegateWithFixedCrossAxisCount({
  @required double crossAxisCount, 
  double mainAxisSpacing = 0.0,
  double crossAxisSpacing = 0.0,
  double childAspectRatio = 1.0,
})
```

- `crossAxisCount`：横轴子元素的数量。此属性值确定后子元素在横轴的长度就确定了，即ViewPort横轴长度除以`crossAxisCount`的商。
- `mainAxisSpacing`：主轴方向的间距。
- `crossAxisSpacing`：横轴方向子元素的间距。
- `childAspectRatio`：子元素在横轴长度和主轴长度的比例。由于`crossAxisCount`指定后，子元素横轴长度就确定了，然后通过此参数值就可以确定子元素在主轴的长度。

可以发现，子元素的大小是通过`crossAxisCount`和`childAspectRatio`两个参数共同决定的。注意，这里的子元素指的是子组件的最大显示空间，注意确保子组件的实际大小不要超出子元素的空间。

下面看一个例子：

```dart
GridView(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3, //横轴三个子widget
      childAspectRatio: 1.0 //宽高比为1时，子widget
  ),
  children:<Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast)
  ]
);
```

运行效果如图6-14所示：

![图6-14](https://book.flutterchina.club/assets/img/6-14.865c35f8.png)

### [#](https://book.flutterchina.club/chapter6/gridview.html#slivergriddelegatewithmaxcrossaxisextent)SliverGridDelegateWithMaxCrossAxisExtent

该子类实现了一个横轴子元素为固定最大长度的layout算法，其构造函数为：

```dart
SliverGridDelegateWithMaxCrossAxisExtent({
  double maxCrossAxisExtent,
  double mainAxisSpacing = 0.0,
  double crossAxisSpacing = 0.0,
  double childAspectRatio = 1.0,
})
```

`maxCrossAxisExtent`为子元素在横轴上的最大长度，之所以是“最大”长度，是**因为横轴方向每个子元素的长度仍然是等分的**，举个例子，如果ViewPort的横轴长度是450，那么当`maxCrossAxisExtent`的值在区间[450/4，450/3)内的话，子元素最终实际长度都为112.5，而`childAspectRatio`所指的子元素横轴和主轴的长度比为**最终的长度比**。其它参数和`SliverGridDelegateWithFixedCrossAxisCount`相同。

下面我们看一个例子：

```dart
GridView(
  padding: EdgeInsets.zero,
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
      maxCrossAxisExtent: 120.0,
      childAspectRatio: 2.0 //宽高比为2
  ),
  children: <Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast),
  ],
);
```

运行效果如图6-15所示：

![图6-15](https://book.flutterchina.club/assets/img/6-15.202cef73.png)

### 6.6.2 GridView.count

`GridView.count`构造函数内部使用了`SliverGridDelegateWithFixedCrossAxisCount`，我们通过它可以快速的创建横轴固定数量子元素的`GridView`，我们可以通过以下代码实现和上面例子相同的效果等：

```dart
GridView.count( 
  crossAxisCount: 3,
  childAspectRatio: 1.0,
  children: <Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast),
  ],
);
```

### [#](https://book.flutterchina.club/chapter6/gridview.html#_6-6-3-gridview-extent)6.6.3 GridView.extent

GridView.extent构造函数内部使用了SliverGridDelegateWithMaxCrossAxisExtent，我们通过它可以快速的创建纵轴子元素为固定最大长度的的GridView，上面的示例代码等价于：

```dart
GridView.extent(
   maxCrossAxisExtent: 120.0,
   childAspectRatio: 2.0,
   children: <Widget>[
     Icon(Icons.ac_unit),
     Icon(Icons.airport_shuttle),
     Icon(Icons.all_inclusive),
     Icon(Icons.beach_access),
     Icon(Icons.cake),
     Icon(Icons.free_breakfast),
   ],
 );
```

### [#](https://book.flutterchina.club/chapter6/gridview.html#_6-6-4-gridview-builder)6.6.4 GridView.builder

上面我们介绍的GridView都需要一个widget数组作为其子元素，这些方式都会提前将所有子widget都构建好，所以只适用于子widget数量比较少时，当子widget比较多时，我们可以通过`GridView.builder`来动态创建子widget。`GridView.builder` 必须指定的参数有两个：

```dart
GridView.builder(
 ...
 required SliverGridDelegate gridDelegate, 
 required IndexedWidgetBuilder itemBuilder,
)
```

其中`itemBuilder`为子widget构建器。

### [#](https://book.flutterchina.club/chapter6/gridview.html#示例)示例

假设我们需要从一个异步数据源（如网络）分批获取一些`Icon`，然后用`GridView`来展示：

```dart
class InfiniteGridView extends StatefulWidget {
  @override
  _InfiniteGridViewState createState() => _InfiniteGridViewState();
}

class _InfiniteGridViewState extends State<InfiniteGridView> {
  List<IconData> _icons = []; //保存Icon数据

  @override
  void initState() {
    super.initState();
    // 初始化数据
    _retrieveIcons();
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3, //每行三列
        childAspectRatio: 1.0, //显示区域宽高相等
      ),
      itemCount: _icons.length,
      itemBuilder: (context, index) {
        //如果显示到最后一个并且Icon总数小于200时继续获取数据
        if (index == _icons.length - 1 && _icons.length < 200) {
          _retrieveIcons();
        }
        return Icon(_icons[index]);
      },
    );
  }

  //模拟异步获取数据
  void _retrieveIcons() {
    Future.delayed(Duration(milliseconds: 200)).then((e) {
      setState(() {
        _icons.addAll([
          Icons.ac_unit,
          Icons.airport_shuttle,
          Icons.all_inclusive,
          Icons.beach_access,
          Icons.cake,
          Icons.free_breakfast,
        ]);
      });
    });
  }
}
```

- `_retrieveIcons()`：在此方法中我们通过`Future.delayed`来模拟从异步数据源获取数据，每次获取数据需要200毫秒，获取成功后将新数据添加到_icons，然后调用setState重新构建。
- 在 itemBuilder 中，如果显示到最后一个时，判断是否需要继续获取数据，然后返回一个Icon。

## 6.7 PageView与页面缓存

### [#](https://book.flutterchina.club/chapter6/pageview.html#_6-7-1-pageview)6.7.1 PageView

如果要实现页面切换和 Tab 布局，我们可以使用 PageView 组件。需要注意，PageView 是一个非常重要的组件，因为在移动端开发中很常用，比如大多数 App 都包含 Tab 换页效果、图片轮动以及抖音上下滑页切换视频功能等等，这些都可以通过 PageView 轻松实现。

```dart
PageView({
  Key? key,
  this.scrollDirection = Axis.horizontal, // 滑动方向
  this.reverse = false,
  PageController? controller,
  this.physics,
  List<Widget> children = const <Widget>[],
  this.onPageChanged,
  
  //每次滑动是否强制切换整个页面，如果为false，则会根据实际的滑动距离显示页面
  this.pageSnapping = true,
  //主要是配合辅助功能用的，后面解释
  this.allowImplicitScrolling = false,
  //后面解释
  this.padEnds = true,
})
```

我们看一个 Tab 切换的实例，为了突出重点，我们让每个 Tab 页都只显示一个数字。

```dart
// Tab 页面 
class Page extends StatefulWidget {
  const Page({
    Key? key,
    required this.text
  }) : super(key: key);

  final String text;

  @override
  _PageState createState() => _PageState();
}

class _PageState extends State<Page> {
  @override
  Widget build(BuildContext context) {
    print("build ${widget.text}");
    return Center(child: Text("${widget.text}", textScaleFactor: 5));
  }
}
```

我们创建一个 PageView：

```dart
@override
Widget build(BuildContext context) {
  var children = <Widget>[];
  // 生成 6 个 Tab 页
  for (int i = 0; i < 6; ++i) {
    children.add( Page( text: '$i'));
  }

  return PageView(
    // scrollDirection: Axis.vertical, // 滑动方向为垂直方向
    children: children,
  );
}
```

运行后就可以左右滑动来切换页面了，效果如图6-16所示：

![图6-16](https://book.flutterchina.club/assets/img/6-16.1d598c8b.gif)

如果将 PageView 的滑动方向指定为垂直方向（上面代码中注释部分），则会变为上下滑动切换页面。

### [#](https://book.flutterchina.club/chapter6/pageview.html#_6-7-2-页面缓存)6.7.2 页面缓存

我们在运行上面示例时，读者可能已经发现：每当页面切换时都会触发新 Page 页的 build，比如我们从第一页滑到第二页，然后再滑回第一页时，控制台打印如下：

```text
flutter: build 0
flutter: build 1
flutter: build 0
```

可见 PageView 默认并没有缓存功能，一旦页面滑出屏幕它就会被销毁，这和我们前面讲过的 ListView/GridView 不一样，在创建 ListView/GridView 时我们可以手动指定 ViewPort 之外多大范围内的组件需要预渲染和缓存（通过 `cacheExtent` 指定），只有当组件滑出屏幕后又滑出预渲染区域，组件才会被销毁，但是不幸的是 PageView 并没有 `cacheExtent` 参数！但是在真实的业务场景中，对页面进行缓存是很常见的一个需求，比如一个新闻 App，下面有很多频道页，如果不支持页面缓存，则一旦滑到新的频道旧的频道页就会销毁，滑回去时又得重新请求数据和构建页面，这谁扛得住！

按道理 `cacheExtent` 是 Viewport 的一个配置属性，且 PageView 也是要构建 Viewport 的，那么为什么就不能透传一下这个参数呢？于是笔者带着这个疑问看了一下 PageView 的源码，发现在 PageView 创建Viewport 的代码中是这样的：

```dart
child: Scrollable(
  ...
  viewportBuilder: (BuildContext context, ViewportOffset position) {
    return Viewport(
      // TODO(dnfield): we should provide a way to set cacheExtent
      // independent of implicit scrolling:
      // https://github.com/flutter/flutter/issues/45632
      cacheExtent: widget.allowImplicitScrolling ? 1.0 : 0.0,
      cacheExtentStyle: CacheExtentStyle.viewport,
      ...
    );
  },
)
```

我们发现 虽然 PageView 没有透传 cacheExtent，但是却在`allowImplicitScrolling` 为 true 时设置了预渲染区域，注意，此时的缓存类型为 CacheExtentStyle.viewport，则 cacheExtent 则表示缓存的长度是几个 Viewport 的宽度，cacheExtent 为 1.0，则代表前后各缓存一个页面宽度，即前后各一页。既然如此，那我们将 PageView 的 `allowImplicitScrolling` 置为 true 则不就可以缓存前后两页了？我们修改代码，然后运行示例，发现在第一页时，控制台打印信息如下：

```text
flutter: build 0
flutter: build 1 // 预渲染第二页
```

滑到第二页时：

```text
flutter: build 0
flutter: build 1
flutter: build 2 // 预渲染第三页
```

当再滑回第一页时，控制台信息不变，这也就意味着第一页缓存成功，它没有被重新构建。但是如果我们从第二页滑到第三页，然后再滑回第一页时，控制台又会输出 ”build 0“，这也符合预期，因为我们之前分析的就是设置 `allowImplicitScrolling` 置为 true 时就只会缓存前后各一页，所以滑到第三页时，第一页就会销毁。

OK，能缓存前后各一页也貌似比不能缓存好一点，但还是不能彻底解决不了我们的问题。为什么明明就是顺手的事， flutter 就不让开发者指定缓存策略呢？然后我们翻译一下源码中的注释：

> Todo：我们应该提供一种独立于隐式滚动（implicit scrolling）的设置 cacheExtent 的机制。

放开 cacheExtent 透传不就是顺手的事么，为什么还要以后再做，是有什么难题么？这就要看看 `allowImplicitScrolling` 到底是什么了，根据文档以及注释中 issue 的链接，发现PageView 中设置 cacheExtent 会和 iOS 中 辅助功能有冲突（读者可以先不用关注），所以暂时还没有什么好的办法。看到这可能国内的很多开发者要说我们的 App 不用考虑辅助功能，既然如此，那问题很好解决，将 PageView 的源码拷贝一份，然后透传 cacheExtent 即可。

拷源码的方式虽然很简单，但毕竟不是正统做法，那有没有更通用的方法吗？有！可滚动组件提供了一种通用的缓存子项的解决方案，我们将在下一节中介绍。

## 6.8 可滚动组件子项缓存 KeepAlive

本节将介绍一种在可滚动组件中缓存指定子项的通用方案。

首先回想一下，在介绍 ListView 时，有一个`addAutomaticKeepAlives` 属性我们并没有介绍，如果`addAutomaticKeepAlives` 为 `true`，则 ListView 会为每一个列表项添加一个 AutomaticKeepAlive 父组件。虽然 PageView 的默认构造函数和 PageView.builder 构造函数中没有该参数，但它们最终都会生成一个 SliverChildDelegate 来负责列表项的按需加载，而在 SliverChildDelegate 中每当列表项构建完成后，SliverChildDelegate 都会为其添加一个 AutomaticKeepAlive 父组件。下面我们就先介绍一下 AutomaticKeepAlive 组件。

### [#](https://book.flutterchina.club/chapter6/keepalive.html#_6-8-1-automatickeepalive)6.8.1 AutomaticKeepAlive

AutomaticKeepAlive 的组件的主要作用是将列表项的根 RenderObject 的 keepAlive **按需自动标记** 为 true 或 false。为了方便叙述，我们可以认为根 RenderObject 对应的组件就是列表项的根 Widget，代表整个列表项组件，同时我们将列表组件的 Viewport区域 + cacheExtent（预渲染区域）称为**加载区域** ：

1. 当 keepAlive 标记为 false 时，如果列表项滑出加载区域时，列表组件将会被销毁。
2. 当 keepAlive 标记为 true 时，当列表项滑出加载区域后，Viewport 会将列表组件缓存起来；当列表项进入加载区域时，Viewport 从先从缓存中查找是否已经缓存，如果有则直接复用，如果没有则重新创建列表项。

那么 AutomaticKeepAlive 什么时候会将列表项的 keepAlive 标记为 true 或 false 呢？答案是开发者说了算！Flutter 中实现了一套类似 C/S 的机制，AutomaticKeepAlive 就类似一个 Server，它的子组件可以是 Client，这样子组件想改变是否需要缓存的状态时就向 AutomaticKeepAlive 发一个通知消息（KeepAliveNotification），AutomaticKeepAlive 收到消息后会去更改 keepAlive 的状态，如果有必要同时做一些资源清理的工作（比如 keepAlive 从 true 变为 false 时，要释放缓存）。

我们基于上一节 PageView 示例，实现页面缓存，根据上面的描述实现思路就很简单了：让Page 页变成一个 AutomaticKeepAlive Client 即可。为了便于开发者实现，Flutter 提供了一个 AutomaticKeepAliveClientMixin ，我们只需要让 PageState 混入这个 mixin，且同时添加一些必要操作即可：

```dart
class _PageState extends State<Page> with AutomaticKeepAliveClientMixin {

  @override
  Widget build(BuildContext context) {
    super.build(context); // 必须调用
    return Center(child: Text("${widget.text}", textScaleFactor: 5));
  }

  @override
  bool get wantKeepAlive => true; // 是否需要缓存
}
```

代码很简单，我们只需要提供一个 `wantKeepAlive`，它会表示 AutomaticKeepAlive 是否需要缓存当前列表项；另外我们必须在 build 方法中调用一下 `super.build(context)`，该方法实现在 AutomaticKeepAliveClientMixin 中，功能就是根据当前 `wantKeepAlive` 的值给 AutomaticKeepAlive 发送消息，AutomaticKeepAlive 收到消息后就会开始工作，如图6-17所示：

![图6-17](https://book.flutterchina.club/assets/img/6-17.f0e51c9d.png)

现在我们重新运行一下示例，发现每个 Page 页只会 build 一次，缓存成功了。需要注意，如果我们采用 PageView.custom 构建页面时没有给列表项包装 AutomaticKeepAlive 父组件，则上述方案不能正常工作，因为此时Client 发出消息后，找不到 Server，404 了，😀。

### [#](https://book.flutterchina.club/chapter6/keepalive.html#_6-8-2-keepalivewrapper)6.8.2 KeepAliveWrapper

虽然我们可以通过 AutomaticKeepAliveClientMixin 快速的实现页面缓存功能，但是通过混入的方式实现不是很优雅，因为必须更改 Page 的代码，有侵入性，这就导致不是很灵活，比如一个组件能同时在列表中和列表外使用，为了在列表中缓存它，则我们必须实现两份。为了解决这个问题，笔者封装了一个 KeepAliveWrapper 组件，如果哪个列表项需要缓存，只需要使用 KeepAliveWrapper 包裹一下它即可。

```dart
@override
Widget build(BuildContext context) {
  var children = <Widget>[];
  for (int i = 0; i < 6; ++i) {
    //只需要用 KeepAliveWrapper 包装一下即可
    children.add(KeepAliveWrapper(child:Page( text: '$i'));
  }
  return PageView(children: children);
}
```

下面是 KeepAliveWrapper 的实现源码：

```dart
class KeepAliveWrapper extends StatefulWidget {
  const KeepAliveWrapper({
    Key? key,
    this.keepAlive = true,
    required this.child,
  }) : super(key: key);
  final bool keepAlive;
  final Widget child;

  @override
  _KeepAliveWrapperState createState() => _KeepAliveWrapperState();
}

class _KeepAliveWrapperState extends State<KeepAliveWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return widget.child;
  }

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if(oldWidget.keepAlive != widget.keepAlive) {
      // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  bool get wantKeepAlive => widget.keepAlive;
}
```

下面我们再在 ListView 中测一下：

```dart
class KeepAliveTest extends StatelessWidget {
  const KeepAliveTest({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(itemBuilder: (_, index) {
      return KeepAliveWrapper(
        // 为 true 后会缓存所有的列表项，列表项将不会销毁。
        // 为 false 时，列表项滑出预加载区域后将会别销毁。
        // 使用时一定要注意是否必要，因为对所有列表项都缓存的会导致更多的内存消耗
        keepAlive: true,
        child: ListItem(index: index),
      );
    });
  }
}

class ListItem extends StatefulWidget {
  const ListItem({Key? key, required this.index}) : super(key: key);
  final int index;

  @override
  _ListItemState createState() => _ListItemState();
}

class _ListItemState extends State<ListItem> {
  @override
  Widget build(BuildContext context) {
    return ListTile(title: Text('${widget.index}'));
  }

  @override
  void dispose() {
    print('dispose ${widget.index}');
    super.dispose();
  }
}
```

因为每一个列表项都被缓存了，所以运行后滑动列表预期日志面板不会有任何日志，如图6-18所示：

![图6-18](https://book.flutterchina.club/assets/img/6-18.57095457.png)

好我们预期一致，日志面板没有日志。如果我们将 keepAlive 设为 false，则当列表项滑出预渲染区域后则会销毁，日志面板将有输出，如图6-19所示：

![图6-19](https://book.flutterchina.club/assets/img/6-19.568f28dc.png)

可见我们封装的 KeepAliveWrapper 能够正常工作，笔者将 KeepAliveWrapper 添加到了 flukit 组件库，如果读者需要可以在 flukit 组件库中找到它。

## 6.9 TabBarView

TabBarView 是 Material 组件库中提供了 Tab 布局组件，通常和 TabBar 配合使用。

### [#](https://book.flutterchina.club/chapter6/tabview.html#_6-9-1-tabbarview)6.9.1 TabBarView

TabBarView 封装了 PageView，它的构造方法很简单

```dart
 TabBarView({
  Key? key,
  required this.children, // tab 页
  this.controller, // TabController
  this.physics,
  this.dragStartBehavior = DragStartBehavior.start,
}) 
```

TabController 用于监听和控制 TabBarView 的页面切换，通常和 TabBar 联动。如果没有指定，则会在组件树中向上查找并使用最近的一个 `DefaultTabController` 。

### [#](https://book.flutterchina.club/chapter6/tabview.html#_6-9-2-tabbar)6.9.2 TabBar

TabBar 为 TabBarView 的导航标题，如图6-20所示：

![图6-20](https://book.flutterchina.club/assets/img/6-20.02ae3d67.png)

TabBar 有很多配置参数，通过这些参数我们可以定义 TabBar 的样式，很多属性都是在配置 indicator 和 label，拿上图来举例，Label 是每个Tab 的文本，indicator 指 “历史” 下面的白色下划线。

```dart
const TabBar({
  Key? key,
  required this.tabs, // 具体的 Tabs，需要我们创建
  this.controller,
  this.isScrollable = false, // 是否可以滑动
  this.padding,
  this.indicatorColor,// 指示器颜色，默认是高度为2的一条下划线
  this.automaticIndicatorColorAdjustment = true,
  this.indicatorWeight = 2.0,// 指示器高度
  this.indicatorPadding = EdgeInsets.zero, //指示器padding
  this.indicator, // 指示器
  this.indicatorSize, // 指示器长度，有两个可选值，一个tab的长度，一个是label长度
  this.labelColor, 
  this.labelStyle,
  this.labelPadding,
  this.unselectedLabelColor,
  this.unselectedLabelStyle,
  this.mouseCursor,
  this.onTap,
  ...
}) 
```

TabBar 通常位于 AppBar 的底部，它也可以接收一个 TabController ，如果需要和 TabBarView 联动， TabBar 和 TabBarView 使用同一个 TabController 即可，注意，联动时 TabBar 和 TabBarView 的孩子数量需要一致。如果没有指定 `controller`，则会在组件树中向上查找并使用最近的一个 `DefaultTabController` 。另外我们需要创建需要的 tab 并通过 `tabs` 传给 TabBar， tab 可以是任何 Widget，不过Material 组件库中已经实现了一个 Tab 组件，我们一般都会直接使用它：

```dart
const Tab({
  Key? key,
  this.text, //文本
  this.icon, // 图标
  this.iconMargin = const EdgeInsets.only(bottom: 10.0),
  this.height,
  this.child, // 自定义 widget
})
```

注意，`text` 和 `child` 是互斥的，不能同时制定。

### [#](https://book.flutterchina.club/chapter6/tabview.html#_6-9-3-实例)6.9.3 实例

下面我们看一个例子：

```dart
class TabViewRoute1 extends StatefulWidget {
  @override
  _TabViewRoute1State createState() => _TabViewRoute1State();
}

class _TabViewRoute1State extends State<TabViewRoute1>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List tabs = ["新闻", "历史", "图片"];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("App Name"),
        bottom: TabBar(
          controller: _tabController,
          tabs: tabs.map((e) => Tab(text: e)).toList(),
        ),
      ),
      body: TabBarView( //构建
        controller: _tabController,
        children: tabs.map((e) {
          return KeepAliveWrapper(
            child: Container(
              alignment: Alignment.center,
              child: Text(e, textScaleFactor: 5),
            ),
          );
        }).toList(),
      ),
    );
  }
  
  @override
  void dispose() {
    // 释放资源
    _tabController.dispose();
    super.dispose();
  }
}
```

运行后效果如图6-21所示：

![图6-21](https://book.flutterchina.club/assets/img/6-21.1201dad6.gif)

滑动页面时顶部的 Tab 也会跟着动，点击顶部 Tab 时页面也会跟着切换。为了实现 TabBar 和 TabBarView 的联动，我们显式创建了一个 TabController，由于 TabController 又需要一个 TickerProvider （vsync 参数）， 我们又混入了 SingleTickerProviderStateMixin；由于 TabController 中会执行动画，持有一些资源，所以我们在页面销毁时必须得释放资源（dispose）。综上，我们发现创建 TabController 的过程还是比较复杂，实战中，如果需要 TabBar 和 TabBarView 联动，通常会创建一个 DefaultTabController 作为它们共同的父级组件，这样它们在执行时就会从组件树向上查找，都会使用我们指定的这个 DefaultTabController。我们修改后的实现如下：

```dart
class TabViewRoute2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List tabs = ["新闻", "历史", "图片"];
    return DefaultTabController(
      length: tabs.length,
      child: Scaffold(
        appBar: AppBar(
          title: Text("App Name"),
          bottom: TabBar(
            tabs: tabs.map((e) => Tab(text: e)).toList(),
          ),
        ),
        body: TabBarView( //构建
          children: tabs.map((e) {
            return KeepAliveWrapper(
              child: Container(
                alignment: Alignment.center,
                child: Text(e, textScaleFactor: 5),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
```

可以看到我们无需去手动管理 Controller 的生命周期，也不需要提供 SingleTickerProviderStateMixin，同时也没有其它的状态需要管理，也就不需要用 StatefulWidget 了，这样简单很多。

### [#](https://book.flutterchina.club/chapter6/tabview.html#页面缓存)页面缓存

因为TabBarView 内部封装了 PageView，如果要缓存页面，可以参考 PageView 一节中关于页面缓存的介绍。

## 7.1 导航返回拦截（WillPopScope）

为了避免用户误触返回按钮而导致 App 退出，在很多 App 中都拦截了用户点击返回键的按钮，然后进行一些防误触判断，比如当用户在某一个时间段内点击两次时，才会认为用户是要退出（而非误触）。Flutter中可以通过`WillPopScope`来实现返回按钮拦截，我们看看`WillPopScope`的默认构造函数：

```dart
const WillPopScope({
  ...
  required WillPopCallback onWillPop,
  required Widget child
})
```

`onWillPop`是一个回调函数，当用户点击返回按钮时被调用（包括导航返回按钮及Android物理返回按钮）。该回调需要返回一个`Future`对象，如果返回的`Future`最终值为`false`时，则当前路由不出栈(不会返回)；最终值为`true`时，当前路由出栈退出。我们需要提供这个回调来决定是否退出。

### [#](https://book.flutterchina.club/chapter7/willpopscope.html#示例)示例

为了防止用户误触返回键退出，我们拦截返回事件。当用户在1秒内点击两次返回按钮时，则退出；如果间隔超过1秒则不退出，并重新记时。代码如下：

```dart
import 'package:flutter/material.dart';

class WillPopScopeTestRoute extends StatefulWidget {
  @override
  WillPopScopeTestRouteState createState() {
    return WillPopScopeTestRouteState();
  }
}

class WillPopScopeTestRouteState extends State<WillPopScopeTestRoute> {
  DateTime? _lastPressedAt; //上次点击时间

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (_lastPressedAt == null ||
            DateTime.now().difference(_lastPressedAt!) > Duration(seconds: 1)) {
          //两次点击间隔超过1秒则重新计时
          _lastPressedAt = DateTime.now();
          return false;
        }
        return true;
      },
      child: Container(
        alignment: Alignment.center,
        child: Text("1秒内连续按两次返回键退出"),
      ),
    );
  }
}
```

## 7.4 颜色和主题

### [#](https://book.flutterchina.club/chapter7/theme.html#_7-4-1-颜色)7.4.1 颜色

在介绍主题前我们先了解一些Flutter中的 Color 类。Color 类中颜色以一个 int 值保存，我们知道显示器颜色是由红、绿、蓝三基色组成，每种颜色占8比特，存储结构如下：

| Bit（位） | 颜色             |
| --------- | ---------------- |
| 0-7       | 蓝色             |
| 8-15      | 绿色             |
| 16-23     | 红色             |
| 24-31     | Alpha (不透明度) |

上面表格中的的字段在 Color 类中都有对应的属性，而Color中的众多方法也就是操作这些属性的，由于大多比较简单，读者可以查看类定义了解。在此我们主要讨论两点：色值转换和亮度。

### [#](https://book.flutterchina.club/chapter7/theme.html#如何将颜色字符串转成-color-对象)**如何将颜色字符串转成 Color 对象**

如 Web 开发中的色值通常是一个字符串如"#dc380d"，它是一个 RGB 值，我们可以通过下面这些方法将其转为Color类：

```dart
Color(0xffdc380d); //如果颜色固定可以直接使用整数值
//颜色是一个字符串变量
var c = "dc380d";
Color(int.parse(c,radix:16)|0xFF000000) //通过位运算符将Alpha设置为FF
Color(int.parse(c,radix:16)).withAlpha(255)  //通过方法将Alpha设置为FF
```

### [#](https://book.flutterchina.club/chapter7/theme.html#颜色亮度)颜色亮度

假如，我们要实现一个背景颜色和Title可以自定义的导航栏，并且背景色为深色时我们应该让Title显示为浅色；背景色为浅色时，Title 显示为深色。要实现这个功能，我们就需要来计算背景色的亮度，然后动态来确定Title的颜色。Color 类中提供了一个`computeLuminance()`方法，它可以返回一个[0-1]的一个值，数字越大颜色就越浅，我们可以根据它来动态确定Title的颜色，下面是导航栏NavBar的简单实现：

```dart
class NavBar extends StatelessWidget {
  final String title;
  final Color color; //背景颜色

  NavBar({
    Key? key,
    required this.color,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(
        minHeight: 52,
        minWidth: double.infinity,
      ),
      decoration: BoxDecoration(
        color: color,
        boxShadow: [
          //阴影
          BoxShadow(
            color: Colors.black26,
            offset: Offset(0, 3),
            blurRadius: 3,
          ),
        ],
      ),
      child: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          //根据背景色亮度来确定Title颜色
          color: color.computeLuminance() < 0.5 ? Colors.white : Colors.black,
        ),
      ),
      alignment: Alignment.center,
    );
  }
}
```

测试代码如下：

```dart
Column(
  children: <Widget>[
    //背景为蓝色，则title自动为白色
    NavBar(color: Colors.blue, title: "标题"), 
    //背景为白色，则title自动为黑色
    NavBar(color: Colors.white, title: "标题"),
  ]
)
```

运行效果如图7-4所示：

![NavBar](data:image/png;base64,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xsZG22+//WzBggWm/axfv960jyFDhlhTU1N4HQWJww47jKBQUZoNCMQlQFCIq74oLQI/SmDr1q3hpP7dd99VfL5aEtJFAeCbb76xESNGhKCgboxly5aF4HDJJZeElge1Kjz55JPW0tJi559/vg0fPjw8fdy4cTZgwID0pbhFAIHIBQgKkVcgxUdAAvoUP2fOHPv4449t7dq1Nm/evHACf+yxx2zGjBl2xBFH2NVXXx3GLVQSS1sEKm3X+sGDB9ukSZPsvffeCy0MCh56nropGhoabPz48XbwwQdb3759d/cybEMAgYgECAoRVRZFRaCSgD7Vv/vuu3brrbeGLgGNSVALwb333mtJkthtt91mJ510UqWn97he3Qynn3566EJQl8XSpUvD4+bPn2833XST9enTJwSELVu2hJYFdUGcccYZNnHiRNtnn316fE1WIoBAfAIEhfjqjBIjsIuAxhacfPLJ4VP922+/bS+88EIYS3D22WeHVgCNUdAJfk/Ldddd1/kQjUt47bXXwrgEhYENGzaEbWq90P1TTjklhAU9RiHkq6++CsGhaxdG54txBwEEohUgKERbdRQcgR0C+vR/9NFHh+mQ+uSvgYbqDlC3wAknnGD33Xefvf/++zueUOHetddeG8YkXHDBBTZ16tSdHqXWBQ1u1Gtqf6NHjw5dDGo9mDx5cmeQ2OlJ/IIAAtELEBSir0IOAAELgwvVxbB69eow40FBQZ/6NUZh4MCBdt5559m5554bqGbPnm0PPvignXnmmaEloOvYhEKhELop1PrQU8uAXj+dGqkBjury0HgEBi/yLkSgdgUICrVbtxxZnQnopD1r1qzOloNDDjkkCLzyyit21FFHhYGGagnQdMennnrKjjzySNM1DzTD4ZhjjgndFrpOgrop1CqhoKBWiUWLFoUZDfvvv394vXSKpbom9BgFEQ1yZEEAgdoUICjUZr1yVHUooOmMb775ZggCmtao2Qe68JFO4goIN998cwgL6YWVtO6JJ54I4xnuv/9+O/zww4Pa9ddfby+99JI988wzIUBoBsX06dPt4osvDtvfeecdu+GGG0JrgsYraHwEsxzq8A3HIdeNAEGhbqqaA61lAU1T1Il95syZYaaCPvWrK+LUU08N4weee+45+/DDD8OJX7MV0kUtDXfddZe9+uqr4XFqbTjooINMXRBffPGFTZs2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)

### [#](https://book.flutterchina.club/chapter7/theme.html#materialcolor)MaterialColor

`MaterialColor`是实现Material Design中的颜色的类，它包含一种颜色的10个级别的渐变色。`MaterialColor`通过"[]"运算符的索引值来代表颜色的深度，有效的索引有：50，100，200，…，900，数字越大，颜色越深。`MaterialColor`的默认值为索引等于500的颜色。举个例子，`Colors.blue`是预定义的一个`MaterialColor`类对象，定义如下：

```dart
static const MaterialColor blue = MaterialColor(
  _bluePrimaryValue,
  <int, Color>{
     50: Color(0xFFE3F2FD),
    100: Color(0xFFBBDEFB),
    200: Color(0xFF90CAF9),
    300: Color(0xFF64B5F6),
    400: Color(0xFF42A5F5),
    500: Color(_bluePrimaryValue),
    600: Color(0xFF1E88E5),
    700: Color(0xFF1976D2),
    800: Color(0xFF1565C0),
    900: Color(0xFF0D47A1),
  },
);
static const int _bluePrimaryValue = 0xFF2196F3;
```

我们可以根据 shadeXX 来获取具体索引的颜色。`Colors.blue.shade50`到`Colors.blue.shade900`的色值从浅蓝到深蓝渐变，效果如图7-5所示：

![NavBar](https://book.flutterchina.club/assets/img/7-5.6f1c5012.jpeg)

### [#](https://book.flutterchina.club/chapter7/theme.html#_7-4-2-theme)7.4.2 Theme

`Theme`组件可以为Material APP定义主题数据（ThemeData）。Material组件库里很多组件都使用了主题数据，如导航栏颜色、标题字体、Icon样式等。`Theme`内会使用`InheritedWidget`来为其子树共享样式数据。

### [#](https://book.flutterchina.club/chapter7/theme.html#themedata)ThemeData

`ThemeData`用于保存是Material 组件库的主题数据，Material组件需要遵守相应的设计规范，而这些规范可自定义部分都定义在ThemeData中了，所以我们可以通过ThemeData来自定义应用主题。在子组件中，我们可以通过`Theme.of`方法来获取当前的`ThemeData`。

> 注意：Material Design 设计规范中有些是不能自定义的，如导航栏高度，ThemeData只包含了可自定义部分。

我们看看`ThemeData`部分数据定义：

```dart
ThemeData({
  Brightness? brightness, //深色还是浅色
  MaterialColor? primarySwatch, //主题颜色样本，见下面介绍
  Color? primaryColor, //主色，决定导航栏颜色
  Color? cardColor, //卡片颜色
  Color? dividerColor, //分割线颜色
  ButtonThemeData buttonTheme, //按钮主题
  Color dialogBackgroundColor,//对话框背景颜色
  String fontFamily, //文字字体
  TextTheme textTheme,// 字体主题，包括标题、body等文字样式
  IconThemeData iconTheme, // Icon的默认样式
  TargetPlatform platform, //指定平台，应用特定平台控件风格
  ColorScheme? colorScheme,
  ...
})
```

上面只是`ThemeData`的一小部分属性，完整的数据定义读者可以查看SDK。上面属性中需要说明的是`primarySwatch`，它是主题颜色的一个"样本色"，通过这个样本色可以在一些条件下生成一些其它的属性，例如，如果没有指定`primaryColor`，并且当前主题不是深色主题，那么`primaryColor`就会默认为`primarySwatch`指定的颜色，还有一些相似的属性如`indicatorColor`也会受`primarySwatch`影响。

### [#](https://book.flutterchina.club/chapter7/theme.html#示例)示例

我们实现一个路由换肤功能：

```dart
class ThemeTestRoute extends StatefulWidget {
  @override
  _ThemeTestRouteState createState() => _ThemeTestRouteState();
}

class _ThemeTestRouteState extends State<ThemeTestRoute> {
  Color _themeColor = Colors.teal; //当前路由主题色

  @override
  Widget build(BuildContext context) {
    ThemeData themeData = Theme.of(context);
    return Theme(
      data: ThemeData(
          primarySwatch: _themeColor, //用于导航栏、FloatingActionButton的背景色等
          iconTheme: IconThemeData(color: _themeColor) //用于Icon颜色
      ),
      child: Scaffold(
        appBar: AppBar(title: Text("主题测试")),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //第一行Icon使用主题中的iconTheme
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.favorite),
                  Icon(Icons.airport_shuttle),
                  Text("  颜色跟随主题")
                ]
            ),
            //为第二行Icon自定义颜色（固定为黑色)
            Theme(
              data: themeData.copyWith(
                iconTheme: themeData.iconTheme.copyWith(
                    color: Colors.black
                ),
              ),
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Icon(Icons.favorite),
                    Icon(Icons.airport_shuttle),
                    Text("  颜色固定黑色")
                  ]
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
            onPressed: () =>  //切换主题
                setState(() =>
                _themeColor =
                _themeColor == Colors.teal ? Colors.blue : Colors.teal
                ),
            child: Icon(Icons.palette)
        ),
      ),
    );
  }
}
```

运行后点击右下角悬浮按钮则可以切换主题，如图7-6、7-7所示：

![图7-6](https://book.flutterchina.club/assets/img/7-6.3bce9f21.png)![图7-7](https://book.flutterchina.club/assets/img/7-7.b9c5d9fe.png)

需要注意的有三点：

- 可以通过局部主题覆盖全局主题，正如代码中通过 Theme 为第二行图标指定固定颜色（黑色）一样，这是一种常用的技巧，Flutter 中会经常使用这种方法来自定义子树主题。那么为什么局部主题可以覆盖全局主题？这主要是因为 widget 中使用主题样式时是通过`Theme.of(BuildContext context)`来获取的，我们看看其简化后的代码：

- ```dart
  static ThemeData of(BuildContext context, { bool shadowThemeOnly = false }) {
     // 简化代码，并非源码  
     return context.dependOnInheritedWidgetOfExactType<_InheritedTheme>().theme.data
  }
  ```

  `context.dependOnInheritedWidgetOfExactType` 会在 widget 树中从当前位置向上查找第一个类型为`_InheritedTheme`的 widget。所以当局部指定`Theme`后，其子树中通过`Theme.of()`向上查找到的第一个`_InheritedTheme`便是我们指定的`Theme`。

- 本示例是对单个路由换肤，如果想要对整个应用换肤，则可以去修改`MaterialApp`的`theme`属性。

## 7.7 对话框详解

本节将详细介绍一下Flutter中对话框的使用方式、实现原理、样式定制及状态管理。

### [#](https://book.flutterchina.club/chapter7/dailog.html#_7-7-1-使用对话框)7.7.1 使用对话框

对话框本质上也是UI布局，通常一个对话框会包含标题、内容，以及一些操作按钮，为此，Material库中提供了一些现成的对话框组件来用于快速的构建出一个完整的对话框。

### [#](https://book.flutterchina.club/chapter7/dailog.html#alertdialog)AlertDialog

下面我们主要介绍一下Material库中的`AlertDialog`组件，它的构造函数定义如下：

```dart
const AlertDialog({
  Key? key,
  this.title, //对话框标题组件
  this.titlePadding, // 标题填充
  this.titleTextStyle, //标题文本样式
  this.content, // 对话框内容组件
  this.contentPadding = const EdgeInsets.fromLTRB(24.0, 20.0, 24.0, 24.0), //内容的填充
  this.contentTextStyle,// 内容文本样式
  this.actions, // 对话框操作按钮组
  this.backgroundColor, // 对话框背景色
  this.elevation,// 对话框的阴影
  this.semanticLabel, //对话框语义化标签(用于读屏软件)
  this.shape, // 对话框外形
})
```

参数都比较简单，不在赘述。下面我们看一个例子，假如我们要在删除文件时弹出一个确认对话框，该对话框如图7-11所示：

![图7-11](https://book.flutterchina.club/assets/img/7-11.47645234.png)

该对话框样式代码如下：

```dart
AlertDialog(
  title: Text("提示"),
  content: Text("您确定要删除当前文件吗?"),
  actions: <Widget>[
    TextButton(
      child: Text("取消"),
      onPressed: () => Navigator.of(context).pop(), //关闭对话框
    ),
    TextButton(
      child: Text("删除"),
      onPressed: () {
        // ... 执行删除操作
        Navigator.of(context).pop(true); //关闭对话框
      },
    ),
  ],
);
```

实现代码很简单，不在赘述。唯一需要注意的是我们是通过`Navigator.of(context).pop(…)`方法来关闭对话框的，这和路由返回的方式是一致的，并且都可以返回一个结果数据。现在，对话框我们已经构建好了，那么如何将它弹出来呢？还有对话框返回的数据应如何被接收呢？这些问题的答案都在`showDialog()`方法中。

`showDialog()`是Material组件库提供的一个用于弹出Material风格对话框的方法，签名如下：

```dart
Future<T?> showDialog<T>({
  required BuildContext context,
  required WidgetBuilder builder, // 对话框UI的builder
  bool barrierDismissible = true, //点击对话框barrier(遮罩)时是否关闭它
})
```

该方法只有两个参数，含义见注释。该方法返回一个`Future`，它正是用于接收对话框的返回值：如果我们是通过点击对话框遮罩关闭的，则`Future`的值为`null`，否则为我们通过`Navigator.of(context).pop(result)`返回的result值，下面我们看一下整个示例：

```dart
//点击该按钮后弹出对话框
ElevatedButton(
  child: Text("对话框1"),
  onPressed: () async {
    //弹出对话框并等待其关闭
    bool? delete = await showDeleteConfirmDialog1();
    if (delete == null) {
      print("取消删除");
    } else {
      print("已确认删除");
      //... 删除文件
    }
  },
),

// 弹出对话框
Future<bool?> showDeleteConfirmDialog1() {
  return showDialog<bool>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text("提示"),
        content: Text("您确定要删除当前文件吗?"),
        actions: <Widget>[
          TextButton(
            child: Text("取消"),
            onPressed: () => Navigator.of(context).pop(), // 关闭对话框
          ),
          TextButton(
            child: Text("删除"),
            onPressed: () {
              //关闭对话框并返回true
              Navigator.of(context).pop(true);
            },
          ),
        ],
      );
    },
  );
}
```

示例运行后，我们点击对话框“取消”按钮或遮罩，控制台就会输出"取消删除"，如果点击“删除”按钮，控制台就会输出"已确认删除"。

> 注意：如果`AlertDialog`的内容过长，内容将会溢出，这在很多时候可能不是我们期望的，所以如果对话框内容过长时，可以用`SingleChildScrollView`将内容包裹起来。

### [#](https://book.flutterchina.club/chapter7/dailog.html#simpledialog)SimpleDialog

`SimpleDialog`也是Material组件库提供的对话框，它会展示一个列表，用于列表选择的场景。下面是一个选择APP语言的示例，运行结果如图7-12。

![图7-12](https://book.flutterchina.club/assets/img/7-12.8cffb68f.png)

实现代码如下：

```dart
Future<void> changeLanguage() async {
  int? i = await showDialog<int>(
      context: context,
      builder: (BuildContext context) {
        return SimpleDialog(
          title: const Text('请选择语言'),
          children: <Widget>[
            SimpleDialogOption(
              onPressed: () {
                // 返回1
                Navigator.pop(context, 1);
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
                child: const Text('中文简体'),
              ),
            ),
            SimpleDialogOption(
              onPressed: () {
                // 返回2
                Navigator.pop(context, 2);
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
                child: const Text('美国英语'),
              ),
            ),
          ],
        );
      });

  if (i != null) {
    print("选择了：${i == 1 ? "中文简体" : "美国英语"}");
  }
}
```

列表项组件我们使用了`SimpleDialogOption`组件来包装了一下，它相当于一个TextButton，只不过按钮文案是左对齐的，并且padding较小。上面示例运行后，用户选择一种语言后，控制台就会打印出它。

### [#](https://book.flutterchina.club/chapter7/dailog.html#dialog)Dialog

实际上`AlertDialog`和`SimpleDialog`都使用了`Dialog`类。由于`AlertDialog`和`SimpleDialog`中使用了`IntrinsicWidth`来尝试通过子组件的实际尺寸来调整自身尺寸，这就导致他们的子组件不能是延迟加载模型的组件（如`ListView`、`GridView` 、 `CustomScrollView`等），如下面的代码运行后会报错。

```dart
AlertDialog(
  content: ListView(
    children: ...//省略
  ),
);
```

如果我们就是需要嵌套一个`ListView`应该怎么做？这时，我们可以直接使用`Dialog`类，如：

```dart
Dialog(
  child: ListView(
    children: ...//省略
  ),
);
```

下面我们看一个弹出一个有30个列表项的对话框示例，运行效果如图7-12所示：

![图7-13](https://book.flutterchina.club/assets/img/7-13.df06c0b8.png)

实现代码如下：

```dart
Future<void> showListDialog() async {
  int? index = await showDialog<int>(
    context: context,
    builder: (BuildContext context) {
      var child = Column(
        children: <Widget>[
          ListTile(title: Text("请选择")),
          Expanded(
              child: ListView.builder(
            itemCount: 30,
            itemBuilder: (BuildContext context, int index) {
              return ListTile(
                title: Text("$index"),
                onTap: () => Navigator.of(context).pop(index),
              );
            },
          )),
        ],
      );
      //使用AlertDialog会报错
      //return AlertDialog(content: child);
      return Dialog(child: child);
    },
  );
  if (index != null) {
    print("点击了：$index");
  }
}
```

现在，我们己经介绍完了`AlertDialog`、`SimpleDialog`以及`Dialog`。上面的示例中，我们在调用`showDialog`时，在`builder`中都是构建了这三个对话框组件的一种，可能有些读者会惯性的以为在`builder`中只能返回这三者之一，其实这不是必须的！就拿`Dialog`的示例来举例，我们完全可以用下面的代码来替代`Dialog`：

```dart
// return Dialog(child: child) 
return UnconstrainedBox(
  constrainedAxis: Axis.vertical,
  child: ConstrainedBox(
    constraints: BoxConstraints(maxWidth: 280),
    child: Material(
      child: child,
      type: MaterialType.card,
    ),
  ),
);
```

上面代码运行后可以实现一样的效果。现在我们总结一下：`AlertDialog`、`SimpleDialog`以及`Dialog`是Material组件库提供的三种对话框，旨在帮助开发者快速构建出符合Material设计规范的对话框，但读者完全可以自定义对话框样式，因此，我们仍然可以实现各种样式的对话框，这样即带来了易用性，又有很强的扩展性。

### 7.7.2 对话框打开动画及遮罩

我们可以把对话框分为内部样式和外部样式两部分。内部样式指对话框中显示的具体内容，这部分内容我们已经在上面介绍过了；外部样式包含对话框遮罩样式、打开动画等，本节主要介绍如何自定义这些外部样式。

> 关于动画相关内容我们将在本书后面章节介绍，下面内容读者可以先了解一下（不必深究），读者可以在学习完动画相关内容后再回头来看。

我们已经介绍过了`showDialog`方法，它是Material组件库中提供的一个打开Material风格对话框的方法。那如何打开一个普通风格的对话框呢（非Material风格）？ Flutter 提供了一个`showGeneralDialog`方法，签名如下：

```dart
Future<T?> showGeneralDialog<T>({
  required BuildContext context,
  required RoutePageBuilder pageBuilder, //构建对话框内部UI
  bool barrierDismissible = false, //点击遮罩是否关闭对话框
  String? barrierLabel, // 语义化标签(用于读屏软件)
  Color barrierColor = const Color(0x80000000), // 遮罩颜色
  Duration transitionDuration = const Duration(milliseconds: 200), // 对话框打开/关闭的动画时长
  RouteTransitionsBuilder? transitionBuilder, // 对话框打开/关闭的动画
  ...
})
```

实际上，`showDialog`方法正是`showGeneralDialog`的一个封装，定制了Material风格对话框的遮罩颜色和动画。Material风格对话框打开/关闭动画是一个Fade（渐隐渐显）动画，如果我们想使用一个缩放动画就可以通过`transitionBuilder`来自定义。下面我们自己封装一个`showCustomDialog`方法，它定制的对话框动画为缩放动画，并同时制定遮罩颜色为`Colors.black87`：

```dart
Future<T?> showCustomDialog<T>({
  required BuildContext context,
  bool barrierDismissible = true,
  required WidgetBuilder builder,
  ThemeData? theme,
}) {
  final ThemeData theme = Theme.of(context, shadowThemeOnly: true);
  return showGeneralDialog(
    context: context,
    pageBuilder: (BuildContext buildContext, Animation<double> animation,
        Animation<double> secondaryAnimation) {
      final Widget pageChild = Builder(builder: builder);
      return SafeArea(
        child: Builder(builder: (BuildContext context) {
          return theme != null
              ? Theme(data: theme, child: pageChild)
              : pageChild;
        }),
      );
    },
    barrierDismissible: barrierDismissible,
    barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
    barrierColor: Colors.black87, // 自定义遮罩颜色
    transitionDuration: const Duration(milliseconds: 150),
    transitionBuilder: _buildMaterialDialogTransitions,
  );
}

Widget _buildMaterialDialogTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child) {
  // 使用缩放动画
  return ScaleTransition(
    scale: CurvedAnimation(
      parent: animation,
      curve: Curves.easeOut,
    ),
    child: child,
  );
}
```

现在，我们使用`showCustomDialog`打开文件删除确认对话框，代码如下：

```dart
... //省略无关代码
showCustomDialog<bool>(
  context: context,
  builder: (context) {
    return AlertDialog(
      title: Text("提示"),
      content: Text("您确定要删除当前文件吗?"),
      actions: <Widget>[
        TextButton(
          child: Text("取消"),
          onPressed: () => Navigator.of(context).pop(),
        ),
        TextButton(
          child: Text("删除"),
          onPressed: () {
            // 执行删除操作
            Navigator.of(context).pop(true);
          },
        ),
      ],
    );
  },
);
```

运行效果如图7-14所示：

![图7-14](https://book.flutterchina.club/assets/img/7-14.45803ea4.png)

可以发现，遮罩颜色比通过`showDialog`方法打开的对话框更深。另外对话框打开/关闭的动画已变为缩放动画了，读者可以亲自运行示例查看效果。

### [#](https://book.flutterchina.club/chapter7/dailog.html#_7-7-3-对话框实现原理)7.7.3 对话框实现原理

我们以`showGeneralDialog`方法为例来看看它的具体实现：

```dart
Future<T?> showGeneralDialog<T extends Object?>({
  required BuildContext context,
  required RoutePageBuilder pageBuilder,
  bool barrierDismissible = false,
  String? barrierLabel,
  Color barrierColor = const Color(0x80000000),
  Duration transitionDuration = const Duration(milliseconds: 200),
  RouteTransitionsBuilder? transitionBuilder,
  bool useRootNavigator = true,
  RouteSettings? routeSettings,
}) {
  return Navigator.of(context, rootNavigator: useRootNavigator).push<T>(RawDialogRoute<T>(
    pageBuilder: pageBuilder,
    barrierDismissible: barrierDismissible,
    barrierLabel: barrierLabel,
    barrierColor: barrierColor,
    transitionDuration: transitionDuration,
    transitionBuilder: transitionBuilder,
    settings: routeSettings,
  ));
}
```

实现很简单，直接调用`Navigator`的`push`方法打开了一个新的对话框路由`RawDialogRoute`，然后返回了`push`的返回值。可见对话框实际上正是通过路由的形式实现的，这也是为什么我们可以使用`Navigator`的`pop` 方法来退出对话框的原因。关于对话框的样式定制在`RawDialogRoute`中，没有什么新的东西，读者可以自行查看。

### [#](https://book.flutterchina.club/chapter7/dailog.html#_7-7-4-对话框状态管理)7.7.4 对话框状态管理

我们在用户选择删除一个文件时，会询问是否删除此文件；在用户选择一个文件夹是，应该再让用户确认是否删除子文件夹。为了在用户选择了文件夹时避免二次弹窗确认是否删除子目录，我们在确认对话框底部添加一个“同时删除子目录？”的复选框，如图7-15所示：

![图7-15](https://book.flutterchina.club/assets/img/7-15.edea3e0f.png)

现在就有一个问题：如何管理复选框的选中状态？习惯上，我们会在路由页的State中来管理选中状态，我们可能会写出如下这样的代码：

```dart
class _DialogRouteState extends State<DialogRoute> {
  bool withTree = false; // 复选框选中状态

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ElevatedButton(
          child: Text("对话框2"),
          onPressed: () async {
            bool? delete = await showDeleteConfirmDialog2();
            if (delete == null) {
              print("取消删除");
            } else {
              print("同时删除子目录: $delete");
            }
          },
        ),
      ],
    );
  }

  Future<bool?> showDeleteConfirmDialog2() {
    withTree = false; // 默认复选框不选中
    return showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("提示"),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text("您确定要删除当前文件吗?"),
              Row(
                children: <Widget>[
                  Text("同时删除子目录？"),
                  Checkbox(
                    value: withTree,
                    onChanged: (bool value) {
                      //复选框选中状态发生变化时重新构建UI
                      setState(() {
                        //更新复选框状态
                        withTree = !withTree;
                      });
                    },
                  ),
                ],
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: Text("删除"),
              onPressed: () {
                //执行删除操作
                Navigator.of(context).pop(withTree);
              },
            ),
          ],
        );
      },
    );
  }
}
```

然后，当我们运行上面的代码时我们会发现复选框根本选不中！为什么会这样呢？其实原因很简单，我们知道`setState`方法只会针对当前context的子树重新build，但是我们的对话框并不是在`_DialogRouteState`的`build` 方法中构建的，而是通过`showDialog`单独构建的，所以在`_DialogRouteState`的context中调用`setState`是无法影响通过`showDialog`构建的UI的。另外，我们可以从另外一个角度来理解这个现象，前面说过对话框也是通过路由的方式来实现的，那么上面的代码实际上就等同于企图在父路由中调用`setState`来让子路由更新，这显然是不行的！简尔言之，根本原因就是context不对。那如何让复选框可点击呢？通常有如下三种方法：

### [#](https://book.flutterchina.club/chapter7/dailog.html#单独抽离出statefulwidget)单独抽离出StatefulWidget

既然是context不对，那么直接的思路就是将复选框的选中逻辑单独封装成一个`StatefulWidget`，然后在其内部管理复选状态。我们先来看看这种方法，下面是实现代码：

```dart
// 单独封装一个内部管理选中状态的复选框组件
class DialogCheckbox extends StatefulWidget {
  DialogCheckbox({
    Key? key,
    this.value,
    required this.onChanged,
  });

  final ValueChanged<bool?> onChanged;
  final bool? value;

  @override
  _DialogCheckboxState createState() => _DialogCheckboxState();
}

class _DialogCheckboxState extends State<DialogCheckbox> {
  bool? value;

  @override
  void initState() {
    value = widget.value;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Checkbox(
      value: value,
      onChanged: (v) {
        //将选中状态通过事件的形式抛出
        widget.onChanged(v);
        setState(() {
          //更新自身选中状态
          value = v;
        });
      },
    );
  }
}
```

下面是弹出对话框的代码：

```dart
Future<bool?> showDeleteConfirmDialog3() {
  bool _withTree = false; //记录复选框是否选中
  return showDialog<bool>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text("提示"),
        content: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text("您确定要删除当前文件吗?"),
            Row(
              children: <Widget>[
                Text("同时删除子目录？"),
                DialogCheckbox(
                  value: _withTree, //默认不选中
                  onChanged: (bool value) {
                    //更新选中状态
                    _withTree = !_withTree;
                  },
                ),
              ],
            ),
          ],
        ),
        actions: <Widget>[
          TextButton(
            child: Text("取消"),
            onPressed: () => Navigator.of(context).pop(),
          ),
          TextButton(
            child: Text("删除"),
            onPressed: () {
              // 将选中状态返回
              Navigator.of(context).pop(_withTree);
            },
          ),
        ],
      );
    },
  );
}
```

最后，就是使用：

```dart
ElevatedButton(
  child: Text("话框3（复选框可点击）"),
  onPressed: () async {
    //弹出删除确认对话框，等待用户确认
    bool? deleteTree = await showDeleteConfirmDialog3();
    if (deleteTree == null) {
      print("取消删除");
    } else {
      print("同时删除子目录: $deleteTree");
    }
  },
),
```

运行后效果如图7-16所示：

![图7-16](https://book.flutterchina.club/assets/img/7-16.8624d4d8.png)

可见复选框能选中了，点击“取消”或“删除”后，控制台就会打印出最终的确认状态。

### [#](https://book.flutterchina.club/chapter7/dailog.html#使用statefulbuilder方法)使用StatefulBuilder方法

上面的方法虽然能解决对话框状态更新的问题，但是有一个明显的缺点——对话框上所有可能会改变状态的组件都得单独封装在一个在内部管理状态的`StatefulWidget`中，这样不仅麻烦，而且复用性不大。因此，我们来想想能不能找到一种更简单的方法？上面的方法本质上就是将对话框的状态置于一个`StatefulWidget`的上下文中，由`StatefulWidget`在内部管理，那么我们有没有办法在不需要单独抽离组件的情况下创建一个`StatefulWidget`的上下文呢？想到这里，我们可以从`Builder`组件的实现获得灵感。在前面介绍过`Builder`组件可以获得组件所在位置的真正的Context，那它是怎么实现的呢，我们看看它的源码：

```dart
class Builder extends StatelessWidget {
  const Builder({
    Key? key,
    required this.builder,
  }) : assert(builder != null),
       super(key: key);
  final WidgetBuilder builder;

  @override
  Widget build(BuildContext context) => builder(context);
}
```

可以看到，`Builder`实际上只是继承了`StatelessWidget`，然后在`build`方法中获取当前context后将构建方法代理到了`builder`回调，可见，`Builder`实际上是获取了`StatelessWidget` 的上下文（context）。那么我们能否用相同的方法获取`StatefulWidget` 的上下文，并代理其`build`方法呢？下面我们照猫画虎，来封装一个`StatefulBuilder`方法：

```dart
class StatefulBuilder extends StatefulWidget {
  const StatefulBuilder({
    Key? key,
    required this.builder,
  }) : assert(builder != null),
       super(key: key);

  final StatefulWidgetBuilder builder;

  @override
  _StatefulBuilderState createState() => _StatefulBuilderState();
}

class _StatefulBuilderState extends State<StatefulBuilder> {
  @override
  Widget build(BuildContext context) => widget.builder(context, setState);
}
```

代码很简单，`StatefulBuilder`获取了`StatefulWidget`的上下文，并代理了其构建过程。下面我们就可以通过`StatefulBuilder`来重构上面的代码了（变动只在`DialogCheckbox`部分）：

```dart
... //省略无关代码
Row(
  children: <Widget>[
    Text("同时删除子目录？"),
    //使用StatefulBuilder来构建StatefulWidget上下文
    StatefulBuilder(
      builder: (context, _setState) {
        return Checkbox(
          value: _withTree, //默认不选中
          onChanged: (bool value) {
            //_setState方法实际就是该StatefulWidget的setState方法，
            //调用后builder方法会重新被调用
            _setState(() {
              //更新选中状态
              _withTree = !_withTree;
            });
          },
        );
      },
    ),
  ],
),
```

实际上，这种方法本质上就是子组件通知父组件（StatefulWidget）重新build子组件本身来实现UI更新的，读者可以对比代码理解。实际上`StatefulBuilder`正是Flutter SDK中提供的一个类，它和`Builder`的原理是一样的，在此，提醒读者一定要将`StatefulBuilder`和`Builder`理解透彻，因为它们在Flutter中是非常实用的。

### [#](https://book.flutterchina.club/chapter7/dailog.html#精妙的解法)精妙的解法

是否还有更简单的解决方案呢？要确认这个问题，我们就得先搞清楚UI是怎么更新的，我们知道在调用`setState`方法后`StatefulWidget`就会重新build，那`setState`方法做了什么呢？我们能不能从中找到方法？顺着这个思路，我们就得看一下`setState`的核心源码：

```dart
void setState(VoidCallback fn) {
  ... //省略无关代码
  _element.markNeedsBuild();
}
```

可以发现，`setState`中调用了`Element`的`markNeedsBuild()`方法，我们前面说过，Flutter是一个响应式框架，要更新UI只需改变状态后通知框架页面需要重构即可，而`Element`的`markNeedsBuild()`方法正是来实现这个功能的！`markNeedsBuild()`方法会将当前的`Element`对象标记为“dirty”（脏的），在每一个Frame，Flutter都会重新构建被标记为“dirty”`Element`对象。既然如此，我们有没有办法获取到对话框内部UI的`Element`对象，然后将其标示为为“dirty”呢？答案是肯定的！我们可以通过Context来得到`Element`对象，至于`Element`与`Context`的关系我们将会在后面“Flutter核心原理”一章中再深入介绍，现在只需要简单的认为：在组件树中，`context`实际上就是`Element`对象的引用。知道这个后，那么解决的方案就呼之欲出了，我们可以通过如下方式来让复选框可以更新：

```dart
Future<bool?> showDeleteConfirmDialog4() {
  bool _withTree = false;
  return showDialog<bool>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text("提示"),
        content: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text("您确定要删除当前文件吗?"),
            Row(
              children: <Widget>[
                Text("同时删除子目录？"),
                Checkbox( // 依然使用Checkbox组件
                  value: _withTree,
                  onChanged: (bool value) {
                    // 此时context为对话框UI的根Element，我们 
                    // 直接将对话框UI对应的Element标记为dirty
                    (context as Element).markNeedsBuild();
                    _withTree = !_withTree;
                  },
                ),
              ],
            ),
          ],
        ),
        actions: <Widget>[
          TextButton(
            child: Text("取消"),
            onPressed: () => Navigator.of(context).pop(),
          ),
          TextButton(
            child: Text("删除"),
            onPressed: () {
              // 执行删除操作
              Navigator.of(context).pop(_withTree);
            },
          ),
        ],
      );
    },
  );
}
```

上面的代码运行后复选框也可以正常选中。可以看到，我们只用了一行代码便解决了这个问题！当然上面的代码并不是最优，因为我们只需要更新复选框的状态，而此时的`context`我们用的是对话框的根`context`，所以会导致整个对话框UI组件全部rebuild，因此最好的做法是将`context`的“范围”缩小，也就是说只将`Checkbox`的Element标记为`dirty`，优化后的代码为：

```dart
... //省略无关代码
Row(
  children: <Widget>[
    Text("同时删除子目录？"),
    // 通过Builder来获得构建Checkbox的`context`，
    // 这是一种常用的缩小`context`范围的方式
    Builder(
      builder: (BuildContext context) {
        return Checkbox(
          value: _withTree,
          onChanged: (bool value) {
            (context as Element).markNeedsBuild();
            _withTree = !_withTree;
          },
        );
      },
    ),
  ],
),
```

### 7.7.5 其它类型的对话框

### [#](https://book.flutterchina.club/chapter7/dailog.html#底部菜单列表)底部菜单列表

`showModalBottomSheet`方法可以弹出一个Material风格的底部菜单列表模态对话框，示例如下：

```dart
// 弹出底部菜单列表模态对话框
Future<int?> _showModalBottomSheet() {
  return showModalBottomSheet<int>(
    context: context,
    builder: (BuildContext context) {
      return ListView.builder(
        itemCount: 30,
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            title: Text("$index"),
            onTap: () => Navigator.of(context).pop(index),
          );
        },
      );
    },
  );
}
```

点击按钮，弹出该对话框：

```dart
ElevatedButton(
  child: Text("显示底部菜单列表"),
  onPressed: () async {
    int type = await _showModalBottomSheet();
    print(type);
  },
),
```

运行后效果如图7-17所示：

![图7-17](https://book.flutterchina.club/assets/img/7-17.da05101a.png)

### [#](https://book.flutterchina.club/chapter7/dailog.html#loading框)Loading框

其实Loading框可以直接通过`showDialog`+`AlertDialog`来自定义：

```dart
showLoadingDialog() {
  showDialog(
    context: context,
    barrierDismissible: false, //点击遮罩不关闭对话框
    builder: (context) {
      return AlertDialog(
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            CircularProgressIndicator(),
            Padding(
              padding: const EdgeInsets.only(top: 26.0),
              child: Text("正在加载，请稍后..."),
            )
          ],
        ),
      );
    },
  );
}
```

显示效果如图7-18所示：

![图7-18](https://book.flutterchina.club/assets/img/7-18.d0ccba9d.png)

如果我们嫌Loading框太宽，想自定义对话框宽度，这时只使用`SizedBox`或`ConstrainedBox`是不行的，原因是`showDialog`中已经给对话框设置了最小宽度约束，根据我们在第五章“尺寸限制类容器”一节中所述，我们可以使用`UnconstrainedBox`先抵消`showDialog`对宽度的约束，然后再使用`SizedBox`指定宽度，代码如下：

```dart
... //省略无关代码
UnconstrainedBox(
  constrainedAxis: Axis.vertical,
  child: SizedBox(
    width: 280,
    child: AlertDialog(
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          CircularProgressIndicator(value: .8,),
          Padding(
            padding: const EdgeInsets.only(top: 26.0),
            child: Text("正在加载，请稍后..."),
          )
        ],
      ),
    ),
  ),
);
```

代码运行后，效果如图7-19所示：

![图7-19](https://book.flutterchina.club/assets/img/7-19.4c3306a3.png)

### [#](https://book.flutterchina.club/chapter7/dailog.html#日历选择)日历选择

我们先看一下Material风格的日历选择器，如图7-20所示：

![图7-20](https://book.flutterchina.club/assets/img/7-20.f8ec9897.png)

实现代码：

```dart
Future<DateTime?> _showDatePicker1() {
  var date = DateTime.now();
  return showDatePicker(
    context: context,
    initialDate: date,
    firstDate: date,
    lastDate: date.add( //未来30天可选
      Duration(days: 30),
    ),
  );
}
```

iOS风格的日历选择器需要使用`showCupertinoModalPopup`方法和`CupertinoDatePicker`组件来实现：

```dart
Future<DateTime?> _showDatePicker2() {
  var date = DateTime.now();
  return showCupertinoModalPopup(
    context: context,
    builder: (ctx) {
      return SizedBox(
        height: 200,
        child: CupertinoDatePicker(
          mode: CupertinoDatePickerMode.dateAndTime,
          minimumDate: date,
          maximumDate: date.add(
            Duration(days: 30),
          ),
          maximumYear: date.year + 1,
          onDateTimeChanged: (DateTime value) {
            print(value);
          },
        ),
      );
    },
  );
}
```

运行效果如图7-21所示：

![图7-21](https://book.flutterchina.club/assets/img/7-21.d3d1d15f.png)

## 8.2 手势识别

本节先介绍一些Flutter中用于处理手势的`GestureDetector`和`GestureRecognizer`，然后再仔细讨论一下手势竞争与冲突问题。

### [#](https://book.flutterchina.club/chapter8/gesture.html#_8-2-1-gesturedetector)8.2.1 GestureDetector

`GestureDetector`是一个用于手势识别的功能性组件，我们通过它可以来识别各种手势。`GestureDetector` 内部封装了 Listener，用以识别语义化的手势，接下来我们详细介绍一下各种手势的识别。

### [#](https://book.flutterchina.club/chapter8/gesture.html#点击、双击、长按)点击、双击、长按

我们通过`GestureDetector`对`Container`进行手势识别，触发相应事件后，在`Container`上显示事件名，为了增大点击区域，将`Container`设置为200×100，代码如下：

```dart
class _GestureTestState extends State<GestureTest> {
  String _operation = "No Gesture detected!"; //保存事件名
  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        child: Container(
          alignment: Alignment.center,
          color: Colors.blue,
          width: 200.0,
          height: 100.0,
          child: Text(
            _operation,
            style: TextStyle(color: Colors.white),
          ),
        ),
        onTap: () => updateText("Tap"), //点击
        onDoubleTap: () => updateText("DoubleTap"), //双击
        onLongPress: () => updateText("LongPress"), //长按
      ),
    );
  }

  void updateText(String text) {
    //更新显示的事件名
    setState(() {
      _operation = text;
    });
  }
}
```

运行效果如图8-2所示：

![图8-2](https://book.flutterchina.club/assets/img/8-2.52bd91bd.png)

> **注意**： 当同时监听`onTap`和`onDoubleTap`事件时，当用户触发tap事件时，会有200毫秒左右的延时，这是因为当用户点击完之后很可能会再次点击以触发双击事件，所以`GestureDetector`会等一段时间来确定是否为双击事件。如果用户只监听了`onTap`（没有监听`onDoubleTap`）事件时，则没有延时。

### [#](https://book.flutterchina.club/chapter8/gesture.html#拖动、滑动)拖动、滑动

一次完整的手势过程是指用户手指按下到抬起的整个过程，期间，用户按下手指后可能会移动，也可能不会移动。`GestureDetector`对于拖动和滑动事件是没有区分的，他们本质上是一样的。`GestureDetector`会将要监听的组件的原点（左上角）作为本次手势的原点，当用户在监听的组件上按下手指时，手势识别就会开始。下面我们看一个拖动圆形字母A的示例：

```dart
class _Drag extends StatefulWidget {
  @override
  _DragState createState() => _DragState();
}

class _DragState extends State<_Drag> with SingleTickerProviderStateMixin {
  double _top = 0.0; //距顶部的偏移
  double _left = 0.0;//距左边的偏移

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top: _top,
          left: _left,
          child: GestureDetector(
            child: CircleAvatar(child: Text("A")),
            //手指按下时会触发此回调
            onPanDown: (DragDownDetails e) {
              //打印手指按下的位置(相对于屏幕)
              print("用户手指按下：${e.globalPosition}");
            },
            //手指滑动时会触发此回调
            onPanUpdate: (DragUpdateDetails e) {
              //用户手指滑动时，更新偏移，重新构建
              setState(() {
                _left += e.delta.dx;
                _top += e.delta.dy;
              });
            },
            onPanEnd: (DragEndDetails e){
              //打印滑动结束时在x、y轴上的速度
              print(e.velocity);
            },
          ),
        )
      ],
    );
  }
}
```

运行后，就可以在任意方向拖动了，运行效果如图8-3所示：

![图8-3](https://book.flutterchina.club/assets/img/8-3.975afea6.png)

日志：

```text
I/flutter ( 8513): 用户手指按下：Offset(26.3, 101.8)
I/flutter ( 8513): Velocity(235.5, 125.8)
```

代码解释：

- `DragDownDetails.globalPosition`：当用户按下时，此属性为用户按下的位置相对于**屏幕**（而非父组件）原点(左上角)的偏移。
- `DragUpdateDetails.delta`：当用户在屏幕上滑动时，会触发多次Update事件，`delta`指一次Update事件的滑动的偏移量。
- `DragEndDetails.velocity`：该属性代表用户抬起手指时的滑动速度(包含x、y两个轴的），示例中并没有处理手指抬起时的速度，常见的效果是根据用户抬起手指时的速度做一个减速动画。

### [#](https://book.flutterchina.club/chapter8/gesture.html#单一方向拖动)单一方向拖动

在本示例中，是可以朝任意方向拖动的，但是在很多场景，我们只需要沿一个方向来拖动，如一个垂直方向的列表，`GestureDetector`可以只识别特定方向的手势事件，我们将上面的例子改为只能沿垂直方向拖动：

```dart
class _DragVertical extends StatefulWidget {
  @override
  _DragVerticalState createState() => _DragVerticalState();
}

class _DragVerticalState extends State<_DragVertical> {
  double _top = 0.0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top: _top,
          child: GestureDetector(
            child: CircleAvatar(child: Text("A")),
            //垂直方向拖动事件
            onVerticalDragUpdate: (DragUpdateDetails details) {
              setState(() {
                _top += details.delta.dy;
              });
            },
          ),
        )
      ],
    );
  }
}
```

这样就只能在垂直方向拖动了，如果只想在水平方向滑动同理。

### [#](https://book.flutterchina.club/chapter8/gesture.html#缩放)缩放

`GestureDetector`可以监听缩放事件，下面示例演示了一个简单的图片缩放效果：

```dart
class _Scale extends StatefulWidget {
  const _Scale({Key? key}) : super(key: key);

  @override
  _ScaleState createState() => _ScaleState();
}

class _ScaleState extends State<_Scale> {
  double _width = 200.0; //通过修改图片宽度来达到缩放效果

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        //指定宽度，高度自适应
        child: Image.asset("./images/sea.png", width: _width),
        onScaleUpdate: (ScaleUpdateDetails details) {
          setState(() {
            //缩放倍数在0.8到10倍之间
            _width=200*details.scale.clamp(.8, 10.0);
          });
        },
      ),
    );
  }
}
```

运行效果如图8-4所示：

![图8-4](https://book.flutterchina.club/assets/img/8-4.6948ddf4.png)

现在在图片上双指张开、收缩就可以放大、缩小图片。本示例比较简单，实际中我们通常还需要一些其它功能，如双击放大或缩小一定倍数、双指张开离开屏幕时执行一个减速放大动画等，读者可以在学习完后面“动画”一章中的内容后自己来尝试实现一下。

### [#](https://book.flutterchina.club/chapter8/gesture.html#_8-2-2-gesturerecognizer)8.2.2 GestureRecognizer

`GestureDetector`内部是使用一个或多个`GestureRecognizer`来识别各种手势的，而`GestureRecognizer`的作用就是通过`Listener`来将原始指针事件转换为语义手势，`GestureDetector`直接可以接收一个子widget。`GestureRecognizer`是一个抽象类，一种手势的识别器对应一个`GestureRecognizer`的子类，Flutter实现了丰富的手势识别器，我们可以直接使用。

#### [#](https://book.flutterchina.club/chapter8/gesture.html#示例)示例

假设我们要给一段富文本（`RichText`）的不同部分分别添加点击事件处理器，但是`TextSpan`并不是一个widget，这时我们不能用`GestureDetector`，但`TextSpan`有一个`recognizer`属性，它可以接收一个`GestureRecognizer`。

假设我们需要在点击时给文本变色:

```dart
import 'package:flutter/gestures.dart';

class _GestureRecognizer extends StatefulWidget {
  const _GestureRecognizer({Key? key}) : super(key: key);

  @override
  _GestureRecognizerState createState() => _GestureRecognizerState();
}

class _GestureRecognizerState extends State<_GestureRecognizer> {
  TapGestureRecognizer _tapGestureRecognizer = TapGestureRecognizer();
  bool _toggle = false; //变色开关

  @override
  void dispose() {
    //用到GestureRecognizer的话一定要调用其dispose方法释放资源
    _tapGestureRecognizer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text.rich(
        TextSpan(
          children: [
            TextSpan(text: "你好世界"),
            TextSpan(
              text: "点我变色",
              style: TextStyle(
                fontSize: 30.0,
                color: _toggle ? Colors.blue : Colors.red,
              ),
              recognizer: _tapGestureRecognizer
                ..onTap = () {
                  setState(() {
                    _toggle = !_toggle;
                  });
                },
            ),
            TextSpan(text: "你好世界"),
          ],
        ),
      ),
    );
  }
}
```

运行效果如图8-5所示：

![图8-5](https://book.flutterchina.club/assets/img/8-5.ba487ffd.png)

> 注意：使用`GestureRecognizer`后一定要调用其`dispose()`方法来释放资源（主要是取消内部的计时器）。









*************************************

# Dart语法

> 在 Dart 中一切皆为对象

每个应用都有一个 `main()` 函数。你可以使用顶层函数 `print()` 来将一段文本输出显示到控制台：

 ```dart
void main() {
   print('Hello, World!');
 }
 ```

## 变量

### 声明变量

下面的示例代码将创建一个变量并将其初始化：

```dart
var name = 'Bob';
```

变量仅存储对象的引用。这里名为 `name` 的变量存储了一个 `String` 类型对象的引用，“Bob” 则是该对象的值。

### 类型声明

`name` 变量的类型被推断为 `String`，但是你可以为其指定类型。如果一个对象的引用不局限于单一的类型，可以将其指定为 `Object`（或 `dynamic`）类型。

```dart
Object name = 'Bob';
```

除此之外你也可以指定类型()：

```dart
String name = 'Bob';
```

 **备忘:**

> 通过 `var` 声明局部变量而非使用指定的类型。

Dart 语言已支持健全的空安全机制！

### 空安全

当你选择使用空安全（null safety）时，代码中的类型将默认是非空的，意味着 **除非你声明它们可空**，它们的值都不能为空。有了空安全，原本处于你的 **运行时** 的空值引用错误将变为 **编辑时** 的分析错误。

有了空安全，下面代码中所有的变量都是非空的：

```
// In null-safe Dart, none of these can ever be null.
var i = 42; // Inferred to be an int.
String name = getFileName();
final b = Foo();
```

若你想让变量可以为 `null`，只需要在类型声明后加上 `?`。

```
int? aNullableInt = null;
```

### 默认值

在 Dart 中，未初始化以及可空类型的变量拥有一个默认的初始值 `null`。（如果你未迁移至 [空安全](https://dart.cn/null-safety)，所有变量都为可空类型。）即便数字也是如此，因为在 Dart 中一切皆为对象，数字也不例外。

```dart
int? lineCount;
assert(lineCount == null);
```

 **备忘:**

> `assert()` 的调用将会在生产环境的代码中被忽略掉。在开发过程中，`assert(*condition*)` 将会在 **条件判断** 为 false 时抛出一个异常。

### 何时赋值

如果启用了空安全，在使用变量前必须为它赋值。

```dart
int lineCount = 0;
```

不必在声明变量时就为它赋值，但必须在它被使用前赋值，举例：

```dart
//以下代码是有效的，因为Dart能在lineCount传给print()时检测到lineCount不为空
int lineCount;

if (weLikeToCount) {
  lineCount = countLines();
} else {
  lineCount = 0;
}

print(lineCount);
```

> **备忘**：顶级和类变量被延迟初始化； 初始化代码在第一次使用该变量时运行。

### late 变量

Dart 2.12 添加了 late 修饰符，它有两个使用场景：

1. 声明一个不可为空的变量，并在声明之后为它赋值。

2. 延迟地赋值一个变量。

通常 Dart 的控制流分析可以检测到一个不可为空的变量在使用之前何时设置为非空值，但有时分析会失败。 两种常见的情况是顶级变量和实例变量： Dart 经常无法确定它们是否被设置，所以它不会尝试。

如果您确定变量在使用之前已设置，但 Dart 不同意，您可以通过将变量标记为`late`来修复错误：

```dart
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```

如果您未能赋值late变量，则在使用该变量时会发生运行错误。

当你标记一个变量为late变量时，并在声明的同时为它赋值，此赋值程序会在该变量第一次被使用时运行。这种延迟初始化在以下几种情况下很方便：

1. 该变量可能不需要，并且初始化它的成本很高。
2. 你正在初始化一个实例变量，它的初始化器需要访问`this`。

以下例子：如果`temperature`变量不被使用，则复杂的`_readThermometer()`函数不会被调用。

```dart
// This is the program's only call to _readThermometer().
late String temperature = _readThermometer(); // Lazily initialized.
```

###  final 和 const

如果你不想更改一个变量，可以使用关键字 `final` 或者 `const` 修饰变量，这两个关键字可以替代 `var` 关键字或者加在一个具体的类型前。一个 final 变量只可以被赋值一次；一个 const 变量是一个编译时常量（const 变量同时也是 final 的）。顶层的 final 变量或者类的 final 变量在其第一次使用的时候被初始化。

> [实例变量](https://dart.cn/guides/language/language-tour#instance-variables) 可以是 `final` 的但不可以是 `const`，

下面的示例中我们创建并设置两个 `final` 变量：

```dart
final name = 'Bob'; // 不使用类型声明
final String nickname = 'Bobby'; // 使用类型声明
```

你不能修改一个 final 变量的值：

```dart
name = 'Alice'; // Error: a final variable can only be set once.
```

使用关键字 `const` 修饰变量表示该变量为 **编译时常量**。如果使用 const 修饰类中的变量，则必须加上 static 关键字，即 `static const`（译者注：顺序不能颠倒）。在声明 const 变量时可以直接为其赋值，也可以使用其它的 const 变量为其赋值：

```dart
const bar = 1000000; // 压力单位
const double atm = 1.01325 * bar; // 标准大气
```

`const` 关键字不仅仅可以用来定义常量，还可以用来创建 **常量值**，该常量值可以赋予给任何变量。你也可以将构造函数声明为 const 的，这种类型的构造函数创建的对象是不可改变的。

```dart
var foo = const [];
final bar = const [];
const baz = []; // 相当于`const []`
```

如果使用初始化表达式为常量赋值可以省略掉关键字 `const`，比如上面的常量 `baz` 的赋值就省略掉了 `const`。

没有使用 final 或 const 修饰的变量的值是可以被更改的，即使这些变量之前引用过 `const` 的值。

```dart
foo = [1, 2, 3]; // Was const []
```

常量的值不可以被修改：

```dart
baz = [42]; // Error: Constant variables can't be assigned a value.
```

你可以在常量中使用 [类型检查和强制类型转换](https://dart.cn/guides/language/language-tour#type-test-operators) (`is` 和 `as`)、 [集合中的 `if`](https://dart.cn/guides/language/language-tour#collection-operators) 以及 [展开操作符](https://dart.cn/guides/language/language-tour#spread-operator) (`...` 和 `...?`)：

```dart
const Object i = 3; // Where i is a const Object with an int value...
const list = [i as int]; // 类型转换
const map = {if (i is int) i: 'int'}; // 使用 is 和 集合 if。
const set = {if (list is List<int>) ...list}; // ...扩展运算符
```

>  **备忘:** 虽然`final`对象无法修改，但其字段可以更改。 相比之下，const 对象及其字段不能更改：它们是不可变的。

##  内置类型

Dart 语言支持下列内容：

- [Numbers](https://dart.cn/guides/language/language-tour#numbers) (`int`, `double`)
- [Strings](https://dart.cn/guides/language/language-tour#strings) (`String`)
- [Booleans](https://dart.cn/guides/language/language-tour#booleans) (`bool`)
- [Lists](https://dart.cn/guides/language/language-tour#lists) (也被称为 *arrays*)
- [Sets](https://dart.cn/guides/language/language-tour#sets) (`Set`)
- [Maps](https://dart.cn/guides/language/language-tour#maps) (`Map`)
- [Runes](https://dart.cn/guides/language/language-tour#characters) (常用于在 `Characters` API 中进行字符替换)
- [Symbols](https://dart.cn/guides/language/language-tour#symbols) (`Symbol`)
- The value `null` (`Null`)

使用字面量来创建对象也受到支持。例如 `'This is a string'` 是一个字符串字面量，`true` 是一个布尔字面量。

由于 Dart 中每个变量引用都指向一个对象（一个 **类** 的实例），通常也可以使用 **构造器** 来初始化变量。一些内置的类型有它们自己的构造器。例如你可以使用 `Map()` 来创建一个 map 对象。

其他一些类型在 Dart 语言中也有特殊的作用：

- Object：除 Null 之外的所有 Dart 类的超类。
- Future 和 Stream：用于异步支持。
- Iterable：用于 for-in 循环和同步生成器函数。
- Never：表示表达式永远无法成功完成求值。 最常用于总是抛出异常的函数。
- dynamic：表示您要禁用静态检查。 通常你应该使用`Object`还是`Object？` 代替。
- `void`: 表示从不使用某个值。 通常用作返回类型。

Object、Object?、Null 和 Never 类在类层次结构中具有特殊角色，[深入理解空安全](https://dart.cn/null-safety/understanding-null-safety)。

### Numbers

- int 整数值；长度不超过 64 位，具体取值范围 [依赖于不同的平台](https://dart.cn/guides/language/numbers)。

- double 64 位的双精度浮点数字，即带小数点，且符合 IEEE 754 标准。

- num 可以是整数也可以是浮点数。

  `int` 和 `double` 都是 [`num`](https://api.dart.cn/stable/dart-core/num-class.html) 的子类。 num 中定义了一些基本的运算符比如 +、-、*、/ 等，还定义了 `abs()`、`ceil()` 和 `floor()` 等方法（位运算符，比如 >> 定义在 int 中）。如果 num 及其子类不满足你的要求，可以查看 [dart:math](https://api.dart.cn/stable/dart-math) 库中的 API。

下面是字符串和数字之间转换的方式：

```dart
// String -> int 调用int.parse()方法
var one = int.parse('1');
assert(one == 1);

// String -> double 调用double.parse()方法
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String 数值直接调用toString()方法
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String 数值直接调用toStringAsFixed()方法，参数表示保留几位小数
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

###  Strings

Dart 字符串（`String` 对象）包含了 UTF-16 编码的字符序列。可以使用单引号或者双引号来创建字符串：

```dart
// 代码中文解释
var s1 = '使用单引号创建字符串字面量。';
var s2 = "双引号也可以用于创建字符串字面量。";
var s3 = '使用单引号创建字符串时可以使用斜杠来转义那些与单引号冲突的字符串：\'。';
var s4 = "而在双引号中则不需要使用转义与单引号冲突的字符串：'";
```

在字符串中，请以 `${`*`表达式`*`}` 的形式使用表达式，如果表达式是一个标识符，可以省略掉 {}。如果表达式的结果为一个对象，则 Dart 会调用该对象的 `toString` 方法来获取一个字符串。

```dart
// 代码中文解释
var s = '字符串插值';

assert('Dart 有$s，使用起来非常方便。' == 'Dart 有字符串插值，使用起来非常方便。');
assert('使用${s.substring(3,5)}表达式也非常方便' == '使用插值表达式也非常方便。');
```

> **备忘:**`==` 运算符负责判断两个对象的内容是否一样，如果两个字符串包含一样的字符编码序列，则表示相等。

你可以使用 `+` 运算符或并列放置多个字符串来连接字符串：

```dart
// 代码中文解释
var s1 = '可以拼接'
    '字符串'
    "即便它们不在同一行。";
assert(s1 == '可以拼接字符串即便它们不在同一行。');

var s2 = '使用加号 + 运算符' + '也可以达到相同的效果。';
assert(s2 == '使用加号 + 运算符也可以达到相同的效果。');
```

使用三个单引号或者三个双引号也能创建多行字符串：

```dart
// 代码中文解释
var s1 = '''
你可以像这样创建多行字符串。
''';
var s2 = """这也是一个多行字符串。""";
```

在字符串前加上 `r` 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）：

```dart
// 代码中文解释
var s = r'在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。';
```

字符串字面量是一个编译时常量，只要是编译时常量 (null、数字、字符串、布尔) 都可以作为字符串字面量的插值表达式：

```dart
// These work in a const string.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// These do NOT work in a const string.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';这是无效的字符串常量因为引用的是变量
```

### 布尔类型

Dart 使用 `bool` 关键字表示布尔类型，布尔类型只有两个对象 `true` 和 `false`，两者都是编译时常量。

Dart 的类型安全不允许你使用类似 `if (*nonbooleanValue*)` 或者 `assert (*nonbooleanValue*)` 这样的代码检查布尔值。相反，你应该总是显示地检查布尔值，比如像下面的代码这样：

```dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

### Lists

数组 (**Array**) 是几乎所有编程语言中最常见的集合类型，在 Dart 中数组由 [`List`](https://api.dart.cn/stable/dart-core/List-class.html) 对象表示。通常称之为 **List**。

Dart 中 List 字面量看起来与 JavaScript 中数组字面量一样。下面是一个 Dart List 的示例：

```dart
var list = [1, 2, 3];
```

> **备忘:**这里 Dart 推断出 `list` 的类型为 `List<int>`，如果往该数组中添加一个非 int 类型的对象则会报错。`List<String>`（读作“字符串类型的 list”）

你可以在 Dart 的集合类型的最后一个项目后添加逗号。这个尾随逗号并不会影响集合，但它能有效避免「复制粘贴」的错误。

```dart
var list = [
  'Car',
  'Boat',
  'Plane',
];
```

List 的下标索引从 0 开始，第一个元素的下标为 0，最后一个元素的下标为 `list.length - 1`。你可以像 JavaScript 中的用法那样获取 Dart 中 List 的长度以及元素：

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

在 List 字面量前添加 `const` 关键字会创建一个编译时常量：

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // 此行将导致错误.
```

Dart 在 2.3 引入了 **扩展操作符**（`...`）和 **空感知扩展操作符**（`...?`），它们提供了一种将多个元素插入集合的简洁方法。

例如，你可以使用扩展操作符（`...`）将一个 List 中的所有元素插入到另一个 List 中：

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

如果扩展操作符右边可能为 null ，你可以使用 null-aware 扩展操作符（`...?`）来避免产生异常：

```dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```

Dart 还同时引入了 **集合中的 if** 和 **集合中的 for** 操作，在构建集合时，可以使用条件判断 (`if`) 和循环 (`for`)。

下面示例是使用 **集合中的 if** 来创建一个 List 的示例，它可能包含 3 个或 4 个元素：

```dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```

下面是使用 **集合中的 for** 将列表中的元素修改后添加到另一个列表中的示例：

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
```

如语言概览中介绍，[lists](https://dart.cn/guides/libraries/library-tour#lists) 可以通过字面量来创建和初始化。另外，也可以使用 List 的构造函数。 List 类还定义了若干方法，用于向列表添加或删除项目。

```dart
// 创建一个空的字符串类型的list
var grains = <String>[];
assert(grains.isEmpty);

// 使用list字面量创建一个list
var fruits = ['apples', 'oranges'];

// 向一个list中添加一个元素
fruits.add('kiwis');

// 向一个list中添加多个元素
fruits.addAll(['grapes', 'bananas']);

// 获取一个list的长度
assert(fruits.length == 5);

// 删除单个元素
var appleIndex = fruits.indexOf('apples'); //获取指定元素的索引值
fruits.removeAt(appleIndex); //删除
assert(fruits.length == 4);

// 删除一个list中所有的元素
fruits.clear();
assert(fruits.isEmpty);

// 使用List.filled()构造函数创建一个list
var vegetables = List.filled(99, 'broccoli');
assert(vegetables.every((v) => v == 'broccoli'));
```

使用 `indexOf()` 方法查找一个对象在 list 中的下标值。

```dart
var fruits = ['apples', 'oranges'];

// Access a list item by index.
assert(fruits[0] == 'apples');

// Find an item in a list.
assert(fruits.indexOf('apples') == 0);
```

使用 `sort()` 方法排序一个 list 。你可以提供一个排序函数用于比较两个对象。比较函数在 *小于* 时返回 \ <0，*相等* 时返回 0，*bigger* 时返回 > 0 。下面示例中使用 `compareTo()` 函数，该函数在 [Comparable](https://api.dart.cn/stable/dart-core/Comparable-class.html) 中定义，并被 String 类实现。

```dart
var fruits = ['bananas', 'apples', 'oranges'];

// Sort a list.
fruits.sort((a, b) => a.compareTo(b));
assert(fruits[0] == 'apples');
```

列表是参数化类型（[泛型](https://dart.cn/guides/language/language-tour#generics)），因此可以指定 list 应该包含的元素类型：

```dart
// 这个list仅包含字符串类型元素
var fruits = <String>[];

fruits.add('apples');
var fruit = fruits[0];
assert(fruit is String);
fruits.add(5); // Error: 'int' 不能分配给 'String'
```

> **备忘:**在大多数情况下，你不需要显式指定泛型，因为 Dart 帮你会 [推断](https://dart.cn/guides/language/type-system#type-inference) 它们的类型。类似于 `['Dash', 'Dart']` 这样的 list 很容易可以推断为 `List<String>`。
>
> 但有些时候你 **需要** 指定泛型。比如：Dart 无法从 `[]` 中推断出任何类型，它可以是任何类型元素的组合。这时推断的类型基本不会是你想要的，所以你需要写下 `<String>[]` 或者 `<Person>[]` 这样的类型声明。

泛型

如果你查看数组的 API 文档，你会发现数组 [`List`](https://api.dart.cn/stable/dart-core/List-class.html) 的实际类型为 `List<E>`。 <…> 符号表示数组是一个 *泛型*（或 *参数化类型*） [通常](https://dart.cn/guides/language/effective-dart/design#do-follow-existing-mnemonic-conventions-when-naming-type-parameters) 使用一个字母来代表类型参数，比如 E、T、S、K 和 V 等等。

为什么使用泛型？

泛型常用于需要要求类型安全的情况，但是它也会对代码运行有好处：

- 适当地指定泛型可以更好地帮助代码生成。
- 使用泛型可以减少代码重复。

比如你想声明一个只能包含 String 类型的数组，你可以将该数组声明为 `List<String>`（读作“字符串类型的 list”），这样的话就可以很容易避免因为在该数组放入非 String 类变量而导致的诸多问题，同时编译器以及其他阅读代码的人都可以很容易地发现并定位问题：

```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

###  Sets

在 Dart 中，set 是一组特定元素的**无序集合**。 Dart 支持的集合由集合的字面量和 [`Set`](https://api.dart.cn/stable/dart-core/Set-class.html) 类提供。

下面是使用 Set 字面量来创建一个 Set 集合的方法：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

> **备忘:**Dart 推断 `halogens` 变量是一个 `Set<String>` 类型的集合，如果往该 Set 中添加类型不正确的对象则会报错。

可以使用在 `{}` 前加上类型参数的方式创建一个空的 Set，或者将 `{}` 赋值给一个 Set 类型的变量：

```dart
var names = <String>{};
// Set<String> names = {}; // This works, too.
// var names = {}; // 创建的是一个Map,不是set
```

> **Set 还是 map?** Map 字面量语法相似于 Set 字面量语法。因为先有的 Map 字面量语法，所以 `{}` 默认是 `Map` 类型。如果忘记在 `{}` 上注释类型或赋值到一个未声明类型的变量上，那么 Dart 会创建一个类型为 `Map<dynamic, dynamic>` 的对象。

使用 `add()` 方法或 `addAll()` 方法向已存在的 Set 中添加项目：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

使用 `.length` 可以获取 Set 中元素的数量：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

可以在 Set 变量前添加 `const` 关键字创建一个 Set 编译时常量：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // 这一行会造成异常
```

从 Dart 2.3 开始，Set 可以像 List 一样支持使用扩展操作符（`...` 和 `...?`）以及 集合`if` 和 `for` 操作。

### Maps

通常来说，Map 是用来关联 keys 和 values 的对象。其中键和值都可以是任何类型的对象。每个 *键* 只能出现一次但是 *值* 可以重复出现多次。 Dart 中 Map 提供了 Map 字面量以及 [`Map`](https://api.dart.cn/stable/dart-core/Map-class.html) 类型两种形式的 Map。

下面是一对使用 Map 字面量创建 Map 的例子：

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

> **备忘:**Dart 将 `gifts` 变量的类型推断为 `Map<String, String>`，而将 `nobleGases` 的类型推断为 `Map<int, String>`。如果你向这两个 Map 对象中添加不正确的类型值，将导致运行时异常。

你也可以使用 Map 的构造器创建 Map：

```dart
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

> 可以使用 `new Map()` 构造 Map 对象。但是在 Dart 中，`new` 关键词是可选的。(译者注：且不被建议使用) 

向现有的 Map 中添加键值对与 JavaScript 的操作类似：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // Add a key-value pair
```

从一个 Map 中获取一个值的操作也与 JavaScript 类似：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```

如果检索的 Key 不存在于 Map 中则会返回一个 null：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```

使用 `.length` 可以获取 Map 中键值对的数量：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

在一个 Map 字面量前添加 `const` 关键字可以创建一个 Map 编译时常量：

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // This line will cause an error.
```

Map 可以像 List 一样支持使用扩展操作符（`...` 和 `...?`）以及集合的 if 和 for 操作。

### Runes （特殊符号）与 grapheme clusters（字符集）

在 Dart 中，[runes](https://api.dart.cn/stable/dart-core/Runes-class.html) 公开了字符串的 Unicode 码位。使用 [characters 包](https://pub.flutter-io.cn/packages/characters) 来访问或者操作用户感知的字符，也被称为 [Unicode (扩展) grapheme clusters](https://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)。

Unicode 编码为每一个字母、数字和符号都定义了一个唯一的数值。因为 Dart 中的字符串是一个 UTF-16 的字符序列，所以如果想要表示 32 位的 Unicode 数值则需要一种特殊的语法。

表示 Unicode 字符的常见方式是使用 `\uXXXX`，其中 XXXX 是一个四位数的 16 进制数字。例如心形字符（♥）的 Unicode 为 `\u2665`。对于不是四位数的 16 进制数字，需要使用大括号将其括起来。例如大笑的 emoji 表情（😆）的 Unicode 为 `\u{1f600}`。

如果你需要读写单个 Unicode 字符，可以使用 characters 包中定义的 `characters` getter。它将返回 [`Characters`](https://pub.flutter-io.cn/documentation/characters/latest/characters/Characters-class.html) 对象作为一系列 grapheme clusters 的字符串。下面是使用 characters API 的样例：

```
import 'package:characters/characters.dart';
...
var hi = 'Hi 🇩🇰';
print(hi);
print('The end of the string: ${hi.substring(hi.length - 1)}');
print('The last character: ${hi.characters.last}\n');
```

输出取决于你的环境，大致类似于：

```
$ dart run bin/main.dart
Hi 🇩🇰
The end of the string: ???
The last character: 🇩🇰
```

有关使用 characters 包操作字符串的详细信息，请参阅用于 characters 包的[样例](https://pub.flutter-io.cn/packages/characters/example) 和 [API 参考](https://pub.flutter-io.cn/documentation/characters)。

###  Symbols

[`Symbol`](https://api.dart.cn/stable/dart-core/Symbol-class.html) 表示 Dart 中声明的操作符或者标识符。你几乎不会需要 Symbol，但是它们对于那些通过名称引用标识符的 API 很有用，因为代码压缩后，尽管标识符的名称会改变，但是它们的 Symbol 会保持不变。

可以使用在标识符前加 `#` 前缀来获取 Symbol：

```nocode
#radix
#bar
```

Symbol 字面量是编译时常量。

## 函数

Dart 是一种真正面向对象的语言，所以即便函数也是对象并且类型为 [Function](https://api.dart.cn/stable/dart-core/Function-class.html)，这意味着函数可以被赋值给变量或者作为其它函数的参数。你也可以像调用函数一样调用 Dart 类的实例。详情请查阅 [可调用的类](https://dart.cn/guides/language/language-tour#callable-classes)。

下面是定义一个函数的例子：

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

虽然高效 Dart 指南建议在 [公开的 API 上定义返回类型](https://dart.cn/guides/language/effective-dart/design#prefer-type-annotating-public-fields-and-top-level-variables-if-the-type-isnt-obvious)，不过即便不定义，该函数也依然有效：

```dart
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

如果函数体内只包含一个表达式，你可以使用简写语法：

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

语法 `=> *表达式*` 是 `{ return *表达式*; }` 的简写， `=>` 有时也称之为 **箭头** 函数。

> **备忘:**在 => 与 ; 之间的只能是 *表达式* 而非 *语句*。比如你不能将一个 [if语句](https://dart.cn/guides/language/language-tour#if-and-else) 放在其中，但是可以放置 [条件表达式](https://dart.cn/guides/language/language-tour#conditional-expressions)。

### 参数

函数可以有两种形式的参数：**必要参数** 和 **可选参数**。必要参数定义在参数列表前面，可选参数则定义在必要参数后面。可选参数可以是 **命名的** 或 **位置的**。

> **备忘:**某些 API（特别是 [Flutter](https://flutter.cn/) 控件的构造器）只使用命名参数，即便参数是强制性的。

向函数传入参数或者定义函数参数时，可以使用 [尾逗号](https://dart.cn/guides/language/language-tour#trailing-comma)。

#### 命名参数

命名参数默认为可选参数，除非他们被特别标记为 `required`。

当你调用函数时，可以使用 `参数名: 参数值` 的形式来指定命名参数。例如：

```dart
enableFlags(bold: true, hidden: false);
```

定义函数时，使用 `{参数1, 参数2, …}` 来指定命名参数：

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold, bool? hidden}) {...}
```

> **小提示:**如果一个参数是可选参数但不能为空，可以提供一个默认值

虽然命名参数是可选参数的一种类型，但是你仍然可以使用 `required` 来标识一个命名参数是必须的参数，此时调用者必须为该参数提供一个值。例如：

```dart
const Scrollbar({Key? key, required Widget child})
```

如果调用者想要通过 `Scrollbar` 的构造函数构造一个 Scrollbar 对象而不提供 `child` 参数，则会导致编译错误。

#### 可选的位置参数

使用 `[]` 将一系列参数包裹起来作为位置参数：

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

下面是不使用可选参数调用上述函数的示例

```dart
assert(say('Bob', 'Howdy') == 'Bob says Howdy');
```

下面是使用可选参数调用上述函数的示例：

```dart
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
```

#### 默认参数值

可以用 `=` 为函数的命名参数和位置参数定义默认值，默认值必须为编译时常量，没有指定默认值的情况下默认值为 `null`。

下面是设置可选参数默认值示例：

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```



> 在老版本的 Dart 代码中会使用冒号（`:`）而不是 `=` 来设置命名参数的默认值。原因在于刚开始的时候命名参数只支持 `:`。不过现在这个支持已经过时，所以我们建议你现在仅 **[使用 `=` 来指定默认值](https://dart.cn/guides/language/effective-dart/usage#do-use--to-separate-a-named-parameter-from-its-default-value)**。

下一个示例将向你展示如何为位置参数设置默认值：

```dart
String say(String from, String msg,
    [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
```

List 或 Map 同样也可以作为默认值。下面的示例定义了一个名为 `doStuff()` 的函数，并为其名为 `list` 和 `gifts` 的参数指定了一个 List 类型的值和 Map 类型的值。

```dart
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
```

### main() 函数

每个 Dart 程序都必须有一个 `main()` 顶级函数作为程序的入口， `main()` 函数返回值为 `void` 并且有一个 `List<String>` 类型的可选参数。

下面是一个简单 `main()` 函数：

```dart
void main() {
  print('Hello, World!');
}
```

下面是使用命令行访问带参数的 `main()` 函数示例：

```dart
// Run the app like this: dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```

你可以通过使用 [参数库](https://pub.flutter-io.cn/packages/args) 来定义和解析命令行参数。

### 函数是一级对象

可以将函数作为参数传递给另一个函数。例如：

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```

你也可以将函数赋值给一个变量，比如：

```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

该示例中使用了匿名函数。下一节会有更多与其相关的介绍。

### 匿名函数

大多数方法都是有名字的，比如 `main()` 或 `printElement()`。你可以创建一个没有名字的方法，称之为 **匿名函数**、 **Lambda 表达式** 或 **Closure 闭包**。你可以将匿名方法赋值给一个变量然后使用它，比如将该变量添加到集合或从中删除。

匿名方法看起来与命名方法类似，在括号之间可以定义参数，参数之间用逗号分割。

后面大括号中的内容则为函数体：

```
([[*类型*] *参数*[, …]]) { *函数体*;};
```

下面代码定义了只有一个参数 `item` 且没有参数类型的匿名方法。 List 中的每个元素都会调用这个函数，打印元素位置和值的字符串：

```dart
const list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
```

### 词法作用域

Dart 是词法有作用域语言，变量的作用域在写代码的时候就确定了，大括号内定义的变量只能在大括号内访问，与 Java 类似。

下面是一个嵌套函数中变量在多个作用域中的示例：

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

注意 `nestedFunction()` 函数可以访问包括顶层变量在内的所有的变量。

### 词法闭包

**闭包** 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

函数可以封闭定义到它作用域内的变量。接下来的示例中，函数 `makeAdder()` 捕获了变量 `addBy`。无论函数在什么时候返回，它都可以使用捕获的 `addBy` 变量。

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

### 测试函数是否相等

下面是顶级函数，静态方法和实例方法相等性的测试示例：

Here’s an example of testing top-level functions, static methods, and instance methods for equality:

```dart
void foo() {} // 顶层函数

class A {
  static void bar() {} // 静态方法
  void baz() {} // 实例方法
}

void main() {
  Function x;

  // 比较顶层函数
  x = foo;
  assert(foo == x);

  // 比较静态方法
  x = A.bar;
  assert(A.bar == x);

  // 比较实例方法
  var v = A(); // 第一个A的实例
  var w = A(); // 第二个A的实例
  var y = w;
  x = w.baz;

  // 这些闭包引用相同的实例，所以他们相等
  assert(y.baz == x);

  // 这些闭包引用不同的实例，所以不相等
  assert(v.baz != w.baz);
}
```

### 返回值

所有的函数都有返回值。没有显示返回语句的函数最后一行默认为执行 `return null;`。

```dart
foo() {}

assert(foo() == null);
```

### 算术运算符

Dart 支持常用的算术运算符：

| 运算符    | 描述                                       |
| --------- | ------------------------------------------ |
| `+`       | 加                                         |
| `–`       | 减                                         |
| `-表达式` | 一元负, 也可以作为反转（反转表达式的符号） |
| `*`       | 乘                                         |
| `/`       | 除                                         |
| `~/`      | 除并取整                                   |
| `%`       | 取模                                       |

示例：

```dart
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // 结果是浮点数
assert(5 ~/ 2 == 2); // 结果是整数
assert(5 % 2 == 1); // 余数

assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

Dart 还支持自增自减操作。

| Operator`++var` | `var = var + 1` (表达式的值为 `var + 1`) |
| --------------- | ---------------------------------------- |
| `var++`         | `var = var + 1` (表达式的值为 `var`)     |
| `--var`         | `var = var – 1` (表达式的值为 `var – 1`) |
| `var--`         | `var = var – 1` (表达式的值为 `var`)     |

示例：

```dart
int a;
int b;

a = 0;
b = ++a; // 先自增再赋值给b
assert(a == b); // 1 == 1

a = 0;
b = a++; // 先赋值给b再自增
assert(a != b); // 1 != 0

a = 0;
b = --a; // 先自减再赋值给b
assert(a == b); // -1 == -1

a = 0;
b = a--; // 先赋值给b再自减
assert(a != b); // -1 != 0
```

### 关系运算符

下表列出了关系运算符及含义：

| Operator`==` | 相等     |
| ------------ | -------- |
| `!=`         | 不等     |
| `>`          | 大于     |
| `<`          | 小于     |
| `>=`         | 大于等于 |
| `<=`         | 小于等于 |

要判断两个对象 x 和 y 是否表示相同的事物使用 `==` 即可。（在极少数情况下，可能需要使用 [identical()](https://api.dart.cn/stable/dart-core/identical.html) 函数来确定两个对象是否完全相同）。下面是 `==` 运算符的一些规则：

1. 当 **x** 和 **y** 同时为空时返回 true，而只有一个为空时返回 false。
2. 返回对 **x** 调用 `==` 方法的结果，参数为 **y**。（像 `==` 这样的操作符是对左侧内容进行调用的。详情请查阅 [操作符](https://dart.cn/guides/language/language-tour#_operators)。）

下面的代码给出了每一种关系运算符的示例：

```dart
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

###  类型判断运算符

`as`、`is`、`is!` 运算符是在运行时判断对象类型的运算符。

| Operator | Meaning                                                      |
| -------- | ------------------------------------------------------------ |
| `as`     | 类型转换（也用作指定 [类前缀](https://dart.cn/guides/language/language-tour#specifying-a-library-prefix))） |
| `is`     | 如果对象是指定类型则返回 true                                |
| `is!`    | 如果对象是指定类型则返回 false                               |

当且仅当 `obj` 实现了 `T` 的接口，`obj is T` 才是 true。例如 `obj is Object` 总为 true，因为所有类都是 Object 的子类。

仅当你确定这个对象是该类型的时候，你才可以使用 `as` 操作符可以把对象转换为特定的类型。例如：

```dart
(employee as Person).firstName = 'Bob';
```

如果你不确定这个对象类型是不是 `T`，请在转型前使用 `is T` 检查类型。

```dart
if (employee is Person) {
  // Type check
  employee.firstName = 'Bob';
}
```

> **备忘:**上述两种方式是有区别的：如果 `employee` 为 null 或者不为 `Person` 类型，则第一种方式将会抛出异常，而第二种不会。

### 赋值运算符

可以使用 `=` 来赋值，同时也可以使用 `??=` 来为值为 null 的变量赋值。

```dart
// Assign value to a
a = value;
// Assign value to b if b is null; otherwise, b stays the same
b ??= value;
```

像 `+=` 这样的赋值运算符将算数运算符和赋值运算符组合在了一起。

| `=`  | `*=`  | `%=`  | `>>>=` | `^=` |
| ---- | ----- | ----- | ------ | ---- |
| `+=` | `/=`  | `<<=` | `&=`   | `|=` |
| `-=` | `~/=` | `>>=` |        |      |

###  逻辑运算符

使用逻辑运算符你可以反转或组合布尔表达式。

| 运算符      | 描述                                                      |
| ----------- | --------------------------------------------------------- |
| `!*表达式*` | 对表达式结果取反（即将 true 变为 false，false 变为 true） |
| `||`        | 逻辑或                                                    |
| `&&`        | 逻辑与                                                    |

下面是使用逻辑表达式的示例：

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

###  按位和移位运算符

在 Dart 中，二进制位运算符可以操作二进制的某一位，但仅适用于整数。

| 运算符      | 描述                                        |
| ----------- | ------------------------------------------- |
| `&`         | 按位与                                      |
| `|`         | 按位或                                      |
| `^`         | 按位异或                                    |
| `~*表达式*` | 按位取反（即将 “0” 变为 “1”，“1” 变为 “0”） |
| `<<`        | 位左移                                      |
| `>>`        | 位右移                                      |
| `>>>`       | 无符号右移                                  |

下面是使用按位和移位运算符的示例：

```dart
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // Shift left
assert((value >> 4) == 0x02); // Shift right
assert((value >>> 4) == 0x02); // Unsigned shift right
assert((-value >> 4) == -0x03); // Shift right
assert((-value >>> 4) > 0); // Unsigned shift right
```

#### 位运算（&、|、^、~、>>、<<）

1.位运算概述

从现代计算机中所有的数据二进制的形式存储在设备中。即 0、1 两种状态，计算机对二进制数据进行的运算(+、-、*、/)都是叫位运算，即将符号位共同参与运算的运算。

口说无凭，举一个简单的例子来看下 CPU 是如何进行计算的，比如这行代码：

```
int a = 35;
int b = 47;
int c = a + b;
```

计算两个数的和，因为在计算机中都是以二进制来进行运算，所以上面我们所给的 int 变量会在机器内部先转换为二进制在进行相加：

```
35:  0 0 1 0 0 0 1 1
47:  0 0 1 0 1 1 1 1
————————————————————
82:  0 1 0 1 0 0 1 0
```

所以，相比在代码中直接使用(+、-、*、/)运算符，合理的运用位运算更能显著提高代码在机器上的执行效率。

2.位运算概览

| 符号 | 描述 | 运算规则                                                     |
| :--- | :--- | :----------------------------------------------------------- |
| &    | 与   | 两个位都为1时，结果才为1                                     |
| \|   | 或   | 两个位都为0时，结果才为0                                     |
| ^    | 异或 | 两个位相同为0，相异为1                                       |
| ~    | 取反 | 0变1，1变0                                                   |
| <<   | 左移 | 各二进位全部左移若干位，高位丢弃，低位补0                    |
| >>   | 右移 | 各二进位全部右移若干位，对无符号数，高位补0，有符号数，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移） |

3.按位与运算符（&）#

**定义**：参加运算的两个数据，按二进制位进行"与"运算。

运算规则：

```
0&0=0  0&1=0  1&0=0  1&1=1
```

总结：两位同时为1，结果才为1，否则结果为0。

例如：3&5 即 0000 0011& 0000 0101 = 0000 0001，因此 3&5 的值得1。

注意：负数按补码形式参加按位与运算。

**与运算的用途：**

1）清零

如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为零的数值相与，结果为零。

2）取一个数的指定位

比如取数 X=1010 1110 的低4位，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行按位与运算（X&Y=0000 1110）即可得到X的指定位。

3）判断奇偶

只要根据最未位是0还是1来决定，为0就是偶数，为1就是奇数。因此可以用if ((a & 1) == 0)代替if (a % 2 == 0)来判断a是不是偶数。

4.按位或运算符（|）

定义：参加运算的两个对象，按二进制位进行"或"运算。

运算规则：

```
0|0=0  0|1=1  1|0=1  1|1=1
```

总结：参加运算的两个对象只要有一个为1，其值为1。

例如：3|5即 0000 0011| 0000 0101 = 0000 0111，因此，3|5的值得7。　

注意：负数按补码形式参加按位或运算。

或运算的用途：

1）常用来对一个数据的某些位设置为1

比如将数 X=1010 1110 的低4位设置为1，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行按位或运算（X|Y=1010 1111）即可得到。

5.异或运算符（^）

定义：参加运算的两个数据，按二进制位进行"异或"运算。

运算规则：

```
0^0=0  0^1=1  1^0=1  1^1=0
```

总结：参加运算的两个对象，如果两个相应位相同为0，相异为1。

异或的几条性质:

- 1、交换律
- 2、结合律 (a^b)^c == a^(b^c)
- 3、对于任何数x，都有 x^x=0，x^0=x
- 4、自反性: a^b^b=a^0=a;

异或运算的用途：

1）翻转指定位

比如将数 X=1010 1110 的低4位进行翻转，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行异或运算（X^Y=1010 0001）即可得到。

2）与0相异或值不变

例如：1010 1110 ^ 0000 0000 = 1010 1110

3）交换两个数

实例

void Swap(int &a, int &b){
  if (a != b){
    a ^= b;
    b ^= a;
    a ^= b;
  }
}

6.取反运算符 (~)

定义：参加运算的一个数据，按二进制进行"取反"运算。

运算规则：　

```
~1=0
~0=1
```

总结：对一个二进制数按位取反，即将0变1，1变0。

异或运算的用途：

1）使一个数的最低位为零

使a的最低位为0，可以表示为：a & ~1。~1的值为 1111 1111 1111 1110，再按"与"运算，最低位一定为0。因为" ~"运算符的优先级比算术运算符、关系运算符、逻辑运算符和其他运算符都高。

7.左移运算符（<<）

定义：将一个运算对象的各二进制位全部左移若干位（左边的二进制位丢弃，右边补0）。

设 a=1010 1110，a = a<< 2 将a的二进制位左移2位、右补0，即得a=1011 1000。

若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。

8.右移运算符（>>）

定义：将一个数的各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃。

例如：a=a>>2 将a的二进制位右移2位，左补0 或者 左补1得看被移数是正还是负。

操作数每右移一位，相当于该数除以2。

10.复合赋值运算符

位运算符与赋值运算符结合，组成新的复合赋值运算符，它们是：

```
&=        例：a&=b    相当于     a=a&b

|=        例：a|=b    相当于     a=a|b

>>=      例：a>>=b   相当于     a=a>>b

<<=      例：a<<=b     相当于      a=a<<b

^=        例：a^=b    相当于   a=a^b
```

运算规则：和前面讲的复合赋值运算符的运算规则相似。

不同长度的数据进行位运算：如果两个不同长度的数据进行位运算时，系统会将二者按右端对齐，然后进行位运算。

以"与运算"为例说明如下：我们知道在C语言中long型占4个字节，int型占2个字节，如果一个long型数据与一个int型数据进行"与运算"，右端对齐后，左边不足的位依下面三种情况补足，

- 1）如果整型数据为正数，左边补16个0。
- 2）如果整型数据为负数，左边补16个1。
- 3）如果整形数据为无符号数，左边也补16个0。
- 如：long a=123；int b=1；计算a& b。

- 如：long a=123；int b=-1；计算a& b。

- 如：long a=123；unsigned intb=1；计算a & b。

### 条件表达式

Dart 有两个特殊的运算符可以用来替代 [if-else](https://dart.cn/guides/language/language-tour#if-和-else) 语句：

`*条件* ? *表达式 1* : *表达式 2*`
如果条件为 true，执行表达式 1并返回执行结果，否则执行表达式 2 并返回执行结果。

`*表达式 1* ?? *表达式 2*`
如果表达式 1 为非 null 则返回其值，否则执行表达式 2 并返回其值。

根据布尔表达式确定赋值时，请考虑使用 `?` 和 `:`

```dart
var visibility = isPublic ? 'public' : 'private';
```

如果赋值是根据判定是否为 null 则考虑使用 `??`。

```dart
String playerName(String? name) => name ?? 'Guest';
```

上述示例还可以写成至少下面两种不同的形式，只是不够简洁：

```dart
// Slightly longer version uses ?: operator.
String playerName(String? name) => name != null ? name : 'Guest';

// Very long version uses if-else statement.
String playerName(String? name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

### 级联运算符

级联运算符 (`..`, `?..`) 可以让你在同一个对象上连续调用多个对象的变量或方法。

比如下面的代码：

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

构造函数 Paint() 返回一个 Paint 对象。 级联符号后面的代码对该对象进行操作，忽略任何可能返回的值。

上面的例子相等于以下代码:

```dart
var paint = Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

如果级联操作的对象可以为空，则对第一个操作使用空短级联 (?..)。 以 ?.. 开头保证不会在该空对象上尝试任何级联操作。

```dart
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

上面的代码相当于：

```dart
var button = querySelector('#confirm');
button?.text = 'Confirm';
button?.classes.add('important');
button?.onClick.listen((e) => window.alert('Confirmed!'));
```

级联运算符可以嵌套，例如：

```dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```

在返回对象的函数中谨慎使用级联操作符。例如，下面的代码是错误的：

```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```

上述代码中的 `sb.write()` 方法返回的是 void，返回值为 `void` 的方法则不能使用级联运算符。

> **备忘:**严格来说 `..` 级联操作并非一个运算符而是 Dart 的特殊语法。

###  其他运算符

大多数其它的运算符，已经在其它的示例中使用过：

| 运算符 | 名字          | 描述                                                         |
| ------ | ------------- | ------------------------------------------------------------ |
| `()`   | 使用方法      | 代表调用一个方法                                             |
| `[]`   | 访问 List     | 访问 List 中特定位置的元素                                   |
| `?[]`  | 判空访问 List | 左侧调用者不为空时，访问 List 中特定位置的元素               |
| `.`    | 访问成员      | 成员访问符                                                   |
| `?.`   | 条件访问成员  | 与上述成员访问符类似，但是左边的操作对象不能为 null，例如 foo?.bar，如果 foo 为 null 则返回 null ，否则返回 bar |

## 流程控制语句

你可以使用下面的语句来控制 Dart 代码的执行流程：

- `if` 和 `else`
- `for` 循环
- `while` 和 `do`-`while` 循环
- `break` 和 `continue`
- `switch` 和 `case`
- `assert`

使用 `try-catch` 和 `throw` 也能影响控制流，详情参考[异常](https://dart.cn/guides/language/language-tour#exceptions)部分。

###  If 和 Else

Dart 支持 `if - else` 语句，其中 `else` 是可选的，比如下面的例子。你也可以参考[条件表达式](https://dart.cn/guides/language/language-tour#conditional-expressions)。

```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```

不同于 JavaScript，**Dart 的 if 语句中的条件必须是布尔值而不能为其它类型**。详情请查阅[布尔值](https://dart.cn/guides/language/language-tour#booleans)。

### For 循环

你可以使用标准的 `for` 循环进行迭代。例如：

```dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

在 Dart 语言中，`for` 循环中的闭包会自动捕获循环的 **索引值** 以避免 JavaScript 中一些常见的陷阱。假设有如下代码：

```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

上述代码执行后会输出 `0` 和 `1`，但是如果在 JavaScript 中执行同样的代码则会输出两个 `2`。

如果要遍历的对象是一个可迭代对象（例如 List 或 Set），并且你不需要知道当前的遍历索引，则可以使用 `for-in` 方法进行 [遍历](https://dart.cn/guides/libraries/library-tour#iteration)：

```dart
for (final candidate in candidates) {
  candidate.interview();
}
```

 **小提示:**

若想练习使用 `for-in`，请参考 [遍历集合 codelab](https://dart.cn/codelabs/iterables)。

可迭代对象同时可以使用 [forEach()](https://api.dart.cn/stable/dart-core/Iterable/forEach.html) 方法作为另一种选择：

```dart
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

### While 和 Do-While

`while` 循环会在执行循环体前先判断条件：

```dart
while (!isDone()) {
  doSomething();
}
```

`do-while` 循环则会 **先执行一遍循环体** 再判断条件：

```dart
do {
  printLine();
} while (!atEndOfPage());
```

### Break 和 Continue

使用 `break` 可以中断循环：

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

使用 `continue` 可以跳过本次循环直接进入下一次循环：

```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

如果你正在使用诸如 List 或 Set 之类的 [`Iterable`](https://api.dart.cn/stable/dart-core/Iterable-class.html) 对象，你可以用以下方式重写上述例子:

```dart
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

### Switch 和 Case

Switch 语句在 Dart 中使用 `==` 来比较整数、字符串或编译时常量，比较的两个对象必须是同一个类型且不能是子类并且没有重写 `==` 操作符。 [枚举类型](https://dart.cn/guides/language/language-tour#enumerated-types)非常适合在 `Switch` 语句中使用。

> **备忘:**Dart 中的 Switch 语句仅适用于有限的情况，比如使用解释器和扫描器的场景。

每一个非空的 `case` 子句都必须有一个 `break` 语句，也可以通过 `continue`、`throw` 或者 `return` 来结束非空 `case` 语句。

不匹配任何 `case` 语句的情况下，会执行 `default` 子句中的代码：

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```

下面的例子忽略了 `case` 子句的 `break` 语句，因此会产生错误：

```dart
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
```

但是，Dart 支持空的 `case` 语句，允许其以 fall-through 的形式执行。

```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case falls through.
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```

在非空 `case` 语句中想要实现 fall-through 的形式，可以使用 `continue` 语句配合 label 的方式实现:

```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // Continues executing at the nowClosed label.

  nowClosed:
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```

每个 `case` 子句都可以有局部变量且仅在该 case 语句内可见。

###  断言

在开发过程中，可以在条件表达式为 false 时使用 — `assert(*条件*, *可选信息*)`; — 语句来打断代码的执行。你可以在本文中找到大量使用 assert 的例子。下面是相关示例：

```dart
// 确认该变量不为空值
assert(text != null);

// 确认该值小于100
assert(number < 100);

// 确认这是一个https的URL
assert(urlString.startsWith('https'));
```

`assert` 的第二个参数可以为其添加一个字符串消息。

```dart
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```

`assert` 的第一个参数可以是值为布尔值的任何表达式。如果表达式的值为 true，则断言成功，继续执行。如果表达式的值为 false，则断言失败，抛出一个 [`AssertionError`](https://api.dart.cn/stable/dart-core/AssertionError-class.html) 异常。

如何判断 assert 是否生效？assert 是否生效依赖开发工具和使用的框架：

- Flutter 在[调试模式](https://flutter.cn/docs/testing/debugging#debug-mode-assertions)时生效。
- 一些开发工具比如 [dartdevc](https://dart.cn/tools/dartdevc) 通常情况下是默认生效的。
- 其他一些工具，比如 [`dart run`](https://dart.cn/tools/dart-run)以及 [`dart2js`](https://dart.cn/tools/dart2js) 通过在运行 Dart 程序时添加命令行参数 `--enable-asserts` 使 assert 生效。

在生产环境代码中，断言会被忽略，与此同时传入 `assert` 的参数不被判断。

## 异常

Dart 代码可以抛出和捕获异常。异常表示一些未知的错误情况，如果异常没有捕获则会被抛出从而导致抛出异常的代码终止执行。

与 Java 不同的是，Dart 的所有异常都是非必检异常，方法不必声明会抛出哪些异常，并且你也不必捕获任何异常。

Dart 提供了 [`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html) 和 [`Error`](https://api.dart.cn/stable/dart-core/Error-class.html) 两种类型的异常以及它们一系列的子类，你也可以定义自己的异常类型。但是在 Dart 中可以将任何非 null 对象作为异常抛出而不局限于 Exception 或 Error 类型。

### 抛出异常

下面是关于抛出或者 **引发** 异常的示例：

```dart
throw FormatException('Expected at least 1 section');
```

你也可以抛出任意的对象：

```dart
throw 'Out of llamas!';
```

> **备忘:**优秀的代码通常会抛出 [`Error`](https://api.dart.cn/stable/dart-core/Error-class.html) 或 [`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html) 类型的异常。

因为抛出异常是一个表达式，所以可以在 => 语句中使用，也可以在其他使用表达式的地方抛出异常：

```dart
void distanceTo(Point other) => throw UnimplementedError();
```

### 捕获异常

捕获异常可以避免异常继续传递（重新抛出异常除外）。捕获一个异常可以给你处理它的机会：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

对于可以抛出多种异常类型的代码，也可以指定多个 catch 语句，每个语句分别对应一个异常类型，如果 catch 语句没有指定异常类型则表示可以捕获任意异常类型：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // 一个特定的异常
  buyMoreLlamas();
} on Exception catch (e) {
  // 任何其他的的异常
  print('Unknown exception: $e');
} catch (e) {
  // 无特定类型，捕获任意类型
  print('Something really unknown: $e');
}
```

如上述代码所示可以使用 `on` 或 `catch` 来捕获异常，使用 `on` 来指定异常类型，使用 `catch` 来捕获异常对象，两者可同时使用。

你可以为 `catch` 方法指定两个参数，第一个参数为抛出的异常对象，第二个参数为栈信息 [`StackTrace`](https://api.dart.cn/stable/dart-core/StackTrace-class.html) 对象：

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

关键字 `rethrow` 可以将捕获的异常再次抛出：

```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // 运行时错误
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // 允许调用者看到该异常
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

###  Finally

无论是否抛出异常，`finally` 语句始终执行，如果没有指定 `catch` 语句来捕获异常，则异常会在执行完 `finally` 语句后抛出：

```dart
try {
  breedMoreLlamas();
} finally {
  // 始终清理，即使抛出异常。
  cleanLlamaStalls();
}
```

`finally` 语句会在任何匹配的 `catch` 语句后执行：

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // 先处理异常。
} finally {
  cleanLlamaStalls(); // 然后清理
}
```

你可以阅读 Dart 核心库概览的 [异常](https://dart.cn/guides/libraries/library-tour#exceptions) 章节获取更多相关信息。

## 类

Dart 是支持基于 mixin 继承机制的面向对象语言，所有对象都是一个类的实例，而除了 `Null` 以外的所有的类都继承自 [`Object`](https://api.dart.cn/stable/dart-core/Object-class.html) 类。 **基于 mixin 的继承** 意味着尽管每个类（[top class](https://dart.cn/null-safety/understanding-null-safety#top-and-bottom) `Object?` 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。 [扩展方法](https://dart.cn/guides/language/language-tour#extension-methods) 是一种在不更改类或创建子类的情况下向类添加功能的方式。

### 使用类的成员

对象的 **成员** 由函数和数据（即 **方法** 和 **实例变量**）组成。方法的 **调用** 要通过对象来完成，这种方式可以访问对象的函数和数据。

使用（`.`）来访问对象的实例变量或方法：

```dart
var p = Point(2, 2);

// 获取y的值
assert(p.y == 2);

// 在 p 上调用 distanceTo()。
double distance = p.distanceTo(Point(4, 4));
```

使用 `?.` 代替 `.` 可以避免因为左边表达式为 null 而导致的问题：

```dart
// 如果p不为空，将p的y属性的值赋值给a
var a = p?.y;
```

###  使用构造函数

可以使用 **构造函数** 来创建一个对象。构造函数的命名方式可以为 `*类名*` 或 `*类名* . *标识符* `的形式。例如下述代码分别使用 `Point()` 和 `Point.fromJson()` 两种构造器创建了 `Point` 对象：

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

以下代码具有相同的效果，但是构造函数名前面的的 `new` 关键字是可选的：

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

一些类提供了[常量构造函数](https://dart.cn/guides/language/language-tour#constant-constructors)。使用常量构造函数，在构造函数名之前加 `const` 关键字，来创建编译时常量时：

```dart
var p = const ImmutablePoint(2, 2);
```

两个使用相同构造函数相同参数值构造的编译时常量是同一个对象：

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // They are the same instance!
```

在 **常量上下文** 场景中，你可以省略掉构造函数或字面量前的 `const` 关键字。例如下面的例子中我们创建了一个常量 Map：

```dart
// Lots of const keywords here.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

根据上下文，你可以只保留第一个 `const` 关键字，其余的全部省略：

```dart
// Only one const, which establishes the constant context.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

但是如果无法根据上下文判断是否可以省略 `const`，则不能省略掉 `const` 关键字，否则将会创建一个 **非常量对象** 例如：

```dart
var a = const ImmutablePoint(1, 1); // Creates a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant

assert(!identical(a, b)); // NOT the same instance!
```

### 获取对象的类型

可以使用 `Object` 对象的 `runtimeType` 属性在运行时获取一个对象的类型，该对象类型是 [`Type`](https://api.dart.cn/stable/dart-core/Type-class.html) 的实例。

```dart
print('The type of a is ${a.runtimeType}');
```

> 使用类型测试运算符(as、is、is!)而不是 runtimeType 来测试对象的类型。 在生产环境中，测试对象是 Type 比测试对象.runtimeType == Type 更稳定。

### 实例变量

下面是声明实例变量的示例：

```dart
class Point {
  double? x; // 声明实例变量x,初始值为null
  double? y; // 声明y,初始值为null
  double z = 0; // 声明z,初始值为0
}
```

所有未初始化的实例变量其值均为 `null`。

所有实例变量均会隐式地声明一个 *Getter* 方法。非终值的实例变量和 `late final` 声明但未声明初始化的实例变量还会隐式地声明一个 *Setter* 方法。你可以查阅 [Getter 和 Setter](https://dart.cn/guides/language/language-tour#getters-and-setters) 获取更多相关信息。

```dart
class Point {
  double? x; // 声明实例变量x,初始值为null
  double? y; // 声明y,初始值为null
}

void main() {
  var point = Point();
  point.x = 4; // 这里调用了x的setter方法
  assert(point.x == 4); // 这里调用了x的getter方法
  assert(point.y == null); // 默认值为null
}
```

实例变量可以声明为`final`，但它必须至少被明确设置一次。在声明时，使用构造函数参数或使用构造函数的初始化列表初始化`final`、non-`late`的实例变量：

```dart
class ProfileMark {
  final String name;
  final DateTime start = DateTime.now();

  ProfileMark(this.name); //为实例变量name赋值的语法糖
  ProfileMark.unnamed() : name = '';
}
```

如果需要在构造函数主体启动后分配`final`实例变量的值，可以使用以下方法之一：

- 使用工厂构造函数。
- 使用late final，但要小心：没有初始化器的late final 会向API 添加一个setter。

### 构造函数

声明一个与类名一样的函数即可声明一个构造函数（对于[命名式构造函数](https://dart.cn/guides/language/language-tour#named-constructors) 还可以添加额外的标识符）。大部分的构造函数形式是生成式构造函数，其用于创建一个类的实例：

```dart
class Point {
  double x = 0;
  double y = 0;

  Point(double x, double y) {
    // 有更好的方法可以做到这一点，敬请期待。
    this.x = x;
    this.y = y;
  }
}
```

使用 `this` 关键字引用当前实例。

> **备忘:**当且仅当命名冲突时使用 `this` 关键字才有意义，否则 Dart 会忽略 `this` 关键字。

对于大多数编程语言来说在构造函数中为实例变量赋值的过程都是类似的，而 Dart 则提供了一种特殊的语法糖来简化该步骤：

```dart
class Point {
  double x = 0;
  double y = 0;

	// 设置 x 和 y 的语法糖
   	// 在构造函数主体运行之前。
  Point(this.x, this.y);
}
```

#### 默认构造函数

如果你没有声明构造函数，那么 Dart 会自动生成一个无参数的构造函数并且该构造函数会调用其父类的无参数构造方法。

#### 构造函数不被继承

子类不会继承父类的构造函数，如果子类没有声明构造函数，那么只会有一个默认无参数的构造函数。

#### 命名式构造函数

可以为一个类声明多个命名式构造函数来表达更明确的意图：

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);

  // 命名式构造函数
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

记住构造函数是不能被继承的，这将意味着子类不能继承父类的命名式构造函数，如果你想在子类中提供一个与父类命名构造函数名字一样的命名构造函数，则需要在子类中显式地声明。

#### 调用父类非默认构造函数

默认情况下，子类的构造函数会调用父类的匿名无参数构造方法，并且该调用会在子类构造函数的函数体代码执行前，如果子类构造函数还有一个 [初始化列表](https://dart.cn/guides/language/language-tour#initializer-list)，那么该初始化列表会在调用父类的该构造函数之前被执行，总的来说，这三者的调用顺序如下：

1. 初始化列表
2. 父类的无参数构造函数
3. 当前类的构造函数

如果父类没有匿名无参数构造函数，那么子类必须调用父类的其中一个构造函数，在（`:`）之后指定父类的构造函数，并在函数体之前。

```dart
class Person {
  String? firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person没有默认的构造函数;
  // 你必须调用super.fromJson(data)
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

void main() {
  var employee = Employee.fromJson({});
  print(employee);
  // Prints:
  // in Person
  // in Employee
  // Instance of 'Employee'
}
```

因为参数会在子类构造函数被执行前传递给父类的构造函数，因此该参数也可以是一个表达式，比如一个函数：

```dart
class Employee extends Person {
  Employee() : super.fromJson(fetchDefaultData());
  // ···
}
```

> **请注意:**传递给父类构造函数的参数不能使用 `this` 关键字，因为在参数传递的这一步骤，子类构造函数尚未执行，子类的实例对象也就还未初始化，因此所有的实例成员都不能被访问，但是类成员可以。
>
> Arguments to the superclass constructor don’t have access to `this`. For example, arguments can call static methods but not instance methods.

#### 初始化列表

除了调用父类构造函数之外，还可以在构造函数体执行之前初始化实例变量。每个实例变量之间使用逗号分隔。

```dart
// Initializer list sets instance variables before
// the constructor body runs.
Point.fromJson(Map<String, double> json)
    : x = json['x']!,
      y = json['y']! {
  print('In Point.fromJson(): ($x, $y)');
}
```

> **请注意:**初始化列表表达式 = 右边的语句不能使用 `this` 关键字。

在开发模式下，你可以在**初始化列表**中使用 `assert` 来验证输入数据：

```dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

使用初始化列表设置 `final` 字段非常方便，下面的示例中就使用初始化列表来设置了三个 `final` 变量的值。

```dart
import 'dart:math';
class Point {
  final double x;
  final double y;
  final double distanceFromOrigin;

  Point(double x, double y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

void main() {
  var p = Point(2, 3);
  print(p.distanceFromOrigin);
}
```

#### 重定向构造函数

有时候类中的构造函数仅用于调用类中其它的构造函数，此时该构造函数没有函数体，只需在函数签名后使用（:）指定需要重定向到的其它构造函数 (使用 `this` 而非类名)：

```dart
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // 委托给主构造函数。
  Point.alongXAxis(double x) : this(x, 0);
}
```

#### 常量构造函数

如果类生成的对象都是不变的，可以在生成这些对象时就将其变为编译时常量。你可以在类的构造函数前加上 `const` 关键字并确保所有实例变量均为 `final` 来实现该功能。

```dart
class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
```

常量构造函数创建的实例并不总是常量，具体可以参考[使用构造函数](https://dart.cn/guides/language/language-tour#using-constructors)章节。

#### 工厂构造函数

使用 `factory` 关键字标识类的构造函数将会令该构造函数变为工厂构造函数，这将意味着使用该构造函数构造类的实例时并非总是会返回新的实例对象。例如，工厂构造函数可能会从缓存中返回一个实例，或者返回一个子类型的实例。

> **小提示:**另一种处理懒加载变量的方式是 [使用 `late final`（谨慎使用）](https://dart.cn/guides/language/effective-dart/design#avoid-public-late-final-fields-without-initializers)。

在如下的示例中， `Logger` 的工厂构造函数从缓存中返回对象，和 `Logger.fromJson` 工厂构造函数从 JSON 对象中初始化一个最终变量。

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

> **备忘:**在工厂构造函数中无法访问 `this`。

工厂构造函数的调用方式与其他构造函数一样：

```dart
var logger = Logger('UI');
logger.log('Button clicked');

var logMap = {'name': 'UI'};
var loggerJson = Logger.fromJson(logMap);
```

### 方法

方法是为对象提供行为的函数。

#### 实例方法

对象的实例方法可以访问实例变量和 `this`。下面的 `distanceTo()` 方法就是一个实例方法的例子：

```dart
import 'dart:math';

class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);

  double distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

#### Getter 和 Setter

Getter 和 Setter 是一对用来读写对象属性的特殊方法，上面说过实例对象的每一个属性都有一个隐式的 Getter 方法，如果为非 final 属性的话还会有一个 Setter 方法，你可以使用 `get` 和 `set` 关键字为额外的属性添加 Getter 和 Setter 方法：

```dart
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

使用 Getter 和 Setter 的好处是，你可以先使用你的实例变量，过一段时间过再将它们包裹成方法且不需要改动任何代码，即先定义后更改且不影响原有逻辑。

> **备忘:**像自增（++）这样的操作符不管是否定义了 Getter 方法都会正确地执行。为了避免一些不必要的异常情况，运算符只会调用 Getter 一次，然后将其值存储在一个临时变量中。

#### 抽象方法

实例方法、Getter 方法以及 Setter 方法都可以是抽象的，定义一个接口方法而不去做具体的实现让实现它的类去实现该方法，抽象方法只能存在于 [抽象类](https://dart.cn/guides/language/language-tour#abstract-classes)中。

直接使用分号（;）替代方法体即可声明一个抽象方法：

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

### 抽象类

使用关键字 `abstract` 标识类可以让该类成为 **抽象类**，抽象类将无法被实例化。抽象类常用于声明接口方法、有时也会有具体的方法实现。如果想让抽象类同时可被实例化，可以为其定义 [工厂构造函数](https://dart.cn/guides/language/language-tour#factory-constructors)。

抽象类常常会包含 [抽象方法](https://dart.cn/guides/language/language-tour#abstract-methods)。下面是一个声明具有抽象方法的抽象类示例：

```dart
// This class is declared abstract and thus
// can't be instantiated.
abstract class AbstractContainer {
  // Define constructors, fields, methods...

  void updateChildren(); // Abstract method.
}
```

###  隐式接口

每一个类都隐式地定义了一个接口并实现了该接口，这个接口包含所有这个类的实例成员以及这个类所实现的其它接口。如果想要创建一个 A 类支持调用 B 类的 API 且不想继承 B 类，则可以实现(implements) B 类的接口。

Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements. If you want to create a class A that supports class B’s API without inheriting B’s implementation, class A should implement the B interface.

一个类可以通过关键字 `implements` 来实现一个或多个接口并实现每个接口定义的 API：

```dart
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final String _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  String get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

如果需要实现多个类接口，可以使用逗号分割每个接口类：

```dart
class Point implements Comparable, Location {...}
```

### 扩展一个类

使用 `extends` 关键字来创建一个子类，并可使用 `super` 关键字引用一个父类：

```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

想了解其他 `extends` 的用法，

#### 重写类成员

子类可以重写父类的实例方法（包括 [操作符](https://dart.cn/guides/language/language-tour#_operators)）、 Getter 以及 Setter 方法。你可以使用 `@override` 注解来表示你重写了一个成员：

```dart
class Television {
  // ···
  set contrast(int value) {...}
}

class SmartTelevision extends Television {
  @override
  set contrast(num value) {...}
  // ···
}
```

重写方法声明必须以多种方式匹配它重写的方法（或方法）：

返回类型必须与被覆盖方法的返回类型相同（或子类型）。
参数类型必须与被覆盖方法的参数类型相同（或超类型）。 在前面的示例中，SmartTelevision 的`contrast`方法的`setter`将参数类型从 int 更改为超类型 num。
如果被覆盖的方法接受 n 个位置参数，那么覆盖方法也必须接受 n 个位置参数。
泛型方法不能覆盖非泛型方法，非泛型方法也不能覆盖泛型方法。

有时您可能希望缩小方法参数或实例变量的类型。 这违反了正常规则，它类似于向下转换，因为它可能在运行时导致类型错误。 不过，如果代码可以保证不会发生类型错误，那么缩小类型是可能的。 在这种情况下，您可以在参数声明中使用`covariant` 关键字。 有关详细信息，请参阅 Dart 语言规范。

> **请注意:**如果重写 `==` 操作符，必须同时重写对象 `hashCode` 的 Getter 方法。你可以查阅 [实现映射键](https://dart.cn/guides/libraries/library-tour#implementing-map-keys) 获取更多关于重写的 `==` 和 `hashCode` 的例子。

#### noSuchMethod 方法

如果调用了对象上不存在的方法或实例变量将会触发 `noSuchMethod` 方法，你可以重写 `noSuchMethod` 方法来追踪和记录这一行为：

```dart
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: '
        '${invocation.memberName}');
  }
}
```

只有下面其中一个条件成立时，你才能调用一个未实现(unimplemented)的方法：

- 接收方是静态的 `dynamic` 类型。
- 接收方具有静态类型，定义了未实现的方法（抽象亦可），并且接收方的动态类型实现了 `noSuchMethod` 方法且具体的实现与 `Object` 中的不同。

你可以查阅 [noSuchMethod 转发规范](https://github.com/dart-lang/sdk/blob/master/docs/language/informal/nosuchmethod-forwarding.md) 获取更多相关信息。

### 扩展方法

扩展方法是向现有库添加功能的一种方式。你可能已经在不知道它是扩展方法的情况下使用了它。例如，当您在 IDE 中使用代码完成功能时，它建议将扩展方法与常规方法一起使用。

这里是一个在 `String` 中使用扩展方法的样例，我们取名为 `parseInt()`，它在 `string_apis.dart` 中定义：

```
import 'string_apis.dart';
...
print('42'.padLeft(5)); // Use a String method.
print('42'.parseInt()); // Use an extension method.
```

有关使用以及实现扩展方法的详细信息，请参阅 [扩展方法页面](https://dart.cn/guides/language/extension-methods)。

### 枚举类型

枚举类型是一种特殊的类型，也称为 **enumerations** 或 **enums**，用于定义一些固定数量的常量值。

### 使用枚举

使用关键字 `enum` 来定义枚举类型：

```dart
enum Color { red, green, blue }
```

你可以在声明枚举类型时使用 [尾随逗号](https://dart.cn/guides/language/language-tour#trailing-comma)。

每一个枚举值都有一个名为 `index` 成员变量的 Getter 方法，该方法将会返回以 0 为基准索引的位置值。例如，第一个枚举值的索引是 0 ，第二个枚举值的索引是 1。以此类推。

```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```

想要获得全部的枚举值，使用枚举类的 `values` 方法获取包含它们的列表：

```dart
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```

你可以在 [Switch 语句](https://dart.cn/guides/language/language-tour#switch-和-case)中使用枚举，但是需要注意的是必须处理枚举值的每一种情况，即每一个枚举值都必须成为一个 case 子句，不然会出现警告：

```dart
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // Without this, you see a WARNING.
    print(aColor); // 'Color.blue'
}
```

枚举类型有如下两个限制：

- 枚举不能成为子类，也不可以 mix in，你也不可以实现一个枚举。
- 不能显式地实例化一个枚举类。

你可以查阅 [Dart 编程语言规范](https://dart.cn/guides/language/spec) 获取更多相关信息。

### 使用 Mixin 为类添加功能

Mixin 是一种在多重继承中复用某个类中代码的方法模式。

使用 `with` 关键字并在其后跟上 Mixin 类的名字来使用 Mixin 模式：

```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

想要实现一个 Mixin，请创建一个继承自 Object 且未声明构造函数的类。除非你想让该类与普通的类一样可以被正常地使用，否则请使用关键字 `mixin` 替代 `class`。例如：

```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

可以使用关键字 `on` 来指定哪些类可以使用该 Mixin 类，比如有 Mixin 类 A，但是 A 只能被 B 类使用，则可以这样定义 A：

```dart
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}
class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
```

In the preceding code, only classes that extend or implement the `Musician` class can use the mixin `MusicalPerformer`. Because `SingerDancer` extends `Musician`, `SingerDancer` can mix in `MusicalPerformer`.

###  类变量和方法

使用关键字 `static` 可以声明类变量或类方法。

#### 静态变量

静态变量（即类变量）常用于声明类范围内所属的状态变量和常量：

```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```

静态变量在其首次被使用的时候才被初始化。

> **备忘:**本文代码准守 [风格推荐指南](https://dart.cn/guides/language/effective-dart/style#identifiers) 中的命名规则，使用 `驼峰式大小写` 来命名常量。

#### 静态方法

静态方法（即类方法）不能对实例进行操作，因此不能使用 `this`。但是他们可以访问静态变量。如下面的例子所示，你可以在一个类上直接调用静态方法：

```dart
import 'dart:math';

class Point {
  double x, y;
  Point(this.x, this.y);

  static double distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

> **备忘:**对于一些通用或常用的静态方法，应该将其定义为顶级函数而非静态方法。

可以将静态方法作为编译时常量。例如，你可以将静态方法作为一个参数传递给一个常量构造函数。

## 泛型

如果你查看数组的 API 文档，你会发现数组 [`List`](https://api.dart.cn/stable/dart-core/List-class.html) 的实际类型为 `List<E>`。 <…> 符号表示数组是一个 *泛型*（或 *参数化类型*） [通常](https://dart.cn/guides/language/effective-dart/design#do-follow-existing-mnemonic-conventions-when-naming-type-parameters) 使用一个字母来代表类型参数，比如 E、T、S、K 和 V 等等。

### 为什么使用泛型？

泛型常用于需要要求类型安全的情况，但是它也会对代码运行有好处：

- 适当地指定泛型可以更好地帮助代码生成。
- 使用泛型可以减少代码重复。

比如你想声明一个只能包含 String 类型的数组，你可以将该数组声明为 `List<String>`（读作“字符串类型的 list”），这样的话就可以很容易避免因为在该数组放入非 String 类变量而导致的诸多问题，同时编译器以及其他阅读代码的人都可以很容易地发现并定位问题：

```
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

另一个使用泛型的原因是可以减少重复代码。泛型可以让你在多个不同类型实现之间共享同一个接口声明，比如下面的例子中声明了一个类用于缓存对象的接口：

Another reason for using generics is to reduce code duplication. Generics let you share a single interface and implementation between many types, while still taking advantage of static analysis. For example, say you create an interface for caching an object:

```dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

不久后你可能又会想专门为 String 类对象做一个缓存，于是又有了专门为 String 做缓存的类：

```dart
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```

如果过段时间你又想为数字类型也创建一个类，那么就会有很多诸如此类的代码……

这时候可以考虑使用泛型来声明一个类，让不同类型的缓存实现该类做出不同的具体实现即可：

```dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

在上述代码中，T 是一个替代类型。其相当于类型占位符，在开发者调用该接口的时候会指定具体类型。

### 使用集合字面量

List、Set 以及 Map 字面量也可以是参数化的。定义参数化的 List 只需在中括号前添加 `<type>`；定义参数化的 Map 只需要在大括号前添加 `<keyType, valueType>`：

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

### 使用类型参数化的构造函数

在调用构造方法时也可以使用泛型，只需在类名后用尖括号（`<...>`）将一个或多个类型包裹即可：

```dart
var nameSet = Set<String>.from(names);
```

下面代码创建了一个键为 Int 类型，值为 View 类型的 Map 对象：

```dart
var views = Map<int, View>();
```

### 泛型集合以及它们所包含的类型

Dart的泛型类型是 **固化的**，这意味着即便在运行时也会保持类型信息：

```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

> **备忘:**与 Java 不同的是，Java 中的泛型是类型 **擦除** 的，这意味着泛型类型会在运行时被移除。在 Java 中你可以判断对象是否为 List 但不可以判断对象是否为 `List<String>`。

###  限制参数化类型

有时使用泛型的时候，你可能会想限制可作为参数的泛型范围，也就是参数必须是指定类型的子类，这时候可以使用 `extends` 关键字。

一种常见的非空类型处理方式，是将子类限制继承 `Object` （而不是默认的 [`Object?`](https://dart.cn/null-safety/understanding-null-safety#top-and-bottom)）。

```dart
class Foo<T extends Object> {
  // Any type provided to Foo for T must be non-nullable.
}
```

You can use `extends` with other types besides `Object`. Here’s an example of extending `SomeBaseClass`, so that members of `SomeBaseClass` can be called on objects of type `T`:

```dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

这时候就可以使用 `SomeBaseClass` 或者它的子类来作为泛型参数：

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

这时候也可以指定无参数的泛型，这时无参数泛型的类型则为 `Foo<SomeBaseClass>`：

```dart
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```

将非 `SomeBaseClass` 的类型作为泛型参数则会导致编译错误：

```dart
var foo = Foo<Object>();
```

### 使用泛型方法

起初 Dart 只支持在类的声明时指定泛型，现在同样也可以在方法上使用泛型，称之为 **泛型方法**：

```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```

方法 `first<T>` 的泛型 `T` 可以在如下地方使用：

- 函数的返回值类型 (`T`)。
- 参数的类型 (`List<T>`)。
- 局部变量的类型 (`T tmp`)。

你可以查阅 [使用泛型函数](https://github.com/dart-lang/sdk/blob/master/pkg/dev_compiler/doc/GENERIC_METHODS.md) 获取更多关于泛型的信息。

## 库和可见性

`import` 和 `library` 关键字可以帮助你创建一个模块化和可共享的代码库。代码库不仅只是提供 API 而且还起到了封装的作用：以下划线（`_`）开头的成员仅在代码库中可见。 **每个 Dart 程序都是一个库**，即便没有使用关键字 `library` 指定。

Dart 的库可以使用 [包工具](https://dart.cn/guides/packages) 来发布和部署。



如果你对 Dart 为何使用下划线而不使用 `public` 或 `private` 作为可访问性关键字，可以查看 [SDK issue 33383](https://github.com/dart-lang/sdk/issues/33383)。

### 使用库

使用 `import` 来指定命名空间以便其它库可以访问。

比如你可以导入代码库 [dart:html](https://api.dart.cn/stable/dart-html) 来使用 Dart Web 中相关 API：

```dart
import 'dart:html';
```

`import` 的唯一参数是用于指定代码库的 URI，对于 Dart 内置的库，使用 `dart:xxxxxx` 的形式。而对于其它的库，你可以使用一个文件系统路径或者以 `package:xxxxxx` 的形式。 `package:xxxxxx` 指定的库通过包管理器（比如 pub 工具）来提供：

```dart
import 'package:test/test.dart';
```

 **备忘:**

**URI** 代表统一资源标识符。

**URL**（统一资源定位符）是一种常见的 URI。

#### 指定库前缀

如果你导入的两个代码库有冲突的标识符，你可以为其中一个指定前缀。比如如果 library1 和 library2 都有 Element 类，那么可以这么处理：

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

#### 导入库的一部分

如果你只想使用代码库中的一部分，你可以有选择地导入代码库。例如：

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

#### 延迟加载库

**延迟加载**（也常称为 **懒加载**）允许应用在需要时再去加载代码库，下面是可能使用到延迟加载的场景：

- 为了减少应用的初始化时间。
- 处理 A/B 测试，比如测试各种算法的不同实现。
- 加载很少会使用到的功能，比如可选的屏幕和对话框。



**目前只有 dart2js 支持延迟加载** Flutter、Dart VM 以及 DartDevc 目前都不支持延迟加载。你可以查阅 [issue #33118](https://github.com/dart-lang/sdk/issues/33118) 和 [issue #27776](https://github.com/dart-lang/sdk/issues/27776) 获取更多的相关信息。

使用 `deferred as` 关键字来标识需要延时加载的代码库：

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

当实际需要使用到库中 API 时先调用 `loadLibrary` 函数加载库：

```dart
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

在前面的代码，使用 `await` 关键字暂停代码执行直到库加载完成。更多关于 `async` 和 `await` 的信息请参考[异步支持](https://dart.cn/guides/language/language-tour#asynchrony-support)。

`loadLibrary` 函数可以调用多次也没关系，代码库只会被加载一次。

当你使用延迟加载的时候需要牢记以下几点：

- 延迟加载的代码库中的常量需要在代码库被加载的时候才会导入，未加载时是不会导入的。
- 导入文件的时候无法使用延迟加载库中的类型。如果你需要使用类型，则考虑把接口类型转移到另一个库中然后让两个库都分别导入这个接口库。
- Dart会隐式地将 `loadLibrary()` 导入到使用了 `deferred as *命名空间*` 的类中。 `loadLibrary()` 函数返回的是一个 [Future](https://dart.cn/guides/libraries/library-tour#future)。

### 实现库

查阅 [创建依赖库包](https://dart.cn/guides/libraries/create-library-packages) 可以获取有关如何实现库包的建议，包括：

- 如何组织库的源文件。
- 如何使用 `export` 命令。
- 何时使用 `part` 命令。
- 何时使用 `library` 命令。
- 如何使用导入和导出命令实现多平台的库支持。



## 异步支持

Dart 代码库中有大量返回 [`Future`](https://api.dart.cn/stable/dart-async/Future-class.html) 或 [`Stream`](https://api.dart.cn/stable/dart-async/Stream-class.html) 对象的函数，这些函数都是 **异步** 的，它们会在耗时操作（比如I/O）执行完毕前直接返回而不会等待耗时操作执行完毕。

`async` 和 `await` 关键字用于实现异步编程，并且让你的代码看起来就像是同步的一样。

### 处理 Future

可以通过下面两种方式，获得 Future 执行完成的结果：

- 使用 `async` 和 `await`，在 [异步编程 codelab](https://dart.cn/codelabs/async-await) 中有更多描述；
- 使用 Future API，具体描述参考 [库概览](https://dart.cn/guides/libraries/library-tour#future)。

使用 `async` 和 `await` 的代码是异步的，但是看起来有点像同步代码。例如，下面的代码使用 `await` 等待异步函数的执行结果。

```dart
await lookUpVersion();
```

必须在带有 async 关键字的 **异步函数** 中使用 `await`：

```dart
Future<void> checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

> **备忘:**尽管异步函数可以处理耗时操作，但是它并不会等待这些耗时操作完成，异步函数执行时会在其遇到第一个 `await` 表达式（[代码行](https://github.com/dart-lang/sdk/blob/main/docs/newsletter/20170915.md#synchronous-async-start)）时返回一个 Future 对象，然后等待 await 表达式执行完毕后继续执行。

使用 `try`、`catch` 以及 `finally` 来处理使用 `await` 导致的异常：

```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```

你可以在异步函数中多次使用 `await` 关键字。例如，下面代码中等待了三次函数结果：

```dart
var entrypoint = await findEntryPoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```

`await` 表达式的返回值通常是一个 Future 对象；如果不是的话也会自动将其包裹在一个 Future 对象里。 Future 对象代表一个“承诺”， `await \*表达式\*`会阻塞直到需要的对象返回。

**如果在使用 `await` 时导致编译错误，请确保 `await` 在一个异步函数中使用**。例如，如果想在 main() 函数中使用 `await`，那么 `main()` 函数就必须使用 `async` 关键字标识。

```dart
void main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}
```

> **备忘:**如上的例子使用了声明为 `async` 的函数 `checkVersion()`，但没有等待其结果。在实际的开发中，如果代码假设函数已经执行完成，则可能导致一些异步的问题。想要避免这些问题，请使用 [unawaited_futures 提示规则](https://dart.cn/tools/linter-rules#unawaited_futures)。

###  声明异步函数

**异步函数** 是函数体由 `async` 关键字标记的函数。

将关键字 `async` 添加到函数并让其返回一个 Future 对象。假设有如下返回 String 对象的方法：

```dart
String lookUpVersion() => '1.0.0';
```

将其改为异步函数，返回值是 Future：

```dart
Future<String> lookUpVersion() async => '1.0.0';
```

注意，函数体不需要使用 Future API。如有必要，Dart 会创建 Future 对象。

如果函数没有返回有效值，需要设置其返回类型为 `Future<void>`。

关于 Future、`async` 和 `await` 的使用介绍，可以参见这个 codelab: [asynchronous programming codelab](https://dart.cn/codelabs/async-await)。

### 处理 Stream

如果想从 Stream 中获取值，可以有两种选择：

- 使用 `async` 关键字和一个 **异步循环**（使用 `await for` 关键字标识）。
- 使用 Stream API。详情参考 [库概览](https://dart.cn/guides/libraries/library-tour#stream)。

 **备忘:**

在使用 `await for` 关键字前，确保其可以令代码逻辑更加清晰并且是真的需要等待所有的结果执行完毕。例如，通常不应该在 UI 事件监听器上使用 `await for` 关键字，因为 UI 框架发出的事件流是无穷尽的。

使用 await for 定义异步循环看起来是这样的：

```dart
await for (varOrType identifier in expression) {
  // Executes each time the stream emits a value.
```

`*表达式*` 的类型必须是 Stream。执行流程如下：

1. 等待直到 Stream 返回一个数据。
2. 使用 1 中 Stream 返回的数据执行循环体。
3. 重复 1、2 过程直到 Stream 数据返回完毕。

使用 `break` 和 `return` 语句可以停止接收 Stream 数据，这样就跳出了循环并取消注册监听 Stream。

**如果在实现异步 for 循环时遇到编译时错误，请检查确保 `await for` 处于异步函数中。 ** 例如，要在应用程序的 `main()` 函数中使用异步 for 循环，`main()` 函数体必须标记为 `async`：

```dart
void main() async {
  // ...
  await for (final request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```

你可以查阅库概览中有关 [dart:async](https://dart.cn/guides/libraries/library-tour#dartasync---asynchronous-programming) 的部分获取更多有关异步编程的信息。

## 生成器

当你需要延迟地生成一连串的值时，可以考虑使用 *生成器函数*。Dart 内置支持两种形式的生成器方法：

- **同步** 生成器：返回一个 **[`Iterable`](https://api.dart.cn/stable/dart-core/Iterable-class.html)** 对象。
- **异步** 生成器：返回一个 **[`Stream`](https://api.dart.cn/stable/dart-async/Stream-class.html)** 对象。

通过在函数上加 `sync*` 关键字并将返回值类型设置为 Iterable 来实现一个 **同步** 生成器函数，在函数中使用 `yield` 语句来传递值：

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

实现 **异步** 生成器函数与同步类似，只不过关键字为 `async*` 并且返回值为 Stream：

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

如果生成器是递归调用的，可是使用 `yield*` 语句提升执行性能：

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

## 可调用类

通过实现类的 `call()` 方法，允许使用类似函数调用的方式来使用该类的实例。

在下面的示例中，`WannabeFunction` 类定义了一个 call() 函数，函数接受三个字符串参数，函数体将三个字符串拼接，字符串间用空格分割，并在结尾附加了一个感叹号。单击运行按钮执行代码。

```dart
class WannabeFunction {
  String call(String a, String b, String c) => '$a $b $c!';
}

var wf = WannabeFunction();
var out = wf('Hi', 'there,', 'gang');

void main() => print(out);
```

## 隔离区

大多数计算机中，甚至在移动平台上，都在使用多核 CPU。为了有效利用多核性能，开发者一般使用共享内存的方式让线程并发地运行。然而，多线程共享数据通常会导致很多潜在的问题，并导致代码运行出错。

为了解决多线程带来的并发问题，Dart 使用 isolate 替代线程，所有的 Dart 代码均运行在一个 **isolate** 中。每一个 isolate 有它自己的堆内存以确保其状态不被其它 isolate 访问。

所有的 Dart 代码都是在一个 isolate 中运行，而非线程。每个 isolate 都有一个单独的执行线程，并且不与其他的 isolate 共享任何可变对象。

## Typedefs

类型别名是引用某一类型的简便方法，因为其使用关键字 `typedef`，因此通常被称作 **typedef**。下面是一个使用 `IntList` 来声明和使用类型别名的例子:

```dart
typedef IntList = List<int>;
IntList il = [1, 2, 3];
```

类型别名可以有类型参数:

```dart
typedef ListMapper<X> = Map<X, List<X>>;
Map<String, List<String>> m1 = {}; // Verbose.
ListMapper<String> m2 = {}; // Same thing but shorter and clearer.
```

针对函数，在大多数情况下，我们推荐使用 [内联函数类型](https://dart.cn/guides/language/effective-dart/design#prefer-inline-function-types-over-typedefs) 替代 typedefs。然而，函数的 typedefs 仍然是有用的:

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

## 元数据

使用元数据可以为代码增加一些额外的信息。元数据注解以 `@` 开头，其后紧跟一个编译时常量（比如 `deprecated`）或者调用一个常量构造函数。

Dart 中有两个注解是所有代码都可以使用的： `@deprecated`、`@Deprecated` 和 `@override`。你可以查阅 [扩展一个类](https://dart.cn/guides/language/language-tour#extending-a-class) 获取有关 `@override` 的使用示例。下面是使用 `@deprecated` 的示例：

```dart
class Television {
  /// Use [turnOn] to turn the power on instead.
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// Turns the TV's power on.
  void turnOn() {...}
  // ···
}
```

可以自定义元数据注解。下面的示例定义了一个带有两个参数的 @todo 注解：

```dart
library todo;

class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

使用 @Todo 注解的示例：

```dart
import 'todo.dart';

@Todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```

元数据可以在 library、class、typedef、type parameter、 constructor、factory、function、field、parameter 或者 variable 声明之前使用，也可以在 import 或 export 之前使用。可使用反射在运行时获取元数据信息。
