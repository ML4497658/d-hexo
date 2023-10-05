---
title: 设计模式与 Warcraft 其二
tags:
  - 1
  - 2
hidden: true
abbrlink: b307ab4
date: 2023-04-29 22:37:11
catagories:
categories:
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

好的，上一篇文章我们讲了创建型模式：单例模式、工厂模式、抽象工厂模式、建造者模式、原型模式。这一篇我们来讲讲结构型模式。

## 结构型模式（Structural Patterns）

结构型模式描述如何将类或对象按某种布局组成更大的结构。它分为类结构型模式和对象结构型模式，前者采用继承机制来组织接口和类，后者釆用组合或聚合来组合对象。

> 一句经典的话：组合优于继承 (Composition over Inheritance)

结构型模式包括：适配器模式、桥接模式、过滤器模式、组合模式、装饰器模式、外观模式、享元模式、代理模式。

### 适配器模式

适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁。它结合了两个独立接口的功能。

我们直接举例子，这个例子来自于[菜鸟教程 - 适配器模式](https://www.runoob.com/design-pattern/adapter-pattern.html)。

为了节省空间，让我们只放这张图：

![适配器模式](https://www.runoob.com/wp-content/uploads/2014/08/20210223-adapter.png)

为了防止图片失效，简述一下这个例子：

我们现在有
> 一个实现了 MediaPlayer 接口的实体类 AudioPlayer 实体类。可以播放 mp3 格式的音频文件。
>
> 另外两个实现了 AdvancedMediaPlayer 接口的实体类。可以播放 vlc 和 mp4 格式的文件。

我们想要实现

> 让 AudioPlayer 播放其他格式的媒体文件。(vlc && mp4)

为了实现这个功能，我们需要创建一个实现了 MediaPlayer 接口的适配器类 MediaAdapter。

> MediaAdapter  接受参数来获取播放的类型（vlc 或 mp4），然后实例化合适的播放器来播放文件。

AudioPlayer 类判断播放的类型，如果是 mp3 就直接播放，如果不是，就通过调用适配器类 MediaAdapter 的 play 方法来播放其它格式的文件，完成了我们的需求。

### 桥接模式

> Decouple an abstraction from its implementation so that the two can vary independently.

桥接模式（Bridge Pattern）是用于把抽象化与实现化解耦，使得二者可以独立变化。

同样是网上的例子

- 实现一个形状抽象类 Shape，有一个抽象方法 draw
- 再实现三个继承 Shape 的类 Circle，Rectangle，Square，实现 draw 方法
- 实现一个颜色抽象类 Color，有一个抽象方法 fill
- 再实现三个继承 Color 的类 Red，Green，Blue，实现 fill 方法

现在，我们就可以通过组合的方式，实现不同颜色、不同形状的图形了。

```Java
public class BridgePatternDemo {
   public static void main(String[] args) {
      Shape redCircle = new Circle(100,100, 10, new RedCircle());
      Shape greenRectangle = new Rectangle(100,100, 10, new GreenRectangle());
 
      redCircle.draw();
      greenRectangle.draw();
  
   }
}
```

> 桥接模式要求正确识别出系统中两个独立变化的维度，因此其使用范围具有一定的局限性。

### 过滤器模式

过滤器模式（Filter Pattern）或标准模式（Criteria Pattern）是一种设计模式，这种模式允许开发人员使用不同的标准来过滤一组对象，通过逻辑运算以解耦的方式把它们连接起来。

让 ChatGPT 桑来个例子：

以下是一个过滤器模式的示例，假设我们有一个包含不同类型的商品的列表，我们想根据不同的过滤条件来筛选这些商品。

抽象过滤器接口：

首先，我们创建一个抽象的过滤器接口，它定义了筛选方法 filter：
  
  ```cpp
  class Filter {
  public:
    virtual vector<Product> filter(vector<Product> products) = 0;
  };
  ```

接下来，我们创建一个实现了 Filter 接口的实体类，它将根据不同的标准来筛选商品：

  ```cpp
  class ColorFilter : public Filter {
  public:
    ColorFilter(Color color) : color(color) {}
    vector<Product> filter(vector<Product> products) override {
      vector<Product> result;
      for (auto product : products) {
        if (product.color == color) {
          result.push_back(product);
        }
      }
      return result;
    }
  private:
    Color color;
  };
  ```

好的，就此打住吧，至于其他的什么商品名字过滤器、价格过滤器、库存过滤器，乃至于商品本身实现就省略了。

### 组合模式

组合模式（Composite Pattern）是用于把一组相似的对象当作一个单一的对象。

这个就直接看[菜鸟教程 - 组合模式](https://www.runoob.com/design-pattern/composite-pattern.html)的例子吧。

这张图片就足够了：

![组合模式](https://www.runoob.com/wp-content/uploads/2014/08/20210817-composite-composite.svg)

问题：组合模式和链式表有什么区别？

答案：一个是设计模式，一个是数据结构。

> 好吧，我承认这个答案有点不负责任，但是我真的不知道该怎么回答这个问题。

让我们换个口味来，一个 python 的例子:

首先，我们创建一个抽象组件类，它定义了可以包含单个对象或组合对象的通用接口。

```python
from abc import ABC, abstractmethod

# 抽象组件类
class Component(ABC):
    @abstractmethod
    def operation(self):
        pass

# 叶子对象类
class Leaf(Component):
    def operation(self):
        print("Leaf operation")

# 组合对象类
class Composite(Component):
    def __init__(self):
        self.children = []

    def add(self, component):
        self.children.append(component)

    def remove(self, component):
        self.children.remove(component)

    def operation(self):
        print("Composite operation")
        for child in self.children:
            child.operation()

# 创建叶子对象
leaf1 = Leaf()
leaf2 = Leaf()

# 创建组合对象并添加叶子对象
composite = Composite()
composite.add(leaf1)
composite.add(leaf2)

# 调用组合对象的操作方法，递归调用叶子对象的操作方法
composite.operation()

```

> 这个例子也是 ChatGPT 桑的

### 装饰器模式

在开始之前先简单贴一个 python 的装饰器的例子：

```python
from functools import wraps
 
class logit(object):
    def __init__(self, logfile='out.log'):
        self.logfile = logfile
 
    def __call__(self, func):
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            log_string = func.__name__ + " was called"
            print(log_string)
            # 打开logfile并写入
            with open(self.logfile, 'a') as opened_file:
                opened_file.write(log_string + '\n')
            return func(*args, **kwargs)
        return wrapped_function
 
@logit
def addition_func(x):
   """Do some math."""
   return x + x
 
 
result = addition_func(4)
# Output: addition_func was called
```

装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。

随便来一个网上例子吧：

```java
public interface Shape {
   void draw();
}

public class Rectangle implements Shape {
   @Override
   public void draw() {
      System.out.println("Shape: Rectangle");
   }
}

public class Circle implements Shape {
   @Override
   public void draw() {
      System.out.println("Shape: Circle");
   }
}

public abstract class ShapeDecorator implements Shape {
   protected Shape decoratedShape;

   public ShapeDecorator(Shape decoratedShape){
      this.decoratedShape = decoratedShape;
   }

   public void draw(){
      decoratedShape.draw();
   }  
}

public class RedShapeDecorator extends ShapeDecorator {

   public RedShapeDecorator(Shape decoratedShape) {
      super(decoratedShape);        
   }

   @Override
   public void draw() {
      decoratedShape.draw();         
      setRedBorder(decoratedShape);
   }

   private void setRedBorder(Shape decoratedShape){
      System.out.println("Border Color: Red");
   }
}

```

### 外观模式

外观模式（Facade Pattern）隐藏系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口。

这个模式涉及到一个单一的类，该类提供了客户端请求的简化方法和对现有系统类方法的委托调用。

让 copilot 桑来个例子：

```cpp
// 前置省略：实现了一个抽象类 Shape，有一个抽象方法 draw
// 再实现三个继承 Shape 的类 Circle，Rectangle，Square，实现 draw 方法
class ShapeMaker {
public:
  void drawCircle() {
    Circle circle;
    circle.draw();
  }
  void drawRectangle() {
    Rectangle rectangle;
    rectangle.draw();
  }
  void drawSquare() {
    Square square;
    square.draw();
  }
};
```

> 然而 copilot 桑貌似是直接 copy 了菜鸟教程的例子

老实说，这个模式和工厂模式有点像，但是工厂模式是创建型模式，而外观模式是结构型模式。

### 享元模式

享元模式（Flyweight Pattern）主要用于减少创建对象的数量，以减少内存占用和提高性能。

例，例子...（气虚）

``` java
// 前置省略：实现了一个抽象类 Shape，有一个抽象方法 draw
// 再实现个继承 Shape 的类 Circle， 实现 draw 方法
import java.util.HashMap;
 
public class ShapeFactory {
   private static final HashMap<String, Shape> circleMap = new HashMap<>();
 
   public static Shape getCircle(String color) {
      Circle circle = (Circle)circleMap.get(color);
 
      if(circle == null) {
         circle = new Circle(color);
         circleMap.put(color, circle);
         System.out.println("Creating circle of color : " + color);
      }
      return circle;
   }
}
```

嗯，怎么说呢，这个翻译，不知道如何评价。

话说回来，java 的 Integer类的实现与享元模式的一些思想是一致的，但并不是典型的享元模式的应用。

> Java的Integer类中使用了对象池来缓存一定范围内的整数对象（通常在 -128 到 127 之间），以提高性能和内存利用率。这是因为这个范围内的整数在常见的情况下会频繁使用，因此通过对象池可以减少创建和销毁对象的开销。
>
> 当你使用自动装箱（Autoboxing）功能时，将int类型的值赋给Integer对象时，会从对象池中获取对象，而不是每次都创建新的对象。这是一种潜在的享元模式的实现方式，因为它重用了对象，节省了内存。

为什么我记得？因为 CS61B 2018 的 lab3 的 Flik 和这个有关

> Horrible Steve has written the following method, which he claims tests whether two Integer objects are equal. So far as we can tell, it seems to work properly. Explain why this is not an adequate solution. Provide an implementation of the equals method that corrects the problem, without changing the method signature.

```java
public static boolean HorribleSteve(Integer a, Integer b) {
    return a == b;
}
```

实际上，应该使用 `a.equals(b)` 来判断两个 Integer 对象是否相等。

### 代理模式

代理模式（Proxy Pattern）是用于控制对其它对象的访问的一种结构型设计模式。

使用场景：按职责来划分，通常有以下使用场景： 1、远程代理。 2、虚拟代理。 3、Copy-on-Write 代理。 4、保护（Protect or Access）代理。 5、Cache代理。 6、防火墙（Firewall）代理。 7、同步化（Synchronization）代理。 8、智能引用（Smart Reference）代理。

注意事项： 1、和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。 2、和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制。

![代理模式](https://www.runoob.com/wp-content/uploads/2014/08/20211025-proxy.svg)

请参见[菜鸟教程 - 代理模式](https://www.runoob.com/design-pattern/proxy-pattern.html)。

## 题外话：桥接、适配器、装饰器、代理的区别

代理、桥接、装饰器、适配器，这 4 种模式是比较常用的结构型设计模式。它们的代码结构非常相似。笼统来说，它们都可以称为 Wrapper 模式，也就是通过 Wrapper 类二次封装原始类。

尽管代码结构相似，但这 4 种设计模式的用意完全不同，也就是说要解决的问题、应用场景不同，这也是它们的主要区别。这里我就简单说一下它们之间的区别。

代理模式：代理模式在不改变原始类接口的条件下，为原始类定义一个代理类，主要目的是控制访问，而非加强功能，这是它跟装饰器模式最大的不同。

桥接模式：桥接模式的目的是将接口部分和实现部分分离，从而让它们可以较为容易、也相对独立地加以改变。

装饰器模式：装饰者模式在不改变原始类接口的情况下，对原始类功能进行增强，并且支持多个装饰器的嵌套使用。

适配器模式：适配器模式是一种事后的补救策略。适配器提供跟原始类不同的接口，而代理模式、装饰器模式提供的都是跟原始类相同的接口。

## 小结

结构型模式描述如何将类或对象按某种布局组成更大的结构。它分为类结构型模式和对象结构型模式，前者采用继承机制来组织接口和类，后者釆用组合或聚合来组合对象。
