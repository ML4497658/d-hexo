---
title: 设计模式与 Warcraft 其一
tags:
  - 设计模式
hidden: true
abbrlink: b268e5b9
date: 2023-04-28 22:14:35
catagories: 技术分享
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

须知: 这并不是一篇教程，而是一篇笔记
> 如果你想学习设计模式，建议直接阅读比较好的设计模式教程，比如 [设计模式|菜鸟教程](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)。

___

在做高级程序设计大作业的时候，ChatGPT 告诉了我工厂模式，我觉得很有意思，于是就去查了一下，了解到了设计模式

## 什么是设计模式

设计模式 (Design pattern) 是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

由 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides 四人在 1994 年所著的《Design Patterns: Elements of Reusable Object-Oriented Software》一书中提出。他们四人合称为 GoF（四人帮，全拼 Gang of Four）。

在软件工程中，设计模式是对软件设计中普遍存在（反复出现）的各种问题，所提出的解决方案。这个术语是由埃里希·伽玛（Erich Gamma）等人在 1990 年代从建筑设计领域引入到计算机科学的。该书是当代著名软件工程著作之一，对软件设计有着重要影响，可以说是设计模式领域的经典著作。

GoF在书中提出了 23 种设计模式，分为三类：创建型模式（Creational Patterns）、结构型模式（Structural Patterns）、行为型模式（Behavioral Patterns）。

## 设计模式的六大原则

- 开闭原则（Open Close Principle）

> 对扩展开放，对修改关闭。在程序需要进行拓展的时候，不能去修改原有的代码，而是要扩展原有代码，实现一个热插拔的效果。

- 里氏代换原则（Liskov Substitution Principle）

> 任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。

- 依赖倒转原则（Dependence Inversion Principle）

> 面向接口编程，依赖于抽象而不依赖于具体。写代码时用到具体类时，不与具体类交互，而与具体类的上层接口交互。

- 接口隔离原则（Interface Segregation Principle）

> 每个接口中不存在子类用不到却必须实现的方法，如果不然，就要将接口拆分。使用多个隔离的接口，比使用单个接口（多个接口方法集合到一个的接口）要好。

- 迪米特法则（最少知道原则）（Demeter Principle）

> 一个实体应当尽量少的与其他实体发生相互作用，使得系统功能模块相对独立。

- 合成复用原则（Composite Reuse Principle）

> 尽量使用合成/聚合的方式，而不是使用继承。

## 设计模式的分类

- 创建型模式（Creational Patterns）

> 单例模式、工厂模式、抽象工厂模式、建造者模式、原型模式。

- 结构型模式（Structural Patterns）

> 适配器模式、桥接模式、过滤器模式、组合模式、装饰器模式、外观模式、享元模式、代理模式。

- 行为型模式（Behavioral Patterns）

> 策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

## 创建型模式

创建型模式主要用于创建对象。它的主要特点是“将对象的创建与使用分离”。GoF 中提供了单例、原型、工厂方法、抽象工厂、建造者等 5 种创建型模式。

### 单例模式

单例模式（Singleton Pattern）是一种常用的软件设计模式，该模式的主要目的是确保某一个类只有一个实例存在。当你希望在整个系统中，某个类只能出现一个实例时，单例对象就能派上用场。

单例模式的要点有三个：

- 某个类只能有一个实例；
- 它必须自行创建这个实例；
- 它必须自行向整个系统提供这个实例。

e.g.

``` c++
class Singleton {
private:
    Singleton() {}
    static Singleton *instance;
public:
    static Singleton *getInstance() {
      return (instance == nullptr) ? instance = new Singleton() : instance;
    }
};
```

实际应用场景：线程池、数据库连接池、缓存、日志对象、对话框、打印机、显卡的驱动程序对象等。

### 工厂模式

工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。工厂模式的主要意图是为了解决接口选择的问题。

当我们需要创建一个对象时，我们只知道接口，但不知道具体的实现类。而工厂模式将创建对象的过程封装起来，从而避免了高度耦合。

工厂模式的要点有三个：

- 一个工厂类，一个产品接口，多个产品实现类；
- 工厂类中有一个 create 方法，该方法可以根据传入的参数的不同创建不同的产品实现类；
- 产品接口中有多个产品实现类的共同方法。

e.g.

``` c++
class Product {
public:
    virtual void show() = 0;
};

class ProductA : public Product {
public:
    void show() {
        cout << "I'm ProductA" << endl;
    }
};

class ProductB : public Product {
public:
    void show() {
        cout << "I'm ProductB" << endl;
    }
};

class Factory {
public:
    Product *create(string productName) {
        switch (productName) {
            case "A":
                return new ProductA();
            case "B":
                return new ProductB();
            default:
                return nullptr;
        }
    }
};
```

实际应用场景: JDBC 中的 Connection 对象、Hibernate 中的 SessionFactory 对象、Spring 中的 BeanFactory 对象等。

### 抽象工厂模式

抽象工厂模式（Abstract Factory Pattern）是工厂模式的升级版。工厂模式只有一个产品接口，而抽象工厂模式有多个产品接口。

抽象工厂模式的要点有三个：

- 一个抽象工厂类，多个产品接口，多个产品实现类；
- 抽象工厂类中有多个 create 方法，每个 create 方法可以创建一个产品实现类；
- 产品接口中有多个产品实现类的共同方法。

e.g.

``` c++
// 前置：有两个产品族 ProductA 和 ProductB，每个产品族都有两个产品 ProductA1、ProductA2 和 ProductB1、ProductB2 继承自各自的产品接口 ProductA 和 ProductB
class Factory {
public:
    virtual ProductA *createProductA() = 0;
    virtual ProductB *createProductB() = 0;
};

class Factory1 : public Factory {
public:
    ProductA *createProductA() {
        return new ProductA1();
    }
    ProductB *createProductB() {
        return new ProductB1();
    }
};

class Factory2 : public Factory {
public:
    ProductA *createProductA() {
        return new ProductA2();
    }
    ProductB *createProductB() {
        return new ProductB2();
    }
};
```

实际应用场景：Java 中的 JDBC。

### 建造者模式

建造者模式（Builder Pattern）是一种创建型模式，它将复杂对象的创建过程封装起来，使得同样的创建过程可以创建不同的产品。

建造者模式的要点有三个：

- 一个产品类，多个产品属性；
- 一个抽象建造者类，多个产品属性的建造方法；
- 一个具体建造者类，实现抽象建造者类的建造方法；

e.g.

``` c++
class Product {
private:
    string partA;
    string partB;
    string partC;
public:
    void setPartA(string partA) {
        this->partA = partA;
    }
    void setPartB(string partB) {
        this->partB = partB;
    }
    void setPartC(string partC) {
        this->partC = partC;
    }
    void show() {
        cout << "partA: " << partA << endl;
        cout << "partB: " << partB << endl;
        cout << "partC: " << partC << endl;
    }
};

class Builder {
public:
    virtual void buildPartA() = 0;
    virtual void buildPartB() = 0;
    virtual void buildPartC() = 0;
    virtual Product *getResult() = 0;
};

class ConcreteBuilder : public Builder {
private:
    Product *product;
public:
    ConcreteBuilder() {
        product = new Product();
    }
    void buildPartA() {
        product->setPartA("A");
    }
    void buildPartB() {
        product->setPartB("B");
    }
    void buildPartC() {
        product->setPartC("C");
    }
    Product *getResult() {
        return product;
    }
};

class Director {
public:
    Product *construct(Builder *builder) {
        builder->buildPartA();
        builder->buildPartB();
        builder->buildPartC();
        return builder->getResult();
    }
};
```

实际应用场景：StringBuilder、StringBuffer、JDOM 中的 DomBuilder、SAXBuilder。

### 原型模式

原型模式（Prototype Pattern）是一种创建型模式，它的主要特点是通过复制一个已经存在的实例来返回新的实例，而不是新建实例。

原型模式的要点有三个：

- 一个抽象原型类，一个 clone 方法；
- 一个具体原型类，实现抽象原型类的 clone 方法；
- 一个原型管理器类，用来管理原型对象。

e.g.

``` c++
class Prototype {
public:
    virtual Prototype *clone() = 0;
};

class ConcretePrototype : public Prototype {
private:
    string name;
public:
    ConcretePrototype(string name) {
        this->name = name;
    }
    Prototype *clone() {
        return new ConcretePrototype(name);
    }
};
```

实际应用场景：Java 中的 Object clone() 方法。

## 小结

创建型模式主要用于创建对象。它的主要特点是“将对象的创建与使用分离”。GoF 中提供了单例、原型、工厂方法、抽象工厂、建造者等 5 种创建型模式。
