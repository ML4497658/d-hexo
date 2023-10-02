---
title: 用 Qt 写五子棋的夜晚 二
tags:
  - Qt
  - C++
hidden: false
catagories: 开发记录
abbrlink: ff289db2
date: 2022-12-03 16:27:48
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这篇博文主要讲了 Qt 中的信号与槽 (Signals & Slots)

## 信号与槽 (Signals & Slots)

信号和槽是用于对象之间的通信的。信号和槽机制是 Qt 的一个核心特性，也是与其他框架提供的特性最不同的部分。信号和槽是由 Qt 的元对象系统实现的。

### 介绍

在 GUI 编程中，当我们改变一个小部件时，我们经常希望另一个小部件被通知到。更一般地说，我们希望任何类型的对象都能够相互通信。例如，如果用户点击一个关闭按钮，我们可能希望调用窗口的 close() 函数。

其他工具包使用回调来实现这种通信。回调是一个指向函数的指针，因此如果您希望处理函数通知您某些事件，您将一个指向另一个函数（回调）的指针传递给处理函数。然后，处理函数在适当的时候调用回调。虽然使用这种方法的成功框架确实存在，但回调可能是不直观的，并且可能存在确保回调参数的类型正确性的问题。

> 少年，有听说过回调地狱吗？

### Signals and Slots

在 Qt 中，我们有一个替代回调技术的方法：我们使用信号和槽。当发生特定事件时，会发出一个信号。Qt 的小部件有许多预定义的信号，但我们总是可以对小部件进行子类化，以向它们添加我们自己的信号。槽是在响应特定信号时调用的函数。Qt 的小部件有许多预定义的槽，但是通常的做法是对小部件进行子类化，并添加自己的槽，以便您可以处理您感兴趣的信号。

![https://doc.qt.io/qt-6/images/abstract-connections.png](https://doc.qt.io/qt-6/images/abstract-connections.png)

信号和槽机制是类型安全的：信号的签名必须与接收槽的签名匹配。 （实际上，槽的签名可以比它接收的信号短，因为它可以忽略额外的参数。）由于签名是兼容的，因此编译器可以在使用基于函数指针的语法时帮助我们检测类型不匹配。基于字符串的 SIGNAL 和 SLOT 语法将在运行时检测到类型不匹配。信号和槽松散耦合：发出信号的类既不知道也不关心哪个槽接收信号。 Qt 的信号和槽机制确保如果将信号连接到槽，则槽将在正确的时间使用信号的参数调用。信号和槽可以采用任何类型的任意数量的参数。它们完全类型安全。

从 QObject 或其子类（例如，QWidget）继承的所有类都可以包含信号和槽。当对象以可能对其他对象感兴趣的方式更改其状态时，对象发出信号。这是对象进行通信的全部内容。它不知道也不关心是否有任何内容接收其发出的信号。这是真正的信息封装，并确保对象可以用作软件组件。

槽可用于接收信号，但它们也是普通的成员函数。就像对象不知道是否有任何内容接收其信号一样，槽也不知道是否有任何信号连接到它。这确保可以使用 Qt 创建真正独立的组件。

您可以将任意数量的信号连接到单个槽，也可以将信号连接到所需的任意数量的槽。甚至可以将信号直接连接到另一个信号。 （这将在发出第一个信号时立即发出第二个信号。）

信号和槽一起构成了强大的组件编程机制。

### signals

信号是由对象发出的，当其内部状态以某种可能对对象的客户端或所有者感兴趣的方式更改时。信号是公共访问函数，可以从任何地方发出，但我们建议仅从定义信号及其子类的类发出它们。

当发出信号时，通常会立即执行连接到它的槽，就像普通的函数调用一样。当这种情况发生时，信号和槽机制完全独立于任何 GUI 事件循环。在所有槽返回后，将执行 emit 语句后面的代码。使用排队的连接时情况略有不同；在这种情况下，立即继续执行 emit 关键字后面的代码，并稍后执行槽。

如果将多个槽连接到一个信号，则在发出信号时，槽将按照它们连接的顺序一个接一个地执行。

信号是由 moc 自动生成的，不得在 .cpp 文件中实现。

关于参数的说明：我们的经验表明，如果信号和槽不使用特殊类型，则它们更具可重用性。如果 QScrollBar::valueChanged() 使用特殊类型，例如假设的 QScrollBar::Range，那么它只能连接到专门为 QScrollBar 设计的槽。连接不同的输入小部件将是不可能的。

### Slots

一个槽是在连接到它的信号发出时调用的函数。槽是普通的 C++ 函数，可以正常调用；它们唯一的特殊功能是信号可以连接到它们。

由于槽是普通的成员函数，因此在直接调用时遵循普通的 C++ 规则。但是，作为槽，它们可以被任何组件调用，而不管其访问级别，通过信号槽连接。这意味着从任意类的实例发出的信号可以导致在不相关类的实例中调用私有槽。

您还可以定义槽为虚拟的，我们发现这在实践中非常有用。

与回调相比，由于它们提供的灵活性增加，信号和槽会稍微慢一些，尽管对于实际应用程序来说，差异微不足道。通常，发出连接到某些槽的信号，比直接调用接收器大约慢十倍，使用非虚函数调用。这是定位连接对象所需的开销，以安全地迭代所有连接（即检查在发出期间是否已销毁后续接收器）以及以通用方式编组任何参数。虽然十个非虚函数调用听起来很多，但它们的开销比任何新的或删除的操作小得多，例如。只要执行字符串、向量或列表操作，这些操作在幕后需要新的或删除的操作，信号和槽的开销就只占完整函数调用成本的很小一部分。每当在槽中执行系统调用时；或间接调用超过十个函数。信号和槽机制的简单性和灵活性远远超过开销，您的用户甚至不会注意到。

请注意，当与基于 Qt 的应用程序一起编译时，定义为信号或槽的其他库可能会导致编译器警告和错误。要解决此问题，请取消定义有问题的预处理器符号。

### A Small Example

一个最小的 C++ 类声明可能是这样的：

``` cpp
class Counter
{
public:
    Counter() { m_value = 0; }

    int value() const { return m_value; }
    void setValue(int value);

private:
    int m_value;
};
```

一个最小的基于 QObject 的类可能是这样的：

``` cpp

#include <QObject>

class Counter : public QObject
{
    Q_OBJECT

public:
    Counter() { m_value = 0; }

    int value() const { return m_value; }

public slots:
    void setValue(int value);

signals:
    void valueChanged(int newValue);

private:
    int m_value;
};
```

基于 QObject 的版本具有相同的内部状态，并提供了公共方法来访问该状态，但除此之外，它还支持使用信号和槽进行组件编程。该类可以通过发出信号 valueChanged() 来告诉外部世界其状态已更改，并且它具有其他对象可以向其发送信号的插槽。

所有包含信号或槽的类都必须在其声明顶部提及 Q_OBJECT。它们还必须从 QObject 派生（直接或间接）。

Slots 由应用程序程序员实现。这是 Counter::setValue() 槽的可能实现：

``` cpp

void Counter::setValue(int value)
{
    if (value != m_value) {
        m_value = value;
        emit valueChanged(value);
    }
}
```

emit 语句会发出来自对象的信号 valueChanged()，并将新值作为参数。

在下面的代码片段中，我们创建了两个 Counter 对象，并使用 QObject::connect() 将第一个对象的 valueChanged() 信号连接到第二个对象的 setValue() 槽：

``` cpp
    Counter a, b;
    QObject::connect(&a, &Counter::valueChanged,
                     &b, &Counter::setValue);

    a.setValue(12);     // a.value() == 12, b.value() == 12
    b.setValue(48);     // a.value() == 12, b.value() == 48
```

调用 a.setValue(12) 会使 a 发出一个 valueChanged(12) 信号，b 将在其 setValue() 槽中接收该信号，即 b.setValue(12) 被调用。然后 b 发出相同的 valueChanged() 信号，但是由于没有将槽连接到 b 的 valueChanged() 信号，因此该信号被忽略。

注意到 setValue() 函数只在 value != m_value 时设置值并发出信号。这可以防止在循环连接的情况下出现无限循环（例如，如果 b.valueChanged() 连接到 a.setValue()）。

默认情况下，对于您进行的每个连接，都会发出一个信号；对于重复的连接，会发出两个信号。您可以使用单个 disconnect() 调用来断开所有这些连接。如果传递 Qt::UniqueConnection 类型，则仅在不是重复连接时才会进行连接。如果已经存在重复项（完全相同的信号到相同对象上的相同槽），则连接将失败，并且 connect 将返回 false。

这个例子说明了对象可以在不需要彼此了解任何信息的情况下一起工作。为了实现这一点，只需要将对象连接在一起，这可以通过一些简单的 QObject::connect() 函数调用或 uic 的自动连接功能来实现。

### A Real Example

接下来是一个简单的小部件类的头文件，没有成员函数。目的是展示如何在自己的应用程序中利用信号和槽。

``` cpp
# ifndef LCDNUMBER_H

# define LCDNUMBER_H

# include <QFrame>

class LcdNumber : public QFrame
{
    Q_OBJECT
```

LcdNumber 通过 QFrame 和 QWidget 继承 QObject，它具有大部分信号槽知识。它与内置的 QLCDNumber 小部件有些相似。

Q_OBJECT 宏由预处理器展开，以声明由 moc 实现的几个成员函数；如果您得到类似“LcdNumber 的 vtable 的未定义引用”的编译器错误，则可能忘记运行 moc 或在链接命令中包含 moc 输出。

``` cpp
public:
    LcdNumber(QWidget *parent = nullptr);

signals:
    void overflow();
```

在类构造函数和公共成员之后，我们声明类信号。当被要求显示一个不可能的值时，LcdNumber 类发出一个信号 overflow()。

如果您不关心溢出，或者您知道溢出不可能发生，则可以忽略 overflow() 信号，即不将其连接到任何槽。

另一方面，如果您想在数字溢出时调用两个不同的错误函数，只需将信号连接到两个不同的槽即可。Qt 将按照它们连接的顺序调用两者。

``` cpp
public slots:
    void display(int num);
    void display(double num);
    void display(const QString &str);
    void setHexMode();
    void setDecMode();
    void setOctMode();
    void setBinMode();
    void setSmallDecimalPoint(bool point);
};

# endif
```

一个槽是一个接收函数，用于获取其他小部件中的状态更改信息。LcdNumber 使用它，如上面的代码所示，来设置显示的数字。由于 display() 是类与程序的其余部分的接口的一部分，因此槽是公共的。

许多示例程序将 QScrollBar 的 valueChanged() 信号连接到 display() 槽，因此 LCD 数字不断显示滚动条的值。

请注意，display() 被重载；当您将信号连接到槽时，Qt 将选择适当的版本。使用回调，您必须找到五个不同的名称并跟踪类型。

### 信号和槽 with 默认参数

信号和槽的签名可以包含参数，并且参数可以具有默认值。考虑 QObject::destroyed()：

``` cpp
void destroyed(QObject* = nullptr);
```

当 QObject 被删除时，它会发出此 QObject::destroyed() 信号。我们希望捕获此信号，无论我们是否有对已删除的 QObject 的悬空引用，以便我们可以清理它。适当的槽签名可能是：

``` cpp
void objectDestroyed(QObject* obj = nullptr);
```

要将信号连接到槽，我们使用 QObject::connect()。有几种连接信号和槽的方法。第一种是使用函数指针：

``` cpp
connect(sender, &QObject::destroyed, this, &MyObject::objectDestroyed);
```

用 QObject::connect() 和 函数指针，有几个优点。首先，它允许编译器检查信号的参数是否与槽的参数兼容。如果需要，参数也可以由编译器隐式转换。

您还可以连接到函数对象或 C++11 lambda：

``` cpp
connect(sender, &QObject::destroyed, this, [=](){ this->m_objects.remove(sender); });
```

在这两种情况下，我们在调用 connect() 中提供 this 作为上下文。上下文对象提供有关接收器应在其中执行的线程的信息。这很重要，因为提供上下文确保接收器在上下文线程中执行。

当发出信号时，lambda 将被断开连接，因为 sender 或 context 被销毁。您应该注意，在信号发出时使用的任何对象都是存活的。

将信号连接到槽的另一种方法是使用 QObject::connect() 和 SIGNAL 和 SLOT 宏。如果参数具有默认值，则关于是否在 SIGNAL() 和 SLOT() 宏中包含参数的规则是，传递给 SIGNAL() 宏的签名的参数数量不能少于传递给 SLOT() 宏的签名的参数数量。

所有这些都可以工作：

``` cpp
connect(sender, SIGNAL(destroyed(QObject*)), this, SLOT(objectDestroyed(Qbject*)));
connect(sender, SIGNAL(destroyed(QObject*)), this, SLOT(objectDestroyed()));
connect(sender, SIGNAL(destroyed()), this, SLOT(objectDestroyed()));
```

但是这个不会工作：

``` cpp
connect(sender, SIGNAL(destroyed()), this, SLOT(objectDestroyed(QObject*)));
```

...因为槽将期望信号不会发送的 QObject。此连接将报告运行时错误。

请注意，当使用此 QObject::connect() 重载时，不会检查信号和槽参数。

## 参考

- [Signals & Slots | Qt core 6.5.3](https://doc.qt.io/qt-6/signalsandslots.html)
