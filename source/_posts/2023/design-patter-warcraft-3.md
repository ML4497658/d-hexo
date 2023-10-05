---
title: design-patter-warcraft-3
tags:
  - 设计模式
hidden: false
abbrlink: 3b449868
date: 2023-04-30 16:38:04
catagories: 技术分享
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

须知: 这并不是一篇教程，而是一篇笔记，
> 如果你想学习设计模式，建议直接阅读比较好的设计模式教程，比如 [设计模式|菜鸟教程](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)。

____________________

这篇文章我们来讲讲行为型模式... 吗？

并不是，这篇文章先来讲一讲 part 1 中提到的大作业 `Warcraft 3`。

## Warcraft 3

如果你对这个不管兴趣请点击 [这里](#行为型模式) 跳过这一节。

### 什么是 Warcraft 3

魔兽争霸 3（Warcraft III: Reign of Chaos）是由暴雪娱乐公司开发的一款即时战略游戏，于2002年7月3日发行。游戏的故事发生在魔兽争霸系列的虚构世界中，讲述了一场由人类、兽人、亡灵和暗夜精灵四个种族之间的战争。游戏的扩展包《冰封王座》于2003年7月1日发行。

> 我顺便下载下来玩了会儿，很好玩，推荐。

### 大作业的要求

然而，这个大作业除了名字，和魔兽争霸 3 没有任何关系。

除此之外，这个大作业甚至并不是原创，实际上，经查证，原题来自 [北京大学 程序设计与算法（三）魔兽世界3(2020秋季)](https://cxsjsx.openjudge.cn/2018hwall/024/)。

内容比较长，这里只摘录一部分：

```` Plain Text
大实验以old school游戏魔兽争霸为背景，分成三个难度：
魔兽世界之一：备战
魔兽世界之二：装备
魔兽世界之三：开战

魔兽世界之一：备战

描述
魔兽世界的西面是红魔军的司令部，东面是蓝魔军的司令部。两个司令部之间是依次排列的若干城市。
红司令部，City 1，City 2，……，City n，蓝司令部

两军的司令部都会制造武士。

武士
- dragon
- ninja
- iceman
- lion
- wolf

每种武士都有这三种属性
- 编号 从1开始计算。红方制造出来的第n个武士，编号就是n。同样，蓝方制造出来的第n个武士，编号也是n。
-生命值 武士在刚降生的时候有一个生命值。
-攻击力 
````

### 思路

可以参见我的 [Warcraft_sdu](https://github.com/Jenway/Warcraft_sdu) repo。

它使用了

- 工厂模式
- 智能指针
- CMake

等一些杂七杂八的东西，详情参考仓库吧

## 行为型模式

行为型模式（Behavioral Patterns）描述类或对象之间怎样相互协作共同完成单个对象都无法单独完成的任务，以及怎样分配职责。

包括：责任链模式、命令模式、解释器模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、空对象模式、策略模式、模板模式、访问者模式。

这里我只列张图，与教程的链接。

如果你不想看，直接跳到 [这里](#小结) 来看小结吧。

### 责任链模式

责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。

菜鸟教程画的图都挺好的，所以我直接盗图好了，详细的教程点击 [这里](https://www.runoob.com/design-pattern/chain-of-responsibility-pattern.html)
![责任链模式](https://www.runoob.com/wp-content/uploads/2014/08/2021-chain-of-responsibility.svg)

### 命令模式

命令模式（Command Pattern）是一种数据驱动的设计模式，它属于行为型模式。请求以命令的形式包裹在对象中，并传给调用对象。调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。

[这里](https://www.runoob.com/design-pattern/command-pattern.html) 有详细的教程。

![命令模式](https://www.runoob.com/wp-content/uploads/2014/08/20220427-command-1-command-1.svg)

### 解释器模式

解释器模式（Interpreter Pattern）提供了评估语言的语法或表达式的方式，它属于行为型模式。这种模式实现了一个表达式接口，该接口解释一个特定的上下文。这种模式被用在 SQL 解析、符号处理引擎等。

[这里](https://www.runoob.com/design-pattern/interpreter-pattern.html) 有详细的教程。

![解释器模式](https://www.runoob.com/wp-content/uploads/2014/08/interpreter_pattern_uml_diagram.jpg)

### 迭代器模式

迭代器模式（Iterator Pattern）是 Java 和 .Net 编程环境中非常常用的设计模式。这种模式用于顺序访问集合对象的元素，不需要知道集合对象的底层表示。

[这里](https://www.runoob.com/design-pattern/iterator-pattern.html) 有详细的教程。

![迭代器模式](https://www.runoob.com/wp-content/uploads/2014/08/202107-23-iterator-pattern.png)

### 中介者模式

中介者模式（Mediator Pattern）用于降低多个对象和类之间的通信复杂性。

[这里](https://www.runoob.com/design-pattern/mediator-pattern.html) 有详细的教程。

![中介者模式](https://www.runoob.com/wp-content/uploads/2014/08/mediator_pattern_uml_diagram.jpg)

### 备忘录模式

备忘录模式（Memento Pattern）保存一个对象的某个状态，以便在适当的时候恢复对象。

[这里](https://www.runoob.com/design-pattern/memento-pattern.html) 有详细的教程。

![备忘录模式](https://www.runoob.com/wp-content/uploads/2014/08/memento_pattern_uml_diagram.jpg)

### 观察者模式

观察者模式（Observer Pattern）用于在目标对象与观察者之间建立一种一对多的依赖关系。

[这里](https://www.runoob.com/design-pattern/observer-pattern.html) 有详细的教程。

![观察者模式](https://www.runoob.com/wp-content/uploads/2014/08/observer_pattern_uml_diagram.jpg)

### 状态模式

状态模式（State Pattern）允许一个对象在其内部状态改变时改变其行为能力。

[这里](https://www.runoob.com/design-pattern/state-pattern.html) 有详细的教程。

![状态模式](https://www.runoob.com/wp-content/uploads/2014/08/state_pattern_uml_diagram.jpg)

### 空对象模式

空对象模式（Null Object Pattern）是一种使用频率相对较低的设计模式。

[这里](https://www.runoob.com/design-pattern/null-object-pattern.html) 有详细的教程。

![空对象模式](https://www.runoob.com/wp-content/uploads/2014/08/null_pattern_uml_diagram.jpg)

### 策略模式

策略模式（Strategy Pattern）中，一个类的行为或其算法可以在运行时更改。

[这里](https://www.runoob.com/design-pattern/strategy-pattern.html) 有详细的教程。

![策略模式](https://www.runoob.com/wp-content/uploads/2014/08/strategy_pattern_uml_diagram.jpg)

### 模板模式

模板模式（Template Pattern）在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。

[这里](https://www.runoob.com/design-pattern/template-pattern.html) 有详细的教程。

![模板模式](https://www.runoob.com/wp-content/uploads/2014/08/template_pattern_uml_diagram.jpg)

### 访问者模式

访问者模式（Visitor Pattern）主要将数据结构与数据操作分离。

[这里](https://www.runoob.com/design-pattern/visitor-pattern.html) 有详细的教程。

![访问者模式](https://www.runoob.com/wp-content/uploads/2014/08/visitor_pattern_uml_diagram.jpg)

## 参考资料

- [魔兽世界3(2020秋季)](https://cxsjsx.openjudge.cn/2018hwall/024/)
- [设计模式|菜鸟教程](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)

## 小结

如果你看到这里，就会发现，这一篇文章十分的水，一方面是，关于这些行为型模式，我并没有什么好的理解。

我感觉到，很多这些模式，因为太过经典，已经成为了语言的一部分，比如说，迭代器模式，在 Java 中，写一个对象，让它 implement Iterable，然后为它写一个 迭代器，这是很自然的事情。

再比如，装饰器模式，这个设计在 Python 中，是很常见的，甚至原生提供。Python 的 `@property` 就是一个很好的例子。

话说，装饰器这种想法，是函数式编程还是 GoF 的设计模式先提出来的？

> 装饰器模式是由Gang of Four (GoF)设计模式中提出的，它是一种结构性设计模式，旨在允许你在不修改现有对象的情况下动态地添加功能或责任。GoF的设计模式是一组经典的面向对象设计原则，于1994年在书籍《设计模式：可复用面向对象软件的基础》中首次提出。
>
> 函数式编程中的装饰器概念与GoF的装饰器模式有些相似，但它通常更强调函数的组合和转换。在函数式编程中，装饰器通常是高阶函数，它们接受一个函数作为输入，并返回一个新的函数，这个新函数可以添加额外的行为或变换输入函数的行为。Python中的装饰器就是一个常见的例子，它们允许你以一种优雅的方式修改函数的行为。
>
> 总之，装饰器模式是GoF设计模式中的一种，而函数式编程中的装饰器概念是一种不同的应用方式，但它们都涉及到在不修改原始对象或函数的情况下添加额外功能的概念。

我感觉到，虽然我可以偶尔吐槽几句，插几句嘴，但我的实践经验还是不足，并不能给出提纲挈领的见解，并不能给出超脱于 `器` 的 `道`。

所以，这里我还是不要大段复制粘贴了。
